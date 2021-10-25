import { validateCaptchaResponse } from '../../../utils/captcha';
import { uploadFiles, getAuth, appendSheet } from '../../../utils/google/gSuiteBridge';
import { parseFrom, toZeptoAttach } from '../../../utils/formHandling';
import { emailId } from '../../../utils/nanoIdProvider';
import ZeptoClient from '../../../utils/zeptomail';

const TEMPLATE_KEY = "2d6f.56fc02bbae752795.k1.0d893620-2fcd-11ec-8c5d-52540064429e.17c91b06282";

export default async function submissionForm(req, res) {

    const { fields, files } = await parseFrom(req);
    const attachments = await toZeptoAttach(files);
    const sessionId = emailId();

    const isValid = await validateCaptchaResponse(fields).catch((err) => {
        console.error(`Unable to call captcha verification service ${err}`);
        res.status(500).json({
            success: false,
            sessionId: sessionId,
            error: "ERR_FRM_CAPTCHA_UNREACHABLE"
        });
        return;
    });

    if (!isValid) {
        console.warn(`Unable to verify captcha for request ${sessionId}`);
        res.status(400).json({
            success: false,
            sessionId: sessionId,
            error: "ERR_FRM_CAPTCHA_FAIL"
        });
        return;
    }

    const auth = getAuth();
    const uploadRef = await uploadFiles(auth, files).catch((err) => {
        console.error(`GDrive upload for request ${sessionId} failed with reason ${err}`);
        res.status(500).json({
            success: false,
            sessionId: sessionId,
            error: "ERR_FRM_UPLOAD_FAIL"
        });
    });
    let reqData = {
        ref: sessionId,
        ...fields,
        displayName: fields.displayName === "true" ? "Yes" : "No",
        proofFile: uploadRef.proofFile ? uploadRef.proofFile.url: undefined,
        photoFile: uploadRef.photoFile ? uploadRef.photoFile.url: undefined,
    };

    delete reqData.consent;
    delete reqData["h-captcha-response"];

    await appendSheet(auth, reqData).catch((err) => {
        console.error(`Gsheet append for request ${sessionId} failed with reason ${err}`);
        res.status(500).json({
            success: false,
            sessionId: sessionId,
            error: "ERR_FRM_SHEET_APPEND_FAIL"
        });
    });

    const config = {
        to: [
            {
                email_address: {
                    address: process.env.NEXT_AUDIENCE_SUBMISSIONS_EMAIL,
                }
            }
        ],
        reply_to: [
            {
                address: fields.submitterEmail,
                name: fields.submitterName
            } 
        ],
        mail_template_key: TEMPLATE_KEY,
        merge_info: reqData,
        attachments: attachments
    }

    const mailId = await ZeptoClient.sendTemplateMail(config).catch((err) => {
        console.error(`ZeptoEmail request failed for request ${sessionId} failed with reason ${err}`);
        res.status(500).json({
            success: false,
            sessionId: sessionId,
            error: "ERR_FRM_MAIL_FAIL"
        });
        return;
    });

    console.log(`ZeptoEmail request succeeded for request "${sessionId}" with reference "${mailId}"`);

    res.status(200).json({
        success: true,
        sessionId: sessionId
    });
}

export const config = {
    api: {
        bodyParser: false,
    }
};
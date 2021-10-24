import { validateCaptchaResponse } from '../../../utils/captcha';
import { emailId } from '../../../utils/nanoIdProvider';
import ZeptoClient from '../../../utils/zeptomail';

const TEMPLATE_KEY = "2d6f.56fc02bbae752795.k1.f8cc6140-2f6c-11ec-b4a4-5254000e3179.17c8f3ab554";

export default async function contactForm(req, res) {

    const fields = req.body;
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

    const config = {
        to: [
            {
                email_address: {
                    address: process.env.NEXT_AUDIENCE_INFO_EMAIL,
                }
            }
        ],
        reply_to: [
            {
                address: fields.email,
                name: fields.name
            } 
        ],
        mail_template_key: TEMPLATE_KEY,
        merge_info: {
            ...fields,
            ref: sessionId
        }
    }

    const mailId = await ZeptoClient.sendTemplateMail(config).catch((err) => {
        console.error(`ZeptoEmail request failed for request ${sessionId} wth reason ${err}`);
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
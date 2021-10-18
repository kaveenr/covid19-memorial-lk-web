import { validateCaptchaResponse } from '../../../utils/captcha';
import { parseFrom, toZeptoAttach } from '../../../utils/formHandling';
import { emailId } from '../../../utils/nanoIdProvider';
import ZeptoClient from '../../../utils/zeptomail';

const TEMPLATE_KEY = "2d6f.56fc02bbae752795.k1.0d893620-2fcd-11ec-8c5d-52540064429e.17c91b06282";

export default async function submissionForm(req, res) {

    const { fields, files } = await parseFrom(req);
    const attachments = await toZeptoAttach(files);
    const refererURI = new URL(req.headers.referer);
    const sessionId = emailId();

    const isValid = await validateCaptchaResponse(fields).catch((err) => {
        console.error(err);
        res.redirect(303,`${refererURI.pathname}?success=false&requestId=${sessionId}`);
    });

    if (!isValid) {
        console.warn(`Unable to verify captcha`);
        res.redirect(303,`${refererURI.pathname}?success=false&requestId=${sessionId}`);
    }

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
        merge_info: {
            ...fields,
            ref: sessionId
        },
        attachments: attachments
    }

    try {
        await ZeptoClient.sendTemplateMail(config);
        res.redirect(303,`${refererURI.pathname}?success=true&requestId=${sessionId}`);
    } catch (err) {
        console.error(err);
        res.redirect(303,`${refererURI.pathname}?success=false&requestId=${sessionId}`);
    }
}

export const config = {
    api: {
        bodyParser: false,
    }
};
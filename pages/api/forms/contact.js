import { validateCaptchaResponse } from '../../../utils/captcha';
import { parseFrom } from '../../../utils/formHandling';
import { emailId } from '../../../utils/nanoIdProvider';
import ZeptoClient from '../../../utils/zeptomail';

const TEMPLATE_KEY = "2d6f.56fc02bbae752795.k1.f8cc6140-2f6c-11ec-b4a4-5254000e3179.17c8f3ab554";

export default async function contactForm(req, res) {

    const { fields } = await parseFrom(req);
    const refererURI = new URL(req.headers.referer);
    const sessionId = emailId();

    const isValid = await validateCaptchaResponse(fields).catch((err) => {
        console.error(`Unable to call captcha verification service ${err}`);
        res.redirect(303,`${refererURI.pathname}?success=false&requestId=${sessionId}`);
    });

    if (!isValid) {
        console.warn(`Unable to verify captcha for request ${sessionId}`);
        res.redirect(303,`${refererURI.pathname}?success=false&requestId=${sessionId}`);
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

    try {
        const mailId = await ZeptoClient.sendTemplateMail(config);
        console.error(`ZeptoEmail request succeeded for request "${sessionId}" with reference "${mailId}"`);
        res.redirect(303,`${refererURI.pathname}?success=true&requestId=${sessionId}`);
    } catch (err) {
        console.error(`ZeptoEmail request failed for request ${sessionId} wth reason ${err}`);
        res.redirect(303,`${refererURI.pathname}?success=false&requestId=${sessionId}`);
    }
}

export const config = {
    api: {
        bodyParser: false,
    }
};
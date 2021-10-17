import { AUDIENCE_INFO } from '../../../utils/constants';
import { fieldsToEmail, parseFrom, toZeptoAttach } from '../../../utils/formHandling';
import { emailId } from '../../../utils/nanoIdProvider';
import ZeptoClient from '../../../utils/zeptomail';

export default async function contactForm(req, res) {

    const { fields } = await parseFrom(req);
    const refererURI = new URL(req.headers.referer);
    const sessionId = emailId();

    const config = {
        to: AUDIENCE_INFO,
        reply_to: [
            {
                address: fields.email,
                name: fields.name
            } 
        ],
        subject: `Contact Us Form ${sessionId}`,
        htmlbody: fieldsToEmail(`Contact Us Form ID: ${sessionId}`, fields),
    }

    try {
        await ZeptoClient.sendMail(config);
        res.redirect(`${refererURI.pathname}?success=true`);
    } catch (err) {
        console.error(err);
        res.redirect(`${refererURI.pathname}?success=false`);
    }
}

export const config = {
    api: {
        bodyParser: false,
    }
};
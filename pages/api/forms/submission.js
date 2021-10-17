import { AUDIENCE_SUBMISSIONS } from '../../../utils/constants';
import { fieldsToEmail, parseFrom, toZeptoAttach } from '../../../utils/formHandling';
import { emailId } from '../../../utils/nanoIdProvider';
import ZeptoClient from '../../../utils/zeptomail';

export default async function submissionForm(req, res) {

    const { fields, files } = await parseFrom(req);
    const attachments = await toZeptoAttach(files);
    const refererURI = new URL(req.headers.referer);
    const sessionId = emailId();

    const config = {
        to: AUDIENCE_SUBMISSIONS,
        reply_to: [
            {
                address: fields.submitterEmail,
                name: fields.submitterName
            } 
        ],
        subject: `Memorial Submission ${sessionId}`,
        htmlbody: fieldsToEmail(`Memorial Submission ID: ${sessionId}`, fields),
        attachments: attachments
    }

    try {
        await ZeptoClient.sendMail(config);
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
import { IncomingForm } from 'formidable'
import { values, toPairs } from 'lodash';
import { readFileSync } from "fs";

async function parseFrom(req) {

    const data = await new Promise((resolve, reject) => {
        const form = new IncomingForm();
        form.parse(req, (err, fields, files) => {
            if (err) return reject(err)
            resolve({ fields, files })
        })
    });

    return data;
}

async function toZeptoAttach(files) {

    let attachments = values(files).filter((item) => item.size != 0).map((item) => {
        const fileBuf  = readFileSync(item.path);
        const b64Content = fileBuf.toString('base64');
        return {
            name: item.name,
            mime_type: item.type,
            content: b64Content
        }
    });
    return attachments;
}

export {
    parseFrom,
    toZeptoAttach,
}
import { toPairs } from 'lodash';
import { createReadStream } from "fs";
const { google } = require('googleapis');

function getAuth() {
    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes : [
            "https://www.googleapis.com/auth/drive.file"
        ]
    })
}

async function uploadFiles(rawFiles) {

    const auth = getAuth();
    const drive = google.drive({
        version: 'v3',
        auth: auth
    });

    const files = toPairs(rawFiles).filter(([key, value]) => value.size != 0);
    
    let response = {};
    for (let fIdx = 0; fIdx < files.length; fIdx++) {
        const [key, value] = files[fIdx];
        const res = await drive.files.create({
            requestBody: {
                name: `${key}_${value.name}`,
                mimeType: value.type,
                parents: [
                    process.env.NEXT_GOOGLE_DRIVE_PARENT
                ]
            },
            media: {
                mimeType: value.type,
                body: createReadStream(value.path)
            }
        });
        response[key] = {
            name: res.data.name,
            id: res.data.id
        };
    }
    return response;
}

export {
    uploadFiles
}
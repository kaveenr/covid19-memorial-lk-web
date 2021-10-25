import { toPairs, values } from 'lodash';
import { createReadStream } from "fs";
const { google } = require('googleapis');

function getAuth() {
    return new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets',
        ]
    })
}

async function uploadFiles(auth, rawFiles) {

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
            id: res.data.id,
            url: `https://drive.google.com/file/d/${res.data.id}/view`
        };
    }
    return response;
}

async function appendSheet(auth, fields) {

    google.options({ auth });
    const sheets = google.sheets('v4');
    const spreadsheetId = process.env.NEXT_GOOGLE_SHEET_ID;
    const range = "'Submission Requests'!1:1000";
    const res = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
            values: [
                [
                    fields.ref,
                    fields.age,
                    fields.gender,
                    fields.location,
                    fields.dateOfDeath,
                    fields.name,
                    fields.displayName,
                    fields.occupation,
                    fields.detailText,
                    fields.submitterName,
                    fields.submitterEmail,
                    fields.submitterPhone,
                    fields.proofFile,
                    fields.photoFile,
                ]
            ],
        },
    });
}

export {
    getAuth,
    uploadFiles,
    appendSheet
}
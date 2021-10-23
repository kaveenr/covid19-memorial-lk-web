import { pickBy } from 'lodash';

const { GoogleSpreadsheet } = require('google-spreadsheet');

async function getSheet() {
    const doc = new GoogleSpreadsheet(process.env.NEXT_GOOGLE_SHEET_ID);
    await doc.useServiceAccountAuth({
        client_email: process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.NEXT_GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });
    return doc
}

async function saveEntry(entry) {

    const doc = await getSheet();
    await doc.loadInfo();
    const requests = doc.sheetsByTitle["Submission Requests"];
    await requests.addRow(pickBy(entry));
}

export {
    saveEntry
}
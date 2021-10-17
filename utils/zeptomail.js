export default class ZeptoClient {

    static FROM_ADDRESS = {
        address: "no-reply@srilankac19memorial.org",
        name: "Sri Lanka C19 Memorial Automated Emails"
    }

    static async sendMail(params) {

        const body = {
            bounce_address: 'bounces@bounce.srilankac19memorial.org',
            from: ZeptoClient.FROM_ADDRESS,
            ...params
        }
        
        const response = await fetch('https://api.zeptomail.com/v1.1/email', {
            method: 'post',
            body: JSON.stringify(body),
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Zoho-enczapikey ${process.env["ZohoAPIKey"]}`
            }
        });

        if (!response.ok) {
            throw Error(`ZeptoMail responded with ${response.status} ${response.statusText}`);
        }

    }
}
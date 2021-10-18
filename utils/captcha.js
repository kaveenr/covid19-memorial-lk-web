async function validateCaptchaResponse(res) {

    const params = new URLSearchParams();
    params.append('response', res["h-captcha-response"]);
    params.append('secret', process.env.NEXT_CAPTCHA_SECRET_KEY);
    
    const response = await fetch('https://hcaptcha.com/siteverify', {method: 'POST', body: params});

    if (!response.ok) {
        throw Error(`Unable to verify captcha API responded with ${response.status}`);
    }
    const data = await response.json();
    return data.success;
}

export {
    validateCaptchaResponse
}
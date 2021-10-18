import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const CaptchaForm = ({ submitText }) => {
    const { locale } = useRouter();
    const [isEnabled, setIsEnabled] = useState(false);
    return [
        <br/>,
        <HCaptcha sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} languageOverride={locale} onVerify={()=> {setIsEnabled(true)}}/>,
        <div className="form-control pt-8">
            <button type="submit" className="btn" disabled={!isEnabled}>{submitText}</button> 
        </div>
    ];
}

export default CaptchaForm;
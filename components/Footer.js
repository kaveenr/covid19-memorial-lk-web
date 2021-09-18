import React from 'react'
import Link from 'next/link'

import { useTranslations } from "use-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    const t = useTranslations('footer');
    return (
        <footer className="p-10 footer bg-neutral text-neutral-content w-full pin-b">
            <div>
                <p className="font-semibold text-lg">{t('title')}</p>
                <p className="font-semibold mb-1">{t('subtitle')}</p>
                <p>{t('copyright')} © 2021</p>
            </div> 
            <div>
                <span className="footer-title">{t('shareLinks')}</span> 
                <div className="flex flex-row gap-4">
                <a href="sads">
                    <FontAwesomeIcon icon={faFacebook} className="w-5 h-5"/>
                </a> 
                <a>
                    <FontAwesomeIcon icon={faTwitter} className=""/>
                </a> 
                <a>
                    <FontAwesomeIcon icon={faLinkedin} className=""/>
                </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
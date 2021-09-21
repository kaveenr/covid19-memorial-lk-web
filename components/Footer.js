import React from 'react'
import Link from 'next/link'

import { useTranslations } from "use-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/dist/client/router';

const Footer = () => {
    const t = useTranslations('footer');
    const th = useTranslations('header');
    const { locale } = useRouter();
    return (
        <footer className="p-10 footer bg-neutral text-neutral-content w-full pin-b">
            <div>
                <p className="font-semibold text-lg">{t('title')}</p>
                <p className="font-semibold mb-1">{t('subtitle')}</p>
                <p>{t('copyright')} © 2021</p>
            </div> 
            <div>
                <span className="footer-title">{t('shareLinks')}</span> 
                <div className="flex flex-row gap-4 h-5">
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=http://srilankac19memorial.org/${locale}`}>
                    <FontAwesomeIcon icon={faFacebook} size="2x"/>
                </a> 
                <a target="_blank" href={`https://twitter.com/intent/tweet?url=http://srilankac19memorial.org/${locale}&text=${th('seoTitle') + " - " + th('seoDisc')}`}>
                    <FontAwesomeIcon icon={faTwitter} size="2x"/>
                </a> 
                <a target="_blank" href={`https://www.linkedin.com/shareArticle?mini=true&url=http://srilankac19memorial.org/${locale}&title=${th('seoTitle')}&;summary=${th('seoDisc')}`}>
                    <FontAwesomeIcon icon={faLinkedin} size="2x"/>
                </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
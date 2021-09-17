import { useTranslations } from "use-intl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    const t = useTranslations('footer');
    return (
        <footer className="p-10 footer bg-neutral text-neutral-content w-full pin-b">
            <div>
                <p className="font-semibold">{t('title')}</p>
                <p>{t('copyright')} © 2021</p>
            </div> 
            <div>
                <span className="footer-title">{t('shareLinks')}</span> 
                <div className="grid grid-flow-col gap-4">
                <a>
                    <FontAwesomeIcon icon={faFacebook} className=""/>
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
import { useTranslations } from "use-intl";

const Footer = () => {
    const t = useTranslations('footer');
    return (
        <footer className="p-4 footer bg-primary text-base-content footer-center">
            <div>
            <p>{t('copyright')} © 2021</p>
            </div>
        </footer>
    );
}

export default Footer;
import { truncate } from "lodash";
import { useRouter } from 'next/dist/client/router'
import Link from "next/link"
import Image from "next/image"
import { useState } from "react";
import { useIntl, useTranslations } from "use-intl";
import FlowerImg from '../public/img/icon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const Entry = ({ data }) => {

    const [detailVisible, setDetailVisible] = useState(false);
    const t = useTranslations('entry');
    const intl = useIntl();
    const { locale } = useRouter();
    
    // Overcomplicated tool tip clipping solution.
    const [tooltipDir, setTooltipDir] = useState(true);
    const handleHover = (e) => {
        // Run Only Once For Performance
        if (tooltipDir) {
            const offset = (100 * e.clientX) / window.innerWidth;
            if (offset > 85) {
                setTooltipDir(false);
            }
        }
        setDetailVisible(true);
    }

    const getCity = (i) => {
        if (!i.city) {
            if (!i.district) return "Unknown";
            return i.district[`name_${locale}`];
        }
        const inLang = i.city[`name_${locale}`];
        return inLang || i.city[`name_en`];
    }

    const getLink = (i) => {
        return `https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dig_reports/${i.sourceRef}.md`
    }

    return (
        <div className="relative" onMouseOver={(e) => (handleHover(e))} onMouseLeave={(e) => (setDetailVisible(false))}>
            <a  onClick={(e) => (handleHover(e))}
                className={`py-4 flex flex-col items-center relative ${!detailVisible ? "hover:": ""}scale-110 transition-transform duration-700 ease-out`}>
                <Image src={FlowerImg} width="150" height="150" loading="lazy" className="flex-grow w-full"/>
                <p className="text-sm font-semibold mt-1">{data.attributes.ageValue}, {t(data.attributes.gender)}</p>
                <p className="text-xs font-semibold">{t('place', {place: truncate(getCity(data.attributes), {length:12})})}</p>
                <p className="text-xs">{intl.formatDateTime(new Date(data.attributes.deathDate), {dateStyle: "medium"})}</p>
            </a>
            <div className={`fixed top-0 left-0 w-screen h-screen md:w-0 md:h-0 bg-black z-40 opacity-50 ${!detailVisible ? "hidden" : "fixed md:hidden"}`}/>
            <div className={`card rounded-none rounded-t-lg lg:rounded-lg bg-base-200 p-4 shadow-xl overflow-hidden ${!detailVisible ? "w-0 h-0 z-0 opacity-0": "opacity-100 z-50 rounded-xl w-full md:w-80"} fixed bottom-0 md:bottom-auto left-0 md:absolute md:top-1/3 ${tooltipDir ? 'md:left-1/3' : 'md:right-1/3'} transition-opacity duration-150 ease-in-out`}>
                <div className="absolute top-2 right-1 md:hidden">
                    <button className="px-2 py-2" onClick={()=> {setDetailVisible(false)}}>
                        <FontAwesomeIcon size="lg" icon={faTimes} />
                    </button>
                </div>
                <div className="pt-3 md:pt-0">
                    <p><b>{t('province')}:</b> {data.attributes.province[`name_${locale}`]}</p>
                    <p><b>{t('district')}:</b> {data.attributes.district[`name_${locale}`]}</p>
                    {data.attributes.city ? (<p><b>{t('city')}:</b> {getCity(data.attributes)}</p>) : []}
                    <p><b>{t('source')}:</b> {t(`source_${data.attributes.sourceType}`)}</p>
                    <div className="mt-4">
                        <a class="btn btn-sm" href={getLink(data.attributes)} target="_blank">{t('gotoSource')}</a> 
                    </div>
                </div>
            </div>
        </div>
  );
}

export default Entry;
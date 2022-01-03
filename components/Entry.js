import { truncate } from "lodash";
import Image from "next/image"
import { useState } from "react";
import { useIntl, useTranslations } from "use-intl";
import FlowerImg from '../public/img/icon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { event } from "../utils/gtag";


const Entry = ({ data, onClick }) => {

    const [detailVisible, setDetailVisible] = useState(false);
    const [offset, setOffset] = useState(null)
    const t = useTranslations('entry');
    const intl = useIntl();

    const getLink = (i) => {
        return `https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dig_reports/${i.sourceRef}.md`
    }

    let name = `Name Unknown`
    if (data.attributes.detail) {
        name = data.attributes.detail.name || `Name Unpublished`
    }

    return (
        <div className="relative" onMouseOver={(e) => {setDetailVisible(true); if (!offset) setOffset((100 * e.clientX) / screen.width);}} onMouseLeave={(e) => (setDetailVisible(false))} 
            onClick={() => {
                onClick();
                event("expand_user", "detail", "Expanded Entry", data.id);
            }}>
            <a className={`py-4 flex flex-col items-center relative ${detailVisible ? "scale-110" : ""} transition-transform duration-700 ease-out cursor-pointer`}>
                <p className="text-xs text-center text-slate-700 h-8">{truncate(name.toUpperCase(), {length:80})}</p>
                <Image src={FlowerImg} width="150" height="150" loading="lazy" className="flex-grow w-full"/>
                <p className="text-sm font-semibold mt-1">{data.attributes.ageValue}, {t(data.attributes.gender)}</p>
                <p className="text-xs font-semibold">{t('place', {place: truncate(data.attributes.city, {length:30})})}</p>
                <p className="text-xs">{intl.formatDateTime(new Date(data.attributes.deathDate), {dateStyle: "medium"})}</p>
            </a>
            {detailVisible ? (
                <div className={`card hidden lg:block rounded-none rounded-t-lg lg:rounded-lg bg-base-200 p-4 shadow-xl overflow-hidden opacity-100 z-30 rounded-xl w-80 fixed bottom-auto ${offset < 50 ? "left-1/3" : "right-1/3"} absolute top-1/3 transition-opacity duration-150 ease-in-out`}>
                    <div className="absolute top-2 right-1 md:hidden">
                        <button className="px-2 py-2" onClick={()=> {setDetailVisible(false)}}>
                            <FontAwesomeIcon size="lg" icon={faTimes} />
                        </button>
                    </div>
                    <div className="pt-3 md:pt-0">
                        <p><b>{t('province')}:</b> {data.attributes.province}</p>
                        <p><b>{t('district')}:</b> {data.attributes.district}</p>
                        {data.attributes.city ? (<p><b>{t('city')}:</b> {data.attributes.city}</p>) : []}
                        <p><b>{t('source')}:</b> {t(`source_${data.attributes.sourceType}`)}</p>
                    </div>
                </div>
            ) : []}
        </div>
  );
}

export default Entry;
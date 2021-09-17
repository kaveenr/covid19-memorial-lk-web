import { truncate } from "lodash";
import { useRouter } from 'next/dist/client/router'
import Link from "next/link"
import { useState } from "react";
import { useIntl, useTranslations } from "use-intl";

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
            return i.district[`name_${locale}`];
        }
        const inLang = i.city[`name_${locale}`];
        return inLang || i.city[`name_en`];
    }

    return (
        <div className="relative" onMouseOver={(e) => (handleHover(e))} onMouseLeave={(e) => (setDetailVisible(false))}>
            <Link href={`/entry/${data.id}`}>
                <a 
                    className={`py-4 flex flex-col items-center relative ${!detailVisible ? "hover:": ""}scale-110 transition-transform duration-700 ease-out`}>
                    <img src="/img/icon.png" className="flex-grow w-full"/>
                    <p className="text-sm font-semibold mt-1">{data.attributes.ageValue}, {t(data.attributes.gender)}</p>
                    <p className="text-xs font-semibold">{t('place', {place: truncate(getCity(data.attributes), {length:12})})}</p>
                    <p className="text-xs">{intl.formatDateTime(new Date(data.attributes.deathDate), {dateStyle: "medium"})}</p>
                </a>
            </Link>
            <div className={`card bg-base-200 shadow-xl invisible md:visible overflow-hidden ${!detailVisible ? "w-0 h-0 z-0 opacity-0": "opacity-100 z-50 p-4 rounded-xl w-60"} absolute top-1/3 ${tooltipDir ? 'left-1/3' : 'right-1/3'} transition-opacity duration-150 ease-in-out`}>
                <p><b>Province:</b> {data.attributes.province[`name_${locale}`]}</p>
                <p><b>District:</b> {data.attributes.district[`name_${locale}`]}</p>
                {data.attributes.city ? (<p><b>City:</b> {getCity(data.attributes)}</p>) : []}
                <hr className="my-4"/>
                <p><b>Source:</b> {data.attributes.sourceType}</p>
            </div>
        </div>
  );
}

export default Entry;
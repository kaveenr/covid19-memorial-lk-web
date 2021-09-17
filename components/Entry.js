import Link from "next/link"
import { useState } from "react";
import { useIntl, useTranslations } from "use-intl";

const Entry = ({ data }) => {

    const [detailVisible, setDetailVisible] = useState(false);
    const t = useTranslations('entry');
    const intl = useIntl();
    
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

    return (
        <div className="relative" onMouseOver={(e) => (handleHover(e))} onMouseLeave={(e) => (setDetailVisible(false))}>
            <Link href={`/entry/${data.id}`}>
                <a 
                    className={`py-4 flex flex-col items-center relative ${!detailVisible ? "hover:": ""}scale-110 transition-transform duration-700 ease-out`}>
                    <img src="/img/icon.png" className="flex-grow w-full"/>
                    <p className="text-sm font-semibold mt-1">{data.attributes.ageValue}, {t(data.attributes.gender)}</p>
                    <p className="text-sm font-semibold">{t('place', {place: data.attributes.district})}</p>
                    <p className="text-sm">{intl.formatDateTime(new Date(data.attributes.deathDate), {dateStyle: "medium"})}</p>
                </a>
            </Link>
            <div className={`bg-base-200 invisible md:visible overflow-hidden ${!detailVisible ? "w-0 h-0 z-0 opacity-0": "opacity-100 z-50 p-4 rounded-xl w-60"} absolute top-1/3 ${tooltipDir ? 'left-1/3' : 'right-1/3'} transition-opacity duration-150 ease-in-out`}>
                <p><b>Province:</b> {data.attributes.province}</p>
                <p><b>District:</b> {data.attributes.district}</p>
                <p><b>City:</b> {data.attributes.city}</p>
                <hr className="my-4"/>
                <p><b>Source:</b> {data.attributes.sourceType}</p>
            </div>
        </div>
  );
}

export default Entry;
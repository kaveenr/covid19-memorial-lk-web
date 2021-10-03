import Image from "next/image"
import { useIntl, useTranslations } from "use-intl";
import FlowerImg from '../public/img/icon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const Overlay = ({ data, close }) => {

    const t = useTranslations('entry');
    const intl = useIntl();

    const getLink = (i) => {
        return `https://github.com/kaveenr/covid19-memorial-lk-data/blob/data/data/dig_reports/${i.sourceRef}.md`
    }

    return (
        <>
            <div onClick={()=> {close()}}
                className={`fixed top-0 left-0 w-screen h-screen bg-black z-40 opacity-50 overflow-hidden ${!data ? "hidden" : "fixed"}`}/>
            {data ? (
                <div className={`card rounded-none bg-base-200 w-full  md:w-1/2 lg:w-1/3 rounded-t-3xl z-50 fixed bottom-0 left-0 lg:left-36 px-8 pb-6`}>
                    <div className="absolute top-2 right-1">
                        <button className="px-4 py-2" onClick={()=> {close()}}>
                            <FontAwesomeIcon size="lg" icon={faTimes} />
                        </button>
                    </div>
                    <div className={`flex flex-col items-center relative py-4`}>
                        <Image src={FlowerImg} width="150" height="150" loading="lazy" className="flex-grow w-full"/>
                        <p className="text-sm font-semibold mt-1">{data.attributes.ageValue}, {t(data.attributes.gender)}</p>
                        <p className="text-xs font-semibold">{t('place', {place: data.attributes.city})}</p>
                        <p className="text-xs">{intl.formatDateTime(new Date(data.attributes.deathDate), {dateStyle: "medium"})}</p>
                    </div>
                    <p><b>{t('province')}:</b> {data.attributes.province}</p>
                    <p><b>{t('district')}:</b> {data.attributes.district}</p>
                    {data.attributes.city ? (<p><b>{t('city')}:</b> {data.attributes.city}</p>) : []}
                    <p><b>{t('source')}:</b> {t(`source_${data.attributes.sourceType}`)}</p>
                    <div className="mt-4">
                        <a class="btn btn-sm" href={getLink(data.attributes)} target="_blank">{t('gotoSource')}</a> 
                    </div>
                </div>
            ) : []}
        </>
  );
}

export default Overlay;
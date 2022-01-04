import Image from "next/image"
import { useIntl, useTranslations } from "use-intl";
import FlowerImg from '../public/img/icon.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "react-query";
import { useRouter } from "next/dist/client/router";
import { fetchEntry } from "../utils/queries";


const Overlay = ({ id, close }) => {

    if (!id) return []

    const t = useTranslations('entry');
    const { locale } = useRouter();
    const intl = useIntl();
    const { status, data, error, isFetching } = useQuery(['entry', id, locale],
        () => (fetchEntry(id, locale)),
        { keepPreviousData: true, staleTime: 5000 }
    )

    return (
        <>
            <div onClick={() => { close() }}
                className={`fixed top-0 left-0 w-screen h-screen bg-black z-40 opacity-50 overflow-hidden ${!data ? "hidden" : "fixed"}`} />
            <div className={`card rounded-none bg-base-200 w-full  md:w-1/2 lg:w-1/3 rounded-t-3xl z-50 fixed bottom-0 left-0 lg:left-36 px-8 pb-6`}>
                {!isFetching ? (
                    <div>
                        <div className="absolute top-2 right-1">
                            <button className="px-4 py-2" onClick={() => { close() }}>
                                <FontAwesomeIcon size="lg" icon={faTimes} />
                            </button>
                        </div>
                        <div className={`flex flex-col items-center relative py-4`}>
                            {data.data.attributes.detail && data.data.attributes.detail.name ? (<p className=" text-ms font-bold py-4">{data.data.attributes.detail.name}</p>) : []}
                            {data.data.attributes.detail && data.data.attributes.detail.photo ? (<img src={data.data.attributes.detail.photo} className="grayscale w-1/2 p-2" />) :
                                (<Image src={FlowerImg} width="150" height="150" loading="lazy" className="flex-grow w-full" />)}
                            <p className="text-sm font-semibold mt-1">{data.data.attributes.ageValue}, {t(data.data.attributes.gender)}</p>
                            <p className="text-xs font-semibold">{t('place', { place: data.data.attributes.city })}</p>
                            <p className="text-xs">{intl.formatDateTime(new Date(data.data.attributes.deathDate), { dateStyle: "medium" })}</p>
                        </div>
                        {data.data.attributes.detail && data.data.attributes.detail.description ? (
                            <p className="text-center pb-4">{data.data.attributes.detail.description}</p>
                        ) : []}
                        {data.data.attributes.detail && data.data.attributes.detail.occupation ? (
                            <p><b>{t('occupation')}:</b> {data.data.attributes.detail.occupation}</p>
                        ) : []}
                        <p><b>{t('province')}:</b> {data.data.attributes.province}</p>
                        <p><b>{t('district')}:</b> {data.data.attributes.district}</p>
                        {data.data.attributes.city ? (<p><b>{t('city')}:</b> {data.data.attributes.city}</p>) : []}
                        <p><b>{t('source')}:</b> {t(`source_${data.data.attributes.sourceType}`)}</p>
                        {/* <div className="mt-4">
                        <a class="btn btn-sm" href={getLink(data.data.attributes)} target="_blank">{t('gotoSource')}</a> 
                    </div> */}
                    </div>
                ) : (
                    <div className="col-span-full text-center py-8">
                        <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="2x" />
                    </div>
                )}
            </div>
        </>
    );
}

export default Overlay;
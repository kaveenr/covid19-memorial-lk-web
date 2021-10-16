import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/dist/client/router'
import { useTranslations } from 'next-intl'
import Head from 'next/head'

const ThemeSwitcher = () => {
    
    const [isLight, setIsLight] = useState(true);
    useEffect(() => {
        document.getElementById("docHtml").setAttribute("data-theme", isLight ? 'light' : 'dark');
    }, [isLight]);

    const darkModeListener = (event) => {
        setIsLight(!event.matches);
    }

    // useEffect(() => {
    //     if (window.matchMedia('(prefers-color-scheme: dark)').matches){
    //         setIsLight(false);
    //     }
    //     window.matchMedia('(prefers-color-scheme: dark)')
    //         .addEventListener('change', darkModeListener);
    // }, []);

    return (<>
        <FontAwesomeIcon className="w-5 h-5 ml-1 mr-1" icon={faMoon} />
        <input type="checkbox" checked={isLight} className="toggle toggle-sm" onChange={()=>{setIsLight((v) => !v)}}></input>
        <FontAwesomeIcon className="w-5 h-5 ml-1 ml-1" icon={faSun} />
    </>)
}

const NavBar = () => {
    const t = useTranslations('navigation');
    return (
        <ul className="flex flex-col lg:flex-row text-left lg:text-center container mx-auto font-bold">
            <li key={"0"} className="flex-grow py-2 lg:py-3 mr-6" >
                <a className="hover:underline"><Link href="/[slug]" as="/about">{t('about')}</Link></a>
            </li>
            <li key={"1"} className="flex-grow py-2 lg:py-3 mr-6" >
                <a className="hover:underline"><Link href="/[slug]" as="/approach">{t('approach')}</Link></a>
            </li>
            <li key={"2"} className="flex-grow py-2 lg:py-3 mr-6" >
                <a className="hover:underline" href="/submit">{t('submit')}</a>
            </li>
            <li key={"3"} className="flex-grow py-2 lg:py-3 mr-6" >
                <a className="hover:underline"><Link href="/[slug]" as="/contact">{t('contact')}</Link></a>
            </li>
        </ul>
    );
}

const Header = ({ sub }) => {

    const [menuEnabled, setMenu] = useState(false);
    const { locale, asPath } = useRouter();
    const t = useTranslations('header');

    const shareDialog = () => {
        navigator.share({
            title: document.title,
            url: window.location.href
          }).then(() => {
            console.log('Thanks for sharing!');
          }).catch(console.error);
    }

    const nt = useTranslations('navigation');
    const getTitle = () => {

        return sub ? `${t("seoTitle")} - ${nt(sub)}`: t("seoTitle")
    }

    return (<>
        <header className="bg-base-100 sticky top-0 z-30">
            <Head>
                <title>{getTitle()}</title>
                <meta name="title" content={getTitle()} />
                <meta name="description" content={t("seoDisc")}/>

                <meta property="og:type" content="website"/>
                <meta property="og:url" content="http://srilankac19memorial.org/"/>
                <meta property="og:title" content={getTitle()}/>
                <meta property="og:description" content={t("seoDisc")}/>
                <meta property="og:image" content={`http://srilankac19memorial.org/img/share_img.png`}/>

                <meta property="twitter:card" content="summary_large_image"/>
                <meta property="twitter:url" content="http://srilankac19memorial.org/"/>
                <meta property="twitter:title" content={getTitle()}/>
                <meta property="twitter:description" content={t("seoDisc")}/>
                <meta property="twitter:image" content={`http://srilankac19memorial.org/img/share_img.png`}></meta>
            </Head>
            <div className="flex h-full container lg:w-kw mx-auto px-4 py-3 pt-6 lg:pt-8 lg:content-end">
                <div className="flex-grow flex flex-wrap mx-1">
                    <Link href="/">
                        <a>
                            <p className={"text-base"}>{t('title')}</p>
                            <p className={"text-xs md:text-base font-semibold"}>{t('subtitle')}</p>
                        </a>
                    </Link>
                </div>
                <div className="flex-grow-0 flex flex-wrap content-center hidden lg:block">
                    <NavBar/>
                </div>
                <div className="flex-grow-0 flex flex-wrap content-center mr-2">
                    <div className="dropdown dropdown-end mx-1">
                        <div tabIndex="0" className="m-1 btn btn-xs">
                            {locale}
                            <FontAwesomeIcon className="w-3 h-3 ml-1 mt-1" icon={faChevronDown} />
                        </div> 
                        <ul tabIndex="0" className="p-1 shadow menu dropdown-content bg-base-100 rounded-box">
                            <li>
                                <a href={`/si/${asPath}`}>
                                    සිංහල
                                </a>
                            </li> 
                            <li>
                                <a href={`/ta/${asPath}`}>
                                    தமிழ்
                                </a>
                            </li> 
                            <li>
                                <a href={`/en/${asPath}`}>
                                    English
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-grow-0 flex flex-wrap content-center">
                    <button className="mx-1 block lg:hidden" onClick={(ev)=> {ev.preventDefault();setMenu(!menuEnabled)}}>
                        <FontAwesomeIcon className="w-5 h-5" icon={faBars} />
                    </button>
                </div>
                {/* <div className="flex-grow-0 flex-wrap content-center mr-2 hidden lg:flex">
                    <ThemeSwitcher/>
                </div> */}
            </div>
            <nav className={`bg-base-100 px-5 lg:h-0 lg:invisible ${menuEnabled ? '': 'h-0 invisible'}`}>
                <NavBar/>
            </nav>
        </header>
    </>);
}

export default Header;
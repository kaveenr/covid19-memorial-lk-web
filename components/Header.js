import React, { useState } from 'react'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/dist/client/router'

const NavBar = () => (
    <ul className="flex flex-col lg:flex-row text-left lg:text-center container mx-auto font-bold">
        <li key={"1"} className="flex-grow py-2 lg:py-3 mr-6" >
            <Link href="/category/[slug]" as="/category/life"><a className="hover:underline">Methodology</a></Link>
        </li>
        <li key={"2"} className="flex-grow py-2 lg:py-3 mr-6" >
            <Link href="/category/[slug]" as="/category/life"><a className="hover:underline">Submit</a></Link>
        </li>
        <li key={"3"} className="flex-grow py-2 lg:py-3 mr-6" >
            <Link href="/[slug]" as="/about"><a className="hover:underline">About</a></Link>
        </li>
    </ul>
)

const Header = () => {

    const [menuEnabled, setMenu] = useState(false);
    const { locale, asPath } = useRouter();

    const shareDialog = () => {
        navigator.share({
            title: document.title,
            url: window.location.href
          }).then(() => {
            console.log('Thanks for sharing!');
          }).catch(console.error);
    }

    return (<>
        <header className="bg-primary sticky top-0 z-50">
            <div className="flex h-full container lg:w-kw mx-auto px-4 py-3 pt-6 lg:pt-8 lg:content-end">
                <div className="flex-grow flex flex-wrap mx-1">
                    <Link href="/">
                        <a>
                            <p>Sri Lanka</p>
                            <p><b>COVID-19 Memorial</b></p>
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
                                <Link href={asPath} locale="si">
                                    <a>සිංහල</a>
                                </Link>
                            </li> 
                            <li>
                                <Link href={asPath} locale="ta">
                                    <a>தமிழ்</a>
                                </Link>
                            </li> 
                            <li>
                                <Link href={asPath} locale="en">
                                    <a>English</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-grow-0 flex flex-wrap content-center">
                    <a className="mx-1 block lg:hidden" href="#" onClick={(ev)=> {ev.preventDefault();setMenu(!menuEnabled)}}>
                        <FontAwesomeIcon className="w-5 h-5 text-gray-900" icon={faBars} />
                    </a>
                </div>
            </div>
            <nav className={`bg-primary px-5 lg:h-0 lg:invisible ${menuEnabled ? '': 'h-0 invisible'}`}>
                <NavBar/>
            </nav>
        </header>
    </>);
}

export default Header;
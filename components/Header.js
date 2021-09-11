import React, { useState } from 'react'
import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faShareAlt, faRss } from '@fortawesome/free-solid-svg-icons'
import dynamic from 'next/dynamic'

const Header = () => {

    const [menuEnabled, setMenu] = useState(false);

    const shareDialog = () => {
        navigator.share({
            title: document.title,
            url: window.location.href
          }).then(() => {
            console.log('Thanks for sharing!');
          }).catch(console.error);
    }

    return (<>
        <header className="bg-pink-100 sticky top-0 z-50">
            <div className="flex h-full container md:w-kw mx-auto px-4 py-3 ">
                <div className="flex-grow flex flex-wrap mx-1">
                    <Link href="/">
                        <div>
                            <p>Sri Lanka</p>
                            <p><b>COVID-19 Memorial</b></p>
                        </div>
                    </Link>
                </div>
                <div className="flex-grow-0 flex flex-wrap content-center">
                    <a className="mx-1 block md:hidden" href="#" onClick={(ev)=> {ev.preventDefault();setMenu(!menuEnabled)}}>
                        <FontAwesomeIcon className="w-5 h-5 text-gray-900" icon={faBars} />
                    </a>
                </div>
            </div>
            <nav className={`bg-pink-200 px-5 md:h-auto md:visible ${menuEnabled ? '': 'h-0 invisible'}`}>
                <ul className="flex justify-between flex-col sm:flex-row text-left sm:text-center container md:w-kw mx-auto font-bold">
                    <li className="flex-grow py-2" ><Link href="/category/[slug]" as="/category/life">Data Collection</Link></li>
                    <li className="flex-grow py-2" ><Link href="/[slug]" as="/about">About</Link></li>
                    <li className="flex-grow py-2" ><a title="Contact Kaveen" href="/contact">Contact</a></li>
                </ul>
        </nav>
        </header>
    </>);
}

export default dynamic(() => Promise.resolve(Header), {
    ssr: false
})
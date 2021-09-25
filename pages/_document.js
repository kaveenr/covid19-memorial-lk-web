import React,{ useState } from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/constants';

const MyDocument = () => {

    return (
        <Html id="docHtml" className="min-h-screen">
            <Head>
                {/* Global Site Tag (gtag.js) - Google Analytics */}
                <script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}', {
                        page_path: window.location.pathname,
                        });
                    `,
                    }}
                />
            </Head>

            {/* Quick Hack For Forum */}
            <div className={"hidden"}>
                <form name="contact" className="card" method="POST" data-netlify="true">
                    <input type="text" name="name" placeholder="John Doe" className="input"/>
                    <input type="email" name="email" placeholder="john.d@email.com" className="input"/>
                    <textarea className="textarea h-24 textarea-bordered"name="message" placeholder="Written Message"></textarea>
                    <button type="submit" className="btn btn-primary">Submit</button> 
                </form>
            </div>

            <body className="bg-base-100 min-h-screen">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MyDocument;
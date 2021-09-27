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

            <body className="bg-base-100 min-h-screen">
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MyDocument;
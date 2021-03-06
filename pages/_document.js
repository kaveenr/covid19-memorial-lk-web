import React,{ useState } from 'react';
import { Html, Head, Main, NextScript } from 'next/document'

const MyDocument = () => {

    return (
        <Html id="docHtml" className="min-h-screen">
            <Head>
            {/* Google Fonts Noto */}
            <link rel="preconnect" href="https://fonts.googleapis.com"/> 
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Sinhala:wght@400;500&family=Noto+Sans+Tamil:wght@400;500&family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet"/>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
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
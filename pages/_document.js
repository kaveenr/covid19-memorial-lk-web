import React,{ useState } from 'react';
import { Html, Head, Main, NextScript } from 'next/document'
import { GA_TRACKING_ID } from '../utils/constants';

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
                {/* Help Netlify Find Forms */}
                <form name="contact" netlify netlify-honeypot="bot-field" hidden>
                    <input type="text" name="name" />
                    <input type="email" name="email" />
                    <textarea name="message"></textarea>
                </form>
                <form name="submission" netlify netlify-honeypot="bot-field" hidden>
                    <input type="number" name="age" required/>   
                    <input type="text" name="gender" required/>
                    <input type="text" name="location" required/>
                    <input type="date" name="dateOfDeath" required/>
                    <input type="text" name="name" required/>
                    <input type="checkbox" name="displayName" />
                    <input type="checkbox" name="occupation" />
                    <input type="file" name="photoFile" />
                    <textarea name="detailText" />

                    <input type="file" name="proofFile" required/>
                    <input type="text" name="submitterName" required/>
                    <input type="text" name="submitterEmail" required/>
                    <input type="text" name="submitterPhone" />
                </form>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MyDocument;
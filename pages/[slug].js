import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { useTranslations } from 'use-intl';
import { useState } from 'react';
import { useRouter } from 'next/dist/client/router';

const RequiredMark = () => (<span className="font-bold text-red-400 ml-1">*</span>);

const ContactForm = () => {

    const t = useTranslations('contactForm');
    return (
        <div>
            <div className="card shadow-lg w-auto">
                <div className="card-body bg-gray-50">
                    <form name="contact" method="POST" action="/api/forms/contact" enctype="multipart/form-data">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('name')}<RequiredMark/></span>
                            </label> 
                            <input type="text" name="name" placeholder={t('name_placeholder')} className="input" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('email')}<RequiredMark/></span>
                            </label> 
                            <input type="email" name="email" placeholder={t('email_placeholder')} className="input" required/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('message')}<RequiredMark/></span>
                            </label> 
                            <textarea className="textarea h-24 textarea-bordered" name="message" placeholder={t('message_placeholder')} required></textarea>
                        </div>
                        <div className="form-control pt-8">
                            <button type="submit" className="btn">{t('submit')}</button> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

const SubmitForm = () => {
    const t = useTranslations('submitForm');
    const [preDone, setPreDone] = useState(false);

    const formContent = (<>
            <hr/>
            <div className='prose pb-4'>
                <h3>{t('section_details_title')}</h3>
                <p>{t('section_details_text')}</p>
            </div>
            <form name="submission" method="POST" action="/api/forms/submission" enctype="multipart/form-data">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('details_age_label')}<RequiredMark/></span>
                    </label> 
                    <input type="number" name="age" className="input" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('gender_label')}<RequiredMark/></span>
                    </label> 
                    <input type="text" name="gender" className="input" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('location_label')}<RequiredMark/></span>
                    </label> 
                    <input type="text" name="location" className="input" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('dateOfDeath_label')}<RequiredMark/></span>
                    </label> 
                    <input type="date" name="dateOfDeath" className="input" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('name_label')}<RequiredMark/></span>
                    </label> 
                    <input type="text" name="name" className="input" required/>
                </div>
                <div className="form-control pt-2">
                    <label className="label">
                        <span className="label-text">{t('displayName_label')}<RequiredMark/></span>
                        <input type="checkbox" name="displayName" defaultChecked class="checkbox"/>
                    </label> 
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('occupation_label')}</span>
                    </label> 
                    <input type="text" name="occupation" className="input"/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('photoFile_label')}</span>
                    </label> 
                    <input type="file" accept="image/*" name="photoFile" className=""/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('detailText_label')}</span>
                    </label> 
                    <textarea className="textarea h-24 textarea-bordered" name="detailText"></textarea>
                </div>
                <hr/>
                <div className='prose pb-4'>
                    <h3>{t('section_verification_title')}</h3>
                    <p>{t('section_verification_text')}</p>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('proofFile_label')}<RequiredMark/></span>
                    </label> 
                    <input type="file" name="proofFile" accept="image/*,.pdf,.doc,.docx" className="" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('submitterName_label')}<RequiredMark/></span>
                    </label> 
                    <input type="text" name="submitterName" className="input" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('submitterEmail_label')}<RequiredMark/></span>
                    </label> 
                    <input type="email" name="submitterEmail" className="input" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{t('submitterPhone_label')}</span>
                    </label> 
                    <input type="text" name="submitterPhone" className="input"/>
                </div>

                <div className="form-control pt-10">
                    <button type="submit" className="btn">{t('submit')}</button> 
                </div>
            </form>
        </>
    )

    const consentSection = (
        <div>
            <div className='prose'>
                <h3>{t('section_consent_title')}</h3>
                <ul>
                    <li>{t('section_consent_1')}</li>
                    <li>{t('section_consent_2')}</li>
                    <li>{t('section_consent_3')}</li>
                </ul>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">{t('consent_checkbox_label')}<RequiredMark/></span>
                    <input type="checkbox" name="displayName"  class="checkbox" onChange={(e) => {
                        setPreDone(e.target.checked)
                    }}/>
                </label> 
            </div>
        </div>
    )
    return (
        <div>
            <div className="card shadow-lg w-auto">
                <div className="card-body bg-gray-50">
                    {consentSection}
                    {preDone ? formContent : []}
                </div>
            </div>
        </div>
    );
}

const Page = (props) => {

    const { query } = useRouter();

    const components = {Head, ContactForm, SubmitForm};
    console.log(query)
    return (
        <>
            <Header  sub={props.slug}/>
            <main className={"container mx-auto px-6 py-1 pb-6 flex-grow h-full"}>
                {query.success == "true" ? (
                <div class="alert alert-info my-8">
                    <div class="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
                        </svg> 
                        <label>Success</label>
                    </div>
                </div>
                ) : []}
                {query.success == "false" ? (
                <div class="alert alert-error my-8">
                    <div class="flex-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>                          
                        </svg> 
                        <label>Failed, please try again later</label>
                    </div>
                </div>
                ) : []}
                <article className="prose lg:prose-xl mt-3">
                    <MDXRemote {...props.content} components={components}/>
                </article>
            </main>
            <Footer/>
        </>
    );
    
}

export default Page;

export async function getStaticPaths() {

    const data = require("../data/content/index.json");
    const allPages = data.map( entry => {
        return { 
          locale: entry.locale,
          params: {
            slug: entry.slug
          }
        }
    });

    return {
      paths: allPages,
      fallback: false,
    }
}

export async function getStaticProps({locale, params}) {

    const fs = require('fs')
    const source = fs.readFileSync(`data/content/${params.slug}_${locale}.mdx`, {encoding:'utf8', flag:'r'});
    const mdxSource = await serialize(source)
    return {
        props: {
        slug: params.slug, 
        content: mdxSource,
        messages: {
            ...require(`../lang/${locale}.json`),
        },
        }
    };
}
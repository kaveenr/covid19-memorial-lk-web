import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { useTranslations } from 'use-intl';

const ContactForm = () => {

    const t = useTranslations('contactForm');
    return (
        <div>
            <div className="card shadow-lg w-auto">
                <div className="card-body bg-gray-50">
                    <form name="contact" method="POST">
                        <input type="hidden" name="form-name" value="contact" />
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('name')}</span>
                            </label> 
                            <input type="text" name="name" placeholder={t('name_placeholder')} className="input"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('email')}</span>
                            </label> 
                            <input type="email" name="email" placeholder={t('email_placeholder')} className="input"/>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{t('message')}</span>
                            </label> 
                            <textarea className="textarea h-24 textarea-bordered" name="message" placeholder={t('message_placeholder')}></textarea>
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

const Page = (props) => {

    const components = {Head, ContactForm};
    return (
        <>
            <Header  sub={props.slug}/>
            <main className={"container mx-auto px-6 py-1 pb-6 flex-grow h-full"}>
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
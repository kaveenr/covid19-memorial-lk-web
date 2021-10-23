import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { useTranslations } from 'use-intl';
import { useRouter } from 'next/dist/client/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import ContactForm from '../components/forms/ContactForm';
import SubmissionForm from '../components/forms/SubmissionForm';

const Page = (props) => {

    const { query } = useRouter();
    const t = useTranslations('formSubmissionSuccess');

    const components = {Head, ContactForm, SubmissionForm};
    return (
        <>
            <Header  sub={props.slug}/>
            <main className={"container mx-auto px-6 py-1 pb-6 flex-grow h-full"}>
                {query.success == "true" ? (
                <div class="alert alert-info my-8">
                    <div class="flex-1">
                        <FontAwesomeIcon icon={faInfoCircle} size="1x" className='mr-2' />
                        <label>{t('completed', {ref: query.requestId})}</label>
                    </div>
                </div>
                ) : []}
                {query.success == "false" ? (
                <div class="alert alert-error my-8">
                    <div class="flex-1">
                        <FontAwesomeIcon icon={faInfoCircle} size="lg" className='mr-2' />
                        <label>{t('failed')}</label>
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
            }
        }
    };
}
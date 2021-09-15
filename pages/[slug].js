import Head from 'next/head';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'

const Page = (props) => {

    const components = {Head};
    return (
        <>
            <Header />
            <main className={"md:container mx-auto px-4 py-1"}>
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
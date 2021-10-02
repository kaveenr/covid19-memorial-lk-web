import { last } from 'lodash';
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Entry from '../components/Entry';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { fetchEntries } from '../utils/queries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useIntl, useTranslations } from 'use-intl';
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import Filter from '../components/Filter';
import { useRouter } from 'next/dist/client/router';
import Overlay from '../components/Overlay';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Home(props) {

  const queryClient = useQueryClient()
  const { locale } = useRouter();
  const t = useTranslations('home');
  const intl = useIntl();

  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState(null);
  const [selected, setSelected] = useState(null);
  const [hasNext, setHasNext] = useState(true);

  // Fetch Entries, on initial offset use rendered dataset.
  const { status, data, error, isFetching } = useQuery(['entries', offset, filter, locale],
    () => (fetchEntries(offset, filter, locale)),
    { keepPreviousData: true, staleTime: 5000 }
  )

  // On data fetch changes
  useEffect(() => {
    if (status == "success") {
      // Append Items On Successful Fetch
      // If Offset is zero then don't append!
      setItems((items) => (offset == 0 ? [...data.data] : [...items, ...data.data]));
      // If Next Link Available, then pre-fetch.
      if (data.links.next){
        setHasNext(true);
        queryClient.prefetchQuery(['entries', offset + 1, filter, locale], () => fetchEntries(offset + 1, filter, locale));
      } else {
        setHasNext(false);
      }
    }
  }, [status, data]);

  // On Filter Change Empty Items
  useEffect(() => {
    if (filter) {
      setOffset(0);
    }
  }, [filter])

  return (
    <>
      <Header />
      <main className={"md:container min-h-screen mx-auto px-4 py-1 mb-4 relative"}>
        <div className="bg-base-300 rounded-xl my-1 lg:my-4">
          <div className="card">
            <div className="card-body text-sm md:text-base">
              <div className={"prose prose-sm max-w-none"}>
                <MDXRemote {...props.indexText} scope={{
                  total: intl.formatNumber(props.cumDeaths),
                  count: intl.formatNumber(props.count)
                }}/>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-1">
          <Filter setFilter={(f) => {setFilter(f)}}/>
        </div>
        <Overlay data={selected} close={()=>{setSelected(null)}}/>
        <InfiniteScroll
            dataLength={items.length}
            className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10 gap-2"
            next={()=> {setOffset((offset) => (offset + 1))}}
            hasMore={hasNext}
            loader={
              <div className="text-center text-xl font-semibold p-4 col-span-full">
                <FontAwesomeIcon className="animate-spin" icon={faSpinner} size="2x" />
                <p>{t('loading')}</p>
              </div>
            }
            endMessage={
              <div className="text-center text-lg font-semibold pt-2 pb-4 col-span-full">
                <div class="divider">{items.length == 0 ? t('noResults') : t('endOfResults')}</div> 
              </div>
            }
          >
            {items.map((i) => (<Entry key={i.id} data={i} onClick={() => {setSelected(i)}}/>))}
        </InfiniteScroll>
      </main>
      <Footer/>
    </>
  )
}

export async function getStaticProps({locale}) {
  const rawData = require('../data/latest.json');
  const keyData = require('../data/keys_latest.json');
  // Load Intro Text
  const fs = require('fs')
  const source = fs.readFileSync(`data/content/index_${locale}.mdx`, {encoding:'utf8', flag:'r'});
  const mdxSource = await serialize(source)
  return {
    props: {
      count: rawData.length,
      cumDeaths: last(keyData).cumDeaths,
      indexText: mdxSource,
      messages: {
        ...require(`../lang/${locale}.json`),
      },
    }
  };
}
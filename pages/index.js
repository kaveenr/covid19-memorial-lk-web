import { slice } from 'lodash';
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { intersectHook } from '../utils/hooks';
import { fetchEntries } from '../utils/queries';

export default function Home(props) {

  const queryClient = useQueryClient()
  const loader = useRef(null);
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(0);

  // Fetch Entries, on initial offset use rendered dataset.
  const { status, data, error, isFetching } = useQuery(['entries', offset],
    () => (offset == 0 ? props.data: fetchEntries(offset)),
    { keepPreviousData: true, staleTime: 5000 }
  )

  // On data fetch changes
  useEffect(() => {

    if (status == "success") {
      // Append Items On Successful Fetch
      setItems((items) => [...items, ...data.data]);
      // If Next Link Available, then pre-fetch.
      if (data.links.next){
        queryClient.prefetchQuery(['entries', offset + 1], () => fetchEntries(offset + 1));
      }
    }
  }, [status, data]);

  // When user is near intersecting end.
  intersectHook(()=> {
    setOffset((offset) => (offset + 1));
  }, "40%", loader);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap justify-center">
        {items.map((i) => (<div key={i.id}>
          <p className="text-8xl p-2 flex-1 text-center">🌸</p>
          <p className="text-sm text-center font-semibold">{i.attributes.ageValue} year {i.attributes.gender}</p>
          <p className="text-sm text-center">{i.attributes.district}</p>
        </div>))}
        <div key="loader" ref={loader} className="text-center text-lg font-semibold">
          {isFetching? (<p>Loading...</p>) : []}
        </div>
      </main>
    </div>
  )
}

export function getStaticProps({locale}) {
  return {
    props: {
      // Preload initial data 
      data: {
        data: slice(require('../data/latest.json'),0,100),
        links: {
          next: '/api/entries?offset=1'
        }
      },
      messages: {
        ...require(`../lang/${locale}.json`),
      },
    }
  };
}
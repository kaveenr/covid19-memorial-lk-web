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
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-sm font-semibold mb-1">{props.count} Lorem ipsum dolor sit amet.</p>
          <p className="text-sm">Vivamus finibus, tortor in facilisis tempus, velit urna efficitur risus, id sodales ligula est eget lorem.</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 xl:grid-cols-10 gap-4">
          {items.map((i) => (<div key={i.id} className="py-4 flex flex-col items-center">
            <img src="/img/placeholder-flower.jpg" className="flex-grow w-full"/>
            <p className="text-sm font-semibold">{i.attributes.ageValue} year {i.attributes.gender}</p>
            <p className="text-sm">{i.attributes.district}</p>
          </div>))}
        </div>
      </main>
      <div key="loader" ref={loader} className="text-center text-lg font-semibold">
          {isFetching? (<p>Loading...</p>) : []}
        </div>
    </>
  )
}

export function getStaticProps({locale}) {
  const rawData = require('../data/latest.json');
  return {
    props: {
      // Preload initial data 
      data: {
        data: slice(rawData,0,100),
        links: {
          next: '/api/entries?offset=1'
        }
      },
      count: rawData.length,
      messages: {
        ...require(`../lang/${locale}.json`),
      },
    }
  };
}
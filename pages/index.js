import { slice } from 'lodash';
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import Entry from '../components/Entry';
import Footer from '../components/Footer';
import Header from '../components/Header';
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
        <title>COVID-19 Memorial</title>
      </Head>

      <Header />
      <main className={"md:container mx-auto px-4 py-1"}>
        <div className="bg-white rounded-xl my-1 lg:my-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title">{props.count} Lorem ipsum dolor sit amet.</h2> 
              <p>Rerum reiciendis beatae tenetur excepturi aut pariatur est eos.</p> 
              {/* <div className="card-actions">
                <button className="btn btn-primary">More info</button>
              </div> */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-10 xl:grid-cols-10 gap-4">
          {items.map((i) => (<Entry key={i.id} data={i}/>))}
        </div>
      </main>
      <div key="loader" ref={loader} className="text-center text-lg font-semibold">
          {isFetching? (<p>Loading...</p>) : []}
      </div>
      <Footer/>
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
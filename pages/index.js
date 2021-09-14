import { slice } from 'lodash';
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import { intersectHook } from '../utils/hooks';

export default function Home(props) {

  let [items, setItems] = useState(props.data);
  const loader = useRef(null);

  intersectHook(()=> {
    setTimeout(() => {
      setItems((curItems) => [...curItems, ...curItems]);
    }, 500);
  }, "40%", loader);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap justify-center">
        {items.map((i) => (<div key={i.indexKey}>
          <p className="text-8xl p-2 flex-1 text-center">🌸</p>
          <p className="text-sm text-center font-semibold">{i.ageValue} year {i.gender}</p>
          <p className="text-sm text-center">{i.district}</p>
        </div>))}
        <div ref={loader}></div>
      </main>
    </div>
  )
}

export function getStaticProps({locale}) {
  return {
    props: {
      data: slice(require('../data/latest.json'),0,100),
      messages: {
        ...require(`../lang/${locale}.json`),
      },
    }
  };
}
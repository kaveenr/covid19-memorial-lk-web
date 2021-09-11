import Head from 'next/head'

export default function Home(props) {

  const items = props.data;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap justify-center ">
        {items.map((i) => (<div>
          <p className="text-8xl p-2 flex-1 text-center">🌸</p>
          <p className="text-sm text-center font-semibold">{i.ageValue} year {i.gender}</p>
          <p className="text-sm text-center">{i.district}</p>
        </div>))}
      </main>
    </div>
  )
}

export function getStaticProps({locale}) {
  return {
    props: {
      data: require('../data/latest.json'),
      messages: {
        ...require(`../lang/${locale}.json`),
      },
    }
  };
}
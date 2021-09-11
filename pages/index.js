import Head from 'next/head'

export default function Home() {

  const items = [];
  for (let i = 0; i < 100; i++) {
    items.push(i);
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-wrap justify-center ">
        {items.map((i) => (<div>
          <p className="text-8xl p-2 flex-1 text-center">🌸</p>
          <p className="text-sm text-center">{i} person</p>
        </div>))}
      </main>
    </div>
  )
}

export function getStaticProps({locale}) {
  return {
    props: {
      messages: {
        ...require(`../lang/${locale}.json`),
      },
    }
  };
}
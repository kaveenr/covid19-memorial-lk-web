import 'tailwindcss/tailwind.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className={"md:container mx-auto px-4 py-1 h-screen"}>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp

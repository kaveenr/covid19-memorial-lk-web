import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className={"md:container mx-auto px-4 py-1 h-screen"}>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp

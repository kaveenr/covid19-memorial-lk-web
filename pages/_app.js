import { QueryClient, QueryClientProvider } from 'react-query'
import 'tailwindcss/tailwind.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient()
  return (
    <>
      <Header />
      <div className={"md:container mx-auto px-4 py-1 h-screen"}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </div>
    </>
  )
}

export default MyApp

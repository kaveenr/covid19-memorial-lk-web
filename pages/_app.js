import { QueryClient, QueryClientProvider } from 'react-query'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient()
  return (
    <div className="bg-primary min-h-screen">
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  )
}

export default MyApp

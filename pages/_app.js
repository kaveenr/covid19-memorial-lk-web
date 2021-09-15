import { QueryClient, QueryClientProvider } from 'react-query'
import { NextIntlProvider } from 'next-intl';
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient()
  return (
    <div className="bg-primary min-h-screen">
      <NextIntlProvider
        formats={{
          dateTime: {
            short: {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }
          }
        }}
        messages={pageProps.messages}
        now={new Date(pageProps.now)}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </NextIntlProvider>
    </div>
  )
}

export default MyApp

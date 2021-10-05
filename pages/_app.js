import { QueryClient, QueryClientProvider } from 'react-query'
import { NextIntlProvider } from 'next-intl';
import 'tailwindcss/tailwind.css'
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { pageview } from '../utils/gtag';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {

  const queryClient = new QueryClient();
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events]);

  return (
    <div className="min-h-screen flex flex-col ">
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
            <ErrorBoundary>
              <Component {...pageProps} />
            </ErrorBoundary>
        </QueryClientProvider>
      </NextIntlProvider>
    </div>
  )
}

export default MyApp

import Head from 'next/head'
import { NextSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

import Layout from '../components/Layout'
import AuthProvider from '../utils/Contexts/Auth'
import AlertProvider from '../utils/Contexts/Alert'

import { OPEN_GRAPH, SITE_DATA } from '../config/seo'
import theme from '../config/theme'

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NextSeo
        title={SITE_DATA.title}
        description={SITE_DATA.description}
        openGraph={OPEN_GRAPH}
      />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link rel="icon" href="/icon.png" />
      </Head>
      <AuthProvider>
        <AlertProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AlertProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

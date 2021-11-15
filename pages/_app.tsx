import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { NextSeo } from 'next-seo'

import theme from '../config/theme'

import Header from '../components/Layout/Header'
import Menu from '../components/Layout/Menu'
import Main from '../components/Layout/Main'

import AuthProvider from '../utils/Contexts/Auth'

import { OPEN_GRAPH, SITE_DATA } from '../config/seo'
import AlertProvider from '../utils/Contexts/Alert'

export default function App({ Component, pageProps }) {
  return (
    <>
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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AlertProvider>
            <Header />
            <Menu />
            <Main>
              <Component {...pageProps} />
            </Main>
          </AlertProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  )
}

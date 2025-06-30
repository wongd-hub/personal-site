import React from 'react';
import '../styles/globals.scss'
import '@fontsource/space-mono';
import '@fontsource-variable/space-grotesk';
import {DefaultSeo} from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
          title="Darren Wong"
          description="Darren Wong's portfolio"
          openGraph={{
              type: 'website',
              locale: 'en_IE',
              url: 'https://www.darrenwong.id.au/',
              siteName: "Darren Wong's portfolio",
          }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

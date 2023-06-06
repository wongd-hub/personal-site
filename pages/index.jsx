import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Landing from '../components/Landing';
import RippleScene from '../components/threejs/LandingScene';

export default function Home() {
  return (
    <div className={`${styles.container}`}>
      <Head>
        <title>Darren Wong</title>
        <meta name="description" content="Darren Wong's portfolio" />
        <link rel="icon" href="/assets/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/assets/favicon/site.webmanifest" />
      </Head>

      <div className="grain-filter"/>
      <RippleScene
        which="particle"
        style={{
          height: '100vh', width: '100vw', position: 'fixed', zIndex: -10,
        }}
      />
      <Landing />

      <main id="main"        
        style={{
          height: '100vh', width: '100vw', position: 'relative', zIndex: -5,
        }}
      >
        howdy
      </main>

    </div>
  );
}

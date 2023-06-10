import React from 'react';
import Head from 'next/head';
import Landing from '../components/Landing';
import Content from '../components/Content';
import RippleScene from '../components/threejs/LandingScene';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
    gsap.fromTo(
      '#content',
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: '.landing-container',
          start: "95% top", // when the top of the trigger hits 95% of the viewport
          end: "bottom top", // when the bottom of the trigger hits the top of the viewport
          scrub: false,
          markers: true,
          toggleActions: "play none none reverse"
    }});
  }, [])

  return (
    <div className="container">
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

      <main id="content">
        <Content />
      </main>

      {/* This is here to allow scroll-down */}
      {/* <div id="main"/> */}

    </div>
  );
}

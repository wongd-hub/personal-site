import React from "react";
import DownArrow from "./assets/DownArrow";
import DiagonalArrow from "./assets/DiagonalArrow";
// import Link from "next/link";
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import SVGText from "./assets/SVGText";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Landing() {

  // Create references to drive GSAP animations
  const titleRef = useRef(null);
  const roleRef = useRef([]);
  const downArrowRef = useRef(null);

  const highlightedRoles = [
    {
      text: "blogger",
      href: "https://www.herdmentality.xyz/authors/darrenwong",
    },
    {
      text: "data analyst",
      // TODO: Not sure what else to link, maybe when timeline is complete, 
      // make this scroll down to the data science part. Could do a short 
      // sentence, then a summary, then maybe 3 boxes, one for each role here
      // TODO: maybe just do this for aspiring web dev too
      // Maybe turn the arrows down to bottom right to signify going down as well
      href: "https://github.com/wongd-hub?tab=repositories",
    },
    {
      text: "aspiring web dev",
      href: "https://www.mathkata.app/",
    },
  ]

  const scrollToMain = () => {
    gsap.to(window, {duration: 1.3, scrollTo: "#main"});
  };

  // Handling down arrow:
  //  - Fade out when the user gets 20% of the way down the first page,
  //     they clearly know that you can scroll down now
  //  - Fade back in when you get to 10% of the first page.
  //  - Have the down arrow bounce every once in a while
  useEffect(() => {

    const handleDownArrow = () => {
      const hideThreshold = 0.01;
      const hidePosition = window.innerHeight * hideThreshold;
      const revealPosition = window.innerHeight * hideThreshold;

      if (window.scrollY > hidePosition) {
        gsap.to(downArrowRef.current, { autoAlpha: 0, duration: 0.2 });
      } else if (window.scrollY < revealPosition) {
        gsap.to(downArrowRef.current, { autoAlpha: 1, duration: 0.5 });
      }
    };

    window.addEventListener('scroll', handleDownArrow);

    const bounceTimeline = gsap.timeline({delay: 3, repeat: 3, repeatDelay: 10});

    bounceTimeline
      .to(downArrowRef.current, {
        y: "-25px",
        duration: 1.2,
        yoyo: true,
        yoyoEase: "elastic.out(1.5, 0.3)",
      })
      .to(downArrowRef.current, {
        y: "0px",
        duration: 0.5,
        ease: "power2.out",
      });

    return () => {
      window.removeEventListener('scroll', handleDownArrow);
    };

  }, []);

  // Animate in landing elements
  useEffect(() => {

    // Animate title
    gsap.fromTo(
      titleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 0, ease: "power1.inOut" }
    );

    // Animate roles with stagger
    gsap.fromTo(
      roleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, delay: 2, stagger: 0.8 , ease: "power1.inOut"}
    );

    // Animate DownArrow
    gsap.fromTo(
      downArrowRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 5, ease: "power1.inOut" }
    );

    // Define animation functions for on-hover/focus
    const onInteraction = (el) => {
      gsap.to(el, { x: "-7px", opacity: 0.7, duration: 0.2, ease: "power1.inOut" });
    };

    const afterInteraction = (el) => {
      gsap.to(el, { x: "0px", opacity: 1, duration: 0.2, ease: "power1.inOut" });
    };

    // Assigning animation to each landing link
    roleRef.current.forEach((el, i) => {
      if (el) { // Check if the element exists
        el.addEventListener("mouseover", () => onInteraction(el));
        el.addEventListener("mouseout", () => afterInteraction(el));

        el.addEventListener("focus", () => onInteraction(el));
        el.addEventListener("blur", () => afterInteraction(el));
      }
    });

  }, []);

  // TODO: Update size of SVG text when screen is smaller
  return (
    <div className="landing-container" id="landing">
      <div className="title-container">
          <h1
            className="title-text gradient-text noselect"
            role="heading"
            aria-level="1"
            ref={titleRef}
          >
            Darren<br/>Wong
          </h1>
          <div className="noselect landing-link-container">
            {highlightedRoles.map((el, i) => (
              <div
                key={el.href}
                ref={el => roleRef.current[i] = el}
              >
                <a target="_blank" href={el.href} rel="noopener noreferrer">
                  <div className="landing-links">
                    <SVGText>{el.text}</SVGText>&nbsp;
                    <DiagonalArrow width={13} height={13}/>
                  </div>
                </a>
              </div>
            ))}
          </div>
      </div>
      <div className="arrow-down noselect gradient-text" ref={downArrowRef} onClick={scrollToMain}>
        <div><div>Scroll down!</div></div>
        <div ref={downArrowRef}><DownArrow width={60} height={60}/>
        </div>
      </div>
    </div>
  );
}

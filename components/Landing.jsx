import React from "react";
import DownArrow from "./assets/DownArrow";
import DiagonalArrow from "./assets/DiagonalArrow";
import Link from "next/link";
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import SVGText from "./assets/SVGText";

export default function Landing() {

  // Create references to drive GSAP animations
  const titleRef = useRef(null);
  const roleRef = useRef([]);
  const downArrowRef = useRef(null);

  const highlightedRoles = [
    {
      text: "data analyst",
      href: "github.com1",
    },    
    {
      text: "blogger",
      href: "github.com2",
    },
    {
      text: "aspiring web dev",
      href: "github.com3",
    },
  ]

  useEffect(() => {

    // Animate title
    gsap.fromTo(
      titleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 0 }
    );

    // Animate roles with stagger
    gsap.fromTo(
      roleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 3, stagger: 0.8 }
    );

    // Animate DownArrow
    gsap.fromTo(
      downArrowRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 5 }
    );

  }, []);

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
          <h2 className="noselect">
            {highlightedRoles.map((el, i) => (
              <div
                key={el.href}
                ref={el => roleRef.current[i] = el}
              >
                <Link href={el.href}>
                  <div className="landing-links">
                    {/* Needs to be gradient text if we want fade-in anims to work. Not compatible with CSS hack for some reason (although other pieces are) */}
                    <SVGText ref={downArrowRef}>{el.text}</SVGText>&nbsp;
                    <DiagonalArrow width={13} height={13}/>
                  </div>
                </Link>
              </div>
            ))}
            
          </h2>
      </div>
      <div className="arrow-down noselect gradient-text" ref={downArrowRef}>
        {/* Get this to fade in last and maybe bounce every 10 seconds */}
        <div ref={downArrowRef}><div>Scroll down!</div></div>
        <div ref={downArrowRef}><DownArrow width={80} height={80}/>
        </div>
      </div>
    </div>
  );
}

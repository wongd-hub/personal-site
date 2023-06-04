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
      href: "https://www.herdmentality.xyz/authors/darrenwong",
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
      { opacity: 1, duration: 3.5, delay: 0, ease: "power1.inOut" }
    );

    // Animate roles with stagger
    gsap.fromTo(
      roleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8, delay: 2, stagger: 0.6 , ease: "power1.inOut"}
    );

    // Animate DownArrow
    gsap.fromTo(
      downArrowRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 5, ease: "power1.inOut" }
    );

    // Assigning hover animation to each landing link
    roleRef.current.forEach((el, i) => {
      if (el) { // Check if the element exists
        el.addEventListener("mouseover", () => {
          gsap.to(el, { x: "-7px", opacity: 0.7, duration: 0.2, ease: "power1.inOut" });
        });

        el.addEventListener("mouseout", () => {
          gsap.to(el, { x: "0px", opacity: 1, duration: 0.2, ease: "power1.inOut" });
        });
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
                <Link href={el.href}>
                  <div className="landing-links">
                    <SVGText ref={downArrowRef}>{el.text}</SVGText>&nbsp;
                    <DiagonalArrow width={13} height={13}/>
                  </div>
                </Link>
              </div>
            ))}
          </div>
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

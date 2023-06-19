import React from "react";
import DownArrow from "./assets/DownArrow";
import { useEffect, useRef, useState } from 'react';
import SVGText from "./assets/SVGText";
import Socials from "./socials/Socials";
import { SocialHoverContext } from "./contexts/SocialHoverContext";
import { gsap } from 'gsap';
import JustBlackjack from '../components/JustBlackjack'

export default function Landing() {

  // Create references to drive GSAP animations
  const titleRef = useRef(null);
  const roleRef = useRef([]);
  const socialsRef = useRef(null);

  // Define list of roles to display
  const roleList = [
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
      text: "web dev",
      href: "https://www.mathkata.app/",
    },
  ]

  // Use shared context to tell role titles to be highlighted when 
  // social icons are highlighted
  const [highlightedWord, setHighlightedWord] = useState(null);

  // Handle the highlighting of the roles when socials are hovered over
  const highlightedCases = (highlighted) => {
    const rolesToHighlight = (highlighted) => {
      switch(highlighted) {
        case 'herd-mentality':
            return ['blogger', 'data analyst', 'web dev'];
        case 'github':
            return ['data analyst', 'web dev'];
        case 'linkedin':
            return ['data analyst'];
        case 'email':
          return ['blogger', 'data analyst', 'web dev'];
        default:
            return [];
      }
    }

    // Provide an animation to each of the roles that are highlighted. 
    roleRef.current.forEach((el, i) => {
      if (el && rolesToHighlight(highlighted).includes(roleList[i].text)) {
          gsap.to(el, { x: "-7px", opacity: 1, duration: 0.2, ease: "power1.inOut" });
      } else {
          gsap.to(el, { x: "0px", opacity: 1, duration: 0.2, ease: "power1.inOut" });
      }
    });

    return rolesToHighlight(highlighted);
  };

  // Animate in landing elements
  useEffect(() => {

    // Animate title
    gsap.fromTo(
      titleRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 0, ease: "power1.inOut" }
    );

    // Initially disable pointer events on roles
    gsap.set(socialsRef.current, { pointerEvents: "none" });

    // Animate socials
    gsap.fromTo(
      socialsRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 3, delay: 0, ease: "power1.inOut" },
    );

    // Animate roles with stagger
    gsap.fromTo(
      roleRef.current, 
      { opacity: 0 }, 
      { 
        opacity: 1, duration: 0.8, 
        delay: 2, stagger: 0.8 , 
        ease: "power1.inOut",
        onComplete: function() {
          gsap.set(socialsRef.current, { pointerEvents: "auto" })
        }
      }
    );

  }, []);

  // Will run every time highlightedWord changes so that on-hover and 
  // on-leave animations update correctly. Must initialise highlightedWord as
  // null so that when the site first loads, this doesn't interfere with the 
  // sequential fade-in. Otherwise this would run on first mount and cause issues.
  useEffect(() => {
    // Add this check to prevent initial run
    if (highlightedWord !== null) { 
      highlightedCases(highlightedWord);
    }
  }, [highlightedWord]);

  return (
    <div className="landing-container" id="landing">
      <div className="title-container">
        <div className="title-contents">
          <h1
            className="title-text gradient-text noselect cotton-candy-gr"
            role="heading"
            aria-level="1"
            ref={titleRef}
          >
            Darren<br/>Wong
          </h1>
          <SocialHoverContext.Provider value={{ highlightedWord, setHighlightedWord }}>
            <div className="noselect landing-link-container">
              <div className="socials-container" ref={socialsRef}><Socials /></div>
              <div className="role-links">
                {roleList.map((el, i) => (
                  <div
                    key={el.href}
                    ref={el => roleRef.current[i] = el}
                    className={
                      highlightedCases(highlightedWord)?.includes(el.text) 
                        ? 'highlighted' 
                        : ''
                    }
                  >
                    <div className="landing-roles">
                      <SVGText
                        gradientType={
                          highlightedCases(highlightedWord)?.includes(el.text) 
                            ? 'hyper' 
                            : 'cottonCandy'
                        }
                      >
                        {el.text}
                      </SVGText>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SocialHoverContext.Provider>
        </div>
        <DownArrow />
        <JustBlackjack />
      </div>
      
    </div>
  )
}

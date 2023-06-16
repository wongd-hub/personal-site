import React from "react";
import DownArrow from "./assets/DownArrow";
import { useEffect, useRef, useState } from 'react';
import SVGText from "./assets/SVGText";
import Socials from "./socials/Socials";
import { SocialHoverContext } from "./contexts/SocialHoverContext";
import JustBlackjackLogo from '../components/assets/JustBlackjackLogo';
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export default function Landing() {

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
      text: "aspiring web dev",
      href: "https://www.mathkata.app/",
    },
  ]

  // Function to scroll to content upon down arrow click
  const scrollToMain = () => {
    gsap.to(window, { duration: 1.3, scrollTo: "#content", ease: "power1.inOut" });
  };

  // Create references to drive GSAP animations
  const titleRef = useRef(null);
  const roleRef = useRef([]);
  const socialsRef = useRef(null);
  const downArrowRef = useRef(null);
  const jBButtonRef = useRef(null);

  // Use shared context to tell role titles to be highlighted when 
  // social icons are highlighted
  const [highlightedWord, setHighlightedWord] = useState(null);

  // Handle the highlighting of the roles when socials are hovered over
  const highlightedCases = (highlighted) => {
    const rolesToHighlight = (highlighted) => {
      switch(highlighted) {
        case 'herd-mentality':
            return ['blogger', 'data analyst', 'aspiring web dev'];
        case 'github':
            return ['data analyst', 'aspiring web dev'];
        case 'linkedin':
            return ['data analyst'];
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

    // Initially disable pointer events on roles
    gsap.set(downArrowRef.current, { pointerEvents: "none" });

    // Animate DownArrow
    gsap.fromTo(
      downArrowRef.current, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 3, 
        delay: 5, 
        ease: "power1.inOut",
        onComplete: function() {
          gsap.set(downArrowRef.current, { pointerEvents: "auto" })
        } 
      }
    );

    // Initially disable pointer events on roles
    gsap.set(jBButtonRef.current, { pointerEvents: "none" });

    // Animate justBlackjack button
    gsap.fromTo(
      jBButtonRef.current, 
      { opacity: 0 }, 
      { 
        opacity: 1, 
        duration: 3, 
        delay: 5, 
        ease: "power1.inOut",
        onComplete: function() {
          gsap.set(jBButtonRef.current, { pointerEvents: "auto" })
        } 
      }
    );

    // Define animation functions for on-hover/focus for justBlackjack button
    const onInteraction = (el) => {
      gsap.to(el, { opacity: 0.7, duration: 0.2, ease: "sine.inOut" });
    };

    const afterInteraction = (el) => {
      gsap.to(el, { opacity: 1, duration: 0.2, ease: "sine.inOut" });
    };

    // Assigning animations to the justBlackjack button
    if (jBButtonRef.current) {

      jBButtonRef.current.addEventListener("mouseover", () => onInteraction(jBButtonRef.current));
      jBButtonRef.current.addEventListener("mouseout", () => afterInteraction(jBButtonRef.current));

    }

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

  // Handling down arrow animations
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

  return (
    <div className="landing-container" id="landing">
      <div className="title-container">
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
      <div 
        className="arrow-down noselect gradient-text cotton-candy-gr" 
        ref={downArrowRef} 
        onClick={scrollToMain}
      >
        <div>Scroll down!</div>
        <div ref={downArrowRef}><DownArrow width={60} height={60}/></div>
      </div>
      <div className="justblackjack-button" ref={jBButtonRef}>
          <JustBlackjackLogo />
        </div>
    </div>
  )
}

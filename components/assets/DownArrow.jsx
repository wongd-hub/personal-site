import React, { useEffect, useRef, useState } from 'react';
import SVGGradient from './SVGGradient';
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

function DownArrow(props) {

  const [ArrowSize, setArrowSize] = useState(0);
  const downArrowRef = useRef(null);

  // Function to scroll to content upon down arrow click
  const scrollToMain = () => {
    gsap.to(window, { duration: 1.3, scrollTo: "#content", ease: "power1.inOut" });
  };

  // Animate fade-in of down arrow
  useEffect(() => {

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

  }, [])

  // Reactivity
  useEffect(() => {

    const updateArrowSize = () => {
        const arrowSize = window.innerWidth < 850 ? 35 : 60;
        setArrowSize(arrowSize);
    }

    // Call once to set initial measurements
    updateArrowSize();

    // Listen to window resize event
    window.addEventListener('resize', updateArrowSize);

    // Clean up event listener on unmount
    return () => {
        window.removeEventListener('resize', updateArrowSize);
    }

  }, [])

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
    <div 
      className="arrow-down noselect gradient-text cotton-candy-gr" 
      ref={downArrowRef} 
      onClick={scrollToMain}
    >
      <div>Scroll down!</div>
      <div ref={downArrowRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // xmlSpace="preserve"
          fill="#fff"
          stroke="#fff"
          viewBox="0 0 1024 1024"
          width={ArrowSize} 
          height={ArrowSize}
          {...props}
        >
          <defs>
            <SVGGradient id="downArrow"/>
          </defs>
          <path
            d="M903.232 256 960 306.432 512 768 64 306.432 120.768 256 512 659.072z"
            fill="url(#downArrow)"
            stroke="url(#downArrow)"
          />
        </svg>
      </div>
    </div>
  );
}

export default DownArrow;

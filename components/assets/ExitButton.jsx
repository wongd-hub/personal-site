import React, { useEffect, useRef, useState } from 'react';
import SVGGradient from './SVGGradient';
// import { gsap } from 'gsap';
// import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";

// gsap.registerPlugin(ScrollToPlugin);

function ExitButton(props) {

  const [ButtonSize, setButtonSize] = useState(20);
  const buttonRef = useRef(null);

//   // Function to scroll to content upon down arrow click
//   const scrollToMain = () => {
//     gsap.to(window, { duration: 1.3, scrollTo: "#content", ease: "power1.inOut" });
//   };

//   // Animate fade-in of down arrow
//   useEffect(() => {

//     // Initially disable pointer events on roles
//     gsap.set(downArrowRef.current, { pointerEvents: "none" });

//     // Animate DownArrow
//     gsap.fromTo(
//       downArrowRef.current, 
//       { opacity: 0 }, 
//       { 
//         opacity: 1, 
//         duration: 3, 
//         delay: 5, 
//         ease: "power1.inOut",
//         onComplete: function() {
//           gsap.set(downArrowRef.current, { pointerEvents: "auto" })
//         } 
//       }
//     );

//   }, [])

//   // Reactivity
//   useEffect(() => {

//     const updateArrowSize = () => {
//         const arrowSize = window.innerWidth < 850 ? 35 : 60;
//         setArrowSize(arrowSize);
//     }

//     // Call once to set initial measurements
//     updateArrowSize();

//     // Listen to window resize event
//     window.addEventListener('resize', updateArrowSize);

//     // Clean up event listener on unmount
//     return () => {
//         window.removeEventListener('resize', updateArrowSize);
//     }

//   }, [])

//   // Handling down arrow animations
//   //  - Fade out when the user gets 20% of the way down the first page,
//   //     they clearly know that you can scroll down now
//   //  - Fade back in when you get to 10% of the first page.
//   //  - Have the down arrow bounce every once in a while
//   useEffect(() => {

//     const handleDownArrow = () => {
//       const hideThreshold = 0.01;
//       const hidePosition = window.innerHeight * hideThreshold;
//       const revealPosition = window.innerHeight * hideThreshold;

//       if (window.scrollY > hidePosition) {
//         gsap.to(downArrowRef.current, { autoAlpha: 0, duration: 0.2 });
//       } else if (window.scrollY < revealPosition) {
//         gsap.to(downArrowRef.current, { autoAlpha: 1, duration: 0.5 });
//       }
//     };

//     window.addEventListener('scroll', handleDownArrow);

//     const bounceTimeline = gsap.timeline({delay: 3, repeat: 3, repeatDelay: 10});

//     bounceTimeline
//       .to(downArrowRef.current, {
//         y: "-25px",
//         duration: 1.2,
//         yoyo: true,
//         yoyoEase: "elastic.out(1.5, 0.3)",
//       })
//       .to(downArrowRef.current, {
//         y: "0px",
//         duration: 0.5,
//         ease: "power2.out",
//       });

//     return () => {
//       window.removeEventListener('scroll', handleDownArrow);
//     };

//   }, []);

  return (
      <div ref={buttonRef}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            height={ButtonSize}
            width={ButtonSize}
            fill="none"
            viewBox="0 0 24 24"
            style={{cursor: "pointer"}}
            {...props}
        >
             <defs>
                <SVGGradient id="closeButton"/>
            </defs>
            <path
                fill="url(#closeButton)"
                stroke="url(#closeButton)"
                fillRule="evenodd"
                d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7.293 16.707a1 1 0 0 1 0-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414 0Z"
                clipRule="evenodd"
            />
        </svg>
      </div>
  );
}

export default ExitButton;

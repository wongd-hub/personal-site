import React, { useEffect, useState, useRef } from "react"
import Lottie from "lottie-react";
import justBlackjackAnim from "./justBlackjackLottie.json";
import { gsap } from 'gsap';

const JustBlackjackLogo = ({ ...props }) => {

    const [LogoSize, setLogoSize] = useState(0);
    const jBButtonRef = useRef(null);

    // Animate in
    useEffect(() => {

        // Initially disable pointer events on logo
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

    // Reactive sizing of logo
    useEffect(() => {

        const updateLogoSize = () => {
            const logoSize = window.innerWidth < 850 ? 100 : 150;
            setLogoSize(logoSize);
        }

        // Call once to set initial measurements
        updateLogoSize();

        // Listen to window resize event
        window.addEventListener('resize', updateLogoSize);

        // Clean up event listener on unmount
        return () => {
            window.removeEventListener('resize', updateLogoSize);
        }
        
    }, [])

    // TODO: Allow passing of size props into this; maybe changing the style prop etc.
    // Put all the reactivity in here instead of out in the main landing Component
    // TODO: See if you can put the animation code here as well (on-hover, fade-in)
    // TODO: Can we do the same thing for the downarrow to declutter the landing component?
    // TODO: In the sidebar div, include a short spiel about what this is about- my firs tproj etc
    return (
        <div className="justblackjack-button" ref={jBButtonRef}>
            <Lottie 
                animationData={justBlackjackAnim} 
                style={{ 
                    height: `${LogoSize}px`, 
                    width: `${LogoSize}px` 
                }} 
                {...props}  
            />
        </div>
    );
};

export default JustBlackjackLogo;
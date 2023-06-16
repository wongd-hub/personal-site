import React, { useEffect, useState } from "react"
import Lottie from "lottie-react";
import justBlackjackAnim from "./justBlackjackLottie.json";

const JustBlackjackLogo = ({ ...props }) => {

    const [LogoSize, setLogoSize] = useState(0);

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
    return <Lottie 
        animationData={justBlackjackAnim} 
        style={{ height: `${LogoSize}px`, width: `${LogoSize}px` }} 
        {...props}  
    />;
};

export default JustBlackjackLogo;
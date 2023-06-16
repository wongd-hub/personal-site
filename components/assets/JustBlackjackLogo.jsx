import React from "react"
import Lottie from "lottie-react";
import justBlackjackAnim from "./justBlackjackLottie.json";

const JustBlackjackLogo = ({ ...props }) => {

    useEffect(() => {

    }, [])

    // TODO: Allow passing of size props into this; maybe changing the style prop etc.
    // Put all the reactivity in here instead of out in the main landing Component
    // See if you can put the animation code here as well
    // TODO: Can we do the same thing for the downarrow to declutter the landing component?
    return <Lottie animationData={justBlackjackAnim} {...props} />;
};

export default JustBlackjackLogo;
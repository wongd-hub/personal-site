import React from "react"
import Lottie from "lottie-react";
import justBlackjackAnim from "./justBlackjackLottie.json";

const JustBlackjackLogo = ({ ...props }) => {

    // TODO: Allow passing of size props into this; maybe changing the style prop etc.
    return <Lottie animationData={justBlackjackAnim} {...props} />;
};

export default JustBlackjackLogo;
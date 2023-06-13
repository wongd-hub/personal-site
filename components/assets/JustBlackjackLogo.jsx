import React from "react"
import Lottie from "lottie-react";
import justBlackjackAnim from "./justBlackjackLottie.json";

const JustBlackjackLogo = ({ ...props }) => {
    return <Lottie animationData={justBlackjackAnim} {...props} />;
};

export default JustBlackjackLogo;
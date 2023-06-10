import React from "react";
import DownArrow from "./assets/DownArrow";
import { useEffect, useRef, useState } from 'react';
import SVGText from "./assets/SVGText";
import Socials from "./socials/Socials";
import { SocialHoverContext } from "./contexts/SocialHoverContext";
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import SVGBackground from "./assets/SVGBackground";

export default function Content() {




    return (
        <>
            <SVGBackground/>
            <div className="main-content">
                <div className="opening-spiel">
                    <div className="profile-pic"></div>
                    <div className="hello">Hello there, my name is Darren</div>
                </div>
                <div className="callout-cards">
                    <div className="callout-cards-1">

                    </div>
                </div>
            </div>
        </>
    )
}
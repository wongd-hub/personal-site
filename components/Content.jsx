import React from "react";
import DownArrow from "./assets/DownArrow";
import { useEffect, useRef, useState } from 'react';
import SVGText from "./assets/SVGText";
import Socials from "./socials/Socials";
import { SocialHoverContext } from "./contexts/SocialHoverContext";
import { gsap } from 'gsap';
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import SVGBackground from "./assets/SVGBackground";
import Image from "next/image";

export default function Content() {

    return (
        <>
            <SVGBackground/>
            <div className="main-content">
                <div className="opening-spiel glass-bg">
                    <div className="opening-banner">
                        <div className="profile-pic">
                            <Image 
                                src="/assets/images/avatar.jpeg"
                                width={75}
                                height={75}
                                alt="Picture of the author"
                            />
                        </div>
                        <div className="hello">
                            <span>Hello there, my name is&nbsp;<span className="gradient-text cotton-candy-gr">Darren</span></span>
                        </div>
                    </div>
                    <div className="opening-spiel-text">
                        I&apos;m a hello world lorem ipsum globally transform next-generation systems proactively unleash long-term high-impact web services conveniently plagiarize goal-oriented growth strategies
                    </div>
                </div>
                <div className="callout-cards">
                    <div className="callout-cards-1">

                    </div>
                </div>
            </div>
        </>
    )
}
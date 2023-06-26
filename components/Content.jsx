import React, { useState } from "react";
import SVGBackground from "./svgs/SVGBackground";
import Image from "next/image";
import SVGRLang from "./svgs/SVGRlang";
import SVGPython from "./svgs/SVGPython";

export default function Content() {

    const [BoxSize, setBoxSize] = useState(20);

    const content = {
        spiel: 
            "I'm a data analyst with a passion for improving public health policy by informing" + 
            "decision making. My expertise lies in working with and producing complex models yada yada" +
            'hello',
    }

    const dsStack = [
        {
            title: 'R',
            component: SVGRLang,
        },
        {
            title: 'python',
            component: SVGPython,
        }
    ]

    const wdStack = [
        {

        }
    ]

    return (
        <main id="content">
            <SVGBackground/>
            <div className="main-content">
                <div className="opening-spiel glass-bg">
                    <div className="opening-banner">
                        <div className="profile-pic">
                            <Image 
                                src="/assets/images/avatar.jpeg"
                                alt="Picture of the author"
                                layout="fill"
                            />
                        </div>
                        <div className="hello">
                            <span>Hello there, my name is&nbsp;<span className="gradient-text cotton-candy-gr">Darren</span></span>
                        </div>
                    </div>
                    <div className="opening-spiel-text">
                        {content.spiel}<br/><br/>

                        <div className="tech-stack">
                            <h2>Tech stack</h2>
                            <div className="tech-stack-logos">
                                <div className="ds-stack">
                                    <p>Data analysis</p>
                                    {
                                        dsStack && dsStack.map((el, i) => {

                                            const DSTech = el.component;

                                            return (
                                                <DSTech
                                                    key={`${el.title}${i}`}
                                                    width={65}
                                                    height={65}
                                                />
                                            )

                                        })
                                    }
                                </div>
                                <div className="wd-stack">

                                </div>
                            </div>
                        </div>
                        
                        <br/> R, Python, SQL, Javascript
                        Credentials: Uni, Certificates, etc

                        Detailed work history
                    </div>
                </div>
                <div className="callout-cards">
                    <div className="callout-cards-1">

                    </div>
                </div>
            </div>
        </main>
    )
}
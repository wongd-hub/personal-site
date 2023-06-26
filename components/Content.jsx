import React, { useState } from "react";
import SVGBackground from "./svgs/SVGBackground";
import Image from "next/image";
import SVGRLang from "./svgs/SVGRlang";
import SVGPython from "./svgs/SVGPython";
import SVGJS from "./svgs/SVGJS";
import SVGReact from "./svgs/SVGReact";
import SVGThreeJS from "./svgs/SVGThreeJS";

export default function Content() {

    const [BoxSize, setBoxSize] = useState(20);

    const content = {
        spiel: 
            "I'm a data analyst with a passion for improving public health policy by informing" + 
            "decision making. My expertise lies in working with and producing complex models yada yada" +
            'hello',
    }

    // Experiment with switching colouring back to normal; gradients don't seem to work properly with the glass bg
    // Might be the drop-shadow filter on the glass-bg?
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
            title: 'JS',
            component: SVGJS,
        },
        {
            title: 'react',
            component: SVGReact,
        },
        {
            title: 'threejs',
            component: SVGThreeJS,
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

                        <br/>
                        <hr className="horizontal-rule" />
                        <br/>

                        <div className="tech-stack">
                            <h2>Tech stack</h2>
                            {/* TODO: Pull into own component */}
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
                                                    ogGradient
                                                />
                                            )

                                        })
                                    }
                                </div>
                                <div className="wd-stack">
                                    <p>Web development</p>
                                    {
                                        wdStack && wdStack.map((el, i) => {

                                            const WDTech = el.component;

                                            return (
                                                <WDTech
                                                    key={`${el.title}${i}`}
                                                    width={65}
                                                    height={65}
                                                    ogGradient
                                                />
                                            )

                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        
                        <br/> 

                        <div className="credentials">Credentials: Uni, Certificates, etc</div>

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
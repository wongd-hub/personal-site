import React, { useState } from "react";
// SVGBackground temporarily removed
import Image from "next/image";
import SVGRLang from "./svgs/SVGRlang";
import SVGPython from "./svgs/SVGPython";
import SVGJS from "./svgs/SVGJS";
import SVGReact from "./svgs/SVGReact";
import SVGThreeJS from "./svgs/SVGThreeJS";
import Timeline from "./Timeline";

export default function Content() {

    const [BoxSize, setBoxSize] = useState(20);

    const content = {
        spiel: 
            "I'm a versatile, team-oriented and high-tempo data analyst, currently pivoting into software development. " + 
            "I'm recognized for rapidly mastering complex codebases, new technologies and delivering high-impact results—" +
            "such as a $25.3B economic forecasting initiative and saving the Government $67M annually. " +
            "Passionate about AI/ML and learning new technologies, which has led me to pursue an M. Data Science. " +
            "Skilled at bridging technical and non-technical stakeholders, and contributing to innovative team cultures."
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
            {/* <SVGBackground/> */}
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
                    <div className="text-content-container">
                        <div className="content-item">
                            <p>{content.spiel}</p>
                        </div>

                        <br/>
                        <hr className="horizontal-rule" />
                        <br/>

                        <div className="content-item">
                            <h2>Tech stack</h2>
                            <div className="tech-stack">
                                <div className="stack-row">
                                    <p className="stack-label">Data analysis</p>
                                    <div className="stack-logos">
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
                                </div>
                                <div className="stack-row">
                                    <p className="stack-label">Web development</p>
                                    <div className="stack-logos">
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
                        </div>
                    </div>
                </div>

                <br/>
                <br/>

                {/* Timeline Section */}
                <Timeline />
                
            </div>
        </main>
    )
}
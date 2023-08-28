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
                    <div className="text-content-container">
                        <div className="content-item">
                            {/* <h2>Intro</h2> */}
                            <p>{content.spiel}</p>
                        </div>

                        <br/>
                        <hr className="horizontal-rule" />
                        <br/>

                        <div className="content-item">
                            <h2>Tech stack</h2>
                            <div className="tech-stack">
                                <div className="ds-stack">
                                    <p>Data analysis</p>
                                    <div className="tech-stack-logos">
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
                                <div className="wd-stack">
                                    <p>Web development</p>
                                    <div className="tech-stack-logos">
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

                        <br/>
                        <hr className="horizontal-rule" />
                        <br/>

                        <div className="content-item">
                            <h2>Career</h2>
                            <p>Lorem ipsum</p>
                        </div>

                        <br/>
                        <hr className="horizontal-rule" />
                        <br/>

                        <div className="content-item">
                            <h2>Herd Mentality (blog)</h2>
                            <p>Lorem ipsum (probably an ul or something)</p>
                        </div>

                        <br/>
                        <hr className="horizontal-rule" />
                        <br/>
                        
                        <div className="content-item">
                            <h2>Credentials / education</h2>
                            <p>Uni, certificates, etc</p>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    )
}
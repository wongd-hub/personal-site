import React from "react";
import SVGGithub from "./SVGGithub";
import SVGHerdMentality from "./SVGHerdMentality";
import SVGLinkedIn from "./SVGLinkedIn";
import { gsap } from 'gsap';
import { useEffect, useRef } from "react";

const Socials = ({ ...props }) => {

    const socialRef = useRef([]);
    const svgSize = 40;

    const socials = [
        {
            title: 'herd-mentality',
            component: SVGHerdMentality,
            href: 'https://www.herdmentality.xyz/authors/darrenwong'
        },
        {
            // https://fontawesome.com/icons/square-github?f=brands&s=solid
            title: 'github',
            component: SVGGithub,
            href: 'https://github.com/wongd-hub'
        },
        {
            // https://fontawesome.com/icons/linkedin?f=brands&s=solid&pc=%23ffffff
            title: 'linkedin',
            component: SVGLinkedIn,
            href: 'https://www.linkedin.com/in/darren-wong-52212a117/'
        },
    ]

    useEffect(() => {

        // Define animation functions for on-hover/focus
        const onInteraction = (el) => {
            gsap.to(el, { y: "7px", opacity: 0.7, duration: 0.2, ease: "sine.inOut" });
        };
    
        const afterInteraction = (el) => {
            gsap.to(el, { y: "0px", opacity: 1, duration: 0.2, ease: "sine.inOut" });
        };
    
        // Assigning animation to each landing link
        socialRef.current.forEach((el, i) => {
            if (el) { // Check if the element exists
            el.addEventListener("mouseover", () => onInteraction(el));
            el.addEventListener("mouseout", () => afterInteraction(el));
    
            el.addEventListener("focus", () => onInteraction(el));
            el.addEventListener("blur", () => afterInteraction(el));
            }
        });

    }, [])

    return (
        <div className='socials'>
            {
                socials && socials.map((el, i) => {

                    const SocialType = el.component;

                    return (
                        <a
                            ref={el => socialRef.current[i] = el}
                            key={i}
                            className="social-link"
                            href={el.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <SocialType
                                width={svgSize}
                                height={svgSize}
                            />
                        </a>
                    )
                })
            }
        </div>
    )

}

export default Socials
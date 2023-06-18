import React, { useEffect, useRef, useState } from 'react';
import ExitButton from './assets/ExitButton';
import JustBlackjackLogo from '../components/assets/JustBlackjackLogo';
import { JustBlackjackContext } from "./contexts/JustBlackjackContext";
import { gsap } from 'gsap';

export default function JustBlackjack() {

    // Set up state
    const [isOpen, setIsOpen] = useState(false);

    // Create references to drive GSAP animations
    const jbSidebarRef = useRef(null);

    // Fade out JustBlackjack sidebar when you scroll down 
    useEffect(() => {

        const handleJBSidebar = () => {
            const hideThreshold = 0.01;
            const hidePosition = window.innerHeight * hideThreshold;
            const revealPosition = window.innerHeight * hideThreshold;
      
            if (window.scrollY > hidePosition) {
              gsap.to(jbSidebarRef.current, { autoAlpha: 0, duration: 0.5 });
            } else if (window.scrollY < revealPosition) {
              gsap.to(jbSidebarRef.current, { autoAlpha: 1, duration: 0.5 });
            }
          };
      
        window.addEventListener('scroll', handleJBSidebar);

        return () => {
            window.removeEventListener('scroll', handleJBSidebar);
        };

    }, [])

    // Close sidebar when clicking outside
    useEffect(() => {

        const handleClickOutside = event => {
            if (jbSidebarRef.current && !jbSidebarRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, []);

    // Animate sidebar in and out upon state change
    useEffect(() => {
        if(isOpen) {
          gsap.to(jbSidebarRef.current, {duration: 0.5, x: '0%', ease: "power2.out"});
        } else {
          gsap.to(jbSidebarRef.current, {duration: 0.5, x: '100%', ease: "power2.in"});
        }
      }, [isOpen]);

    return (
        <JustBlackjackContext.Provider value={{ setIsOpen }}>
            <JustBlackjackLogo />
                <div
                    className="justblackjack-frame glass-bg"
                    ref={jbSidebarRef}
                >
                <div className="justblackjack-closebutton">
                    <ExitButton />
                </div>
                <div className="justblackjack-spiel">
                    🧐 This was my first Javascript project!<br/>
                    <a
                        href="https://wongd-hub.github.io/justBlackjack/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gradient-text hyper-gr justblackjack-link"
                    >
                        Link to site 
                    </a> | <a
                        href="https://www.herdmentality.xyz/blog/justBlackjack/justBlackjack-build-setup"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="gradient-text hyper-gr justblackjack-link"
                    >
                        Devblog
                    </a>
                </div>
                <iframe 
                    src="https://wongd-hub.github.io/justBlackjack/"
                    loading="lazy"
                ></iframe>
                </div>
        </JustBlackjackContext.Provider>
    )

} 
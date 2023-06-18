import React, { useEffect, useRef } from 'react'
import ExitButton from './assets/ExitButton'


export default function JustBlackjack() {

    return (
        <div className="justblackjack-frame glass-bg">
            {/* Have this fade out the same way as the down arrow on scrolldown? */}
            <div className="justblackjack-closebutton">
            <ExitButton />
            </div>
            <div className="justblackjack-spiel">
            🧐 This was my first Javascript project!<br/>
            <a
                href="https://wongd-hub.github.io/justBlackjack/"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text hyper-gr"
            >
                Link to site 
            </a> | <a
                href="https://www.herdmentality.xyz/blog/justBlackjack/justBlackjack-build-setup"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text hyper-gr"
            >
                Devblog
            </a>
            </div>
            <iframe 
            src="https://wongd-hub.github.io/justBlackjack/"
            loading="lazy"
            ></iframe>
        </div>
    )

} 
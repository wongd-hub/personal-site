import React, { useEffect, useRef, useState, useContext } from 'react';
import SVGGradient from './SVGGradient';
import { JustBlackjackContext } from "../contexts/JustBlackjackContext";

function ExitButton(props) {

    const [ButtonSize, setButtonSize] = useState(20);
    const buttonRef = useRef(null);
    const { setIsOpen } = useContext(JustBlackjackContext);

    return (
        <div ref={buttonRef}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                height={ButtonSize}
                width={ButtonSize}
                fill="none"
                viewBox="0 0 24 24"
                style={{cursor: "pointer"}}
                {...props}
            >
                <defs>
                    <SVGGradient id="closeButton"/>
                </defs>
                <path
                    fill="url(#closeButton)"
                    stroke="url(#closeButton)"
                    fillRule="evenodd"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM7.293 16.707a1 1 0 0 1 0-1.414L10.586 12 7.293 8.707a1 1 0 0 1 1.414-1.414L12 10.586l3.293-3.293a1 1 0 1 1 1.414 1.414L13.414 12l3.293 3.293a1 1 0 0 1-1.414 1.414L12 13.414l-3.293 3.293a1 1 0 0 1-1.414 0Z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
}

export default ExitButton;

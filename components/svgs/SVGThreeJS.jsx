import React from "react"
import SVGGradient from "./SVGGradient"

// From https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg
const SVGThreeJS= ({ 
    ...props 
}) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            strokeLinecap="square"
            strokeMiterlimit={10}
            viewBox="0 0 226.77 226.77"
            {...props}
        >
            <defs>
                <SVGGradient id="threejs"/>
            </defs>
            <g
                fillRule="evenodd"
                stroke="url(#threejs)"
                strokeLinecap="butt"
                strokeLinejoin="round"
                strokeWidth={4}
            >
            <path d="M71.984 204.863 28.771 29.923l173.23 49.874z" />
            <path d="m115.354 54.865 21.591 87.496-86.567-24.945z" />
            <path d="M93.874 129.283 83.15 85.818l43.008 12.346zM72.422 42.406 83.146 85.87 40.138 73.525zM158.434 67.183l10.724 43.465-43.008-12.346zM93.879 129.313l10.724 43.465-43.008-12.346z" />
            </g>
        </svg>
    )

}
export default SVGThreeJS

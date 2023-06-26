import React from "react"
import SVGGradient from "./SVGGradient"

// From https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg
const SVGReact= ({ 
    ogGradient,
    ...props 
}) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-11.5 -10.232 23 20.463"
            {...props}
        >
            <defs>
                {ogGradient && <SVGGradient id="react"/>}
            </defs>
                <title>{"React Logo"}</title>
                <circle r={2.05} fill={"url(#react)"} />
                <g fill="none" stroke="url(#react)">
                <ellipse stroke="url(#react)" rx={11} ry={4.2} />
                <ellipse stroke="url(#react)" rx={11} ry={4.2} transform="rotate(60)" />
                <ellipse stroke="url(#react)" rx={11} ry={4.2} transform="rotate(120)" />
            </g>
        </svg>
    )

}
export default SVGReact

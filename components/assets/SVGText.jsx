import React from "react"
import SVGGradient from "./SVGGradient"
import { useEffect, useState } from "react"

const SVGText = ({ 
    // x = null, y = null, 
    fontSize = 18, 
    children, 
    ...props 
}) => {
  
    // Strip spaces from children 
    const id = children.replaceAll(' ', '')
    const scale = 149.82 / 162.48 

    const [Measurements, setMeasurements] = useState({remSize: 0, calculatedWidth: 0});

    useEffect(() => {
        const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        setMeasurements({
            remSize: fontSize,
            calculatedWidth: (
                // Get length of the textbox based 
                fontSize * 1.275 * children.length * 
                // For this particular font, the ratio of width to height 
                // on one character. Only really works here because this is 
                // a monospace font. Measured by looking at the SVG bounding 
                // box for one character
                13.54 / (16 * 1.275) *
                // This ratio isn't exact, so we'll scale it down based on 
                // the observed ratio of text area width to SVG width.
                // We can use this with confidence since we'll also assert this as
                // the text box length and stretch text to fit it using textLength 
                // and lengthAdjust
                scale
            )
        });
    }, []);

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width={Measurements.calculatedWidth}
            height={Measurements.remSize * 1.275} 
        >
            <defs>
                <SVGGradient id={id}/>
            </defs>
            <text 
                x="50%"
                y="50%"
                fill={"url(#" + id + ")"} 
                fontFamily="Space Mono" 
                // Assert length of the SVG text box, note the ratio is not exact 
                // so we need to do this
                textLength={Measurements.calculatedWidth}
                // Then to fill the box, adjust the spacing width of text. Should 
                // have a relatively small effect since we've applied a scaling 
                // factor to get a more accurate width
                lengthAdjust="spacing"
                fontSize={Measurements.remSize * 1.275}
                textAnchor="middle" // To align text in center
                dominantBaseline="middle" // To align text in middle vertically
                {...props}
            >
            {children}
            </text>
        </svg>
    )
  

}
export default SVGText

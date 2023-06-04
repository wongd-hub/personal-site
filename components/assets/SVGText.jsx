import React from "react"
import SVGGradient from "./SVGGradient"

const SVGText = ({ x = 50, y = 100, fontSize = 18, children, ...props }) => {
  
  // Strip spaces from children 
  const id = children.replaceAll(' ', '')

  return (
    <svg xmlns="http://www.w3.org/2000/svg" >
    <defs>
      <SVGGradient id={id}/>
    </defs>
    <text 
        x={x} y={y} 
        fill={"url(#" + id + ")"} 
        fontFamily="Space Mono" 
        fontSize={fontSize}
        {...props}
    >
      {children}
    </text>
  </svg>
  )
  

}
export default SVGText

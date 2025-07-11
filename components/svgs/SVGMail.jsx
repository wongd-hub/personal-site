import React from "react"
import SVGGradient from "./SVGGradient"

const SVGMail = ({ 
    ...props 
}) => {

    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        {...props}
      >
        <defs>
            <SVGGradient id='email'/>
        </defs>
        <path 
            d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm154 239.7L64.2 172.4C66 156.4 79.5 144 96 144h256c16.5 0 30 12.4 31.8 28.4L230 271.7c-1.8 1.2-3.9 1.8-6 1.8s-4.2-.6-6-1.8zm29.4 26.9L384 210.4V336c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V210.4l136.6 88.2c7 4.5 15.1 6.9 23.4 6.9s16.4-2.4 23.4-6.9z" 
            fill="url(#email)"
        />
      </svg>
    )

}
export default SVGMail

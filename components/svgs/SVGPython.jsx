import React from "react"
import SVGGradient from "./SVGGradient"

// From https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg
const SVGPython = ({ 
    ...props 
}) => {

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 120 120"
            {...props}
        >
            <defs>
                <SVGGradient id='py'/>
            </defs>
            <path
                d="M54.919 0c-4.584.022-8.961.413-12.813 1.095C30.76 3.099 28.7 7.295 28.7 15.032v10.219h26.813v3.406H18.638c-7.793 0-14.616 4.684-16.75 13.594-2.462 10.213-2.571 16.586 0 27.25 1.905 7.938 6.457 13.594 14.25 13.594h9.218v-12.25c0-8.85 7.657-16.657 16.75-16.657h26.782c7.454 0 13.406-6.138 13.406-13.625v-25.53c0-7.267-6.13-12.726-13.406-13.938C64.282.328 59.502-.02 54.918 0Zm-14.5 8.22c2.77 0 5.031 2.298 5.031 5.125 0 2.816-2.262 5.093-5.031 5.093-2.78 0-5.031-2.277-5.031-5.093 0-2.827 2.251-5.125 5.03-5.125z"
                style={{
                    fill: "url(#py)",
                    fillOpacity: 1,
                }}
            />
            <path
                d="M85.638 28.657v11.906c0 9.231-7.826 17-16.75 17H42.106c-7.336 0-13.406 6.279-13.406 13.625V96.72c0 7.266 6.319 11.54 13.406 13.625 8.488 2.495 16.627 2.946 26.782 0 6.75-1.955 13.406-5.888 13.406-13.625V86.5H55.513v-3.405H95.7c7.793 0 10.696-5.436 13.406-13.594 2.8-8.399 2.68-16.476 0-27.25-1.925-7.758-5.604-13.594-13.406-13.594zM70.575 93.313c2.78 0 5.031 2.278 5.031 5.094 0 2.827-2.251 5.125-5.031 5.125-2.77 0-5.031-2.298-5.031-5.125 0-2.816 2.261-5.094 5.031-5.094z"
                style={{
                    fill: "url(#py)",
                    fillOpacity: 1,
                }}
            />
            <ellipse
                cx={55.817}
                cy={127.701}
                rx={35.931}
                ry={6.967}
                style={{
                    opacity: 0.44382,
                    fill: "url(#py)",
                    fillOpacity: 1,
                    fillRule: "nonzero",
                    stroke: "none",
                    strokeWidth: 15.4174,
                    strokeMiterlimit: 4,
                    strokeDasharray: "none",
                    strokeOpacity: 1,
                }}
            />
        </svg>
    )

}
export default SVGPython

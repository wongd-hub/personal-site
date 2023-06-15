import React from "react"

const SVGBackground = ({ 
    ...props 
}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" id="svgbg" {...props}>
            <defs>
                <linearGradient
                    id="b"
                    x1="50%"
                    x2="50%"
                    y1="0%"
                    y2="100%"
                    gradientTransform="rotate(-140 .5 .5)"
                >
                    <stop offset="0%" stopColor="#14b8a6" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                    id="a"
                    x1="50%"
                    x2="50%"
                    y1="0%"
                    y2="100%"
                    gradientTransform="rotate(140 .5 .5)"
                >
                    <stop stopColor="#ec4899" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0)" stopOpacity={0} />
                </linearGradient>
                <filter
                    id="c"
                    width="140%"
                    height="140%"
                    x="-20%"
                    y="-20%"
                    colorInterpolationFilters="sRGB"
                    filterUnits="objectBoundingBox"
                    primitiveUnits="userSpaceOnUse"
                >
                    <feTurbulence
                        width="100%"
                        height="100%"
                        x="0%"
                        y="0%"
                        baseFrequency={0.77}
                        numOctaves={2}
                        result="turbulence"
                        seed={177}
                        stitchTiles="stitch"
                        type="fractalNoise"
                    />
                    <feColorMatrix
                        width="100%"
                        height="100%"
                        x="0%"
                        y="0%"
                        in="turbulence"
                        result="colormatrix"
                        type="saturate"
                        values={0}
                    />
                    <feComponentTransfer
                        width="100%"
                        height="100%"
                        x="0%"
                        y="0%"
                        in="colormatrix"
                        result="componentTransfer"
                    >
                    <feFuncR slope={3} type="linear" />
                    <feFuncG slope={3} type="linear" />
                    <feFuncB slope={3} type="linear" />
                    </feComponentTransfer>
                    <feColorMatrix
                        width="100%"
                        height="100%"
                        x="0%"
                        y="0%"
                        in="componentTransfer"
                        result="colormatrix2"
                        values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 23 -15"
                    />
                </filter>
            </defs>
            <rect width="100%" height="100%" fill="#262626" />
            <rect width="100%" height="100%" fill="url(#a)" />
            <rect width="100%" height="100%" fill="url(#b)" />
            <rect
                width="100%"
                height="100%"
                fill="transparent"
                filter="url(#c)"
                opacity={0.27}
                style={{
                    mixBlendMode: "normal",
                }}
            />
        </svg>
    )
  

}
export default SVGBackground

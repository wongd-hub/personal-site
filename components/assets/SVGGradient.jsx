import React from "react";

const SVGGradient = ({ id, type = 'cottonCandy' }) => {
    
    const gradients = {
        cottonCandy: (
            <linearGradient id={id} x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'rgb(249, 168, 212)', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: 'rgb(216, 180, 254)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'rgb(129, 140, 248)', stopOpacity: 1 }} />
            </linearGradient>
        )
    }

    return gradients[type]
}
  export default SVGGradient
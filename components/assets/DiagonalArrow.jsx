import React from "react"
import SVGGradient from "./SVGGradient"

const DiagonalArrow = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={props.width}
    height={props.height}
    fill="#fff"
    stroke="#fff"
    strokeWidth={9.927}
    transform="rotate(270)"
    viewBox="0 0 242.133 242.133"
    {...props}
  >
    <defs>
        <SVGGradient id="diagonalArrow"/>
    </defs>
    <path 
        d="M190.919 212.133h-69.853c-8.284 0-15 6.716-15 15s6.716 15 15 15h106.065c8.284 0 15-6.716 15-15V121.066c0-8.284-6.716-15-15-15s-15 6.716-15 15v69.854L25.607 4.394c-5.858-5.858-15.356-5.858-21.213 0-5.858 5.858-5.858 15.356 0 21.213l186.525 186.526z" 
        fill="url(#diagonalArrow)"
        stroke="url(#diagonalArrow)"
    />
  </svg>
)

export default DiagonalArrow

import React from "react"
import { motion } from 'framer-motion';

const DiagonalArrow = (props) => (
  <motion.svg
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
        <linearGradient id="gradient1" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgb(249, 168, 212)', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: 'rgb(216, 180, 254)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(129, 140, 248)', stopOpacity: 1 }} />
        </linearGradient>
    </defs>
    <path 
        d="M190.919 212.133h-69.853c-8.284 0-15 6.716-15 15s6.716 15 15 15h106.065c8.284 0 15-6.716 15-15V121.066c0-8.284-6.716-15-15-15s-15 6.716-15 15v69.854L25.607 4.394c-5.858-5.858-15.356-5.858-21.213 0-5.858 5.858-5.858 15.356 0 21.213l186.525 186.526z" 
        fill="url(#gradient1)"
        stroke="url(#gradient1)"
    />
  </motion.svg>
)

export default DiagonalArrow

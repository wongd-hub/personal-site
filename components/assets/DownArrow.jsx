import React from 'react';
import SVGGradient from './SVGGradient';

function DownArrow(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // xmlSpace="preserve"
      width={props.width}
      height={props.height}
      fill="#fff"
      stroke="#fff"
      viewBox="0 0 1024 1024"
      {...props}
    >
      <defs>
        <SVGGradient id="downArrow"/>
      </defs>
      <path
        d="M903.232 256 960 306.432 512 768 64 306.432 120.768 256 512 659.072z"
        fill="url(#downArrow)"
        stroke="url(#downArrow)"
      />
    </svg>
  );
}

export default DownArrow;

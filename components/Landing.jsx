import React from "react";

export default function Landing() {
  return (
    <banner className="landing-container" id="landing" role="banner">
      <div className="title-container glass-background">
        <h1
          className="title-text gradient-text noselect"
          role="heading"
          aria-level="1"
        >
          Darren Wong
        </h1>
        <h2 className="gradient-text noselect">
          Data Analyst
        </h2>
      </div>
    </banner>
  );
}

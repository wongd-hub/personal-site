import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Landing() {
  return (
    <banner className="landing-container" id="landing" role="banner">
      <div className="title-container">
        <h1
          className="title-text gradient-text noselect"
          role="heading"
          aria-level="1"
        >
          Darren<br/>Wong
        </h1>
        <h2 className="gradient-text noselect">
          data analyst<br/>
          blogger<br/>
          aspiring web dev
        </h2>
      </div>
      <div className="arrow-down noselect gradient-text"></div>
    </banner>
  );
}

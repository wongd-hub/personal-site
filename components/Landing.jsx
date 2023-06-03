import React from "react";
import { motion } from "framer-motion";
import DownArrow from "./assets/DownArrow";

export default function Landing() {
  return (
    <banner className="landing-container" id="landing" role="banner">
      <div className="title-container">
          <h1
            className="title-text gradient-text noselect"
            role="heading"
            aria-level="1"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 3.5,
              delay: 0.5
            }}
          >
            Darren<br/>Wong
          </h1>
          <motion.h2 
            className="gradient-text noselect"             
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 3,
              delay: 1
            }}
          >
            data analyst<br/>
            blogger<br/>
            aspiring web dev
          </motion.h2>
      </div>
      <motion.div className="arrow-down noselect gradient-text">
        {/* Get this to fade in last and maybe bounce every 10 seconds */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            delay: 0
          }}
        >
          Scroll down!
        </motion.div> 
        <DownArrow 
          width={80} 
          height={80}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 3,
            delay: 2
          }}
        />
      </motion.div>
    </banner>
  );
}

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import DownArrow from "./assets/DownArrow";

export default function Landing() {
  return (
    <banner className="landing-container" id="landing" role="banner">
      <div className="title-container">
        <AnimatePresence>
          <motion.h1
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
            {/* We'll want to stagger these two using staggerChildren at some point */}
            Darren<br/>Wong
          </motion.h1>
          <motion.h2 
            className="gradient-text noselect"             
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 3,
              delay: 1,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            data analyst<br/>
            blogger<br/>
            aspiring web dev
          </motion.h2>
        </AnimatePresence>
      </div>
      <div className="arrow-down noselect gradient-text">
        <DownArrow width={80} height={80}/>
      </div>
    </banner>
  );
}

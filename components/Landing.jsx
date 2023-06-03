import React from "react";
import { motion } from "framer-motion";
import DownArrow from "./assets/DownArrow";
import DiagonalArrow from "./assets/DiagonalArrow";
import Link from "next/link";

export default function Landing() {

  const highlightedRoles = [
    {
      text: "data analyst",
      href: "github.com",
    },    
    {
      text: "blogger",
      href: "github.com",
    },
    {
      text: "aspiring web dev",
      href: "github.com",
    }
  ]

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
            {highlightedRoles.map((el, i) => (
              <motion.span key={el.href}>
                <Link href={el.href}>
                  <span>
                    <span className="underline">{el.text}</span>&nbsp;
                    <DiagonalArrow width={13} height={13}/>
                  </span>
                </Link>
              </motion.span>
            ))}
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

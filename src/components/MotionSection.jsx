import React from "react";
import { motion } from "framer-motion";

const MotionSection = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.section
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.section>
  );
};

export default MotionSection;

"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function WordReveal({ text, className, delay = 0, style }: { text: string; className?: string; delay?: number; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap gap-x-[0.25em] ${className ?? ""}`} style={style}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

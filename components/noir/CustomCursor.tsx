"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [label, setLabel] = useState("");

  const springX = useSpring(trailX, { stiffness: 100, damping: 20 });
  const springY = useSpring(trailY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
      trailX.set(e.clientX - 20);
      trailY.set(e.clientY - 20);
    };

    const checkHover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isLink = el.closest("a, button, [role='button'], [data-cursor]");
      setIsPointer(!!isLink);
      const cursorLabel = el.closest("[data-cursor-label]")?.getAttribute("data-cursor-label") ?? "";
      setLabel(cursorLabel);
      setIsHovering(!!cursorLabel);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 rounded-full bg-noir-gold pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: isPointer ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring trail */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-noir-gold pointer-events-none z-[9998]"
        style={{ x: springX, y: springY }}
        animate={{
          scale: isPointer ? 2.5 : isHovering ? 3 : 1,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{ duration: 0.25 }}
      />
      {/* Label on hover */}
      {label && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="absolute left-8 top-1 text-[10px] tracking-[0.3em] uppercase text-noir-gold font-sans whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      )}
    </>
  );
}

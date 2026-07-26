"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * The single gradient bloom. Fixed in the hero's top-right; on the home
 * page it drifts toward the bottom-left as the visitor scrolls, lagging
 * gently behind via a spring. Static under prefers-reduced-motion.
 */
export default function Bloom() {
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();

  const springConfig = { stiffness: 26, damping: 18, mass: 1.4 };
  const x = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]),
    springConfig
  );
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "115%"]),
    springConfig
  );

  const drifts = pathname === "/" && !reducedMotion;

  return (
    <motion.div
      aria-hidden
      className="bloom pointer-events-none fixed -top-[18%] -right-[14%] -z-10 aspect-square w-[60vw] max-w-[680px] opacity-50"
      style={drifts ? { x, y } : undefined}
    />
  );
}

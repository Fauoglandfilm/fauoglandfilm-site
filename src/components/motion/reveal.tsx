"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
};

type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

function useShouldDisableViewportMotion() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)") as LegacyMediaQueryList;
    const update = () => setIsMobileViewport(mediaQuery.matches);

    update();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
    } else if (typeof mediaQuery.addListener === "function") {
      mediaQuery.addListener(update);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", update);
      } else if (typeof mediaQuery.removeListener === "function") {
        mediaQuery.removeListener(update);
      }
    };
  }, []);

  return shouldReduceMotion || isMobileViewport;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  amount = 0.25,
}: RevealProps) {
  const shouldDisableViewportMotion = useShouldDisableViewportMotion();

  if (shouldDisableViewportMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.978, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.92,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

type ParallaxProps = {
  children: ReactNode;
  className?: string;
};

export function FloatingLayer({ children, className }: ParallaxProps) {
  const shouldDisableViewportMotion = useShouldDisableViewportMotion();

  if (shouldDisableViewportMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0.76, scale: 0.97, y: 24, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

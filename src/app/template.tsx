"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);

    updateViewport();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateViewport);
      return () => mediaQuery.removeEventListener("change", updateViewport);
    }

    mediaQuery.addListener(updateViewport);
    return () => mediaQuery.removeListener(updateViewport);
  }, []);

  if (shouldReduceMotion || isMobileViewport) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

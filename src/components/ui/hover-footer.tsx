"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
  text,
  duration,
  automatic = false,
  className,
  isDark = false,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  isDark?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();
  const revealMaskId = useId();
  const maskId = useId();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (!svgRef.current) {
      return;
    }

    const svgRect = svgRef.current.getBoundingClientRect();
    const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
    const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;

    if (Number.isFinite(cxPercentage) && Number.isFinite(cyPercentage)) {
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  useEffect(() => {
    if (!automatic || !svgRef.current) {
      return;
    }

    let frameId = 0;
    let start = 0;

    const animate = (time: number) => {
      if (!svgRef.current) {
        return;
      }

      if (!start) {
        start = time;
      }

      const elapsed = (time - start) / 1000;
      const rect = svgRef.current.getBoundingClientRect();
      const x = rect.left + rect.width * (0.5 + Math.cos(elapsed * 0.48) * 0.26);
      const y = rect.top + rect.height * (0.54 + Math.sin(elapsed * 0.72) * 0.18);

      setCursor({ x, y });
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [automatic]);

  const active = hovered || automatic;
  const baseStroke = isDark ? "rgba(121,167,255,0.34)" : "rgba(76,112,173,0.18)";
  const outlineStroke = isDark ? "rgba(98,160,255,0.9)" : "rgba(78,121,196,0.52)";
  const glowFilter = isDark
    ? "drop-shadow(0 0 14px rgba(79,153,255,0.32)) drop-shadow(0 0 38px rgba(79,153,255,0.14))"
    : "drop-shadow(0 0 10px rgba(79,153,255,0.16))";

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 220"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={cn(
        "select-none uppercase",
        automatic ? "cursor-default" : "cursor-pointer",
        className,
      )}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? "#4d7fd3" : "#6b90c7"} stopOpacity={active ? 0.86 : 0.38} />
          <stop offset="35%" stopColor={isDark ? "#66b0ff" : "#84b7f2"} stopOpacity={active ? 0.98 : 0.46} />
          <stop offset="70%" stopColor={isDark ? "#86d3ff" : "#9acbff"} stopOpacity={active ? 0.98 : 0.42} />
          <stop offset="100%" stopColor={isDark ? "#557fcf" : "#7396cb"} stopOpacity={active ? 0.84 : 0.34} />
        </linearGradient>

        <motion.radialGradient
          id={revealMaskId}
          gradientUnits="userSpaceOnUse"
          r={isDark ? "22%" : "20%"}
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>

        <mask id={maskId}>
          <rect x="0" y="0" width="100%" height="100%" fill={`url(#${revealMaskId})`} />
        </mask>
      </defs>

      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={baseStroke}
        strokeWidth="1.08"
        fill="transparent"
        style={{
          fontFamily: "var(--font-hero), serif",
          fontSize: "176px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          opacity: active ? 0.76 : 0.34,
        }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={outlineStroke}
        strokeWidth="1.08"
        fill="transparent"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
        }}
        style={{
          fontFamily: "var(--font-hero), serif",
          fontSize: "176px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          filter: glowFilter,
        }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.08"
        mask={`url(#${maskId})`}
        fill="transparent"
        style={{
          fontFamily: "var(--font-hero), serif",
          fontSize: "176px",
          fontWeight: 800,
          letterSpacing: "0.08em",
          opacity: active ? 0.96 : 0.72,
          filter: glowFilter,
        }}
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = ({
  className,
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) => {
  return (
    <div
      className={cn("absolute inset-0 z-0", className)}
      style={{
        background: isDark
          ? "radial-gradient(125% 125% at 50% 10%, rgba(15,15,17,0.86) 44%, rgba(60,162,250,0.2) 100%)"
          : "radial-gradient(125% 125% at 50% 10%, rgba(245,247,251,0.96) 44%, rgba(60,162,250,0.12) 100%)",
      }}
    />
  );
};

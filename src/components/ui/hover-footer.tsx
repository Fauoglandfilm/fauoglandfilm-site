"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type TextHoverEffectProps = {
  text: string;
  duration?: number;
  className?: string;
  isDark?: boolean;
};

export function TextHoverEffect({
  text,
  duration = 0,
  className,
  isDark = false,
}: TextHoverEffectProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();
  const maskId = useId();
  const revealMaskId = useId();
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

  const baseStroke = isDark ? "rgba(255,244,223,0.14)" : "rgba(36,28,20,0.12)";
  const accentStroke = isDark ? "rgba(234,209,159,0.34)" : "rgba(184,146,84,0.36)";

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
      className={cn("select-none overflow-visible", className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isDark ? "#f8ead0" : "#d7b278"} />
          <stop offset="45%" stopColor={isDark ? "#d7b278" : "#bb8d57"} />
          <stop offset="100%" stopColor={isDark ? "#fff6df" : "#eed5a6"} />
        </linearGradient>

        <motion.radialGradient
          id={revealMaskId}
          gradientUnits="userSpaceOnUse"
          r="24%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration, ease: "easeOut" }}
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
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={baseStroke}
        strokeWidth="1.4"
        fill="transparent"
        style={{
          fontFamily: "var(--font-sora), sans-serif",
          fontSize: "154px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          opacity: hovered ? 0.72 : 0.5,
        }}
      >
        {text}
      </text>

      <motion.text
        x="50%"
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={accentStroke}
        strokeWidth="1.4"
        fill="transparent"
        initial={{ strokeDashoffset: 1200, strokeDasharray: 1200 }}
        animate={{ strokeDashoffset: 0, strokeDasharray: 1200 }}
        transition={{ duration: 4.6, ease: "easeInOut" }}
        style={{
          fontFamily: "var(--font-sora), sans-serif",
          fontSize: "154px",
          fontWeight: 700,
          letterSpacing: "0.16em",
        }}
      >
        {text}
      </motion.text>

      <text
        x="50%"
        y="56%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.4"
        fill="transparent"
        mask={`url(#${maskId})`}
        style={{
          fontFamily: "var(--font-sora), sans-serif",
          fontSize: "154px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          opacity: 0.95,
        }}
      >
        {text}
      </text>
    </svg>
  );
}

export function FooterBackgroundGradient({
  className,
  isDark = false,
}: {
  className?: string;
  isDark?: boolean;
}) {
  return (
    <div
      className={cn("absolute inset-0 z-0", className)}
      style={{
        background: isDark
          ? "radial-gradient(120% 120% at 50% 8%, rgba(255,245,224,0.06) 0%, rgba(215,178,120,0.08) 28%, rgba(8,10,14,0) 64%), linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0) 42%)"
          : "radial-gradient(120% 120% at 50% 8%, rgba(255,250,241,0.9) 0%, rgba(215,178,120,0.14) 30%, rgba(255,255,255,0) 64%), linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0) 42%)",
      }}
    />
  );
}

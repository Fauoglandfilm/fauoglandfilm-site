"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type TextHoverEffectProps = {
  text: string;
  duration?: number;
  className?: string;
  isDark?: boolean;
  variant?: "default" | "footer-outline";
};

export function TextHoverEffect({
  text,
  duration = 0,
  className,
  isDark = false,
  variant = "default",
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

  const isFooterOutline = variant === "footer-outline";
  const baseStroke = isFooterOutline
    ? isDark
      ? "rgba(87,126,196,0.42)"
      : "rgba(58,86,126,0.18)"
    : isDark
      ? "rgba(255,244,223,0.14)"
      : "rgba(36,28,20,0.12)";
  const accentStroke = isFooterOutline
    ? isDark
      ? "rgba(118,171,255,0.82)"
      : "rgba(74,112,176,0.48)"
    : isDark
      ? "rgba(234,209,159,0.34)"
      : "rgba(184,146,84,0.36)";
  const gradientStops = isFooterOutline
    ? isDark
      ? ["#4e75ba", "#77b0ff", "#4a73b8"]
      : ["#5f7faa", "#7195c9", "#486a9f"]
    : isDark
      ? ["#f8ead0", "#d7b278", "#fff6df"]
      : ["#d7b278", "#bb8d57", "#eed5a6"];
  const textOpacity = isFooterOutline ? (hovered ? 0.7 : 0.54) : hovered ? 0.72 : 0.5;
  const strokeWidth = isFooterOutline ? "1.08" : "1.4";

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
          <stop offset="0%" stopColor={gradientStops[0]} />
          <stop offset="45%" stopColor={gradientStops[1]} />
          <stop offset="100%" stopColor={gradientStops[2]} />
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
        strokeWidth={strokeWidth}
        fill="transparent"
        style={{
          fontFamily: "var(--font-sora), sans-serif",
          fontSize: "154px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          opacity: textOpacity,
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
        strokeWidth={strokeWidth}
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
        strokeWidth={strokeWidth}
        fill="transparent"
        mask={`url(#${maskId})`}
        style={{
          fontFamily: "var(--font-sora), sans-serif",
          fontSize: "154px",
          fontWeight: 700,
          letterSpacing: "0.16em",
          opacity: isFooterOutline ? 0.86 : 0.95,
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
          ? "linear-gradient(180deg, rgba(255,255,255,0.028), rgba(255,255,255,0) 28%), radial-gradient(120% 90% at 52% 100%, rgba(64,103,170,0.13) 0%, rgba(8,10,14,0) 62%)"
          : "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0) 30%), radial-gradient(120% 90% at 52% 100%, rgba(85,114,160,0.09) 0%, rgba(255,255,255,0) 62%)",
      }}
    />
  );
}

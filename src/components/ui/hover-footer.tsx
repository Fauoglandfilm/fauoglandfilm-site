"use client";

import { type SVGProps, useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";

import {
  FAU_LAND_LOGO_VIEW_BOX,
} from "@/components/ui/fau-land-logo-paths";
import { cn } from "@/lib/utils";

const DEFAULT_TEXT_VIEW_BOX = "0 0 1200 220";

type TextHoverEffectProps = {
  text?: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  isDark?: boolean;
  paths?: readonly string[];
  viewBox?: string;
  strokeWidth?: number;
};

export const TextHoverEffect = ({
  text = "",
  duration,
  automatic = false,
  className,
  isDark = false,
  paths,
  viewBox,
  strokeWidth,
}: TextHoverEffectProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const gradientId = useId();
  const revealMaskId = useId();
  const maskId = useId();
  const glowLayerOneId = useId();
  const glowLayerTwoId = useId();
  const glowLayerThreeId = useId();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const hoverTransition = {
    duration: 0.42,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  const resolvedPaths = paths?.length ? paths : undefined;
  const isVectorMode = Boolean(resolvedPaths);
  const resolvedViewBox = viewBox ?? (isVectorMode ? FAU_LAND_LOGO_VIEW_BOX : DEFAULT_TEXT_VIEW_BOX);
  const resolvedStrokeWidth = strokeWidth ?? (isVectorMode ? 1.45 : 1.08);

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
    if (!automatic || hovered || !svgRef.current) {
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
  }, [automatic, hovered]);

  const revealActive = hovered || automatic;
  const neonCore = isDark ? "#3ca2fa" : "#eab308";
  const neonMid = isDark ? "#63b8ff" : "#f6c93a";
  const neonOuter = isDark ? "#99d8ff" : "#f8de73";
  const baseStroke = isDark ? "rgba(178,222,255,0.92)" : "rgba(168,116,0,0.94)";
  const outlineStroke = isDark ? "rgba(60,162,250,1)" : "rgba(234,179,8,1)";
  const boostedOutlineStroke = isDark ? "rgba(129,208,255,1)" : "rgba(248,210,74,1)";
  const accentStopA = neonCore;
  const accentStopB = neonMid;
  const accentStopC = neonOuter;
  const glowFilter = isDark
    ? "drop-shadow(0 0 8px rgba(60,162,250,0.95)) drop-shadow(0 0 18px rgba(60,162,250,0.72))"
    : "drop-shadow(0 0 6px rgba(234,179,8,0.5)) drop-shadow(0 0 14px rgba(234,179,8,0.24))";

  const vectorShapeProps = {
    fill: "none",
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
    vectorEffect: "non-scaling-stroke" as const,
  };

  const renderVectorPaths = (
    prefix: string,
    extras: Omit<SVGProps<SVGPathElement>, "d" | "children">,
  ) =>
    resolvedPaths?.map((pathData, index) => (
      <path
        key={`${prefix}-${index}`}
        d={pathData}
        {...vectorShapeProps}
        {...extras}
      />
    ));

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={resolvedViewBox}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className={cn(
        "select-none",
        "cursor-pointer",
        className,
      )}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={accentStopA} stopOpacity={hovered ? 1 : revealActive ? 0.9 : 0.42} />
          <stop offset="34%" stopColor={accentStopB} stopOpacity={hovered ? 1 : revealActive ? 1 : 0.54} />
          <stop offset="68%" stopColor={accentStopC} stopOpacity={hovered ? 1 : revealActive ? 1 : 0.52} />
          <stop offset="100%" stopColor={accentStopA} stopOpacity={hovered ? 0.98 : revealActive ? 0.88 : 0.4} />
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

        <filter id={glowLayerOneId} x="-22%" y="-42%" width="144%" height="184%">
          <feGaussianBlur stdDeviation={4} />
        </filter>

        <filter id={glowLayerTwoId} x="-34%" y="-62%" width="168%" height="224%">
          <feGaussianBlur stdDeviation={10} />
        </filter>

        <filter id={glowLayerThreeId} x="-44%" y="-86%" width="188%" height="272%">
          <feGaussianBlur stdDeviation={20} />
        </filter>
      </defs>

      {isVectorMode ? (
        <>
          <motion.g
            animate={{ opacity: isDark ? 0.34 : 0.18 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerThreeId})`}
          >
            {renderVectorPaths("glow-3", {
              stroke: neonCore,
              strokeWidth: resolvedStrokeWidth * 9.2,
            })}
          </motion.g>

          <motion.g
            animate={{ opacity: isDark ? 0.62 : 0.3 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerTwoId})`}
          >
            {renderVectorPaths("glow-2", {
              stroke: neonMid,
              strokeWidth: resolvedStrokeWidth * 5.4,
            })}
          </motion.g>

          <motion.g
            animate={{ opacity: isDark ? 0.84 : 0.52 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerOneId})`}
          >
            {renderVectorPaths("glow-1", {
              stroke: neonOuter,
              strokeWidth: resolvedStrokeWidth * 2.9,
            })}
          </motion.g>

          <motion.g
            animate={{ opacity: 1 }}
            transition={hoverTransition}
          >
            {renderVectorPaths("base", {
              stroke: baseStroke,
              strokeWidth: resolvedStrokeWidth,
            })}
          </motion.g>

          <motion.g
            animate={{ opacity: 0.92 }}
            transition={hoverTransition}
            style={{ filter: glowFilter }}
          >
            {resolvedPaths?.map((pathData, index) => (
              <motion.path
                key={`motion-${index}`}
                d={pathData}
                {...vectorShapeProps}
                stroke={outlineStroke}
                strokeWidth={resolvedStrokeWidth * 1.08}
                initial={{ pathLength: 0, opacity: 0.78 }}
                animate={{ pathLength: 1, opacity: 0.92 }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.025,
                }}
              />
            ))}
          </motion.g>

          <motion.g
            mask={`url(#${maskId})`}
            animate={{ opacity: hovered ? 0.9 : 0 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerThreeId})`}
          >
            {renderVectorPaths("hover-bloom-3", {
              stroke: neonCore,
              strokeWidth: resolvedStrokeWidth * 10.4,
            })}
          </motion.g>

          <motion.g
            mask={`url(#${maskId})`}
            animate={{ opacity: hovered ? (isDark ? 0.82 : 0.46) : 0 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerTwoId})`}
          >
            {renderVectorPaths("hover-bloom-2", {
              stroke: neonMid,
              strokeWidth: resolvedStrokeWidth * 6.2,
            })}
          </motion.g>

          <motion.g
            mask={`url(#${maskId})`}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerOneId})`}
          >
            {renderVectorPaths("hover-core", {
              stroke: boostedOutlineStroke,
              strokeWidth: resolvedStrokeWidth * 2.2,
            })}
          </motion.g>

          <motion.g
            mask={`url(#${maskId})`}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={hoverTransition}
            filter={`url(#${glowLayerOneId})`}
          >
            {renderVectorPaths("accent", {
              stroke: `url(#${gradientId})`,
              strokeWidth: resolvedStrokeWidth * 1.24,
            })}
          </motion.g>
        </>
      ) : (
        <>
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke={baseStroke}
            strokeWidth={resolvedStrokeWidth}
            fill="transparent"
            style={{
              fontFamily: "var(--font-hero), serif",
              fontSize: "176px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              opacity: revealActive ? 0.76 : 0.34,
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
            strokeWidth={resolvedStrokeWidth}
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
            strokeWidth={resolvedStrokeWidth}
            mask={`url(#${maskId})`}
            fill="transparent"
            style={{
              fontFamily: "var(--font-hero), serif",
              fontSize: "176px",
              fontWeight: 800,
              letterSpacing: "0.08em",
              opacity: revealActive ? 0.96 : 0.72,
              filter: glowFilter,
            }}
          >
            {text}
          </text>
        </>
      )}
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

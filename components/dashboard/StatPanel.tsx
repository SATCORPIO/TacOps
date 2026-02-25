"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { panelVariant } from "@/lib/animations";

interface StatPanelProps {
  label: string;
  value: number;
  sublabel?: string;
  accent?: "gold" | "red" | "green";
  suffix?: string;
}

function useAnimatedNumber(target: number, duration = 1200) {
  const [display, setDisplay] = useState(0);
  const startRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    startRef.current = display;
    startTimeRef.current = null;
    const step = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startRef.current + (target - startRef.current) * eased));
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target]);

  return display;
}

const ACCENT_COLORS = { gold: "#9F8750", red: "#7A0C14", green: "#1F5133" };

export function StatPanel({ label, value, sublabel, accent = "gold", suffix = "" }: StatPanelProps) {
  const display = useAnimatedNumber(value);
  const accentColor = ACCENT_COLORS[accent];

  return (
    <motion.div
      variants={panelVariant}
      className="relative flex flex-col justify-between p-4 border overflow-hidden"
      style={{ backgroundColor: "#0B0F14", borderColor: "#9F8750", borderWidth: "1px", minHeight: "100px" }}
      whileHover={{ backgroundColor: "#0d1118" }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute top-0 right-0 w-4 h-4" style={{ background: `linear-gradient(135deg, transparent 50%, ${accentColor}40 50%)` }} />

      <span className="text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>
        {label}
      </span>

      <div className="flex items-end gap-1 mt-2">
        <span className="text-4xl font-bold tabular-nums leading-none" style={{ fontFamily: "'Courier New', monospace", color: "#E5E7EB" }}>
          {display}
        </span>
        {suffix && <span className="text-sm mb-1" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{suffix}</span>}
      </div>

      {sublabel && (
        <span className="text-[9px] tracking-widest uppercase mt-1" style={{ color: accentColor, fontFamily: "'Courier New', monospace" }}>
          {sublabel}
        </span>
      )}

      <div className="absolute bottom-0 left-0 h-px" style={{ width: "40%", backgroundColor: accentColor, opacity: 0.5 }} />
    </motion.div>
  );
}

const THREAT_LABELS = ["MINIMAL", "LOW", "MODERATE", "ELEVATED", "CRITICAL"];
const THREAT_COLORS = ["#1F5133", "#2a5c2a", "#78520a", "#9F8750", "#5E0B12"];

export function ThreatLevelPanel({ level }: { level: number }) {
  return (
    <motion.div
      variants={panelVariant}
      className="relative flex flex-col p-4 border overflow-hidden"
      style={{ backgroundColor: "#0B0F14", borderColor: "#9F8750", borderWidth: "1px", minHeight: "100px" }}
    >
      <div className="absolute top-0 right-0 w-4 h-4" style={{ background: `linear-gradient(135deg, transparent 50%, ${THREAT_COLORS[level - 1]}60 50%)` }} />

      <span className="text-[9px] tracking-[0.25em] uppercase font-medium" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>
        Threat Level
      </span>

      <div className="flex items-center gap-2 mt-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 h-4"
            style={{
              backgroundColor: i < level ? THREAT_COLORS[level - 1] : "#1a1f26",
              border: `1px solid ${i < level ? THREAT_COLORS[level - 1] : "#9F875030"}`,
            }}
            animate={i < level ? { opacity: [0.7, 1, 0.7] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-bold tracking-widest uppercase" style={{ color: THREAT_COLORS[level - 1], fontFamily: "'Courier New', monospace" }}>
          {THREAT_LABELS[level - 1]}
        </span>
        <span className="text-[9px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>
          TIER {level}/5
        </span>
      </div>
    </motion.div>
  );
}

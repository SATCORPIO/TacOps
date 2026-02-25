"use client";

import { motion } from "framer-motion";

interface StatusIndicatorProps {
  status: "secure" | "alert" | "pending" | "offline";
  label: string;
  size?: "sm" | "md";
}

const STATUS_CONFIG = {
  secure:  { text: "#4ade80" },
  alert:   { text: "#f87171" },
  pending: { text: "#fbbf24" },
  offline: { text: "#6B7280" },
};

export function StatusIndicator({ status, label, size = "md" }: StatusIndicatorProps) {
  const cfg = STATUS_CONFIG[status];
  const dotSize = size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2";

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        <motion.div
          className={`${dotSize} rounded-full`}
          style={{ backgroundColor: cfg.text }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute ${dotSize} rounded-full`}
          style={{ backgroundColor: cfg.text }}
          animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span
        className={`font-mono tracking-widest ${size === "sm" ? "text-[9px]" : "text-[10px]"} font-medium uppercase`}
        style={{ color: cfg.text }}
      >
        {label}
      </span>
    </div>
  );
}

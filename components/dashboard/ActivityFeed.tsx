"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { panelVariant, feedItemVariant } from "@/lib/animations";
import type { ActivityEntry } from "@/lib/mockData";

const STATUS_COLORS = { nominal: "#1F5133", alert: "#7A0C14", pending: "#78520a" };
const STATUS_TEXT   = { nominal: "#4ade80", alert: "#f87171", pending: "#fbbf24" };

export function ActivityFeed({ entries }: { entries: ActivityEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [entries.length]);

  return (
    <motion.div
      variants={panelVariant}
      className="relative flex flex-col border overflow-hidden"
      style={{ backgroundColor: "#0B0F14", borderColor: "#9F8750", height: "100%", minHeight: "360px" }}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "#9F875050" }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4ade80" }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "#9F8750", fontFamily: "'Courier New', monospace" }}>Live Intelligence Feed</span>
        </div>
        <span className="text-[9px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{entries.length} ENTRIES</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              variants={feedItemVariant}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
              className="flex gap-3 px-4 py-2.5 border-b cursor-default"
              style={{ borderColor: "#9F875018" }}
              whileHover={{ backgroundColor: "#0d1118" }}
            >
              <div className="flex flex-col items-center pt-1.5 gap-1">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: STATUS_TEXT[entry.status] }}
                  animate={entry.status === "alert" ? { opacity: [1, 0.2, 1] } : {}}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
                <div className="w-px flex-1" style={{ backgroundColor: "#9F875020", minHeight: "12px" }} />
              </div>

              <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] tracking-widest uppercase" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{entry.timestamp}</span>
                  <span
                    className="text-[8px] tracking-widest uppercase px-1.5 py-0.5"
                    style={{ color: STATUS_TEXT[entry.status], backgroundColor: `${STATUS_COLORS[entry.status]}30`, border: `1px solid ${STATUS_COLORS[entry.status]}60`, fontFamily: "'Courier New', monospace" }}
                  >
                    {entry.status}
                  </span>
                </div>
                <p className="text-[10px] leading-relaxed tracking-wide truncate" style={{ color: "#E5E7EB", fontFamily: "'Courier New', monospace" }}>
                  {entry.message}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none" style={{ background: "linear-gradient(transparent, #0B0F14)" }} />
    </motion.div>
  );
}

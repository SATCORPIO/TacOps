"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { StatusIndicator } from "./StatusIndicator";
import { fadeIn } from "@/lib/animations";

export function CommandHeader() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "2-digit" }).toUpperCase());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="relative flex items-center justify-between px-6 py-3 border-b"
      style={{ borderColor: "#9F8750", backgroundColor: "#050507", background: "linear-gradient(180deg, #0B0F14 0%, #050507 100%)" }}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center border" style={{ borderColor: "#9F8750" }}>
              <div className="w-3 h-3" style={{ backgroundColor: "#7A0C14" }} />
            </div>
            <span className="text-lg font-bold tracking-[0.3em] uppercase" style={{ fontFamily: "'Courier New', monospace", color: "#E5E7EB", letterSpacing: "0.35em" }}>
              SATCORP
            </span>
            <span className="text-sm tracking-[0.25em] uppercase" style={{ color: "#9F8750", fontFamily: "'Courier New', monospace" }}>
              COMMAND
            </span>
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase ml-9 mt-0.5" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>
            We Solve What Others Cannot.
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-6">
        <StatusIndicator status="secure" label="NETWORK SECURE" />
        <div className="w-px h-4" style={{ backgroundColor: "#9F8750", opacity: 0.4 }} />
        <StatusIndicator status="secure" label="ENCRYPTION ACTIVE" />
        <div className="w-px h-4" style={{ backgroundColor: "#9F8750", opacity: 0.4 }} />
        <StatusIndicator status="pending" label="RELAY SYNCING" />
      </div>

      <div className="flex flex-col items-end gap-0.5">
        <span className="text-xl font-bold tracking-widest tabular-nums" style={{ fontFamily: "'Courier New', monospace", color: "#E5E7EB" }}>
          {time}
        </span>
        <span className="text-[9px] tracking-widest" style={{ fontFamily: "'Courier New', monospace", color: "#6B7280" }}>
          {date} · UTC+00
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #9F8750 20%, #9F8750 80%, transparent)", opacity: 0.6 }} />
    </motion.header>
  );
}

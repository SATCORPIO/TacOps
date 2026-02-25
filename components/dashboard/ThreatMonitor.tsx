"use client";

import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { panelVariant } from "@/lib/animations";
import { THREAT_REGIONS } from "@/lib/mockData";

const LEVEL_COLORS: Record<string, string> = { CRITICAL: "#7A0C14", ELEVATED: "#9F8750", MODERATE: "#78520a", WATCH: "#1F5133" };
const LEVEL_TEXT:   Record<string, string> = { CRITICAL: "#f87171", ELEVATED: "#fbbf24", MODERATE: "#fb923c", WATCH: "#4ade80" };

export function ThreatMonitor({ threatScore }: { threatScore: number }) {
  const data = [{ value: threatScore, fill: threatScore > 70 ? "#7A0C14" : threatScore > 40 ? "#9F8750" : "#1F5133" }];

  return (
    <motion.div
      variants={panelVariant}
      className="relative flex flex-col border overflow-hidden"
      style={{ backgroundColor: "#0B0F14", borderColor: "#9F8750", height: "100%", minHeight: "360px" }}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "#9F875050" }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#f87171" }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "#9F8750", fontFamily: "'Courier New', monospace" }}>Threat Monitor</span>
        </div>
        <span className="text-[9px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>GLOBAL RISK</span>
      </div>

      <div className="relative flex justify-center items-center pt-2" style={{ height: "150px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart cx="50%" cy="80%" innerRadius="55%" outerRadius="80%" barSize={10} data={data} startAngle={180} endAngle={0}>
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background={{ fill: "#1a1f26" }} dataKey="value" cornerRadius={0} angleAxisId={0} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute bottom-4 flex flex-col items-center">
          <span className="text-3xl font-bold tabular-nums" style={{ fontFamily: "'Courier New', monospace", color: "#E5E7EB" }}>{threatScore}</span>
          <span className="text-[8px] tracking-widest uppercase" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>RISK INDEX</span>
        </div>
      </div>

      <div className="mx-4 h-px" style={{ backgroundColor: "#9F875030" }} />

      <div className="flex flex-col px-4 py-2 gap-1 overflow-y-auto flex-1">
        <span className="text-[8px] tracking-[0.3em] uppercase mb-1" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>Flagged Regions</span>
        {THREAT_REGIONS.map((region, i) => (
          <motion.div
            key={region.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="flex items-center justify-between py-1.5 border-b"
            style={{ borderColor: "#9F875018" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-4" style={{ backgroundColor: LEVEL_COLORS[region.level] }} />
              <div className="flex flex-col">
                <span className="text-[10px] tracking-wide" style={{ color: "#E5E7EB", fontFamily: "'Courier New', monospace" }}>{region.region}</span>
                <span className="text-[8px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{region.code}</span>
              </div>
            </div>
            <span
              className="text-[8px] tracking-widest uppercase px-1.5 py-0.5"
              style={{ color: LEVEL_TEXT[region.level], backgroundColor: `${LEVEL_COLORS[region.level]}30`, border: `1px solid ${LEVEL_COLORS[region.level]}60`, fontFamily: "'Courier New', monospace" }}
            >
              {region.level}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

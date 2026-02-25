"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { panelVariant } from "@/lib/animations";

interface ChartDataPoint { time: string; intercepts: number; assets: number; threats: number; }

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-2 border" style={{ backgroundColor: "#050507", borderColor: "#9F8750", fontFamily: "'Courier New', monospace" }}>
      <p className="text-[9px] tracking-widest mb-1" style={{ color: "#9F8750" }}>{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-[9px] tracking-wide" style={{ color: entry.color }}>
          {entry.name.toUpperCase()}: {entry.value}
        </p>
      ))}
    </div>
  );
};

export function IntelligenceChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <motion.div
      variants={panelVariant}
      className="relative border overflow-hidden"
      style={{ backgroundColor: "#0B0F14", borderColor: "#9F8750" }}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "#9F875050" }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4ade80" }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "#9F8750", fontFamily: "'Courier New', monospace" }}>Intelligence Trend Analysis</span>
        </div>
        <div className="flex items-center gap-4">
          {[{ label: "INTERCEPTS", color: "#9F8750" }, { label: "ASSETS", color: "#4ade80" }, { label: "THREATS", color: "#f87171" }].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className="w-3 h-px" style={{ backgroundColor: item.color }} />
              <span className="text-[8px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-4" style={{ height: "200px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="1 4" stroke="#9F875015" vertical={false} />
            <XAxis dataKey="time" tick={{ fill: "#6B7280", fontSize: 8, fontFamily: "'Courier New', monospace" }} axisLine={{ stroke: "#9F875030" }} tickLine={false} interval="preserveStartEnd" />
            <YAxis tick={{ fill: "#6B7280", fontSize: 8, fontFamily: "'Courier New', monospace" }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="intercepts" stroke="#9F8750" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: "#9F8750", stroke: "none" }} />
            <Line type="monotone" dataKey="assets"     stroke="#4ade80" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: "#4ade80", stroke: "none" }} />
            <Line type="monotone" dataKey="threats"    stroke="#f87171" strokeWidth={1.5} dot={false} activeDot={{ r: 3, fill: "#f87171", stroke: "none" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

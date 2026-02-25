"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { panelVariant } from "@/lib/animations";
import { MAP_NODES } from "@/lib/mockData";

export function OperationsMap() {
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [pingNodes, setPingNodes] = useState<number[]>([]);

  useEffect(() => {
    const id = setInterval(() => {
      const nodeId = MAP_NODES[Math.floor(Math.random() * MAP_NODES.length)].id;
      setPingNodes((prev) => [...prev, nodeId]);
      setTimeout(() => setPingNodes((prev) => prev.filter((n) => n !== nodeId)), 2000);
    }, 1200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      variants={panelVariant}
      className="relative border overflow-hidden"
      style={{ backgroundColor: "#0B0F14", borderColor: "#9F8750" }}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "#9F875050" }}>
        <div className="flex items-center gap-2">
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4ade80" }} animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-[9px] tracking-[0.3em] uppercase font-medium" style={{ color: "#9F8750", fontFamily: "'Courier New', monospace" }}>Global Operations Network</span>
        </div>
        <div className="flex items-center gap-4">
          {[{ label: "ACTIVE", color: "#4ade80" }, { label: "STANDBY", color: "#6B7280" }].map((item) => (
            <span key={item.label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[8px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{item.label}</span>
            </span>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden" style={{ height: "220px" }}>
        <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(#9F875008 1px, transparent 1px), linear-gradient(90deg, #9F875008 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
        {[25, 50, 75].map((y) => <div key={y} className="absolute left-0 right-0 h-px" style={{ top: `${y}%`, backgroundColor: "#9F875012" }} />)}

        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
          {MAP_NODES.filter((n) => n.active).flatMap((node) =>
            MAP_NODES.filter((n) => n.active && n.id > node.id).map((target) => (
              <motion.line key={`${node.id}-${target.id}`} x1={`${node.x}%`} y1={`${node.y}%`} x2={`${target.x}%`} y2={`${target.y}%`} stroke="#9F8750" strokeWidth="0.5" strokeDasharray="3 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: "linear" }} />
            ))
          )}
        </svg>

        {MAP_NODES.map((node) => {
          const isPinging = pingNodes.includes(node.id);
          const color = node.active ? "#4ade80" : "#6B7280";
          return (
            <div key={node.id} className="absolute cursor-pointer" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }} onMouseEnter={() => setActiveNode(node.id)} onMouseLeave={() => setActiveNode(null)}>
              <AnimatePresence>
                {isPinging && (
                  <motion.div className="absolute rounded-full border" style={{ borderColor: color, top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} initial={{ width: 4, height: 4, opacity: 0.8 }} animate={{ width: 24, height: 24, opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} />
                )}
              </AnimatePresence>

              <div className="w-2 h-2 rounded-full border" style={{ backgroundColor: node.active ? "#1F5133" : "#1a1f26", borderColor: color, boxShadow: node.active ? `0 0 6px ${color}80` : "none" }} />

              <AnimatePresence>
                {activeNode === node.id && (
                  <motion.div initial={{ opacity: 0, y: -2 }} animate={{ opacity: 1, y: -4 }} exit={{ opacity: 0 }} className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 border" style={{ backgroundColor: "#050507", borderColor: "#9F8750", fontFamily: "'Courier New', monospace", fontSize: "8px", color: "#E5E7EB", letterSpacing: "0.15em", zIndex: 10 }}>
                    {node.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {node.active && activeNode !== node.id && (
                <span className="absolute top-3 left-1/2 -translate-x-1/2 whitespace-nowrap" style={{ fontFamily: "'Courier New', monospace", fontSize: "7px", color: "#9F875070", letterSpacing: "0.1em" }}>
                  {node.label}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between px-4 py-2 border-t" style={{ borderColor: "#9F875030" }}>
        <span className="text-[8px] tracking-widest" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>{MAP_NODES.filter((n) => n.active).length} ACTIVE NODES · {MAP_NODES.filter((n) => !n.active).length} STANDBY</span>
        <span className="text-[8px] tracking-widest uppercase" style={{ color: "#9F8750", fontFamily: "'Courier New', monospace" }}>GLOBAL COVERAGE</span>
      </div>
    </motion.div>
  );
}

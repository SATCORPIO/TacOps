"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CommandHeader } from "@/components/dashboard/CommandHeader";
import { StatPanel, ThreatLevelPanel } from "@/components/dashboard/StatPanel";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ThreatMonitor } from "@/components/dashboard/ThreatMonitor";
import { IntelligenceChart } from "@/components/dashboard/IntelligenceChart";
import { OperationsMap } from "@/components/dashboard/OperationsMap";
import { staggerContainer, panelVariant } from "@/lib/animations";
import {
  INITIAL_STATS,
  INITIAL_FEED,
  generateChartData,
  createActivityEntry,
  type ActivityEntry,
} from "@/lib/mockData";

export default function DashboardPage() {
  const [stats, setStats] = useState(INITIAL_STATS);
  const [feed, setFeed] = useState<ActivityEntry[]>(INITIAL_FEED);
  const [chartData, setChartData] = useState(generateChartData(20));
  const [threatScore, setThreatScore] = useState(62);

  useEffect(() => {
    const id = setInterval(() => {
      setStats((prev) => ({
        activeOperations: prev.activeOperations + Math.floor(Math.random() * 3) - 1,
        globalAssets: prev.globalAssets + Math.floor(Math.random() * 5) - 2,
        secureChannels: prev.secureChannels + Math.floor(Math.random() * 3) - 1,
        threatLevel: Math.min(5, Math.max(1, prev.threatLevel + (Math.random() > 0.85 ? 1 : Math.random() > 0.85 ? -1 : 0))),
      }));
      setThreatScore((prev) => {
        const delta = (Math.random() - 0.5) * 8;
        return Math.min(95, Math.max(15, prev + delta));
      });
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      const newEntry = createActivityEntry();
      setFeed((prev) => [newEntry, ...prev.slice(0, 29)]);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setChartData((prev) => {
        const newEntry = generateChartData(1)[0];
        return [...prev.slice(1), newEntry];
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ backgroundColor: "#050507" }}
    >
      <div
        className="fixed inset-0 pointer-events-none z-50"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.4,
        }}
      />

      <CommandHeader />

      <main className="flex-1 p-4 lg:p-5 flex flex-col gap-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <motion.div variants={panelVariant} className="flex flex-col gap-3">
            <motion.div className="flex flex-col gap-3" variants={staggerContainer}>
              <motion.div variants={panelVariant}>
                <StatPanel label="Active Operations" value={stats.activeOperations} sublabel="Ops in field" accent="gold" />
              </motion.div>
              <motion.div variants={panelVariant}>
                <StatPanel label="Global Assets Deployed" value={stats.globalAssets} sublabel="Personnel + hardware" accent="green" />
              </motion.div>
              <motion.div variants={panelVariant}>
                <StatPanel label="Secure Channels Active" value={stats.secureChannels} sublabel="Encrypted links" accent="gold" />
              </motion.div>
              <motion.div variants={panelVariant}>
                <ThreatLevelPanel level={stats.threatLevel} />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={panelVariant}>
            <ActivityFeed entries={feed} />
          </motion.div>

          <motion.div variants={panelVariant}>
            <ThreatMonitor threatScore={Math.round(threatScore)} />
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <motion.div variants={panelVariant}>
            <IntelligenceChart data={chartData} />
          </motion.div>
          <motion.div variants={panelVariant}>
            <OperationsMap />
          </motion.div>
        </motion.div>

        <motion.div
          variants={panelVariant}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between px-4 py-2 border"
          style={{ borderColor: "#9F875030", backgroundColor: "#0B0F14" }}
        >
          <span className="text-[8px] tracking-[0.3em] uppercase" style={{ color: "#6B7280", fontFamily: "'Courier New', monospace" }}>
            SATCORP TACTICAL CONCIERGE · CLASSIFICATION: OMEGA-7 · UNAUTHORIZED ACCESS PROSECUTED
          </span>
          <span className="text-[8px] tracking-widest uppercase" style={{ color: "#9F875060", fontFamily: "'Courier New', monospace" }}>
            SESSION ACTIVE
          </span>
        </motion.div>
      </main>
    </div>
  );
}

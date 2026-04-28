/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState, useEffect } from "react";
import { ATTACK_NODES, EVENT_LOG, VULNS, type Severity } from "../data";
import { useLang } from "../LangContext";
import { i18n } from "../i18n";

type NodeState = "idle" | "scanning" | "found";

const SEV_BORDER: Record<Severity, string> = {
  critical: "#dc2626",
  high:     "#ea580c",
  medium:   "#eab308",
  low:      "#60a5fa",
};
const SEV_BG: Record<Severity, string> = {
  critical: "#7f1d1d",
  high:     "#431407",
  medium:   "#422006",
  low:      "#172554",
};
const SEV_TEXT: Record<Severity, string> = {
  critical: "#dc2626",
  high:     "#ea580c",
  medium:   "#eab308",
  low:      "#60a5fa",
};

// timeline: [nodeId, toState, delayMs]
const TIMELINE: [number, NodeState, number][] = [
  [0, "scanning", 400],
  [1, "scanning", 700],
  [2, "scanning", 1000],
  [3, "scanning", 1300],
  [4, "scanning", 1600],
  [5, "scanning", 1900],
  [6, "scanning", 2200],
  [7, "scanning", 2500],
  [1, "found",   3000],  // IDOR /check_balance
  [7, "found",   3400],  // IDOR /transactions
  [2, "found",   3800],  // SSRF
  [6, "found",   4200],  // virtual card IDOR
  [4, "found",   4600],  // negative transfer
  [0, "found",   5000],  // SQL injection
  [3, "found",   5400],  // account takeover
  [5, "found",   5800],  // negative bill payment
];

export default function TheScan() {
  const [nodeStates, setNodeStates] = useState<NodeState[]>(
    Array(ATTACK_NODES.length).fill("idle")
  );
  const [logVisible, setLogVisible] = useState<number>(0);
  const [vulnVisible, setVulnVisible] = useState<number>(0);
  const { lang } = useLang();
  const t = i18n[lang];

  // Attack surface animation
  useEffect(() => {
    const timers = TIMELINE.map(([id, state, delay]) =>
      setTimeout(() => {
        setNodeStates((prev) => {
          const next = [...prev];
          next[id] = state;
          return next;
        });
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Event log animation
  useEffect(() => {
    const timers = EVENT_LOG.map((_, i) =>
      setTimeout(() => setLogVisible(i + 1), 500 + i * 420)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // Vuln table rows animation — starts at 3000ms, one per 500ms
  useEffect(() => {
    const sorted = [...VULNS].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const timers = sorted.map((_, i) =>
      setTimeout(() => setVulnVisible(i + 1), 3000 + i * 500)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const sortedVulns = [...VULNS].sort((a, b) => a.timestamp.localeCompare(b.timestamp));

  return (
    <div
      className="min-h-[calc(100vh-116px)] grid grid-cols-1 lg:grid-cols-2 gap-0"
      style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
    >

      {/* ── Left: Attack surface map ── */}
      <div className="bg-[#0a0800] border-r border-[#2a2415] flex flex-col p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="text-[#8a7d5a] text-[0.6rem] tracking-[0.25em] mb-1">{t.attackSurfaceMap}</div>
          <div className="text-[#f0d8a0] font-bold">vulnbank.org</div>
        </div>

        {/* Chef's quip */}
        <div
          className="text-[#8a7d5a] text-xs italic mb-5"
          style={{ fontFamily: '"Playfair Display", serif', fontStyle: "italic" }}
        >
          &ldquo;{t.chefQuip}&rdquo;
        </div>

        {/* Node grid */}
        <div className="grid grid-cols-2 gap-2 flex-1">
          {ATTACK_NODES.map((node) => {
            const state = nodeStates[node.id];
            const isFound = state === "found";
            const isScanning = state === "scanning";
            const sev = node.severity;

            return (
              <div
                key={node.id}
                className="relative p-3 border text-[0.7rem] transition-all duration-500 rounded-sm"
                style={{
                  borderColor: isFound
                    ? SEV_BORDER[sev]
                    : isScanning
                    ? "rgba(232,138,21,0.5)"
                    : "#2a2415",
                  background: isFound ? SEV_BG[sev] : "#141209",
                  opacity: state === "idle" ? 0.4 : 1,
                  animation: isScanning ? "scanPulse 1s ease-in-out infinite" : undefined,
                }}
              >
                {/* Method badge */}
                <div className="text-[#60a5fa] text-[0.55rem] mb-1">{node.method}</div>

                {/* Endpoint */}
                <div
                  className="font-bold break-all leading-tight mb-1.5"
                  style={{ color: isFound ? "#fff" : "#94a3b8" }}
                >
                  {node.label}
                </div>

                {/* Severity badge */}
                {isFound && (
                  <div
                    className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[0.55rem] font-bold rounded tracking-wider"
                    style={{
                      background: SEV_BG[sev],
                      color: SEV_TEXT[sev],
                      border: `1px solid ${SEV_BORDER[sev]}`,
                    }}
                  >
                    {sev.toUpperCase()} {node.cvss}
                  </div>
                )}

                {/* Scanning indicator */}
                {isScanning && (
                  <div className="text-[#e88a15] text-[0.6rem] mt-1">{t.scanning}</div>
                )}

                {/* SSRF chain badge */}
                {isFound && node.id === 2 && (
                  <div className="mt-1 text-[0.55rem] text-[#a78bfa] font-bold">
                    → jwt_secret → admin JWT
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Scan legend */}
        <div className="mt-4 flex gap-4 text-[0.6rem] text-[#4a4230]">
          <span><span className="text-[#e88a15]">■</span> {t.scanLegend.scanning}</span>
          <span><span className="text-[#dc2626]">■</span> {t.scanLegend.critical}</span>
          <span><span className="text-[#ea580c]">■</span> {t.scanLegend.high}</span>
        </div>
      </div>

      {/* ── Right: Event log + vuln table ── */}
      <div className="bg-[#0f1117] flex flex-col overflow-hidden">
        {/* Dashboard chrome */}
        <div className="bg-[#1a1d27] border-b border-[#2d3147] px-5 py-3 flex items-center gap-3">
          <span className="text-[#22c55e] font-bold text-sm tracking-widest">STRIX</span>
          <span className="text-[#64748b] text-sm">/ vulnbank-2026-04-21</span>
          <span
            className="ml-auto px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1.5"
            style={{ background: "#1e3a2f", color: "#22c55e" }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e]"
              style={{ animation: "pulse 1.5s infinite" }}
            />
            running
          </span>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden p-4 gap-3">

          {/* Event log */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg flex-shrink-0">
            <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider px-3 pt-3 pb-2 flex items-center gap-2 border-b border-[#2d3147]">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e]"
                style={{ animation: "pulse 1.5s infinite" }}
              />
              {t.liveEvents}
            </div>
            <div className="p-3 h-44 overflow-y-auto">
              {EVENT_LOG.slice(0, logVisible).map((entry, i) => (
                <div
                  key={i}
                  className="flex gap-3 text-[0.72rem] py-0.5 border-b border-[#2d3147]/40 last:border-b-0"
                  style={{ animation: "fadeUp 0.25s ease forwards" }}
                >
                  <span className="text-[#64748b] flex-shrink-0 w-11">{entry.t}</span>
                  <span
                    className="flex-1"
                    style={{
                      color:
                        entry.type === "finding"
                          ? entry.severity === "critical" ? "#dc2626" : "#ea580c"
                          : entry.type === "success"
                          ? "#22c55e"
                          : "#60a5fa",
                      fontWeight: entry.type === "finding" ? "700" : "400",
                    }}
                  >
                    {entry.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Vuln table */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg flex-1 overflow-hidden">
            <table className="w-full text-[0.72rem]" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr className="border-b border-[#2d3147]">
                  {t.tableHeaders.map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-[0.6rem] uppercase tracking-widest"
                      style={{ color: "#64748b" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedVulns.slice(0, vulnVisible).map((v, i) => (
                  <tr
                    key={v.id}
                    className="border-b border-[#2d3147] last:border-b-0"
                    style={{
                      animation: "fadeUp 0.3s ease forwards",
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                    }}
                  >
                    <td className="px-3 py-2">
                      <span
                        className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold uppercase tracking-wider"
                        style={{
                          background: SEV_BG[v.severity],
                          color: SEV_TEXT[v.severity],
                        }}
                      >
                        {v.severity}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div
                        className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap max-w-[180px]"
                        style={{ color: "#e2e8f0" }}
                        title={v.title}
                      >
                        {v.title.length > 38 ? v.title.slice(0, 38) + "…" : v.title}
                      </div>
                      {v.cwe && (
                        <div style={{ color: "#64748b", fontSize: "0.65rem" }}>{v.cwe}</div>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <code style={{ color: "#64748b", fontSize: "0.65rem" }}>
                        {v.endpoint.length > 22 ? v.endpoint.slice(0, 22) + "…" : v.endpoint}
                      </code>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className="font-bold"
                        style={{ color: SEV_TEXT[v.severity] }}
                      >
                        {v.cvss}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Scanning keyframe */}
      <style>{`
        @keyframes scanPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,138,21,0.0); }
          50%       { box-shadow: 0 0 8px 2px rgba(232,138,21,0.3); }
        }
      `}</style>
    </div>
  );
}

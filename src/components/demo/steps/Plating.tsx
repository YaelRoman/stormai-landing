/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useLang } from "../LangContext";
import { i18n } from "../i18n";
import { VULNS, RUN_STATS, type Severity } from "../data";

const SEV_BG:   Record<Severity, string> = { critical:"#7f1d1d", high:"#431407", medium:"#422006", low:"#172554" };
const SEV_TEXT: Record<Severity, string> = { critical:"#dc2626", high:"#ea580c", medium:"#eab308", low:"#60a5fa" };

const sortedVulns = [...VULNS].sort((a, b) => {
  const order: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
  return order[a.severity] - order[b.severity] || b.cvss - a.cvss;
});

export default function Plating() {
  const { lang } = useLang();
  const t = i18n[lang];

  return (
    <div
      className="min-h-[calc(100vh-116px)] bg-[#0f1117] flex flex-col"
      style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
    >
      {/* Dashboard header */}
      <div className="bg-[#1a1d27] border-b border-[#2d3147] px-5 py-3 flex items-center gap-3">
        <span className="text-[#22c55e] font-bold text-sm tracking-widest">STRIX</span>
        <span className="text-[#64748b] text-sm">/ vulnbank-2026-04-21</span>
        <span
          className="ml-auto px-2 py-0.5 rounded text-xs font-bold"
          style={{ background: "#1e293b", color: "#64748b" }}
        >
          {t.completed}
        </span>
      </div>

      <div className="flex-1 p-5">
        {/* Chef's note banner */}
        <div
          className="border border-[#4a3e25] bg-[#1e1b12] px-5 py-3 mb-5 flex items-start gap-3"
        >
          <span className="text-xl flex-shrink-0">🍽️</span>
          <div>
            <div className="text-[#8a7d5a] text-[0.6rem] tracking-[0.2em] mb-1">{t.chefPresLabel}</div>
            <div
              className="text-[#e8a030] text-sm italic"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              &ldquo;{t.chefPresText}&rdquo;
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {/* Findings breakdown */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4 col-span-2">
            <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{t.findingsLabel}</div>
            <div className="flex gap-2 mb-3 flex-wrap">
              {(["critical","high"] as Severity[]).map((sev) => (
                <span
                  key={sev}
                  className="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
                  style={{ background: SEV_BG[sev], color: SEV_TEXT[sev] }}
                >
                  {RUN_STATS.bySeverity[sev]} {sev}
                </span>
              ))}
              <span
                className="px-2 py-1 rounded text-xs font-bold uppercase tracking-wider"
                style={{ background: "#1e293b", color: "#22c55e" }}
              >
                {t.falsePosLabel}
              </span>
            </div>
            {/* Severity bar */}
            <div className="flex h-2 rounded overflow-hidden gap-px">
              <div className="flex-[3] bg-[#dc2626]" />
              <div className="flex-[4] bg-[#ea580c]" />
            </div>
          </div>

          {/* CVSS */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4">
            <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{t.cvssLabel}</div>
            <div className="flex gap-6">
              <div>
                <div className="text-[#64748b] text-[0.6rem] mb-1">{t.maxLabel}</div>
                <div className="text-2xl font-bold" style={{ color: "#dc2626" }}>
                  {RUN_STATS.maxCvss}
                </div>
              </div>
              <div>
                <div className="text-[#64748b] text-[0.6rem] mb-1">{t.avgLabel}</div>
                <div className="text-2xl font-bold text-[#e2e8f0]">{RUN_STATS.avgCvss}</div>
              </div>
            </div>
          </div>

          {/* Target */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4">
            <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{t.scanDetailsLabel}</div>
            <div className="space-y-1 text-sm">
              <div className="text-[#60a5fa] overflow-hidden text-ellipsis whitespace-nowrap">vulnbank.org</div>
              <div className="text-[#64748b] text-[0.65rem]">{RUN_STATS.durationMin} min · {RUN_STATS.requests} requests</div>
              <div className="text-[#64748b] text-[0.65rem]">${RUN_STATS.cost.toFixed(2)} total cost</div>
            </div>
          </div>
        </div>

        {/* Full vuln table */}
        <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", fontSize: "0.8rem" }}>
              <thead>
                <tr className="border-b border-[#2d3147] bg-[#0f1117]/50">
                  {t.platingTableHeaders.map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[0.6rem] uppercase tracking-widest"
                      style={{ color: "#64748b", whiteSpace: "nowrap" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedVulns.map((v, i) => (
                  <tr
                    key={v.id}
                    className="border-b border-[#2d3147] last:border-b-0 transition-colors"
                    style={{
                      background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)")}
                  >
                    <td className="px-4 py-3">
                      <span
                        className="px-2 py-0.5 rounded text-[0.65rem] font-bold uppercase tracking-wider"
                        style={{ background: SEV_BG[v.severity], color: SEV_TEXT[v.severity] }}
                      >
                        {v.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-[280px]">
                      <div
                        className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap"
                        style={{ color: "#e2e8f0" }}
                        title={v.title}
                      >
                        {v.title}
                      </div>
                      {v.cwe && (
                        <div style={{ color: "#64748b", fontSize: "0.65rem", marginTop: "2px" }}>
                          {v.cwe}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <code style={{ color: "#64748b", fontSize: "0.72rem", display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {v.endpoint}
                      </code>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span style={{ color: "#60a5fa", fontSize: "0.72rem" }}>{v.method}</span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className="font-bold"
                        style={{ color: SEV_TEXT[v.severity] }}
                      >
                        {v.cvss}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap" style={{ color: "#64748b", fontSize: "0.72rem" }}>
                      {v.timestamp} UTC
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

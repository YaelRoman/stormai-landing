/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";
import { VULNS } from "../data";
import { useLang } from "../LangContext";
import { i18n } from "../i18n";

const criticalVulns = VULNS.filter((v) => v.severity === "critical");

const SEV_TEXT: Record<string, string> = {
  critical: "#dc2626",
  high:     "#ea580c",
};
const SEV_BG: Record<string, string> = {
  critical: "#7f1d1d",
  high:     "#431407",
};

function colorLine(line: string): React.CSSProperties {
  if (line.trim().startsWith("#")) return { color: "#6272a4" };
  if (line.includes('print(') || line.includes('raise ')) return { color: "#8be9fd" };
  if (
    line.trim().startsWith("import ") ||
    line.trim().startsWith("from ") ||
    line.trim().startsWith("def ") ||
    line.trim().startsWith("return ")
  ) return { color: "#ff79c6" };
  if (line.match(/"[^"]*"/) || line.match(/'[^']*'/)) return { color: "#f1fa8c" };
  if (line.includes("→") || line.includes("200") || line.includes("success")) return { color: "#50fa7b" };
  return { color: "#f8f8f2" };
}

function CodeBlock({ code }: { code: string }) {
  return (
    <pre
      className="text-[0.72rem] leading-relaxed overflow-x-auto"
      style={{
        background: "#0d1117",
        border: "1px solid #2d3147",
        borderRadius: "6px",
        padding: "1rem",
        fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
      }}
    >
      {code.split("\n").map((line, i) => (
        <div key={i} style={colorLine(line)}>
          {line || " "}
        </div>
      ))}
    </pre>
  );
}

function PayloadBlock({ payload }: { payload: string }) {
  return (
    <pre
      className="text-[0.72rem] leading-relaxed"
      style={{
        background: "#0d1117",
        border: "1px solid #dc2626",
        borderRadius: "6px",
        padding: "0.75rem",
        fontFamily: "ui-monospace, 'JetBrains Mono', monospace",
        color: "#f8f8f2",
      }}
    >
      {payload.split("\n").map((line, i) => (
        <div
          key={i}
          style={{
            color: line.startsWith("→") ? "#50fa7b" : line.startsWith("POST") || line.startsWith("GET") ? "#60a5fa" : "#f8f8f2",
          }}
        >
          {line || " "}
        </div>
      ))}
    </pre>
  );
}

export default function MainCourse() {
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<"detail" | "poc">("detail");
  const vuln = criticalVulns[selected];
  const { lang } = useLang();
  const tr = i18n[lang];

  return (
    <div
      className="min-h-[calc(100vh-116px)] grid grid-cols-1 lg:grid-cols-[280px_1fr]"
      style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
    >
      {/* ── Left: Finding selector ── */}
      <div className="bg-[#0a0800] border-r border-[#2a2415] flex flex-col">
        {/* Chef label */}
        <div className="px-5 py-4 border-b border-[#2a2415]">
          <div className="text-[#8a7d5a] text-[0.6rem] tracking-[0.25em] mb-1">{tr.mainCourseHeader}</div>
          <div
            className="text-[#f0d8a0] italic text-sm"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {tr.criticalFindings}
          </div>
        </div>

        {/* Finding list */}
        <div className="flex-1 divide-y divide-[#2a2415]">
          {criticalVulns.map((v, i) => (
            <button
              key={v.id}
              onClick={() => { setSelected(i); setTab("detail"); }}
              className={`w-full text-left px-5 py-4 transition-colors duration-150 ${
                selected === i ? "bg-[#1e1b12]" : "hover:bg-[#141209]"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className="px-1.5 py-0.5 rounded text-[0.55rem] font-bold uppercase tracking-wider"
                  style={{ background: SEV_BG[v.severity], color: SEV_TEXT[v.severity] }}
                >
                  {v.severity}
                </span>
                <span className="text-[#64748b] text-[0.6rem]">CVSS {v.cvss}</span>
              </div>
              <div
                className="text-[0.72rem] font-semibold leading-snug"
                style={{ color: selected === i ? "#f0d8a0" : "#94a3b8" }}
              >
                {v.title.split(" ").slice(0, 6).join(" ")}…
              </div>
              <div className="text-[0.6rem] mt-1" style={{ color: "#4a4230" }}>
                {v.method} {v.endpoint.split(",")[0]}
              </div>
            </button>
          ))}
        </div>

        {/* Chef's note */}
        <div className="px-5 py-4 border-t border-[#2a2415]">
          <div className="text-[#8a7d5a] text-[0.6rem] tracking-[0.2em] mb-2">{tr.chefNote}</div>
          <div
            className="text-[#8a7d5a] text-xs italic leading-relaxed"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            &ldquo;{lang === "es" ? vuln.chefCommentEs : vuln.chefComment}&rdquo;
          </div>
        </div>
      </div>

      {/* ── Right: Detail pane ── */}
      <div className="bg-[#0f1117] flex flex-col overflow-hidden">
        {/* Dashboard header */}
        <div className="bg-[#1a1d27] border-b border-[#2d3147] px-5 py-3 flex items-center gap-3 flex-shrink-0">
          <span className="text-[#22c55e] font-bold text-sm tracking-widest">STRIX</span>
          <span className="text-[#64748b] text-sm">/</span>
          <span className="text-[#64748b] text-sm">vulnbank-2026-04-21</span>
          <span className="text-[#64748b] text-sm">/</span>
          <span className="text-[#e2e8f0] text-sm">{vuln.id}</span>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {/* Title row */}
          <div className="flex items-start gap-3 mb-5 flex-wrap">
            <span
              className="px-2 py-1 rounded text-sm font-bold uppercase tracking-wider flex-shrink-0"
              style={{ background: SEV_BG[vuln.severity], color: SEV_TEXT[vuln.severity] }}
            >
              {vuln.severity}
            </span>
            <span
              className="text-2xl font-bold"
              style={{ color: SEV_TEXT[vuln.severity] }}
            >
              {vuln.cvss}
            </span>
            {vuln.cwe && (
              <span
                className="px-2 py-0.5 rounded text-xs"
                style={{ background: "#1e293b", color: "#64748b" }}
              >
                {vuln.cwe}
              </span>
            )}
          </div>
          <h2 className="text-[#e2e8f0] font-bold text-lg leading-snug mb-5">{vuln.title}</h2>

          {/* Meta row */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4 flex gap-8 mb-4 flex-wrap text-sm">
            <div>
              <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-1">{tr.targetLabel}</div>
              <code className="text-[#60a5fa]">https://vulnbank.org</code>
            </div>
            <div>
              <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-1">{tr.endpointLabel}</div>
              <code>
                <span className="text-[#60a5fa]">{vuln.method}</span>{" "}
                <span className="text-[#94a3b8]">{vuln.endpoint.split(",")[0]}</span>
              </code>
            </div>
            <div>
              <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-1">{tr.foundLabel}</div>
              <span className="text-[#64748b]">{vuln.timestamp} UTC</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-4">
            {(["detail", "poc"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="px-4 py-2 text-xs uppercase tracking-wider transition-colors"
                style={{
                  background: tab === t ? "#1e293b" : "transparent",
                  color: tab === t ? "#e2e8f0" : "#64748b",
                  border: `1px solid ${tab === t ? "#2d3147" : "transparent"}`,
                  borderRadius: "4px",
                }}
              >
                {t === "detail" ? tr.analysisTab : tr.pocTab}
              </button>
            ))}
          </div>

          {tab === "detail" && (
            <div className="space-y-4">
              {[
                { title: tr.descriptionLabel, body: vuln.description },
                { title: tr.impactLabel,      body: vuln.impact },
              ].map((s) => (
                <div
                  key={s.title}
                  className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4"
                >
                  <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{s.title}</div>
                  <div className="text-[#94a3b8] text-sm leading-relaxed">{s.body}</div>
                </div>
              ))}

              <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4">
                <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{tr.reproSteps}</div>
                <ol className="space-y-1.5">
                  {vuln.pocSummary.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="text-[#64748b] flex-shrink-0">{i + 1}.</span>
                      <span className="text-[#94a3b8]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          {tab === "poc" && (
            <div className="space-y-4">
              <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4">
                <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{tr.keyPayload}</div>
                <PayloadBlock payload={vuln.pocPayload} />
              </div>
              <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-4">
                <div className="text-[#64748b] text-[0.6rem] uppercase tracking-wider mb-3">{tr.exploitScript}</div>
                <CodeBlock code={vuln.pocCode} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

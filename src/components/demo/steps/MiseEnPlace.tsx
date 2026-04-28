/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useLang } from "../LangContext";
import { i18n } from "../i18n";
import { RUN_STATS } from "../data";

export default function MiseEnPlace() {
  const { lang } = useLang();
  const t = i18n[lang];

  const initEvents = [
    { t: "00:00", text: "initializing autonomous agents", done: true },
    { t: "00:01", text: "browser automation: ready", done: true },
    { t: "00:02", text: "http proxy interceptor: active", done: true },
    { t: "00:03", text: "target: https://vulnbank.org", done: true },
    { t: "00:04", text: "mode: black-box (zero prior knowledge)", done: true },
    { t: "00:05", text: "beginning reconnaissance...", done: false },
  ];

  const recipeRows = [
    { emoji: "🎯", label: t.mepLabels.target,    value: "VulnBank (https://vulnbank.org)" },
    { emoji: "👁️", label: t.mepLabels.cuisine,   value: t.mepValues.cuisine },
    { emoji: "🤖", label: t.mepLabels.chefs,     value: t.mepValues.chefs(RUN_STATS.agents) },
    { emoji: "⏱️", label: t.mepLabels.prepTime,  value: t.mepValues.prepTime(RUN_STATS.durationMin) },
    { emoji: "💡", label: t.mepLabels.model,     value: RUN_STATS.model },
    { emoji: "💰", label: t.mepLabels.foodCost,  value: t.mepValues.foodCost(RUN_STATS.cost) },
  ];

  return (
    <div className="min-h-[calc(100vh-116px)] grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: Recipe Card ── */}
      <div
        className="bg-[#faf6ef] text-[#1a1000] p-10 lg:p-14 flex flex-col justify-center border-r border-storm-border"
      >
        {/* Header */}
        <div className="text-[0.6rem] tracking-[0.3em] text-[#8a7050] mb-6 font-sans">
          {t.mepHeader}
        </div>

        <div
          className="text-4xl font-bold leading-tight mb-2 text-[#1a0800]"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {t.mepTitle}
          <br />
          <span className="italic">{t.mepSubtitle}</span>
        </div>

        <div
          className="text-[#6a5030] italic mb-8 text-sm"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          &ldquo;{t.mepQuote}&rdquo;
        </div>

        {/* Recipe details */}
        <div className="space-y-4 mb-8">
          {recipeRows.map((r) => (
            <div key={r.label} className="flex gap-3 items-start">
              <span className="text-base flex-shrink-0 mt-0.5">{r.emoji}</span>
              <div>
                <span className="text-[0.6rem] tracking-[0.15em] text-[#8a7050] font-mono uppercase block">{r.label}</span>
                <span className="text-[#1a0800] text-sm font-medium">{r.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Difficulty */}
        <div className="border-t border-[#e0d4c0] pt-5">
          <div className="text-[0.6rem] tracking-[0.2em] text-[#8a7050] mb-2 font-mono">{t.difficultyLabel}</div>
          <div className="flex gap-1 items-center">
            {["🌶️", "🌶️", "🌶️", "🌶️", "🌶️"].map((c, i) => (
              <span key={i} className={i < 5 ? "opacity-100" : "opacity-20"}>{c}</span>
            ))}
            <span className="ml-3 text-sm font-bold text-[#c03030]">{t.difficultyValue}</span>
          </div>
        </div>
      </div>

      {/* ── Right: Dashboard run init ── */}
      <div className="bg-[#0f1117] flex flex-col">
        {/* Dashboard header */}
        <div
          className="bg-[#1a1d27] border-b border-[#2d3147] px-5 py-3 flex items-center gap-3"
          style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}
        >
          <span className="text-[#22c55e] font-bold tracking-widest text-sm">STRIX</span>
          <span className="text-[#64748b] text-sm">/ dashboard</span>
          <span className="ml-auto text-[#64748b] text-xs">{t.dashboardLabel}</span>
        </div>

        <div className="p-5 flex-1" style={{ fontFamily: "ui-monospace, 'JetBrains Mono', monospace" }}>
          {/* Run header */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#e2e8f0] font-bold">vulnbank-2026-04-21</span>
            <span
              className="px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1.5"
              style={{ background: "#1e3a2f", color: "#22c55e" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full bg-[#22c55e]"
                style={{ animation: "pulse 1.5s infinite" }}
              />
              {t.runningLabel}
            </span>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { label: "Findings", value: "—" },
              { label: "Max CVSS", value: "—" },
              { label: "Target",   value: "vulnbank.org" },
            ].map((s) => (
              <div key={s.label} className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-3">
                <div className="text-[#64748b] text-[0.65rem] uppercase tracking-wider mb-2">{s.label}</div>
                <div className="text-[#e2e8f0] font-bold text-sm">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Event log */}
          <div className="bg-[#1a1d27] border border-[#2d3147] rounded-lg p-3">
            <div className="text-[#64748b] text-[0.65rem] uppercase tracking-wider mb-3 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full bg-[#22c55e]"
                style={{ animation: "pulse 1.5s infinite" }}
              />
              {t.liveEvents}
            </div>
            <div className="space-y-1.5">
              {initEvents.map((e, i) => (
                <div
                  key={i}
                  className="flex gap-3 text-[0.75rem] py-0.5 border-b border-[#2d3147]/50 last:border-b-0"
                  style={{
                    opacity: 0,
                    animation: `fadeUp 0.3s ease forwards`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                >
                  <span className="text-[#64748b] flex-shrink-0">{e.t}</span>
                  <span className={e.done ? "text-[#22c55e]" : "text-[#60a5fa]"}>
                    {e.done ? "✓" : "▸"}
                  </span>
                  <span className="text-[#94a3b8]">{e.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Command input (decorative) */}
          <div className="mt-4 flex gap-2">
            <div
              className="flex-1 bg-[#1a1d27] border border-[#2d3147] rounded px-3 py-2 text-[#64748b] text-xs"
            >
              {t.sendInstruction}
            </div>
            <div className="bg-[#1e40af] text-white rounded px-3 py-2 text-xs cursor-default">
              {t.sendBtn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

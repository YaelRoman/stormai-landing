/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";

const methods = [
  {
    id: "black",
    title: "Black Box",
    subtitle: "Zero Knowledge",
    description:
      "No access to source code or internal systems. Simulate real-world attackers with zero prior knowledge. Tests what's actually exposed.",
    features: ["External recon", "API fuzzing", "Web crawling", "Network scanning"],
    coverage: "~40%",
    speed: "Slow",
    accuracy: "Highest",
    accent: "border-storm-secondary",
    accentText: "text-storm-secondary",
  },
  {
    id: "grey",
    title: "Grey Box",
    subtitle: "Partial Knowledge",
    description:
      "Limited source code and architecture access. The balanced approach — combines insider context with realistic attacker simulation.",
    features: ["Partial code review", "API docs", "Auth testing", "Architecture-aware"],
    coverage: "~70%",
    speed: "Moderate",
    accuracy: "High",
    accent: "border-storm-amber",
    accentText: "text-storm-amber",
  },
  {
    id: "white",
    title: "White Box",
    subtitle: "Full Knowledge",
    description:
      "Complete source code, architecture, and internals access. Maximum coverage with full visibility into every code path.",
    features: ["Full source", "DB schema", "Auth flows", "All endpoints"],
    coverage: "~95%",
    speed: "Fast",
    accuracy: "Comprehensive",
    accent: "border-storm-success",
    accentText: "text-storm-success",
  },
];

const tableRows = [
  { aspect: "Source Code Access", black: "None", grey: "Partial", white: "Full" },
  { aspect: "Coverage", black: "~40%", grey: "~70%", white: "~95%" },
  { aspect: "Real-world Accuracy", black: "Highest", grey: "High", white: "Moderate" },
  { aspect: "Time Required", black: "High", grey: "Medium", white: "Low" },
  { aspect: "Recommended For", black: "Perimeter testing", grey: "Standard audits", white: "Deep code review" },
];

export default function TestingMethodsSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="py-24 bg-storm-base section-divider px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <div className="label mb-3">Methodology</div>
          <h2 className="text-4xl font-bold text-storm-text">
            Security Testing Methods
          </h2>
          <p className="text-storm-secondary mt-3 max-w-xl">
            Storm supports all three methodologies. Choose based on your assessment needs
            and available access.
          </p>
        </div>

        {/* Method cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-storm-border mb-12">
          {methods.map((m) => (
            <div
              key={m.id}
              onMouseEnter={() => setHovered(m.id)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-storm-surface p-8 transition-colors duration-150 ${
                hovered === m.id ? "bg-storm-elevated" : ""
              }`}
            >
              <div className={`border-t-2 pt-6 ${m.accent}`}>
                <div className="label mb-1">{m.subtitle}</div>
                <h3 className="text-2xl font-bold text-storm-text mb-3">{m.title}</h3>
                <p className="text-storm-secondary text-sm leading-relaxed mb-6">
                  {m.description}
                </p>
                <div className="space-y-1.5">
                  {m.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <span className={`font-mono text-xs ${m.accentText}`}>▸</span>
                      <span className="text-storm-text">{f}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 pt-6 border-t border-storm-border">
                  <div>
                    <div className="label text-[0.55rem] mb-1">Coverage</div>
                    <div className={`font-mono text-sm font-bold ${m.accentText}`}>{m.coverage}</div>
                  </div>
                  <div>
                    <div className="label text-[0.55rem] mb-1">Speed</div>
                    <div className="font-mono text-sm text-storm-text">{m.speed}</div>
                  </div>
                  <div>
                    <div className="label text-[0.55rem] mb-1">Accuracy</div>
                    <div className="font-mono text-sm text-storm-text">{m.accuracy}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="border border-storm-border overflow-hidden">
          <div className="grid grid-cols-4 bg-storm-surface border-b border-storm-border">
            <div className="px-6 py-3 label">Aspect</div>
            <div className="px-6 py-3 label text-storm-secondary">Black Box</div>
            <div className="px-6 py-3 label text-storm-amber">Grey Box</div>
            <div className="px-6 py-3 label text-storm-success">White Box</div>
          </div>
          {tableRows.map((row, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-4 border-b border-storm-border last:border-b-0 hover:bg-storm-elevated transition-colors ${
                idx % 2 === 0 ? "bg-storm-base" : "bg-storm-surface"
              }`}
            >
              <div className="px-6 py-3.5 text-storm-text text-sm font-medium">{row.aspect}</div>
              <div className="px-6 py-3.5 text-storm-secondary text-sm font-mono">{row.black}</div>
              <div className="px-6 py-3.5 text-storm-amber text-sm font-mono">{row.grey}</div>
              <div className="px-6 py-3.5 text-storm-success text-sm font-mono">{row.white}</div>
            </div>
          ))}
        </div>

        {/* Recommendation */}
        <div className="mt-6 flex items-center gap-3 px-6 py-4 border border-storm-amber/40 bg-storm-surface">
          <span className="text-storm-amber font-mono text-xs">▸ RECOMMENDED</span>
          <p className="text-storm-secondary text-sm">
            Start with <span className="text-storm-text font-semibold">Grey Box</span> for optimal
            coverage and cost-effectiveness on standard security assessments
          </p>
        </div>
      </div>
    </section>
  );
}

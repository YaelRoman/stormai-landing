/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useEffect, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Autonomous Discovery",
    description:
      "AI agents scan your application surface and map all attack vectors — endpoints, parameters, authentication flows, and business logic.",
    detail: "External reconnaissance · API fuzzing · Web crawling · Surface mapping",
  },
  {
    num: "02",
    title: "Multi-Agent Testing",
    description:
      "Parallel agents execute security test cases across components simultaneously. No sequential bottlenecks.",
    detail: "Parallel execution · Injection testing · Auth bypass · Logic flaws",
  },
  {
    num: "03",
    title: "Exploit Generation",
    description:
      "Every finding gets a working proof-of-concept. Not a theoretical risk — a confirmed, reproducible exploit.",
    detail: "PoC generation · Exploit validation · Severity scoring · Reproduction steps",
  },
  {
    num: "04",
    title: "Auto-Fix & Report",
    description:
      "Confirm findings and generate actionable remediation code ready to merge as a pull request.",
    detail: "Auto-fix PRs · Remediation code · Compliance reports · Zero noise",
  },
];

export default function AnalysisFlowSection() {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1) % steps.length);
    }, 3500);
    return () => clearInterval(id);
  }, [autoPlay]);

  return (
    <section className="py-24 bg-storm-base section-divider px-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="label mb-3">How It Works</div>
          <h2 className="text-4xl font-bold text-storm-text">
            How Storm Analyzes<br />Your Applications
          </h2>
        </div>

        {/* Step numbers — horizontal nav */}
        <div className="grid grid-cols-4 mb-0 relative">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => { setActive(idx); setAutoPlay(false); }}
              className="relative text-left pb-6 pr-4 group focus:outline-none"
            >
              {/* Active indicator line */}
              <div
                className={`absolute bottom-0 left-0 h-px transition-all duration-300 ${
                  idx === active
                    ? "bg-storm-amber w-full"
                    : "bg-storm-border w-full"
                }`}
              />
              <span
                className={`font-mono text-4xl font-bold leading-none transition-colors duration-200 ${
                  idx === active
                    ? "text-storm-amber"
                    : "text-storm-muted group-hover:text-storm-secondary"
                }`}
              >
                {step.num}
              </span>
            </button>
          ))}
        </div>

        {/* Step content */}
        <div className="border border-storm-border bg-storm-surface mt-0">
          {steps.map((step, idx) =>
            idx === active ? (
              <div key={idx} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                <div>
                  <h3 className="text-2xl font-bold text-storm-text mb-4">
                    {step.title}
                  </h3>
                  <p className="text-storm-secondary leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
                <div>
                  <div className="label mb-4">Capabilities</div>
                  <div className="space-y-2">
                    {step.detail.split(" · ").map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="text-storm-amber font-mono text-xs">▸</span>
                        <span className="text-storm-text text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  {/* Progress dots */}
                  <div className="flex gap-2 mt-8">
                    {steps.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setActive(i); setAutoPlay(false); }}
                        className={`h-1 transition-all duration-200 ${
                          i === active
                            ? "bg-storm-amber w-8"
                            : "bg-storm-border w-2 hover:bg-storm-border-bright"
                        }`}
                      />
                    ))}
                    <button
                      onClick={() => setAutoPlay(!autoPlay)}
                      className="ml-auto text-storm-muted hover:text-storm-secondary text-xs font-mono transition-colors"
                    >
                      {autoPlay ? "⏸ pause" : "▶ play"}
                    </button>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>

        {/* Bottom callout */}
        <div className="mt-12 border border-storm-border p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="label mb-2">Real Validation</div>
            <p className="text-storm-text font-semibold mb-2">Zero False Positives</p>
            <p className="text-storm-secondary text-sm leading-relaxed">
              Unlike traditional scanners, Storm generates working exploits to confirm every
              vulnerability. Security teams only see confirmed, actionable findings.
            </p>
          </div>
          <div>
            <div className="label mb-2">Scale</div>
            <p className="text-storm-text font-semibold mb-2">Parallel Agent Orchestration</p>
            <p className="text-storm-secondary text-sm leading-relaxed">
              Multiple agents work simultaneously across attack vectors. Faster results
              without sacrificing coverage. Scales horizontally with your application.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

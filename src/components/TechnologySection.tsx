/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";

const features = [
  {
    tag: "Core",
    title: "Autonomous AI Agents",
    description:
      "Multi-agent orchestration for parallel security testing. Agents collaborate, share findings, and divide attack surface automatically.",
  },
  {
    tag: "Validation",
    title: "Proof-of-Concept Exploits",
    description:
      "Every finding comes with a working exploit. No theoretical risks — confirmed, reproducible attack chains that security teams can trust.",
  },
  {
    tag: "Toolkit",
    title: "Full Hacker Toolkit",
    description:
      "HTTP proxy, browser automation, terminal environments, and Python runtime. Everything a manual pentester uses, fully automated.",
  },
  {
    tag: "Coverage",
    title: "Comprehensive Detection",
    description:
      "Access control, injection attacks, authentication flaws, and business logic vulnerabilities across your entire application stack.",
  },
  {
    tag: "Remediation",
    title: "Auto-Fix Pull Requests",
    description:
      "Storm generates remediation code and opens pull requests automatically. Security findings resolved as fast as they're discovered.",
  },
  {
    tag: "Pipeline",
    title: "CI/CD Integration",
    description:
      "GitHub Actions integration for automated security testing on every commit. Security shifts left — into the development workflow.",
  },
];

export default function TechnologySection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 bg-storm-base section-divider px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <div className="label mb-3">Platform</div>
            <h2 className="text-4xl font-bold text-storm-text">
              Autonomous Security<br />Testing Platform
            </h2>
          </div>
          <p className="text-storm-secondary leading-relaxed md:text-right">
            Built for security teams who need real results — not scan reports
            full of maybes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-storm-border">
          {features.map((f, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              className={`bg-storm-surface p-7 transition-colors duration-150 ${
                hovered === idx ? "bg-storm-elevated" : ""
              }`}
            >
              <div className="label mb-3">{f.tag}</div>
              <h3
                className={`text-lg font-bold mb-3 transition-colors duration-150 ${
                  hovered === idx ? "text-storm-amber" : "text-storm-text"
                }`}
              >
                {f.title}
              </h3>
              <p className="text-storm-secondary text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

        {/* Subtle bottom line */}
        <div className="mt-8 flex items-center gap-4 text-storm-muted text-xs font-mono">
          <span>Apache 2.0 Open Source</span>
          <span className="text-storm-border">·</span>
          <span>OpenAI · Anthropic · Gemini</span>
          <span className="text-storm-border">·</span>
          <span>Self-hostable</span>
        </div>
      </div>
    </section>
  );
}

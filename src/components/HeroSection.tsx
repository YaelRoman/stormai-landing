/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState, useEffect } from "react";

const CLI_OUTPUT = `$ storm scan https://target.com
▸ initializing autonomous agents
▸ browser automation: ready
▸ http interceptor: active

[02s] surface mapped — 847 endpoints found
[05s] !! sql injection @ /api/users?id=
[08s] !! xss reflected @ /search?q=
[12s] !! auth bypass @ /admin/panel
[15s] generating proof-of-concept exploits
[18s] poc #1  sql injection — EXPLOITED
[21s] poc #2  xss attack — EXPLOITED
[24s] poc #3  auth bypass — EXPLOITED
[27s] opening auto-fix pull request
▸ done: 3 critical  0 false positives`;

function terminalLineClass(line: string): string {
  if (line.includes("EXPLOITED")) return "text-storm-success font-semibold";
  if (line.includes("!!")) return "text-storm-danger";
  if (line.startsWith("$")) return "text-storm-amber font-semibold";
  if (line.startsWith("▸")) return "text-storm-amber/70";
  if (line.match(/^\[\d+s\]/)) return "text-storm-muted";
  return "text-storm-secondary";
}

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < CLI_OUTPUT.length) {
        setDisplayText(CLI_OUTPUT.slice(0, index + 1));
        index++;
      } else {
        setTimeout(() => {
          index = 0;
          setDisplayText("");
        }, 2400);
      }
    }, 14);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-storm-base hero-grid scanlines relative flex items-center pt-24 overflow-hidden">
      {/* Ambient amber glow — left side */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(232,138,21,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16">

        {/* ── Left: Editorial headline ── */}
        <div>
          <div className="label mb-8 anim-fade-up" style={{ animationDelay: "0.05s" }}>
            Autonomous Security Testing
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.92] tracking-tight text-storm-text mb-6 anim-fade-up"
            style={{ animationDelay: "0.12s" }}
          >
            Find Vulns<br />
            with<br />
            <span className="text-storm-amber">AI Agents</span>
          </h1>

          <p
            className="text-storm-secondary text-lg leading-relaxed max-w-md mb-10 anim-fade-up"
            style={{ animationDelay: "0.22s" }}
          >
            Real validation with working proof-of-concept exploits. No false
            positives. Multi-agent orchestration for comprehensive security
            testing across your stack.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-3 anim-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            <a
              href="https://github.com/AustenLynn/strix"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber inline-block text-center"
            >
              View on GitHub →
            </a>
            <a
              href="https://github.com/AustenLynn/strix#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-block text-center"
            >
              Read Docs
            </a>
          </div>

          {/* Trust signals */}
          <div
            className="mt-10 flex gap-6 anim-fade-up"
            style={{ animationDelay: "0.40s" }}
          >
            {["Apache 2.0", "Multi-LLM", "Zero False Positives"].map((tag) => (
              <div key={tag} className="flex items-center gap-1.5">
                <span className="w-1 h-1 bg-storm-amber rounded-full" />
                <span className="text-storm-muted text-xs font-mono">{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Amber terminal ── */}
        <div
          className="anim-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          <div className="border border-storm-border-bright bg-storm-surface shadow-amber">
            {/* Terminal chrome */}
            <div className="border-b border-storm-border px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-storm-danger/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-storm-amber/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-storm-success/40" />
              </div>
              <span className="font-mono text-storm-muted text-xs tracking-widest">
                STORM · SCAN
              </span>
              <div className="w-16" />
            </div>

            {/* Terminal output */}
            <div className="p-5 h-80 overflow-hidden font-mono text-[0.8rem] leading-relaxed bg-storm-base">
              {displayText.split("\n").map((line, idx) => (
                <div key={idx} className={terminalLineClass(line)}>
                  {line || " "}
                </div>
              ))}
              <span
                className="inline-block w-2 h-4 bg-storm-amber"
                style={{ animation: "blinkCursor 1s step-end infinite" }}
              />
            </div>
          </div>

          <p className="mt-3 text-center text-storm-muted text-xs font-mono">
            real-time vulnerability detection and exploitation
          </p>
        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-storm-border" />
    </section>
  );
}

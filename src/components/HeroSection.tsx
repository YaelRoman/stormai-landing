/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState, useEffect } from "react";

export default function HeroSection() {
  const [displayText, setDisplayText] = useState("");
  const cliOutput = `$ storm scan https://vulnerable-app.com
▶ Initializing autonomous security agents...
✓ 4 agents deployed to target
✓ Browser automation initialized
✓ HTTP proxy interceptor ready

[00:02] Scanning application surface...
[00:05] ⚠ SQL Injection found in /api/users
[00:08] ⚠ Cross-Site Scripting in search param
[00:12] ⚠ Authentication bypass detected
[00:15] Generating proof-of-concept exploits...
[00:18] ✓ PoC 1: SQL Injection - CONFIRMED
[00:21] ✓ PoC 2: XSS Attack - CONFIRMED
[00:24] ✓ PoC 3: Auth Bypass - CONFIRMED
[00:27] Generating remediation code...
✓ Auto-fix PR ready for merge`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < cliOutput.length) {
        setDisplayText(cliOutput.slice(0, index + 1));
        index++;
      } else {
        index = 0;
        setDisplayText("");
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative gradient-bg flex items-center justify-center px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full glass-sm">
          <p className="text-cyan-300 text-sm font-medium">
            Autonomous AI Security Testing Platform
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Find Vulnerabilities with Autonomous AI Agents
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Real validation with proof-of-concept exploits. No false positives. Multi-agent orchestration for comprehensive security testing across your applications.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="https://github.com/AustenLynn/strix"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/AustenLynn/strix#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass rounded-xl font-semibold"
          >
            Read Documentation
          </a>
        </div>

        {/* Animated CLI Terminal */}
        <div className="relative w-full max-w-2xl mx-auto mt-8">
          <div className="glass rounded-lg overflow-hidden border border-cyan-400/30">
            {/* Terminal header */}
            <div className="bg-slate-900 px-4 py-3 border-b border-cyan-400/20 flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-400 text-sm font-mono">storm-scan</span>
            </div>

            {/* Terminal content */}
            <div className="bg-slate-950 p-4 h-80 overflow-y-auto font-mono text-sm">
              <div className="space-y-1">
                {displayText.split("\n").map((line, idx) => {
                  const isVulnerability = line.includes("⚠") || line.includes("PoC");
                  const isSuccess = line.includes("✓");
                  const isWarning = line.includes("⚠");

                  return (
                    <div
                      key={idx}
                      className={`transition-all duration-300 ${
                        isVulnerability
                          ? "bg-gradient-to-r from-red-500/20 to-transparent px-2 py-1"
                          : ""
                      }`}
                    >
                      <span
                        className={`${
                          isSuccess
                            ? "text-green-400"
                            : isWarning
                            ? "text-orange-400 font-semibold"
                            : line.includes("$")
                            ? "text-cyan-400"
                            : line.match(/\[\d+:\d+\]/)
                            ? "text-gray-500"
                            : "text-gray-300"
                        }`}
                      >
                        {line}
                      </span>
                    </div>
                  );
                })}
                {/* Cursor */}
                <span className="text-green-400 animate-pulse">▌</span>
              </div>
            </div>
          </div>

          {/* Info text */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Real-time vulnerability detection and exploitation
          </p>
        </div>
      </div>
    </section>
  );
}


/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";
import {
  Shield,
  Wrench,
  Zap,
  Bot,
  Code,
  Target,
} from "lucide-react";

const features = [
  {
    title: "Autonomous AI Agents",
    description: "Multi-agent orchestration for parallel security testing across your applications",
    icon: Bot,
  },
  {
    title: "Proof-of-Concept Exploits",
    description: "Real validation with working PoCs, eliminating false positives",
    icon: Target,
  },
  {
    title: "Full Hacker Toolkit",
    description: "HTTP proxy, browser automation, terminal environments, and Python runtime",
    icon: Wrench,
  },
  {
    title: "Comprehensive Coverage",
    description: "Detects access control, injection attacks, authentication, and business logic flaws",
    icon: Shield,
  },
  {
    title: "Auto-Fix Capabilities",
    description: "Ready-to-merge pull requests with remediation code",
    icon: Code,
  },
  {
    title: "CI/CD Integration",
    description: "GitHub Actions integration for automated security testing in your pipeline",
    icon: Zap,
  },
];

export default function TechnologySection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/30 to-slate-900/50 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">
          Autonomous Security Testing Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative"
              >
                {/* Animated glow */}
                <div className={`absolute inset-0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500 to-blue-500`} />

                {/* Card */}
                <div className={`relative glass rounded-xl p-6 border transition-all duration-300 transform ${
                  isHovered
                    ? "border-cyan-400/50 bg-white/15 scale-105 shadow-xl"
                    : "border-white/10 hover:border-white/20 bg-white/5"
                }`}>
                  {/* Icon wrapper with animation */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4 transition-all ${
                    isHovered
                      ? "bg-gradient-to-br from-cyan-500 to-blue-500 scale-110"
                      : "bg-gray-500/20"
                  }`}>
                    <IconComponent className={`w-7 h-7 transition-colors ${
                      isHovered ? "text-white" : "text-cyan-400"
                    }`} />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className={`transition-colors ${
                    isHovered ? "text-gray-200" : "text-gray-300"
                  }`}>{feature.description}</p>

                  {/* Hover accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-xl transition-all duration-300 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

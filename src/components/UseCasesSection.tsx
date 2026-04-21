/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { Check } from "lucide-react";
import { useState } from "react";

interface UseCaseBlock {
  title: string;
  description: string;
  bullets: string[];
  imagePosition: "left" | "right";
}

const usecases: UseCaseBlock[] = [
  {
    title: "Autonomous Vulnerability Detection",
    description: "AI agents conduct comprehensive security testing with proof-of-concept exploits",
    bullets: [
      "Access control vulnerabilities",
      "Injection attack detection",
      "Authentication flaws",
      "Business logic vulnerabilities",
    ],
    imagePosition: "right",
  },
  {
    title: "CI/CD Security Integration",
    description: "Integrate security testing directly into your development pipeline",
    bullets: [
      "GitHub Actions integration",
      "Automated PR scanning",
      "Pre-deployment validation",
      "Auto-fix pull requests",
    ],
    imagePosition: "left",
  },
  {
    title: "Multi-Agent Orchestration",
    description: "Distribute testing workload across parallel agents for faster results",
    bullets: [
      "Distributed testing",
      "Browser automation",
      "Terminal environments",
      "Python runtime execution",
    ],
    imagePosition: "right",
  },
];

export default function UseCasesSection() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-purple-900/30 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16">Powered by Autonomous AI Agents</h2>

        <div className="space-y-12">
          {usecases.map((usecase, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch ${
                usecase.imagePosition === "left" ? "md:[&>:last-child]:-order-1" : ""
              }`}
            >
              {/* Text Block */}
              <div
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="cursor-pointer group"
              >
                <div className="glass rounded-xl p-8 border border-white/10 group-hover:border-cyan-400/50 transition-all h-full">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {usecase.title}
                  </h3>
                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">
                    {usecase.description}
                  </p>
                  <ul className="space-y-3">
                    {usecase.bullets.map((bullet, bidx) => (
                      <li
                        key={bidx}
                        className={`flex items-center gap-3 transition-all duration-300 ${
                          expandedIdx === idx ? "translate-x-2" : ""
                        }`}
                      >
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 animate-bounce" style={{
                          animationDelay: `${bidx * 0.1}s`,
                          animationDuration: '1s'
                        }} />
                        <span className="text-gray-300 group-hover:text-gray-100 transition-colors">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual Visualization */}
              <div className="glass rounded-xl overflow-hidden">
                <div className="h-64 flex flex-col items-center justify-center bg-gradient-to-br from-white/10 to-white/5 relative group">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>

                  {/* Content */}
                  <div className="relative text-center">
                    <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform">
                      {idx === 0 ? "🔍" : idx === 1 ? "🚀" : "⚙️"}
                    </div>
                    <p className="text-gray-300 font-semibold">
                      {idx === 0 ? "Discovery" : idx === 1 ? "Deployment" : "Orchestration"}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Click to expand
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

import { Check } from "lucide-react";

interface UseCaseBlock {
  title: string;
  description: string;
  bullets: string[];
  imagePosition: "left" | "right";
}

const usecases: UseCaseBlock[] = [
  {
    title: "Security Assessments",
    description: "Comprehensive risk evaluation across your infrastructure",
    bullets: [
      "Cloud & on-premise scanning",
      "Application vulnerability assessment",
      "Network risk analysis",
    ],
    imagePosition: "right",
  },
  {
    title: "Compliance & Audit Reporting",
    description: "Streamline regulatory compliance with automated reports",
    bullets: [
      "SOC 2 Type II ready",
      "Audit trail generation",
      "Evidence collection",
    ],
    imagePosition: "left",
  },
  {
    title: "Continuous Risk Monitoring",
    description: "Stay ahead of emerging threats with ongoing assessment",
    bullets: [
      "Monthly reassessments",
      "Risk trend analysis",
      "Executive dashboards",
    ],
    imagePosition: "right",
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-purple-900/30 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16">Solutions for Enterprise Teams</h2>

        <div className="space-y-16">
          {usecases.map((usecase, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                usecase.imagePosition === "left" ? "md:[&>:last-child]:-order-1" : ""
              }`}
            >
              {/* Text Block */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {usecase.title}
                </h3>
                <p className="text-gray-300 mb-6">{usecase.description}</p>
                <ul className="space-y-3">
                  {usecase.bullets.map((bullet, bidx) => (
                    <li key={bidx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual Placeholder */}
              <div className="glass rounded-xl h-64 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-4xl mb-2">⚡</div>
                  <p>Visualization</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

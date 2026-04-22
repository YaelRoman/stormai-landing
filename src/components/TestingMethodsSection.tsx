/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { Eye, EyeOff, EyeIcon } from "lucide-react";
import { useState } from "react";

const testingMethods = [
  {
    icon: EyeOff,
    title: "Black Box Testing",
    subtitle: "Zero Knowledge Approach",
    description: "No access to source code or internal systems. Simulate real-world attackers with zero prior knowledge.",
    benefits: [
      "Real-world attack simulation",
      "Discovers exposure vulnerabilities",
      "Tests from attacker perspective",
      "No insider bias",
    ],
    color: "from-gray-600 to-slate-700",
    accentColor: "text-gray-300",
    borderColor: "border-gray-400/20",
    features: ["External reconnaissance", "API fuzzing", "Web crawling", "Network scanning"],
  },
  {
    icon: EyeIcon,
    title: "Grey Box Testing",
    subtitle: "Partial Knowledge Approach",
    description: "Limited access to source code and system information. Balanced approach combining internal and external perspective.",
    benefits: [
      "Comprehensive coverage",
      "Business logic insights",
      "Faster vulnerability discovery",
      "Real-world applicable",
    ],
    color: "from-blue-500 to-cyan-500",
    accentColor: "text-cyan-300",
    borderColor: "border-cyan-400/30",
    features: ["Partial code review", "API documentation", "Architecture overview", "Authenticated testing"],
  },
  {
    icon: Eye,
    title: "White Box Testing",
    subtitle: "Full Knowledge Approach",
    description: "Complete access to source code, architecture, and system internals. Comprehensive security analysis with full visibility.",
    benefits: [
      "Complete code coverage",
      "Deep vulnerability detection",
      "Business logic validation",
      "Compliance verification",
    ],
    color: "from-green-500 to-emerald-500",
    accentColor: "text-green-300",
    borderColor: "border-green-400/30",
    features: ["Full source code", "Architecture details", "Database schema", "Authentication bypass"],
  },
];

export default function TestingMethodsSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-900/30 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Security Testing Methods
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Storm AI supports multiple security testing approaches. Choose the methodology that best fits your security assessment needs.
          </p>
        </div>

        {/* Testing Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testingMethods.map((method, idx) => {
            const IconComponent = method.icon;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative h-full"
              >
                {/* Glow background */}
                <div
                  className={`absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none ${
                    isHovered
                      ? `bg-gradient-to-r ${method.color}`
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  }`}
                  style={{
                    filter: "blur(8px)",
                    zIndex: -1,
                  }}
                />

                {/* Card */}
                <div
                  className={`relative glass rounded-xl p-8 border transition-all duration-300 h-full flex flex-col ${
                    isHovered
                      ? `${method.borderColor} bg-white/15`
                      : `${method.borderColor} hover:${method.borderColor}`
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-lg mb-6 flex items-center justify-center transition-all ${
                      isHovered
                        ? `bg-gradient-to-br ${method.color}`
                        : "bg-white/5"
                    }`}
                  >
                    <IconComponent
                      size={32}
                      className={`transition-colors ${
                        isHovered ? "text-white" : method.accentColor
                      }`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {method.title}
                  </h3>
                  <p className={`text-sm font-semibold mb-4 ${method.accentColor}`}>
                    {method.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-gray-300 mb-6 flex-grow">
                    {method.description}
                  </p>

                  {/* Benefits */}
                  <div
                    className={`mb-6 transition-all duration-300 ${
                      isHovered ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
                    }`}
                  >
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      Key Benefits
                    </p>
                    <ul className="space-y-2">
                      {method.benefits.map((benefit, bidx) => (
                        <li
                          key={bidx}
                          className="text-sm text-gray-300 flex items-center gap-2"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${method.accentColor}`}
                          />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Features list */}
                  <div className="grid grid-cols-2 gap-2">
                    {method.features.map((feature, fidx) => (
                      <div
                        key={fidx}
                        className={`text-xs px-3 py-2 rounded-md transition-all ${
                          isHovered
                            ? `bg-white/10 ${method.accentColor}`
                            : "bg-white/5 text-gray-400"
                        }`}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Indicator */}
                  <div
                    className={`absolute top-6 right-6 w-2 h-2 rounded-full transition-all ${
                      isHovered
                        ? `${method.accentColor} animate-pulse`
                        : "bg-gray-600"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison table */}
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                    Aspect
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                    Black Box
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-cyan-300">
                    Grey Box
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-green-300">
                    White Box
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { aspect: "Source Code Access", blackbox: "❌", greybox: "🟡 Partial", whitebox: "✅ Full" },
                  { aspect: "Time Required", blackbox: "⭐⭐⭐", greybox: "⭐⭐", whitebox: "⭐" },
                  { aspect: "Coverage", blackbox: "~40%", greybox: "~70%", whitebox: "~95%" },
                  { aspect: "Real-world Accuracy", blackbox: "⭐⭐⭐⭐⭐", greybox: "⭐⭐⭐⭐", whitebox: "⭐⭐⭐" },
                  { aspect: "Cost", blackbox: "💰💰", greybox: "💰", whitebox: "💰💰💰" },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-white/5 transition-colors ${
                      idx % 2 === 0 ? "bg-white/2" : ""
                    } hover:bg-white/10`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-white">
                      {row.aspect}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      {row.blackbox}
                    </td>
                    <td className="px-6 py-4 text-sm text-cyan-300">
                      {row.greybox}
                    </td>
                    <td className="px-6 py-4 text-sm text-green-300">
                      {row.whitebox}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6">
            Storm AI intelligently adapts its testing strategy to maximize vulnerability discovery based on the information available.
          </p>
          <div className="inline-block">
            <div className="glass rounded-lg px-8 py-4 border border-cyan-400/30 hover:border-cyan-400 transition-colors">
              <p className="text-white font-semibold">
                🎯 Recommended: Start with Grey Box for optimal coverage and cost-effectiveness
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

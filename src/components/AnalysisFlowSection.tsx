/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useEffect, useState } from "react";
import {
  Shield,
  Zap,
  CheckCircle,
  AlertCircle,
  Search,
  Code,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Autonomous Discovery",
    description: "AI agents scan your application surface and map attack vectors",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Multi-Agent Testing",
    description: "Parallel agents execute security test cases across components",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Exploit Generation",
    description: "Generate working proof-of-concepts for each vulnerability",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: CheckCircle,
    title: "Validation & Reporting",
    description: "Confirm findings and generate actionable remediation code",
    color: "from-green-500 to-emerald-500",
  },
];

export default function AnalysisFlowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-900/80 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            How Storm AI Analyzes Your Applications
          </h2>
          <p className="text-gray-300 text-lg">
            Autonomous agents work in parallel to discover, test, and validate vulnerabilities
          </p>
        </div>

        {/* Interactive Flow Diagram */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isActive = idx === activeStep;

            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveStep(idx);
                  setIsAutoPlay(false);
                }}
                className={`relative cursor-pointer transition-all duration-300 group ${
                  isActive ? "scale-105" : "opacity-60"
                }`}
              >
                {/* Animated border */}
                <div
                  className={`absolute inset-0 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${step.color}`
                      : "bg-gradient-to-r from-gray-500 to-gray-600"
                  }`}
                />

                {/* Card */}
                <div
                  className={`relative rounded-xl p-6 backdrop-blur-xl transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 border border-white/40"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Number indicator */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mb-4 transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${step.color}`
                          : "bg-gray-600"
                      }`}
                    >
                      {idx + 1}
                    </div>

                    {/* Icon */}
                    <IconComponent
                      size={32}
                      className={`mb-3 transition-all ${
                        isActive ? "text-cyan-400" : "text-gray-400"
                      }`}
                    />

                    {/* Title & Description */}
                    <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-300">{step.description}</p>
                  </div>
                </div>

                {/* Connection arrow */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div
                      className={`text-2xl transition-all ${
                        isActive || idx === activeStep - 1
                          ? "text-cyan-400"
                          : "text-gray-600"
                      }`}
                    >
                      →
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Auto-play toggle */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
              isAutoPlay
                ? "bg-cyan-500/30 border border-cyan-400 text-cyan-300"
                : "bg-gray-500/20 border border-gray-400 text-gray-300"
            }`}
          >
            {isAutoPlay ? "⏸ Pause Animation" : "▶ Resume Animation"}
          </button>
        </div>

        {/* Detailed explanation section */}
        <div className="mt-16 glass rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Shield size={24} />
                Real Validation, Zero False Positives
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike traditional scanners, Storm AI doesn't just report potential issues.
                Our autonomous agents generate working proof-of-concept exploits to confirm
                every vulnerability. This means you only get actionable findings that
                security teams can trust.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Zap size={24} />
                Parallel Agent Orchestration
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Multiple AI agents work in parallel across your application, testing
                different attack vectors simultaneously. This distributed approach means
                faster results without sacrificing thoroughness. Scale horizontally to
                match your application complexity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useEffect, useState, useRef } from "react";

interface MetricItem {
  label: string;
  value: string;
  icon: string;
  color: string;
}

const metrics: MetricItem[] = [
  { label: "Validation Accuracy", value: "100%", icon: "✓", color: "from-green-500 to-emerald-500" },
  { label: "False Positive Rate", value: "0%", icon: "◆", color: "from-blue-500 to-cyan-500" },
  { label: "Parallel Agents", value: "∞", icon: "⚡", color: "from-purple-500 to-pink-500" },
];

export default function MetricsSection() {
  const [inView, setInView] = useState(false);
  const [counters, setCounters] = useState([0, 0, 100]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const intervals = [
      setInterval(() => {
        setCounters(prev => [Math.min(prev[0] + 1, 100), prev[1], prev[2]]);
      }, 20),
      setInterval(() => {
        setCounters(prev => [prev[0], prev[1], prev[2]]);
      }, 20),
    ];

    return () => intervals.forEach(clearInterval);
  }, [inView]);

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-purple-900/30 px-8 backdrop-blur-sm" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, idx) => (
            <div key={metric.label} className="group">
              {/* Glow background */}
              <div className={`absolute inset-0 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-r ${metric.color}`} />

              {/* Card */}
              <div className="relative glass rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 text-center h-full">
                {/* Animated icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${metric.color} mb-6 text-2xl font-bold text-white animate-pulse`}>
                  {metric.icon}
                </div>

                {/* Value with animated counter */}
                <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                  {inView && idx < 2 ? counters[idx] : metric.value}
                  {idx < 2 && "%"}
                </div>

                {/* Label */}
                <p className="text-lg text-gray-300">{metric.label}</p>

                {/* Progress bar for first two metrics */}
                {idx < 2 && inView && (
                  <div className="mt-4 w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${metric.color} transition-all duration-500`}
                      style={{ width: `${counters[idx]}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

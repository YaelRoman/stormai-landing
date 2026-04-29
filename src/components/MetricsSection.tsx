/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useEffect, useRef, useState } from "react";

const metrics = [
  {
    value: "100%",
    label: "Validation Accuracy",
    sub: "Every finding confirmed with a working exploit",
    accent: "text-storm-amber",
  },
  {
    value: "0%",
    label: "False Positive Rate",
    sub: "Zero noise — only actionable, reproducible findings",
    accent: "text-storm-danger",
  },
  {
    value: "∞",
    label: "Parallel Agents",
    sub: "Scale horizontally to match any target complexity",
    accent: "text-storm-success",
  },
];

export default function MetricsSection() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-storm-surface section-divider" ref={ref}>
      <div className="max-w-6xl mx-auto divide-y md:divide-y-0 md:divide-x divide-storm-border grid grid-cols-1 md:grid-cols-3">
        {metrics.map((m, idx) => (
          <div
            key={m.label}
            className={`px-10 py-14 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: `${idx * 120}ms` }}
          >
            <div className={`font-mono text-7xl font-bold leading-none mb-4 ${m.accent}`}>
              {m.value}
            </div>
            <div className="text-storm-text font-bold text-xl mb-2">{m.label}</div>
            <div className="text-storm-muted text-sm font-mono leading-relaxed">{m.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

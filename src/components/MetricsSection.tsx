/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useEffect, useState, useRef } from "react";

interface MetricItem {
  label: string;
  value: string;
}

const metrics: MetricItem[] = [
  { label: "Enterprise Customers", value: "200+" },
  { label: "Risk Reports Generated", value: "50K+" },
  { label: "Average Assessment Time", value: "<2h" },
];

export default function MetricsSection() {
  const [inView, setInView] = useState(false);
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

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900/50 to-purple-900/30 px-8 backdrop-blur-sm" ref={ref}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {metrics.map((metric) => (
          <div key={metric.label} className="text-center">
            <div className="text-5xl font-bold text-blue-400 mb-4">
              {inView && metric.value}
            </div>
            <p className="text-lg text-gray-300">{metric.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

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
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/30 to-slate-900/50 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">
          Autonomous Security Testing Platform
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="glass rounded-xl p-6"
              >
                <IconComponent className="w-12 h-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

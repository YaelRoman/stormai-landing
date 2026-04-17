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
    title: "AI-Powered Analysis",
    description: "Machine learning models identify risks across infrastructure",
    icon: Shield,
  },
  {
    title: "Compliance Reports",
    description: "Auto-generate SOC 2, ISO 27001, and HIPAA-aligned reports",
    icon: Wrench,
  },
  {
    title: "Real-Time Assessments",
    description: "Continuous monitoring with instant risk evaluation",
    icon: Zap,
  },
  {
    title: "Enterprise Integration",
    description: "API-first platform for seamless integration with your tools",
    icon: Bot,
  },
  {
    title: "Actionable Insights",
    description: "Prioritized remediation guidance tied to business impact",
    icon: Code,
  },
  {
    title: "Multi-Team Collaboration",
    description: "Role-based access for security, compliance, and management",
    icon: Target,
  },
];

export default function TechnologySection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-900/30 to-slate-900/50 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-12">
          Enterprise-Grade Security Intelligence
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

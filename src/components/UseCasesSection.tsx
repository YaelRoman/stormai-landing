/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

const usecases = [
  {
    index: "01",
    title: "Autonomous Vulnerability Detection",
    description:
      "AI agents conduct comprehensive security testing with proof-of-concept exploits. No human required to run a pentest.",
    bullets: [
      "Access control vulnerabilities",
      "Injection attack detection",
      "Authentication flaws",
      "Business logic vulnerabilities",
    ],
    code: `$ storm scan https://app.example.com \\
  --mode grey-box \\
  --agents 4

▸ 3 critical findings
▸ 3 PoC exploits generated
▸ auto-fix PR opened`,
  },
  {
    index: "02",
    title: "CI/CD Security Integration",
    description:
      "Integrate security testing directly into your development pipeline. Security shifts left — every PR gets tested.",
    bullets: [
      "GitHub Actions integration",
      "Automated PR scanning",
      "Pre-deployment validation",
      "Auto-fix pull requests",
    ],
    code: `# .github/workflows/storm.yml
- name: Storm Security Scan
  uses: storm-ai/action@v1
  with:
    target: \${{ env.DEPLOY_URL }}
    fail-on: critical`,
  },
  {
    index: "03",
    title: "Multi-Agent Orchestration",
    description:
      "Distribute testing workload across parallel agents for faster coverage. Browser automation and terminal environments included.",
    bullets: [
      "Distributed parallel testing",
      "Browser automation",
      "Terminal environments",
      "Python runtime execution",
    ],
    code: `$ storm orchestrate \\
  --target https://app.example.com \\
  --agents 8 \\
  --parallel

▸ 8 agents deployed
▸ 1,203 test cases executed
▸ 12 minutes total`,
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-24 bg-storm-surface section-divider px-8">
      <div className="max-w-6xl mx-auto">

        <div className="mb-16">
          <div className="label mb-3">Use Cases</div>
          <h2 className="text-4xl font-bold text-storm-text">
            Powered by Autonomous<br />AI Agents
          </h2>
        </div>

        <div className="space-y-px bg-storm-border">
          {usecases.map((uc) => (
            <div
              key={uc.index}
              className="bg-storm-surface grid grid-cols-1 lg:grid-cols-2"
            >
              {/* Text */}
              <div className="p-8 lg:p-10 border-r border-storm-border">
                <div className="font-mono text-storm-muted text-sm mb-4">{uc.index}</div>
                <h3 className="text-2xl font-bold text-storm-text mb-3">{uc.title}</h3>
                <p className="text-storm-secondary leading-relaxed mb-6">{uc.description}</p>
                <ul className="space-y-2">
                  {uc.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm">
                      <span className="text-storm-amber font-mono text-xs">▸</span>
                      <span className="text-storm-text">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code block */}
              <div className="bg-storm-base p-8 lg:p-10 flex items-center">
                <pre className="font-mono text-[0.78rem] leading-relaxed text-storm-secondary w-full overflow-x-auto whitespace-pre-wrap">
                  {uc.code.split("\n").map((line, idx) => {
                    const isCommand = line.startsWith("$") || line.startsWith("  ");
                    const isArrow = line.startsWith("▸");
                    const isComment = line.startsWith("#");
                    const isKey = line.match(/^- name:|uses:|with:|fail-on:/);
                    return (
                      <span
                        key={idx}
                        className={`block ${
                          isArrow
                            ? "text-storm-success"
                            : isCommand
                            ? "text-storm-amber"
                            : isComment
                            ? "text-storm-muted"
                            : isKey
                            ? "text-storm-text"
                            : "text-storm-secondary"
                        }`}
                      >
                        {line}
                      </span>
                    );
                  })}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

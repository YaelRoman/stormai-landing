/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

const footerLinks = {
  Project: [
    { label: "GitHub Repository", href: "https://github.com/AustenLynn/strix" },
    { label: "Documentation", href: "https://github.com/AustenLynn/strix#readme" },
    { label: "Issues & Support", href: "https://github.com/AustenLynn/strix/issues" },
  ],
  Resources: [
    { label: "Security Testing", href: "https://github.com/AustenLynn/strix#features" },
    { label: "AI Agents", href: "https://github.com/AustenLynn/strix#technology-stack" },
    { label: "CLI Tool", href: "https://github.com/AustenLynn/strix#installation" },
  ],
  Legal: [
    { label: "Apache License 2.0", href: "https://github.com/AustenLynn/strix/blob/main/LICENSE" },
    { label: "Contributing", href: "https://github.com/AustenLynn/strix/blob/main/CONTRIBUTING.md" },
    { label: "Code of Conduct", href: "https://github.com/AustenLynn/strix/blob/main/CODE_OF_CONDUCT.md" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-storm-surface border-t border-storm-amber/20 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="font-mono text-storm-amber font-bold text-base tracking-[0.2em] mb-4">
              STORM
            </div>
            <p className="text-storm-muted text-sm leading-relaxed">
              Autonomous AI security testing. Open source, multi-LLM, fully self-hostable.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="label mb-4">{title}</div>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-storm-secondary hover:text-storm-text text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-storm-border pt-6 flex items-center justify-between">
          <p className="text-storm-muted text-xs font-mono">
            © 2026 Storm AI Contributors
          </p>
          <p className="text-storm-muted text-xs font-mono">
            Apache License 2.0
          </p>
        </div>
      </div>
    </footer>
  );
}

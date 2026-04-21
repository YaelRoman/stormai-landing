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
    <footer className="bg-gradient-to-b from-slate-900/50 to-slate-900/80 backdrop-blur-md border-t border-white/10 py-12 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-white mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-gray-300 text-sm text-center">
            © 2026 Storm AI Contributors. Open source under Apache License 2.0.
          </p>
        </div>
      </div>
    </footer>
  );
}

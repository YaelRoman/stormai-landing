/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

const footerLinks = {
  Product: [
    { label: "SecureAI Platform", href: "https://secureai.ai" },
    { label: "API Documentation", href: "https://docs.secureai.ai" },
    { label: "Pricing", href: "https://secureai.ai/pricing" },
  ],
  Company: [
    { label: "About", href: "https://secureai.ai/about" },
    { label: "Blog", href: "https://secureai.ai/blog" },
    { label: "Contact", href: "https://secureai.ai/contact" },
  ],
  Legal: [
    { label: "Terms of Service", href: "https://secureai.ai/terms" },
    { label: "Privacy Policy", href: "https://secureai.ai/privacy" },
    { label: "Security", href: "https://secureai.ai/security" },
  ],
  Contact: [
    { label: "sales@secureai.ai", href: "mailto:sales@secureai.ai" },
    { label: "support@secureai.ai", href: "mailto:support@secureai.ai" },
    { label: "Status", href: "https://status.secureai.ai" },
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
            © 2026 SecureAI. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

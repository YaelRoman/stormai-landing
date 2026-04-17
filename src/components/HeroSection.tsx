/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

export default function HeroSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("curl -X POST https://api.secureai.ai/assess -d '{\"target\": \"example.com\"}'");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative gradient-bg flex items-center justify-center px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Eyebrow */}
        <div className="inline-block mb-6 px-4 py-2 rounded-full glass-sm">
          <p className="text-cyan-300 text-sm font-medium">
            AI-Powered Cybersecurity Intelligence for Enterprise
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Threat Assessment Powered by AI
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Automate security assessments, generate compliant reports, and identify risks across your enterprise infrastructure with AI-driven insights.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => {
              const element = document.getElementById("demo");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            Schedule Demo
          </button>
          <a
            href="https://secureai.ai/docs"
            className="px-8 py-4 glass rounded-xl font-semibold"
          >
            View API Docs
          </a>
        </div>

        {/* Terminal Card */}
        <div className="inline-block">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-4">
              <code className="font-mono text-cyan-300 text-sm">
                $ curl -X POST https://api.secureai.ai/assess
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-white/20 rounded transition-colors"
              >
                {copied ? (
                  <Check size={20} className="text-green-400" />
                ) : (
                  <Copy size={20} className="text-cyan-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

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
            Autonomous AI Security Testing Platform
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Find Vulnerabilities with Autonomous AI Agents
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Real validation with proof-of-concept exploits. No false positives. Multi-agent orchestration for comprehensive security testing across your applications.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="https://github.com/AustenLynn/strix"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm"
          >
            View on GitHub
          </a>
          <a
            href="https://github.com/AustenLynn/strix#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass rounded-xl font-semibold"
          >
            Read Documentation
          </a>
        </div>

        {/* Visual Animation */}
        <div className="relative w-full max-w-md h-32 mx-auto mt-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-cyan-400/30 animate-pulse" />
            <div className="absolute w-24 h-24 rounded-full border-2 border-blue-400/50 animate-spin" style={{ animationDuration: '3s' }} />
            <div className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
              AI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

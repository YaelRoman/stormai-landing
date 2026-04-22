/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

export default function HeroSection() {
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

        {/* Animated Security Scanning Visualization */}
        <div className="relative w-full max-w-md h-64 mx-auto mt-8">
          <svg className="w-full h-full" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
            {/* Background circles */}
            <circle cx="200" cy="150" r="120" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.2" />
            <circle cx="200" cy="150" r="80" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.3" />
            <circle cx="200" cy="150" r="40" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />

            {/* Animated scanning ring */}
            <circle
              cx="200"
              cy="150"
              r="120"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
              opacity="0.6"
              style={{
                animation: 'expandRing 3s ease-out infinite',
              }}
            />

            {/* AI Agent 1 - Top */}
            <g style={{ animation: 'agentMove1 4s ease-in-out infinite' }}>
              <circle cx="200" cy="50" r="8" fill="#06b6d4" />
              <circle cx="200" cy="50" r="12" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
            </g>

            {/* AI Agent 2 - Right */}
            <g style={{ animation: 'agentMove2 4s ease-in-out infinite' }}>
              <circle cx="300" cy="150" r="8" fill="#0ea5e9" />
              <circle cx="300" cy="150" r="12" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.5" />
            </g>

            {/* AI Agent 3 - Bottom */}
            <g style={{ animation: 'agentMove3 4s ease-in-out infinite' }}>
              <circle cx="200" cy="250" r="8" fill="#06b6d4" />
              <circle cx="200" cy="250" r="12" fill="none" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5" />
            </g>

            {/* AI Agent 4 - Left */}
            <g style={{ animation: 'agentMove4 4s ease-in-out infinite' }}>
              <circle cx="100" cy="150" r="8" fill="#0ea5e9" />
              <circle cx="100" cy="150" r="12" fill="none" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.5" />
            </g>

            {/* Connection lines */}
            <line
              x1="200"
              y1="150"
              x2="200"
              y2="50"
              stroke="#06b6d4"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="150"
              x2="300"
              y2="150"
              stroke="#06b6d4"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="150"
              x2="200"
              y2="250"
              stroke="#06b6d4"
              strokeWidth="1"
              opacity="0.3"
            />
            <line
              x1="200"
              y1="150"
              x2="100"
              y2="150"
              stroke="#06b6d4"
              strokeWidth="1"
              opacity="0.3"
            />

            {/* Center core */}
            <circle cx="200" cy="150" r="12" fill="#06b6d4" opacity="0.8" />
            <circle
              cx="200"
              cy="150"
              r="12"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="2"
              style={{ animation: 'pulse 2s ease-in-out infinite' }}
            />

            {/* Vulnerability indicators - pulsing dots */}
            <circle
              cx="140"
              cy="100"
              r="4"
              fill="#ef4444"
              style={{ animation: 'vulnerabilityPulse 2s ease-in-out infinite 0.2s' }}
            />
            <circle
              cx="260"
              cy="100"
              r="4"
              fill="#ef4444"
              style={{ animation: 'vulnerabilityPulse 2s ease-in-out infinite 0.4s' }}
            />
            <circle
              cx="280"
              cy="180"
              r="4"
              fill="#f97316"
              style={{ animation: 'vulnerabilityPulse 2s ease-in-out infinite 0.6s' }}
            />
            <circle
              cx="120"
              cy="200"
              r="4"
              fill="#ef4444"
              style={{ animation: 'vulnerabilityPulse 2s ease-in-out infinite 0.8s' }}
            />
          </svg>

          <style>{`
            @keyframes expandRing {
              0% {
                r: 40;
                opacity: 0.8;
              }
              100% {
                r: 130;
                opacity: 0;
              }
            }

            @keyframes agentMove1 {
              0%, 100% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(30px, -20px);
              }
            }

            @keyframes agentMove2 {
              0%, 100% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(20px, 30px);
              }
            }

            @keyframes agentMove3 {
              0%, 100% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(-30px, 20px);
              }
            }

            @keyframes agentMove4 {
              0%, 100% {
                transform: translate(0, 0);
              }
              50% {
                transform: translate(-20px, -30px);
              }
            }

            @keyframes pulse {
              0%, 100% {
                r: 12;
                opacity: 0.8;
              }
              50% {
                r: 16;
                opacity: 0.4;
              }
            }

            @keyframes vulnerabilityPulse {
              0%, 100% {
                r: 4;
                opacity: 0.3;
              }
              50% {
                r: 6;
                opacity: 1;
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}


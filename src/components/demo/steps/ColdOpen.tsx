/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useLang } from "../LangContext";
import { i18n } from "../i18n";
import { RUN_STATS } from "../data";

export default function ColdOpen() {
  const { lang } = useLang();
  const t = i18n[lang];

  return (
    <div className="min-h-[calc(100vh-116px)] flex flex-col items-center justify-center px-8 relative overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,138,21,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Network / show identifier */}
      <div className="text-storm-muted text-[0.65rem] tracking-[0.35em] mb-6 font-mono">
        {t.networkPresents}
      </div>

      {/* Show title */}
      <div
        className="text-7xl md:text-8xl text-storm-amber font-bold text-center leading-none mb-3"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        Storm Kitchen
      </div>

      {/* Ornament */}
      <div className="flex items-center gap-4 my-4">
        <div className="h-px bg-storm-amber/30 w-16" />
        <span className="text-storm-amber text-xl">🔪</span>
        <div className="h-px bg-storm-amber/30 w-16" />
      </div>

      {/* Tagline */}
      <div
        className="text-storm-secondary text-xl italic text-center mb-8"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        &ldquo;{t.tagline}&rdquo;
      </div>

      {/* Episode card */}
      <div className="border border-storm-border bg-storm-surface px-10 py-6 text-center max-w-lg mb-8">
        <div className="label mb-2">{t.seasonEpisode}</div>
        <div className="text-storm-text font-bold text-xl mb-3">
          {t.episodeTitle}
        </div>
        <div className="text-storm-secondary text-sm leading-relaxed">
          {t.episodeDesc(
            RUN_STATS.bySeverity.critical,
            RUN_STATS.bySeverity.high,
            RUN_STATS.durationMin
          )}
        </div>
      </div>

      {/* Cast / credits row */}
      <div className="flex gap-8 text-center mb-10">
        {[
          { key: "Target",   value: "VulnBank" },
          { key: "Method",   value: "Black Box" },
          { key: "Agents",   value: "4 AI" },
          { key: "Runtime",  value: `${RUN_STATS.durationMin} min` },
          { key: "Cost",     value: `$${RUN_STATS.cost.toFixed(2)}` },
        ].map((c) => (
          <div key={c.key}>
            <div className="label mb-1">{t.castLabels[c.key as keyof typeof t.castLabels]}</div>
            <div className="text-storm-text font-mono text-sm font-bold">{c.value}</div>
          </div>
        ))}
      </div>

      {/* Fine print */}
      <div
        className="text-storm-muted text-xs italic text-center"
        style={{ fontFamily: '"Playfair Display", serif' }}
      >
        {t.finePrint1}
        <br />
        {t.finePrint2}
      </div>
    </div>
  );
}

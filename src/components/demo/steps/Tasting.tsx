/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useLang } from "../LangContext";
import { i18n } from "../i18n";
import { RUN_STATS } from "../data";

const STARS = [5, 5, 5, 4, 4];

export default function Tasting() {
  const { lang } = useLang();
  const t = i18n[lang];

  return (
    <div className="min-h-[calc(100vh-116px)] grid grid-cols-1 lg:grid-cols-2">

      {/* ── Left: The Review ── */}
      <div
        className="bg-[#faf6ef] text-[#1a1000] p-10 lg:p-14 flex flex-col justify-center border-r border-storm-border"
      >
        <div className="text-[0.6rem] tracking-[0.3em] text-[#8a7050] mb-5 font-sans">
          {t.criticLabel}
        </div>

        <div
          className="text-4xl font-bold leading-tight mb-1 text-[#1a0800]"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {t.tastingTitle}
        </div>

        <div
          className="text-[#6a5030] italic mb-8 text-base"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {t.tastingSubtitle}
        </div>

        {/* Star review items */}
        <div className="space-y-4 mb-8">
          {t.tastingFindings.map((f, i) => (
            <div key={i} className="border-b border-[#e0d4c0] pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#1a0800] font-semibold text-sm">{f.item}</span>
                <span className="ml-auto text-[#c03030]">
                  {"★".repeat(STARS[i])}{"☆".repeat(5 - STARS[i])}
                </span>
              </div>
              <div className="text-[#6a5030] text-xs leading-relaxed">{f.note}</div>
            </div>
          ))}
        </div>

        {/* Overall verdict */}
        <div className="bg-[#1a0800] text-[#faf6ef] p-5 rounded-sm">
          <div className="text-[0.6rem] tracking-[0.2em] text-[#c08050] mb-2 font-mono">{t.michelinLabel}</div>
          <div
            className="text-xl font-bold mb-2"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {t.michelinTitle}
          </div>
          <div
            className="text-[#c0a070] text-sm italic leading-relaxed"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            &ldquo;{t.michelinVerdict}&rdquo;
          </div>
        </div>
      </div>

      {/* ── Right: Stats + CTA ── */}
      <div className="bg-[#0a0800] flex flex-col justify-center p-10 lg:p-14">

        {/* Run stats */}
        <div className="label mb-6 text-storm-secondary">{t.scanStatsLabel}</div>
        <div className="grid grid-cols-2 gap-px bg-storm-border mb-8">
          {[
            { label: t.statLabels.totalFindings,  value: `${RUN_STATS.totalVulns}`,                            accent: true  },
            { label: t.statLabels.falsePositives, value: "0",                                                   accent: false },
            { label: t.statLabels.runtime,        value: `${RUN_STATS.durationMin} min`,                        accent: false },
            { label: t.statLabels.requests,       value: RUN_STATS.requests.toLocaleString(),                  accent: false },
            { label: t.statLabels.tokens,         value: `${(RUN_STATS.inputTokens / 1_000_000).toFixed(1)}M`, accent: false },
            { label: t.statLabels.cost,           value: `$${RUN_STATS.cost.toFixed(2)}`,                       accent: false },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-storm-surface px-5 py-4"
            >
              <div className="label mb-1">{s.label}</div>
              <div
                className={`font-mono text-2xl font-bold ${
                  s.accent ? "text-storm-danger" : "text-storm-text"
                }`}
              >
                {s.value}
              </div>
            </div>
          ))}
        </div>

        {/* Model info */}
        <div className="border border-storm-border p-4 mb-8 text-sm">
          <div className="label mb-2">{t.poweredBy}</div>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-storm-amber font-mono font-bold">{RUN_STATS.model}</span>
            <span className="text-storm-muted">{t.cachedTokens((RUN_STATS.cachedTokens / 1_000_000).toFixed(1) as unknown as number)}</span>
          </div>
        </div>

        {/* CTA */}
        <div>
          <div className="label mb-3">{t.ctaLabel}</div>
          <div className="text-storm-secondary text-sm leading-relaxed mb-6">
            {t.ctaBody}
          </div>
          <div className="flex gap-3 flex-wrap">
            <a
              href="https://github.com/AustenLynn/strix"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-amber inline-block"
            >
              {t.getStarted}
            </a>
            <a
              href="/#waitlist"
              className="btn-ghost inline-block"
            >
              {t.joinWaitlist}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

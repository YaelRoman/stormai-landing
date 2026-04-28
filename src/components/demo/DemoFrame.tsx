/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState, useEffect } from "react";
import { STAGES } from "./data";
import { useLang } from "./LangContext";
import { i18n } from "./i18n";

interface DemoFrameProps {
  children: React.ReactNode;
  step: number;
  onNext: () => void;
  transitioning: boolean;
}

export default function DemoFrame({ children, step, onNext, transitioning }: DemoFrameProps) {
  const isLast = step === STAGES.length - 1;
  const [chyronVisible, setChyronVisible] = useState(false);
  const { lang, toggle } = useLang();
  const t = i18n[lang];

  useEffect(() => {
    setChyronVisible(false);
    if (transitioning) return;
    const showTimer = setTimeout(() => setChyronVisible(true), 800);
    return () => clearTimeout(showTimer);
  }, [step, transitioning]);

  return (
    <div className="relative min-h-screen bg-[#080806] flex flex-col overflow-hidden font-mono">

      {/* ── Broadcast top bar ── */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-2.5 bg-[#080806]/90 border-b border-storm-border">
        {/* Channel bug */}
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🍳</span>
          <div>
            <div className="text-storm-amber font-bold text-xs tracking-[0.2em]">STORM KITCHEN</div>
            <div className="text-storm-muted text-[0.6rem] tracking-widest">THE SECURITY FOOD NETWORK · CH 4</div>
          </div>
        </div>

        {/* Center: episode info */}
        <div className="text-center hidden md:block">
          <div className="text-storm-text text-xs tracking-wider">S01 · E01 — A Seven-Course Feast at VulnBank</div>
          <div className="text-storm-muted text-[0.6rem] tracking-widest mt-0.5">TARGET: HTTPS://VULNBANK.ORG</div>
        </div>

        {/* Right: PRE-RECORDED badge + lang toggle + time */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 border border-storm-border px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-storm-amber" />
            <span className="text-storm-amber text-[0.6rem] font-bold tracking-[0.2em]">PRE-RECORDED</span>
          </div>
          <button
            onClick={toggle}
            className="border border-storm-border px-2.5 py-1 text-[0.6rem] font-bold tracking-[0.15em] transition-colors hover:border-storm-amber hover:text-storm-amber"
            style={{ color: "var(--color-storm-muted)" }}
          >
            {lang === "en" ? "ES" : "EN"}
          </button>
          <div className="text-storm-muted text-[0.6rem] font-mono hidden lg:block">
            2026-04-21
          </div>
        </div>
      </div>

      {/* ── Step content ── */}
      <div
        className={`flex-1 mt-[52px] mb-[64px] transition-opacity duration-500 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {/* ── Transition overlay ── */}
      {transitioning && step < STAGES.length - 1 && (
        <div className="fixed inset-0 z-40 bg-[#080806] flex flex-col items-center justify-center">
          <div className="text-storm-muted text-xs tracking-widest mb-4 font-mono">{t.nextCourseTransition}</div>
          <div
            className="text-storm-amber text-4xl font-bold tracking-wide"
            style={{ fontFamily: '"Playfair Display", serif', fontStyle: "italic" }}
          >
            {STAGES[step + 1]}
          </div>
        </div>
      )}

      {/* ── TV lower-third chyron ── */}
      <div
        className="fixed left-0 right-0 z-40 transition-transform duration-500 ease-in-out"
        style={{
          bottom: "64px",
          transform: chyronVisible ? "translateY(0)" : "translateY(calc(100% + 4px))",
        }}
      >
        <div className="flex items-stretch mx-5 mb-2 overflow-hidden shadow-2xl">
          {/* Red accent bar */}
          <div className="w-1.5 flex-shrink-0 bg-storm-danger" />
          {/* Content */}
          <div className="flex-1 bg-[#0f0c06]/95 border border-l-0 border-storm-border px-4 py-3">
            <div className="text-[0.55rem] font-bold tracking-[0.25em] text-storm-danger mb-1">
              {t.chyronLabel}
            </div>
            <div
              className="text-storm-text text-sm italic leading-snug"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              &ldquo;{t.chyrons[step]}&rdquo;
            </div>
          </div>
          {/* Dismiss button */}
          <button
            onClick={() => setChyronVisible(false)}
            className="flex-shrink-0 bg-[#0f0c06]/95 border border-l-0 border-storm-border px-3 text-storm-muted hover:text-storm-secondary transition-colors text-xs"
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#080806]/95 border-t border-storm-border flex items-center px-5 py-3 gap-6">
        {/* Stage name */}
        <div
          className="text-storm-text text-sm italic flex-shrink-0"
          style={{ fontFamily: '"Playfair Display", serif' }}
        >
          {STAGES[step]}
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 flex-1 justify-center">
          {STAGES.map((stageName, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`h-1 rounded-none transition-all duration-300 ${
                  i < step
                    ? "bg-storm-amber/50 w-6"
                    : i === step
                    ? "bg-storm-amber w-10"
                    : "bg-storm-border w-3"
                }`}
                title={stageName}
              />
            </div>
          ))}
        </div>

        {/* Next button */}
        {!isLast ? (
          <button
            onClick={onNext}
            className="flex-shrink-0 px-5 py-2 bg-storm-amber text-storm-base text-xs font-bold tracking-widest hover:bg-storm-amber-bright transition-colors duration-150"
          >
            {t.nextCourse}
          </button>
        ) : (
          <a
            href="/#waitlist"
            className="flex-shrink-0 px-5 py-2 bg-storm-amber text-storm-base text-xs font-bold tracking-widest hover:bg-storm-amber-bright transition-colors duration-150"
          >
            {t.getEarlyAccess}
          </a>
        )}
      </div>
    </div>
  );
}

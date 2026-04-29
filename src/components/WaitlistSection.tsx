/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Enter a valid email address");
      return;
    }
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company_name: company || undefined }),
      });
      await res.json();
      if (res.ok) {
        setState("success");
        setEmail("");
        setCompany("");
        setTimeout(() => setState("idle"), 4000);
      } else if (res.status === 409) {
        setErrorMsg("This email is already on the waitlist");
        setState("error");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        setState("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setState("error");
    }
  };

  return (
    <section
      id="waitlist"
      className="py-24 bg-storm-base section-divider px-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left */}
        <div>
          <div className="label mb-3">Early Access</div>
          <h2 className="text-4xl font-bold text-storm-text mb-4">
            Get Started with<br />Storm AI
          </h2>
          <p className="text-storm-secondary leading-relaxed mb-8">
            Join the open-source community building the future of autonomous
            security testing. Get started with our CLI or deploy to your
            own infrastructure.
          </p>
          <ul className="space-y-3">
            {[
              "Open source under Apache 2.0",
              "Multiple LLM support — OpenAI, Anthropic, Gemini",
              "Full hacker toolkit included",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="text-storm-amber font-mono text-xs">▸</span>
                <span className="text-storm-text">{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 border-t border-storm-border pt-8">
            <div className="label mb-3">Quick Start</div>
            <div className="bg-storm-surface border border-storm-border p-4 font-mono text-[0.78rem] leading-relaxed">
              <div className="text-storm-amber">$ pip install storm-ai</div>
              <div className="text-storm-secondary">$ storm scan https://your-app.com</div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div>
          <form
            onSubmit={handleSubmit}
            className="border border-storm-border bg-storm-surface"
          >
            <div className="px-8 py-6 border-b border-storm-border">
              <div className="label">Join the Community</div>
            </div>

            <div className="px-8 py-6 space-y-5">
              <div>
                <label className="label block mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={state === "submitting" || state === "success"}
                  className="w-full bg-storm-base border border-storm-border px-4 py-3 text-storm-text text-sm
                             placeholder:text-storm-muted font-mono
                             focus:outline-none focus:border-storm-amber
                             disabled:opacity-50 transition-colors duration-150"
                />
                {state === "error" && errorMsg && (
                  <p className="mt-2 text-storm-danger text-xs font-mono">{errorMsg}</p>
                )}
              </div>

              <div>
                <label className="label block mb-2">Company (Optional)</label>
                <input
                  type="text"
                  placeholder="Your Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  disabled={state === "submitting" || state === "success"}
                  className="w-full bg-storm-base border border-storm-border px-4 py-3 text-storm-text text-sm
                             placeholder:text-storm-muted
                             focus:outline-none focus:border-storm-amber
                             disabled:opacity-50 transition-colors duration-150"
                />
              </div>

              <button
                type="submit"
                disabled={state === "submitting" || state === "success"}
                className="w-full py-3 bg-storm-amber text-storm-base text-sm font-bold tracking-wide
                           hover:bg-storm-amber-bright disabled:opacity-50
                           transition-colors duration-150"
              >
                {state === "submitting" && "Joining..."}
                {state === "success" && "▸ Welcome to Storm AI"}
                {(state === "idle" || state === "error") && "Join the Community →"}
              </button>

              {state === "success" && (
                <p className="text-storm-success text-xs font-mono text-center">
                  Check out the GitHub repo to get started immediately.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

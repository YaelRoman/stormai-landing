/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useState } from "react";
import { Check, AlertCircle, Loader } from "lucide-react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email");
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
        setTimeout(() => {
          setState("idle");
        }, 3000);
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
    <section id="waitlist" className="py-20 bg-gradient-to-b from-purple-900/30 to-slate-900/50 px-8 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Text Block */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Get Started with Storm AI
          </h2>
          <p className="text-gray-300 mb-8">
            Join the open-source community building the future of autonomous security testing. Get started with our CLI tool or deploy to your infrastructure.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 group cursor-pointer">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-gray-300 group-hover:text-green-300 transition-colors">Open source under Apache 2.0</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-gray-300 group-hover:text-green-300 transition-colors">Multiple LLM support (OpenAI, Anthropic, etc)</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0 group-hover:scale-125 transition-transform" />
              <span className="text-gray-300 group-hover:text-green-300 transition-colors">Full hacker toolkit included</span>
            </li>
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4 glass rounded-xl p-8 border border-white/10">
            {/* Email Input */}
            <div className="group">
              <label className="block text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                Email Address
              </label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "submitting" || state === "success"}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 disabled:opacity-50 transition-all group-hover:border-white/30"
              />
              {state === "error" && errorMsg && (
                <div className="flex items-center gap-2 mt-2 text-red-400 animate-shake">
                  <AlertCircle size={16} />
                  <span className="text-sm">{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Company Input */}
            <div className="group">
              <label className="block text-xs font-semibold text-cyan-400 mb-2 uppercase tracking-wider">
                Company Name (Optional)
              </label>
              <input
                type="text"
                placeholder="Your Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={state === "submitting" || state === "success"}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 disabled:opacity-50 transition-all group-hover:border-white/30"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state === "submitting" || state === "success"}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/50"
            >
              {state === "submitting" && (
                <>
                  <Loader size={20} className="animate-spin" />
                  Joining...
                </>
              )}
              {state === "success" && (
                <>
                  <Check size={20} />
                  Welcome to Storm AI!
                </>
              )}
              {(state === "idle" || state === "error") && "Join the Community"}
            </button>

            {/* Success Message */}
            {state === "success" && (
              <div className="bg-green-500/20 backdrop-blur-md border border-green-500/40 rounded-lg p-4 text-green-300">
                Thanks for joining! Check out the GitHub repository to get started.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

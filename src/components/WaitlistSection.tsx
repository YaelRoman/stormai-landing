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
    <section id="demo" className="py-20 bg-gradient-to-b from-purple-900/30 to-slate-900/50 px-8 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Text Block */}
        <div>
          <h2 className="text-4xl font-bold text-white mb-6">
            See SecureAI in Action
          </h2>
          <p className="text-gray-300 mb-8">
            Request a personalized demo to learn how enterprise teams use SecureAI for risk assessment, compliance reporting, and threat intelligence.
          </p>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">Live platform walkthrough</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">ROI and use case review</span>
            </li>
            <li className="flex items-center gap-3">
              <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span className="text-gray-300">Pricing and trial setup</span>
            </li>
          </ul>
        </div>

        {/* Right: Form */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "submitting" || state === "success"}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 disabled:opacity-50 transition-all"
              />
              {state === "error" && errorMsg && (
                <div className="flex items-center gap-2 mt-2 text-red-400">
                  <AlertCircle size={16} />
                  <span className="text-sm">{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Company Input */}
            <div>
              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                disabled={state === "submitting" || state === "success"}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/15 disabled:opacity-50 transition-all"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={state === "submitting" || state === "success"}
              className="w-full px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              {state === "submitting" && (
                <>
                  <Loader size={20} className="animate-spin" />
                  Scheduling...
                </>
              )}
              {state === "success" && (
                <>
                  <Check size={20} />
                  Demo Scheduled!
                </>
              )}
              {(state === "idle" || state === "error") && "Schedule Demo"}
            </button>

            {/* Success Message */}
            {state === "success" && (
              <div className="bg-green-500/20 backdrop-blur-md border border-green-500/40 rounded-lg p-4 text-green-300">
                Thanks! Our team will contact you within 24 hours to confirm your demo.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

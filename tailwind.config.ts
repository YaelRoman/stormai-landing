/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        storm: {
          base: "#0a0800",
          surface: "#141209",
          elevated: "#1e1b12",
          border: "#2a2415",
          "border-bright": "#4a3e25",
          text: "#f0d8a0",
          secondary: "#8a7d5a",
          muted: "#4a4230",
          amber: "#e88a15",
          "amber-bright": "#ffaa2b",
          danger: "#cc3333",
          "danger-dim": "#3a1010",
          success: "#4a9e5c",
        },
      },
      fontFamily: {
        display: ["Bricolage Grotesque", "sans-serif"],
        sans: ["Bricolage Grotesque", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        chef: ['"Playfair Display"', "Georgia", "serif"],
      },
      boxShadow: {
        amber: "0 0 24px rgba(232, 138, 21, 0.15)",
        "amber-sm": "0 0 8px rgba(232, 138, 21, 0.25)",
        danger: "0 0 16px rgba(204, 51, 51, 0.2)",
      },
      animation: {
        "fade-up": "fadeUp 0.55s ease forwards",
        "blink-cursor": "blinkCursor 1s step-end infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blinkCursor: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

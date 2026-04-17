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
          blue: "#3b82f6",
          cyan: "#06b6d4",
          bg: "#0a0a0a",
          surface: "#111111",
          border: "#1f2937",
          text: "#f0f0f0",
          muted: "#9ca3af",
        },
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(6, 182, 212, 0.3)",
        "glow-blue": "0 0 20px rgba(59, 130, 246, 0.3)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "12px",
        lg: "24px",
        xl: "40px",
      },
    },
  },
  plugins: [],
};

export default config;

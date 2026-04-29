/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Storm AI — Autonomous Security Testing with AI Agents",
  description: "Autonomous AI-powered security testing platform that identifies and validates vulnerabilities with proof-of-concept exploits. Real validation, zero false positives.",
  openGraph: {
    title: "Storm AI",
    description: "Autonomous AI Agents for Enterprise Security Testing",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=JetBrains+Mono:wght@400;600&family=Playfair+Display:ital,wght@0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-storm-base text-storm-text font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

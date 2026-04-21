/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full px-8 py-4 flex items-center justify-between transition-all duration-300",
        scrolled
          ? "bg-white/10 backdrop-blur-xl border-b border-white/20"
          : "bg-transparent"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/storm-logo.svg"
          alt="Storm AI"
          width={24}
          height={24}
        />
        <span className="text-white font-bold">Storm AI</span>
      </div>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        <a
          href="https://github.com/AustenLynn/strix"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-cyan-400 transition-colors"
        >
          GitHub
        </a>
        <a
          href="https://github.com/AustenLynn/strix#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-cyan-400 transition-colors"
        >
          Docs
        </a>
        <a
          href="https://github.com/AustenLynn/strix/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-cyan-400 transition-colors"
        >
          Support
        </a>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => {
          const element = document.getElementById("waitlist");
          element?.scrollIntoView({ behavior: "smooth" });
        }}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Get Early Access
      </button>
    </nav>
  );
}

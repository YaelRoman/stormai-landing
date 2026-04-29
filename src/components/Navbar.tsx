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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full px-8 py-4 flex items-center justify-between transition-all duration-200",
        scrolled
          ? "bg-storm-base border-b border-storm-border"
          : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        <Image src="/storm-logo.svg" alt="Storm AI" width={18} height={18} />
        <span className="font-mono text-storm-amber font-bold text-sm tracking-[0.2em]">
          STORM
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8">
        {[
          { label: "GitHub",     href: "https://github.com/AustenLynn/strix", external: true  },
          { label: "Docs",       href: "https://github.com/AustenLynn/strix#readme", external: true },
          { label: "Support",    href: "https://github.com/AustenLynn/strix/issues", external: true },
          { label: "Watch Demo 🍳", href: "/demo", external: false },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`text-sm transition-colors duration-150 ${
              link.label.includes("Demo")
                ? "text-storm-amber hover:text-storm-amber-bright font-semibold"
                : "text-storm-secondary hover:text-storm-text"
            }`}
          >
            {link.label}
          </a>
        ))}
      </div>

      <button
        onClick={() => {
          document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="btn-amber text-xs py-2 px-5"
      >
        Get Early Access
      </button>
    </nav>
  );
}

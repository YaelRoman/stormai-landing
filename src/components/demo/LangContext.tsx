/*
 * Copyright 2026 Storm Security Contributors
 * Licensed under the Apache License, Version 2.0
 */

"use client";

import { createContext, useContext, useState } from "react";
import type { Lang } from "./i18n";

interface LangContextValue {
  lang: Lang;
  toggle: () => void;
}

export const LangContext = createContext<LangContextValue>({
  lang: "en",
  toggle: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, toggle: () => setLang((l) => (l === "en" ? "es" : "en")) }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

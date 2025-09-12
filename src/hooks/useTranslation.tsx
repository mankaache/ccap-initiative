"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { translations } from "../translations";
import Cookies from "js-cookie";

export type Language = "en" | "fr";

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(
  undefined
);

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslation must be used within a TranslationProvider"
    );
  }
  return context;
};

export function TranslationProviderClient({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLang);

  

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    Cookies.set("lang", lang, { path: "/" });
  };

  const t = (key: string): string => {
    const langTranslations = translations[language] as Record<string, string>;
    return langTranslations?.[key] || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

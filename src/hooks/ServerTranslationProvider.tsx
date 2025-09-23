'use client';

import Cookies from "js-cookie";
import { TranslationProviderClient } from "./useTranslation";
import { useEffect, useState } from "react";

export function ServerTranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
       const [lang, setLang] = useState<"en" | "fr">("fr");

   useEffect(() => {
    const cookieLang = Cookies.get("lang") as "en" | "fr" | undefined;
    if (cookieLang) {
      setLang(cookieLang);
    }
  }, []);
  return (
    <TranslationProviderClient initialLang={lang}>
      {children}
    </TranslationProviderClient>
  );
}

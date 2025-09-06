import { cookies } from "next/headers";
import { TranslationProviderClient } from "./useTranslation";

export async function ServerTranslationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
      const cookieStore = await cookies();
  const lang = (cookieStore.get("lang")?.value || "en") as "en" | "fr";

  return (
    <TranslationProviderClient initialLang={lang}>
      {children}
    </TranslationProviderClient>
  );
}

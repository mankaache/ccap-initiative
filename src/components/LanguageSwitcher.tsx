import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useTranslation();

  const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "fr", name: "Français", nativeName: "Français" }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="nav-link border focus:outline-hidden rounded-md flex items-center gap-1 px-3 py-2 hover:bg-accent transition-colors">
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{language.toUpperCase()}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-background border-border shadow-elegant min-w-[140px]"
        align="end"
      >
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as "en" | "fr")}
            className="cursor-pointer hover:bg-accent flex items-center justify-between px-3 py-2"
          >
            <span>{lang.nativeName}</span>
            {language === lang.code && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
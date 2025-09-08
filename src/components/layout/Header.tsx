"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "../LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navigation = [
    { name: t('header.home'), href: "/" },
    { name: t('header.about'), href: "/about" },
    {
      name: 'Actors',
      href: "#",
      dropdown: [
        { name: 'Etatiques', href: "/actor/etatiques" },
        { name: 'ONGI', href: "/actor/ongi" },
        { name: 'OSC', href: "/actor/osc" },
        { name: 'OBC', href: "/actor/obc" },
        { name: 'SECTEUR PRIVEE', href: "/actor/secteur-privee" },
        { name: 'CL', href: "/actor/cl" },
      ],
    },
    {
      name: t('header.news'),
      href: "#",
      dropdown: [
        { name: t('header.news.international'), href: "/news/international" },
        { name: t('header.news.regional'), href: "/news/regional" },
        { name: t('header.news.national'), href: "/news/national" },
      ],
    },
    {
      name: t('header.climateDocuments'),
      href: "#",
      dropdown: [
        { name: t('header.documents.international'), href: "/documents/international" },
        { name: t('header.documents.regulation'), href: "/documents/regulation" },
        { name: t('header.documents.national'), href: "/documents/national" },
      ],
    },
    {
      name: t('header.projectTransparency'),
      href: "/project-transparency",
     
    },
  ];

  return (
    <header className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-elegant">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[68px]">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-hero text-primary-foreground px-4 py-2 rounded-lg font-bold text-xl">
              CCAP
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name} >
                  <DropdownMenuTrigger className="nav-link flex items-center gap-1 focus:outline-hidden">
                    <span>{item.name}</span>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-background py-3 border-border shadow-elegant min-w-[200px]">
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem
                        key={subItem.name}
                        className="text-foreground border-b py-2 border-gray-100 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                      >
                        <a href={subItem.href} className="w-full">
                          {subItem.name}
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors nav-link flex items-center gap-1"
                >
                  {item.name}
                </a>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher/>
            

             <Link href='/auth/signin'  className="w-full px-3 py-2 bg-transparent border-2 text-primary border-primary rounded-md text-sm whitespace-nowrap">{t('header.signIn')}</Link>
                <Link href='/auth/signup'  className="w-full px-3 py-2 text-white bg-primary rounded-md text-sm whitespace-nowrap">{t('header.signUp')}</Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border mt-2 pt-4 pb-4 animate-slide-up">
            <div className="space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                  >
                    {item.name}
                  </a>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 rounded-md transition-colors"
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2">
             <Link href='/auth/signin'  className="w-full px-4 py-2 bg-transparent border-2 text-primary border-primary rounded-md text-base whitespace-nowrap">{t('header.signIn')}</Link>
                <Link href='/auth/signup'  className="w-full px-4 py-2 text-white bg-primary rounded-md text-base whitespace-nowrap">{t('header.signUp')}</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
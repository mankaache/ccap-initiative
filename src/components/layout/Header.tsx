"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Globe, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "../LanguageSwitcher";
import { getAllCategories, getSubcategories } from "@/data/organisation";
import { useAuth } from "@/firebase/useAuth";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/firebaseConfig";
import { toast } from "react-toastify";


// Recursive dropdown component for nested menus
const NestedDropdown = ({ item , level = 0 }:any) => {
  const [open, setOpen] = useState(false);
   

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger className={`flex items-center justify-between w-full text-left ${
        level > 0 ? 'text-sm pl-4' : ''
      }`}>
        <span className="text-sm outline-none focus:outline-none pl-2 py-2 border-b border-gray-100 w-full">{item.name}</span>
        <ChevronRight className="h-4 w-4 ml-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="bg-background py-3 border-border shadow-elegant min-w-[200px]"
        side={level > 4 ? "left" : "bottom"}
        align={level > 4 ? "start" : "center"}
      >
        {item.dropdown.map((subItem:any, idx:any) => (
          <div key={idx}>
            {subItem.dropdown ? (
              <NestedDropdown item={subItem} level={level + 1} />
            ) : (
              <DropdownMenuItem className="text-foreground border-b py-2 border-gray-100 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                <a href={subItem.href} className="w-full">
                  {subItem.name}
                </a>
              </DropdownMenuItem>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Mobile nested navigation component
const MobileNestedItem = ({ item, level = 0 }:any) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className={`${level > 0 ? 'ml-4' : ''}`}>
      <div 
        className="flex items-center justify-between px-3 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={level > 0 ? 'text-sm' : ''}>{item.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
      
      {isExpanded && (
        <div className="ml-2 space-y-1 border-l border-border pl-2 mt-1">
          {item.dropdown.map((subItem:any, idx:any) => (
            <div key={idx}>
              {subItem.dropdown ? (
                <MobileNestedItem item={subItem} level={level + 1} />
              ) : (
                <a
                  href={subItem.href}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/30 rounded-md transition-colors"
                >
                  {subItem.name}
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
 const {  loading, user } = useAuth();
 const navigate = useRouter()
      const getInitials = (name: string) => {
    return name && name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  
 

// First, update your navigation configuration to use the new structure:
const navigation = [
  { name: t('header.home'), href: "/" },
  { name: t('header.about'), href: "/about" },
  {
    name: t('header.actor'),
    href: "#",
    dropdown: getAllCategories().map(category => {
      // For categories with subcategories, create nested dropdown
      if (category.hasSubcategories) {
        return {
          name: category.name, // or use translation: t(`header.actor.${category.slug}`)
          href: "#",
          dropdown: category.subcategories?.map(subcat => ({
            name: subcat.name,
            href: `/actor/${category.slug}/${subcat.slug}`
          })) || []
        };
      }
      
      // For categories without subcategories, direct link
      return {
        name: category.name,
        href: `/actor/${category.slug}`
      };
    })
  },
  {
    name: t('header.news'),
    href: "/news/national",
  },
  {
    name: t('header.climateDocuments'),
    href: "/documents/national",
  },
  // {
  //   name: t('header.climateDocuments'),
  //   href: "/documents/national",
  //   dropdown: [
  //     { name: t('header.documents.international'), href: "/documents/international" },
  //     { name: t('header.documents.national'), href: "/documents/national" },
  //   ],
  // },
];
 
const handleLogout = async () => {
    try {
    await signOut(auth);
    console.log("User signed out successfully");
    toast.success(`${t('common.logout.success')}`);
    localStorage.removeItem("userProfile");
   navigate.push('/');
  } catch (error) {
    console.error("Error signing out:", error);
    toast.error(`${t('common.logout.error')}`);
  }
};

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
  {navigation.map((item, idx) =>
    item.dropdown ? (
      <DropdownMenu key={idx}>
        <DropdownMenuTrigger className="nav-link flex items-center gap-1 focus:outline-hidden">
          <span>{item.name}</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-background py-3 border-border shadow-elegant min-w-[200px]">
          {item.dropdown.map((subItem, subIdx) => (
            <div key={subIdx}>
              {subItem.dropdown ? (
                <NestedDropdown item={subItem} />
              ) : (
                <DropdownMenuItem className="text-foreground border-b py-2 border-gray-100 hover:bg-accent hover:text-accent-foreground cursor-pointer">
                  <a href={subItem.href} className="w-full">
                    {subItem.name}
                  </a>
                </DropdownMenuItem>
              )}
            </div>
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
            
           
      {loading ? (
        // show nothing or a spinner while loading
        <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      ) : user && user.emailVerified === true ? (
        <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-gradient-to-r from-secondary to-primary text-white font-semibold">
                        { getInitials(user.firstName || user.fullName) || user.email!.split("@")[0]}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <div className="font-medium">{user?.firstName || user.fullName}</div>
                    <div className="text-muted-foreground">{user?.email}</div>
                    <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-1 inline-block">
                      {user?.role}
                    </div>
                  </div>
                 
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t('common.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        // Not authenticated: show login/signup buttons
        <>
          <Link
            href="/auth/signin"
            className="w-full px-3 py-2 bg-transparent border-2 text-primary border-primary rounded-md text-sm whitespace-nowrap"
          >
            {t('auth.signIn')}
          </Link>
          <Link
            href="/auth/signup"
            className="w-full px-3 py-2 text-white bg-primary rounded-md text-sm whitespace-nowrap"
          >
           {t('auth.signUp')}
          </Link>
        </>
      )}
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
              {navigation.map((item, idx) => (
                <div key={idx}>
                  {item.dropdown ? (
                    <MobileNestedItem item={item} />
                  ) : (
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent/50 rounded-md transition-colors"
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              <div className="pt-4 space-y-2 flex flex-wrap gap-2">
                <Link href='/auth/signin' className="w-full px-4 py-2 bg-transparent border-2 text-primary border-primary rounded-md text-base whitespace-nowrap">
                  {t('header.signIn')}
                </Link>
                <Link href='/auth/signup' className="w-full px-4 py-2 text-white bg-primary rounded-md text-base whitespace-nowrap">
                  {t('header.signUp')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
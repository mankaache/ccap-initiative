"use client";

import { usePathname } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import NormalLayout from "./NormalLayout";

interface BaseLayoutProps {
  children: React.ReactNode;
}

export function NewBaseLayout({ children }: BaseLayoutProps) {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return <DashboardLayout>{children}</DashboardLayout>;
  }

  if (pathname?.startsWith("/auth")) {
    
    return <>{children}</>;
  }

  return <NormalLayout>{children}</NormalLayout>;
}

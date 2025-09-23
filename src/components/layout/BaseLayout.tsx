"use client";

import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NewBaseLayout } from "./NewBaseLayout";
import { toast, ToastContainer } from "react-toastify";
import { initializeCleanupScheduler } from "@/lib/cleanupScheduler";
import { useNetworkStatus } from "@/lib/network";
import { useTranslation } from "@/hooks/useTranslation";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  initializeCleanupScheduler();
  const {t} = useTranslation();



  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
     
          <TooltipProvider>
            <Sonner position="top-center"   />
            <NewBaseLayout>
            {children}
            </NewBaseLayout>
          </TooltipProvider>
          <ToastContainer theme="light" />
      </QueryClientProvider>
    </div>
  );
};

export default BaseLayout;

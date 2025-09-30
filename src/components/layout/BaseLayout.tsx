"use client";

import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NewBaseLayout } from "./NewBaseLayout";
import {  ToastContainer } from "react-toastify";
import { initializeCleanupScheduler } from "@/lib/cleanupScheduler";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  initializeCleanupScheduler();
  
if (process.env.NODE_ENV === "production") {
  console.log = function () {};
  console.error = function () {};
  console.debug = function () {};
  console.warn = function () {};
}



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

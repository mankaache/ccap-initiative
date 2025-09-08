"use client";

import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "../ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./Footer";
import Header from "./Header";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
     
          <TooltipProvider>
            <Sonner position="top-center"   />
            <Header/>
            {children}
            <Footer/>
          </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
};

export default BaseLayout;

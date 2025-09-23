"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, MapPin, Users, DollarSign, Globe } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import heroimage from "@/assets/heroimage.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchAllProjects } from "@/firebase/services/projectService";

const HeroSection = () => {
  const { t } = useTranslation();

   const [projects, setProjects] = useState([]);
      
        useEffect(() => {

          const loadArticles = async () => {
            try {
              const allArticles = await fetchAllProjects();
              //@ts-ignore
              setProjects(allArticles as Project[]);
              console.log('allArticles', allArticles);
            } catch (err) {
              console.error(err);
            }
          };
      
          loadArticles();
        }, []);
  

  const stats = [
   
    {
      icon: Globe,
      value: projects && projects.length,
      label: t("hero.stats.activeProjects"),
      color: "text-secondary",
      description: t("hero.stats.projectsDesc"),
    },
    {
      icon: Users,
      label: t("hero.stats.activePartners"),
      value: "10",
      description: t("hero.stats.partnersDesc"),
    },
    {
      icon: MapPin,
      label: t("hero.stats.regionsCovered"),
      value: "10",
      description: t("hero.stats.regionsDesc"),
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background Image with Overlay */}
      
         <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          //@ts-ignore
          poster={heroimage} 
        >
          <source src={'/herovideo.mp4'} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          {t("hero.videosupport")}
        </video>
        <div className="absolute inset-0 bg-gradient-to-l from-primary/20 via-primary/40 to-secondary/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-secondary/10" />
      </div>

      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-4xl">
          <div className="relative">
            {/* Hero Content */}
            <div className="animate-fade-in">
              <h1 className="text-4xl capitalize text-white sm:text-5xl lg:text-6xl font-bold  mb-6 leading-tight">
                {t("hero.title")}
              </h1>
              <p className="text-xl text-white  leading-relaxed">
                {t("hero.description")}
              </p>

              <p className="text-xl text-white mb-8 leading-relaxed">
              {t("hero.description2")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {/* <Button
                  size="lg"
                  className="bg-gradient-hero hover:opacity-90 shadow-climate"
                >
                  {t("hero.exploreProjects")}
                </Button> */}
                {/* {/* <Button
                  size="lg"
                  className="bg-primary hover:opacity-90 shadow-climate"
                >
                  {t("hero.projectTransparency")}
                </Button> */}
                <Link
                href={'/map'}
                  className=" border-white bg-white/40 border py-2 px-3 rounded-lg text-white hover:bg-white hover:text-secondary"
                >
                  {t("hero.viewMap")}
                </Link> 
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="relative w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="py-6 px-8 bg-card shadow-lg hover:shadow-xl transition-all duration-300 border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div
                      className={`text-2xl lg:text-3xl font-bold ${stat.color} mb-1`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm lg:text-lg text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                  <stat.icon
                    className={`h-8 w-8 lg:h-10 lg:w-10 ${stat.color}`}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

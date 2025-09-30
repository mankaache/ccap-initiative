"use client";

import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Target,
  Eye,
  Heart,
  Award,
  Globe,
  TrendingUp,
  Shield,
  Calendar,
  DollarSign,
  TreePine,
  Lightbulb,
  Trophy,
  Medal,
} from "lucide-react";
import aboutImage from "@/assets/about.jpg";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import News from "./News";
import Newsletter from "./NewsLetter";
const About = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 py-24">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full">
            <Image
              src={aboutImage}
              fill
              alt="Climate action in Cameroon"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/30 " />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="text-center">
            <Badge
              className="mb-6 bg-primary/10 text-primary border-primary/20"
              variant="outline"
            >
              {t("about.subTitle")}
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight">
              {t("about.heroTitle1")} <br />
              {t("about.heroTitle2")}
            </h1>
            <p className="text-xl md:text-2xl  max-w-4xl mx-auto leading-relaxed">
              {t("about.desc")}
            </p>
            
          </div>
        </div>
      </section>

      {/* Mission & Vision Enhaclnced */}
      <section className="py-10 mt-6">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* <Badge
              className="mb-4 bg-secondary/10 text-secondary border-secondary/20"
              variant="outline"
            >
            {t("about.foundation")}
            </Badge> */}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("about.driving")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.pillars")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("about.missionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.enhance")}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Eye className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">
                  {t("about.visoionTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.vision")}
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">
                  {t("about.communityTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.community")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story - to be translated */}

      <h2 className="text-4xl md:text-5xl mt-10 font-bold text-foreground mb-6"></h2>
      <p></p>

      <section className="py-16 bg-accent/30">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl font-bold text-foreground mb-6">
                {t("about.platform")}
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            {t('about.platformDesc')}
              </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12  mb-2">
            <div>
             
             
              <div className="text-lg text-muted-foreground mb-8 leading-relaxed">
                <p className="mb-4 text-lg font-semibold">{t("about.youcan")}:</p>
                <ul className="mb-4">
                  {" "}
                  <li className="font-semibold">{t('about.checkClimate')}</li>
                  {t('about.checkClimateDesc')}
                </ul>
                <ul className="mb-4">
                  {" "}
                  <li className="font-semibold">{t('about.share')} </li>
                 {t('about.shareDesc')}
                </ul>
                <ul className="mb-4">
                  <li className="font-semibold">{t('about.read')}</li>{" "}
                 {t('about.readDesc')}
                </ul>
             
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-80 flex items-center justify-center">
                <TreePine className="h-28 w-32 text-primary/60" />
              </div>
            </div>
               
          </div>
            <ul className="mb-4 text-lg">
                  {" "}
                  <li className="font-semibold text-lg">{t('about.access')}</li> 
                  {t('about.accessDesc')}
                </ul>
                <Link className="text-primary underline font-semibold text-lg hover:underline" href={'#'}>👉 {t('about.link')}</Link>
        </div>
      </section>

      {/* About Founders */}
      {/* take our story section */}

      {/* Partners Section */}
      <section className="py-10">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-primary/10 text-primary border-primary/20"
              variant="outline"
            >
              {t("about.ourNetwork")}
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              {t("about.financialPartner")}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.working")}
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              {t("about.govtPartners")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg p-6 shadow">
                <h4 className="font-medium text-foreground">
                  {t('about.ministry1')}
                </h4>
                <p className="text-sm text-muted-foreground mt-2">{t('about.country')}</p>
              </div>
             
            </div>
          </div>

          {/* <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  UN Environment
                </h3>
                <p className="text-sm text-muted-foreground">
                  Global Partnership
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardContent className="p-8 text-center">
                <DollarSign className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  World Bank
                </h3>
                <p className="text-sm text-muted-foreground">
                  Financial Partner
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <TreePine className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  Green Climate Fund
                </h3>
                <p className="text-sm text-muted-foreground">Funding Partner</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-secondary mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">
                  African Union
                </h3>
                <p className="text-sm text-muted-foreground">
                  Regional Partner
                </p>
              </CardContent>
            </Card>
          </div> */}
        </div>
      </section>

    
      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 mb-14 ">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
            Join the Movement
          </Badge> */}
          <h2 className="text-4xl font-bold text-foreground mb-6">
            {t("about.joinUs")}
          </h2>
          <p className="text-lg  mb-12 max-w-3xl mx-auto">{t("about.build")}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
            href={'/auth/signup'}
              className="bg-primary flex items-center font-semibold justify-center text-sm px-4 py-3 rounded-md hover:bg-primary/90 text-primary-foreground"
            >
              <Users className="mr-2 h-5 w-5" />
              {t('about.createAcc')}
            </Link>
          
            {/* <Button size="lg" variant="secondary">
              <Globe className="mr-2 h-5 w-5" />
              Check your project for transparency
            </Button> */}
          </div>
        </div>
      </section>

      <Newsletter/>
    </div>
  );
};

export default About;

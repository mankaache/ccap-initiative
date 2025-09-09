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
import flag from "@/assets/flag.png";
import gda from "@/assets/GDA.png";
import said from "@/assets/Said.png";
import aboutImage from "@/assets/about.jpg";
import Image from "next/image";
const About = () => {
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
              Leading Climate Action in Cameroon
            </Badge>
            <h1 className="text-5xl md:text-6xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight">
              Fixing Climate Change <br /> One Project at a time
            </h1>
            <p className="text-xl md:text-2xl  max-w-4xl mx-auto leading-relaxed">
              Promoting transparency and accountability in climatic endeavors in
              Cameroon.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                See all projects
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 -mt-16 relative z-10">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl flex flex-col justify-center items-center shadow border-border py-8 px-4">
            <h2 className="text-lg font-bold text-center text-foreground mb-5">
              Founding Organisations
            </h2>
            <div className="flex items-center flex-wrap gap-12 lg:gap-20">
              <div className="relative text-center w-20 h-20 rounded-full ">
                <Image
                  src={flag}
                  fill
                  alt="Climate action in Cameroon"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="relative text-center w-20 h-20 rounded-full ">
                <Image
                  src={said}
                  fill
                  alt="Climate action in Cameroon"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="relative">
                <Image
                  src={gda}
                  alt="Climate action in Cameroon"
                  className=" h-20 w-40"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Enhaclnced */}
      <section className="py-10">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-secondary/10 text-secondary border-secondary/20"
              variant="outline"
            >
              Our Foundation
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Driving Climate Transparency
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on the pillars of transparency, accountability, and
              sustainable development
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  To enhance transparency in climate finance and ensure
                  effective implementation of environmental projects across
                  Cameroon.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-secondary/5 to-secondary/10">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Eye className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  A transparent and accountable climate action ecosystem that
                  promotes sustainable development and environmental resilience.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Our Community</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  Bringing together government agencies, NGOs, private sector,
                  and local communities for collaborative climate action.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-accent/30">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
            <div>
              <Badge
                className="mb-4 bg-primary/10 text-primary border-primary/20"
                variant="outline"
              >
                Our Journey
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Building Trust in Climate Finance
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2020, CCAP emerged from the need for greater
                transparency in climate finance across Africa. Our platform has
                evolved into a comprehensive ecosystem that tracks, monitors,
                and reports on climate initiatives with unprecedented detail and
                accessibility.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, we serve as a bridge between international climate
                funding and local implementation, ensuring that every euro
                invested in climate action creates measurable, sustainable
                impact in communities across Cameroon.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">Est. 2020</Badge>
                <Badge variant="secondary">ISO Certified</Badge>
                <Badge variant="secondary">UN Partnership</Badge>
                <Badge variant="secondary">Award Winner</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                <TreePine className="h-32 w-32 text-primary/60" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                <TreePine className="h-32 w-32 text-primary/60" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Building Trust in Climate Finance
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2020, CCAP emerged from the need for greater
                transparency in climate finance across Africa. Our platform has
                evolved into a comprehensive ecosystem that tracks, monitors,
                and reports on climate initiatives with unprecedented detail and
                accessibility.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, we serve as a bridge between international climate
                funding and local implementation, ensuring that every euro
                invested in climate action creates measurable, sustainable
                impact in communities across Cameroon.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">Est. 2020</Badge>
                <Badge variant="secondary">ISO Certified</Badge>
                <Badge variant="secondary">UN Partnership</Badge>
                <Badge variant="secondary">Award Winner</Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-28">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">
                Building Trust in Climate Finance
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 2020, CCAP emerged from the need for greater
                transparency in climate finance across Africa. Our platform has
                evolved into a comprehensive ecosystem that tracks, monitors,
                and reports on climate initiatives with unprecedented detail and
                accessibility.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, we serve as a bridge between international climate
                funding and local implementation, ensuring that every euro
                invested in climate action creates measurable, sustainable
                impact in communities across Cameroon.
              </p>
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary">Est. 2020</Badge>
                <Badge variant="secondary">ISO Certified</Badge>
                <Badge variant="secondary">UN Partnership</Badge>
                <Badge variant="secondary">Award Winner</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                <TreePine className="h-32 w-32 text-primary/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Founders */}
      {/* take our story section */}

      {/* Partners Section */}
      <section className="py-20">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge
              className="mb-4 bg-primary/10 text-primary border-primary/20"
              variant="outline"
            >
              Our Network
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Financial and Technical Partners
              </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Working together with leading organizations to drive climate
              transparency
            </p>
          </div>
           <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Government Partners
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg p-6 shadow">
                <h4 className="font-medium text-foreground">
                  Ministry of Environment
                </h4>
                <p className="text-sm text-muted-foreground mt-2">Cameroon</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow">
                <h4 className="font-medium text-foreground">
                  Ministry of Finance
                </h4>
                <p className="text-sm text-muted-foreground mt-2">Cameroon</p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow">
                <h4 className="font-medium text-foreground">MINEPDED</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Environment Agency
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 shadow">
                <h4 className="font-medium text-foreground">
                  Regional Councils
                </h4>
                <p className="text-sm text-muted-foreground mt-2">10 Regions</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
          </div>

         
        </div>
      </section>

      {/* Awards & Recognition
      <section className="py-20 bg-accent/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20" variant="outline">
              Recognition
            </Badge>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Awards & Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our commitment to excellence has been recognized globally
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Award className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Climate Transparency Award</CardTitle>
                <p className="text-sm text-muted-foreground">2023 • UN Climate Summit</p>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Trophy className="h-16 w-16 text-secondary mx-auto mb-4" />
                <CardTitle className="text-lg">Innovation in Finance</CardTitle>
                <p className="text-sm text-muted-foreground">2022 • World Bank Group</p>
              </CardHeader>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <Medal className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-lg">Digital Excellence</CardTitle>
                <p className="text-sm text-muted-foreground">2021 • African Tech Awards</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Enhanced Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
            Join the Movement
          </Badge> */}
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Join us to make a difference for the planet
          </h2>
          <p className="text-lg  mb-12 max-w-3xl mx-auto">
            Be part of building a more transparent and effective climate action
            ecosystem in Cameroon.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Users className="mr-2 h-5 w-5" />
              Project Transparency
            </Button>
            <Button size="lg" variant="outline">
              <Calendar className="mr-2 h-5 w-5" />
              Add your project
            </Button>
            {/* <Button size="lg" variant="secondary">
              <Globe className="mr-2 h-5 w-5" />
              Check your project for transparency
            </Button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

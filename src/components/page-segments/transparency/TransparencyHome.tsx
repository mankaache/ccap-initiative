
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle, FileText, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

const TransparencyHome = () => {
  return (
    <div className="min-h-screen max-w-[1300px] mx-auto bg-gradient-subtle">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-28">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="p-4 bg-gradient-to-b from-secondary to-primary text-white rounded-full">
              <Shield className="h-12 w-12" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-b from-secondary to-primary bg-clip-text text-transparent mb-6">
            Transparency Demonstration Tool
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Improve your organization's transparency practices with our comprehensive assessment platform. 
            Build trust, demonstrate accountability, and identify areas for improvement.
          </p>
          <Link href="/project-transparency/demonstration">
            <Button size="lg" className=" bg-gradient-to-r from-orange-500 to-green-500 hover:opacity-90 text-lg px-8 py-4">
              Start 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader className="text-center">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Build Trust & Credibility</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Demonstrate your commitment to openness and accountability to the public.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader className="text-center">
              <div className="p-3 bg-secondary/60 rounded-full w-fit mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <CardTitle>Identify Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get actionable insights and personalized recommendations to enhance your transparency practices.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-medium hover:shadow-strong transition-shadow">
            <CardHeader className="text-center">
              <div className="p-3 bg-success/10 rounded-full w-fit mx-auto mb-4">
                <FileText className="h-8 w-8 text-success" />
              </div>
              <CardTitle>Downloadable Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Receive comprehensive reports with detailed analysis and benchmarking data.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Start Demonstation process", description: "Click to begin your transparency evaluation" },
              { step: "2", title: "Answer Questions", description: "Complete multi-part questions about your practices" },
              { step: "3", title: "Get Scored", description: "Receive real-time scoring and progress tracking" },
              { step: "4", title: "Download Report", description: "Get detailed results and recommendations" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12  bg-gradient-to-b from-secondary/80 to-primary/85 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-transparency-light p-8 rounded-lg border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Assess Your Transparency?</h2>
          <p className="text-muted-foreground mb-6">
            Take the first step towards building greater trust and accountability in your organization and in the public.
          </p>
          <Link href="/project-transparency/demonstration">
            <Button size="lg" className=" bg-gradient-to-l from-secondary to-primary hover:opacity-90">
              Begin Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TransparencyHome;

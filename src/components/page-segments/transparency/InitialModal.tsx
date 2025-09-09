import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Clock, FileText, X } from "lucide-react";

interface InitialModalProps {
  onContinue: () => void;
  onGoBack: () => void;
}

export const InitialModal = ({ onContinue, onGoBack }: InitialModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl shadow-strong h-full animate-in fade-in duration-300">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-8 w-8 p-0"
            onClick={onGoBack}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center gap-2">
            <div className="p-3 bg-secondary rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold  bg-gradient-to-b from-secondary to-primary bg-clip-text text-transparent">
            Transparency Assessment
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Evaluate and improve your organization's transparency practices
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Why This  Matters
            </Badge>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Build Trust & Credibility</h4>
                <p className="text-sm text-muted-foreground">
                  Demonstrate your commitment to openness and accountability to stakeholders
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Identify Improvement Areas</h4>
                <p className="text-sm text-muted-foreground">
                  Get actionable insights on where to enhance your transparency practices
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Quick & Comprehensive</h4>
                <p className="text-sm text-muted-foreground">
                  Takes only 10-15 minutes to complete with immediate results and downloadable report
                </p>
              </div>
            </div>
          </div>

          <div className="bg-transparency-light p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-sm mb-2">What You'll Get:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Comprehensive transparency score and analysis</li>
              <li>• Personalized recommendations for improvement</li>
              <li>• Downloadable report for your records</li>
            </ul>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onGoBack}
              className=""
            >
              Maybe Later
            </Button>
            <Button
              onClick={onContinue}
              className=" bg-secondary hover:opacity-90"
            >
              Start Process
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
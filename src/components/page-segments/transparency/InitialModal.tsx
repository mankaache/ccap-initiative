import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Shield, Clock, FileText, X } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface InitialModalProps {
  onContinue: () => void;
  onGoBack: () => void;
}

export const InitialModal = ({ onContinue, onGoBack }: InitialModalProps) => {
  
  const {t} = useTranslation()
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl shadow-strong animate-in fade-in duration-300">
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
            {t("tran.demonstration")}
          </CardTitle>
          <CardDescription className="text-base mt-2">
           {t("tran.demonstration2")}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              {t("tran.why")}
            </Badge>
          </div>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">{t("tran.build")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("tran.demon")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">{t("tran.identify")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("tran.action")}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">{t('tran.quick')}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("tran.time")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-transparency-light p-4 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-sm mb-2">{t("tran.youGet")}:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {t("tran.bullet1")}</li>
              <li>• {t("tran.bullet2")}</li>
              <li>• {t("tran.bullet3")}</li>
            </ul>
          </div>

          <div className="flex items-center justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onGoBack}
              className=""
            >
              {t('common.later')}
            </Button>
            <Button
              onClick={onContinue}
              className=" bg-secondary hover:opacity-90"
            >
              {t("common.start")}
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};
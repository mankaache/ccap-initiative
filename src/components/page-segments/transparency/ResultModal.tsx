'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Trophy, TrendingUp, AlertTriangle, CheckCircle, X } from "lucide-react";
import { QuestionResponse } from "./Assessment";
import { OrganizationData } from "./OganisationInfo";
import { toast } from "sonner";
import { QuestionData } from "@/data/AssessmentQuestions";
import { start } from "repl";
import { useTranslation } from "@/hooks/useTranslation";
import pdfMake from '@/types/pdfFonts';
import { useEffect, useState } from "react";
import { fetchProjectById } from "@/firebase/services/projectService";
import { useParams } from "next/navigation";


interface ResultsModalProps {
  score: number;
  responses: QuestionResponse[];
  questions: QuestionData[];
  organizationData: OrganizationData;
  onClose: () => void;
}

export const ResultsModal = ({ score, responses, questions, organizationData, onClose }: ResultsModalProps) => {
const [project,setProject] = useState<any>(null);
 
const {t} = useTranslation()
  const { projectId, id} = useParams();

  useEffect(() => {
    const loadProject = async () => {
      try {
        const proj = await fetchProjectById(projectId as string);

        // Optional: check if project belongs to the correct organisation
        if (proj.organizationId !== id) {
          toast.error(`${t('admin.project.projectDoesnt')}`);
          setProject(null);
          return;
        }

        setProject(proj);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || t('admin.project.failedTo'));
      } 
    };

    loadProject();
  }, [projectId, id]);
  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: t("tran.excellent") , color: "default", icon: Trophy };
    if (score >= 60) return { label: t('tran.good') , color: "secondary", icon: TrendingUp };
    return { label: t("tran.Improvement") , color: "destructive", icon: AlertTriangle };
  };

  const scoreCategory = getScoreCategory(score);
  const ScoreIcon = scoreCategory.icon;

  const generateReportData = () => {
    const reportData = {
      organizationInfo: {
        name: (project && project.organizationName).toUpperCase(),
        startDate: project && project.startDate,
        endDate: project && project.endDate,
        organizationType: (project && project.category).toUpperCase(),
        orgDescription: (project && project.orgdescription),
        goal: (project && project.projectType).toUpperCase(),
      },
      assessmentDate: new Date().toISOString().split('T')[0],
      overallScore: score,
      scoreCategory: scoreCategory.label,
      questionResponses: questions.map(question => {
        const response = responses.find(r => r.id === question.id);
        if (!response) return null;

                let questionScore = 0;
          if (response.skipped) {
            questionScore = 0;
          } else {
            if (response.yesNoAnswer === true) questionScore += 1;
            if (response.checkboxAnswers.some((checked:any) => checked)) questionScore += 1;
            if (response.fileUploaded) questionScore += 1;
          }


        return {
          question: question.title,
            yesNoQuestion: question.yesNoQuestion,
            yesNoAnswer: response.skipped
              ? t("tran.skipped")
              : (response.yesNoAnswer === true ? t("tran.yes") : response.yesNoAnswer === false ? t("tran.no") : t("tran.notAnswered")),
            checkboxAnswers: response.skipped
              ? t("tran.skipped")
              : question.checkboxOptions.filter((_, index:any) => response.checkboxAnswers[index]).join(", ") || t("tran.noneSelected"),
            fileUploaded: response.skipped
              ? t("tran.skipped")
              : (response.fileUploaded ? response.fileUploaded.name : t("tran.noFile")),
            questionScore: response.skipped ? "0/3 (Skipped)" : `${questionScore}/3`,
            skipped: response.skipped
        };
      }).filter(Boolean),
      recommendations: getRecommendations(score, responses, questions)
    };

    return reportData;
  };

  const getRecommendations = (score: number, responses: QuestionResponse[], questions: QuestionData[]) => {
    const recommendations = [];
    
    if (score < 60) {
      recommendations.push(t("tran.recommendation1"));
      recommendations.push(t("tran.recommendation2"));
    }
    
    if (score < 80) {
      recommendations.push(t("tran.recommendation3"));
      recommendations.push(t("tran.recommendation4"));
    }

    // Check for specific areas of improvement
    responses.forEach((response, index) => {
      if (response.skipped) {
        recommendations.push(`${t("tran.addressing")} ${questions[index]?.title.toLowerCase()} ${t("tran.practices")}`);
      } else {
        let questionScore = 0;
        if (response.yesNoAnswer === true) questionScore += 1;
        if (response.checkboxAnswers.some((checked:any) => checked)) questionScore += 1;
        if (response.fileUploaded) questionScore += 1;
        
        if (questionScore < 2) {
          recommendations.push(`${t("tran.strengthen")} ${questions[index]?.title.toLowerCase()} ${t("tran.practices")}`);
        }
      }
    });

    return recommendations.slice(0, 5); // Limit to top 5 recommendations
  };
 // adjust path

const downloadReport = () => {
  const reportData = generateReportData();

  const docDefinition: any = {
    content: [
      { text: t("tran.demonstrationReport"), style: "header" },
      { text: `${t("tran.generated")}: ${reportData.assessmentDate}`, margin: [0, 0, 0, 20] },

      { text: t("tran.orgInfo"), style: "subheader" },
      {
        table: {
          widths: ["auto", "*"],
          body: [
            [t("tran.orgName"), reportData.organizationInfo.name],
            [t("tran.orgType"), reportData.organizationInfo.organizationType || t("tran.notSpecified")],
            [t("project.type_info"), reportData.organizationInfo.goal || ''],
            [t("tran.orgDescription"), reportData.organizationInfo.orgDescription || t("tran.NoOrgDescription")],
          ],
        },
        margin: [0, 0, 0, 20],
      },

      { text: t("tran.overallResults"), style: "subheader" },
      { text: `${t("tran.Rscore")}: ${reportData.overallScore}%`, bold: true },
      { text: `${t("tran.category")}: ${reportData.scoreCategory}`, margin: [0, 0, 0, 20] },

      { text: t("tran.responses"), style: "subheader" },
      {
        ol: reportData.questionResponses.map((res: any) => {
          return [
            { text: res.question, bold: true },
            { text: `${t("tran.questions")}: ${res.yesNoQuestion}` },
            { text: `${t("tran.answer")}: ${res.yesNoAnswer}` },
            { text: `${t("tran.selectedOptions")}: ${res.checkboxAnswers}` },
            { text: `${t("tran.uploadedFile")}: ${res.fileUploaded}` },
            { text: `${t("tran.Rscore")}: ${res.questionScore}` },
            res.skipped ? { text: t("tran.skipped"), italics: true, color: "red" } : {},
            { text: " " },
          ];
        }),
        margin: [0, 0, 0, 20],
      },

      { text: t("tran.recommendation"), style: "subheader" },
      {
        ul: reportData.recommendations.map((rec: any) => rec),
        margin: [0, 0, 0, 20],
      },

      { text: t("tran.recoDesc"), italics: true, fontSize: 10 },
    ],
    styles: {
      header: { fontSize: 20, bold: true, margin: [0, 0, 0, 10] },
      subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
    },
    defaultStyle: {
      fontSize: 11,
    },
  };

  pdfMake.createPdf(docDefinition).download(
    `${t("tran.assessment")}-${reportData.organizationInfo.name.replace(/[^a-zA-Z0-9]/g, "-")}-${reportData.assessmentDate}.pdf`
  );

  toast.success(t("tran.downloadedReport"), {
    description: t("tran.downloadDesc"),
  });
};


  const completedQuestions = responses.filter(r => !r.skipped).length;
  const totalQuestions = questions.length;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-strong animate-in fade-in duration-300">
        <CardHeader className="text-center relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-8 w-8 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-3 bg-gradient-to-l from-secondary to-primary rounded-full">
              <ScoreIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <CardTitle className="text-3xl font-bold bg-gradient-to-l from-secondary to-primary bg-clip-text text-transparent">
            {t("tran.tranResults")}
          </CardTitle>
          <CardDescription className="text-base mt-2">
           {t("tran.formFilled")} {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center bg-gradient-to-l from-secondary/10 to-primary/10  p-6 rounded-lg">
            <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
            <Badge variant={scoreCategory.color as any} className="mb-4 text-sm px-4 py-2">
              {scoreCategory.label}
            </Badge>
            <Progress value={score} className="w-full max-w-md mx-auto" />
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{completedQuestions}</div>
                <div className="text-sm text-muted-foreground">{t("tran.questionCompleted")}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl text-foreground font-bold ">{totalQuestions - completedQuestions}</div>
                <div className="text-sm text-muted-foreground">{t("tran.questionSkipped")}</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">
                  {responses.filter(r => !r.skipped && r.fileUploaded).length}
                </div>
                <div className="text-sm text-muted-foreground">{t("tran.filesUploaded")}</div>
              </CardContent>
            </Card>
          </div>

          {/* Question Breakdown */}
          <div className="max-h-[300px] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{t("tran.questionBreakdown")}</h3>
            <div className="space-y-3">
              {questions.map((question, index) => {
                const response = responses.find(r => r.id === question.id);
                if (!response) return null;

                let questionScore = 0;
                if (!response.skipped) {
                  if (response.yesNoAnswer === true) questionScore += 1;
                  if (response.checkboxAnswers.some(checked => checked)) questionScore += 1;
                  if (response.fileUploaded) questionScore += 1;
                }

                return (
                  <div key={question.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className={`h-5 w-5 ${response.skipped ? 'text-muted-foreground' : 'text-success'}`} />
                      <div>
                        <div className="font-medium">{question.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {response.skipped ? '0/3 (Skipped)' : `${questionScore}/3 points earned`}
                        </div>
                      </div>
                    </div>
                    <Badge variant={response.skipped ? "destructive" : questionScore >= 2 ? "default" : "secondary"}>
                      {response.skipped ? "0/3 (Skipped)" : `${questionScore}/3`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold mb-4 capitalize">{t("tran.recommendation")}</h3>
            <div className="bg-transparency-light p-4 rounded-lg border border-primary/20">
              <ul className="space-y-2">
                {getRecommendations(score, responses, questions).map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {t("tran.closeResults")}
            </Button>
            <Button
              onClick={downloadReport}
              className="flex-1 bg-gradient-to-l from-secondary to-primary hover:opacity-90"
            >
              <Download className="h-4 w-4 mr-2" />
              {t("tran.downloadReport")}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
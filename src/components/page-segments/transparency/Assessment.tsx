"use client";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, FileCheck, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrganizationData, OrganizationInfo } from "./OganisationInfo";
import { InitialModal } from "./InitialModal";
import { AssessmentQuestion } from "./AssessmentQuestions";
import { ResultsModal } from "./ResultModal";
import { sampleQuestions } from "@/data/AssessmentQuestions";
import { set } from "react-hook-form";
import { useTranslation } from "@/hooks/useTranslation";



export interface QuestionResponse {
  id: number;
  yesNoAnswer: boolean | null;
  checkboxAnswers: boolean[];
  fileUploaded: File | null;
  skipped: boolean;
}



const TransparencyAssessment = () => {
  const navigate = useRouter();
  const {t} = useTranslation()
  const [showInitialModal, setShowInitialModal] = useState(true);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [hasCompletedOnce, setHasCompletedOnce] = useState(false);
  const [currentSection, setCurrentSection] = useState<
    "organization" | "questions"
  >("organization");

  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    organizationName: "",
  description:"",
  ProjectTitle: "",
  specificLocation:"",
  region: [],
  target:"",
  actors:[],
  startDate: "",
  endDate: "",
  fundingSource: "",
  budgetAmount: "",
  specificObjectives: "",
  interventionLogic: "",
  results: "",
  Goal: "",
  organizationType: "",
  programs: [],
  isOngoing: false,
  status:t('tran.planned') as 'ongoing' | 'completed' | 'planned'
  });

  useEffect(() => {
    // Initialize responses
    const initialResponses = sampleQuestions.map((q) => ({
      id: q.id,
      yesNoAnswer: null,
      checkboxAnswers: [false, false, false],
      fileUploaded: null,
      skipped: false,
    }));
    setResponses(initialResponses);
  }, []);

  const calculateScore = () => {
    let totalPoints = 0;
    let maxPoints = 0;

    responses.forEach((response) => {
      if (!response.skipped) {
        maxPoints += 3;

        // Yes/No answer (1 point for yes)
        if (response.yesNoAnswer === true) totalPoints += 1;

        // Checkbox answers (1 point if at least one checked)
        if (response.checkboxAnswers.some((checked) => checked))
          totalPoints += 1;

        // File upload (1 point if file uploaded)
        if (response.fileUploaded) totalPoints += 1;
      }
    });

    return maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
  };

  const handleContinue = () => {
    setShowInitialModal(false);
  };

  const handleOrganizationNext = () => {
    setCurrentSection("questions");
  };

  const handleBackToOrganization = () => {
    setCurrentSection("organization");
  };

  const handleGoBack = () => {
    navigate.back();
  };

  const updateResponse = (
    questionId: number,
    updates: Partial<QuestionResponse>
  ) => {
    setResponses((prev) =>
      prev.map((response) =>
        response.id === questionId ? { ...response, ...updates } : response
      )
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleShowResults = () => {
    setShowResultsModal(true);
    setHasCompletedOnce(true);
  };

  const handleCloseResults = () => {
    setShowResultsModal(false);
    // Reset the form
    const initialResponses = sampleQuestions.map((q) => ({
      id: q.id,
      yesNoAnswer: null,
      checkboxAnswers: [false, false, false],
      fileUploaded: null,
      skipped: false,
    }));
    setResponses(initialResponses);
    setCurrentQuestionIndex(0);
    setCurrentSection("organization");
    setOrganizationData({
      organizationName: "",
      organizationType: "",
      Goal: "",
      description:"",
      ProjectTitle:"",
      specificLocation:"",region: [],
      target:"",
      actors :[],
      startDate: "",
      endDate: "",
      fundingSource: "",
      budgetAmount: "",
      specificObjectives: "",
      interventionLogic: "",
      results: "",
      programs: [],
      isOngoing: false,
      status:t("tran.planned") as 'ongoing' | 'completed' | 'planned'
    });
  };

  const currentScore = calculateScore();

  // if (showInitialModal && !hasCompletedOnce) {
  //   return <InitialModal onContinue={handleContinue} onGoBack={handleGoBack} />;
  // }

  return (
    <div className="min-h-screen  bg-secondary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold bg-gradient-to-l from-secondary to-primary bg-clip-text text-transparent">
              {t('tran.demonstration')}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("tran.comprehensive")}
          </p>
        </div>

        {currentSection === "organization" ? (
          <OrganizationInfo
          setData={setOrganizationData}
            data={organizationData}
            onUpdate={setOrganizationData}
            onNext={handleOrganizationNext}
          />
        ) : (
          <div className="max-w-4xl mx-auto gap-8">
            {/* Score Tracker Sidebar */}
            {/* <div className="lg:col-span-1">
              <Card className="sticky top-8 shadow-medium">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center gap-2 justify-center text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    {t("tran.closeResults")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{currentScore}%</div>
                    <Progress value={currentScore} className="w-full" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">{t("tran.progess")}</div>
                    <div className="text-sm">
                      {t("tran.questions")} {currentQuestionIndex + 1} {t("tran.of")} {sampleQuestions.length}
                    </div>
                    <Progress value={((currentQuestionIndex + 1) / sampleQuestions.length) * 100} className="w-full" />
                  </div>

                  <div className="pt-4">
                    <Badge variant={currentScore >= 80 ? "default" : currentScore >= 60 ? "secondary" : "destructive"}>
                      {currentScore >= 80 ? "Excellent" : currentScore >= 60 ? "Good" : "Needs Improvement"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div> */}

            {/* Main Content */}
            <div className="w-full">
              <Card className="shadow-medium">
                <CardHeader className="w-full">
                  <CardTitle className="flex items-center gap-2 w-full">
                    <div className=" flex items-center justify-between w-full">
                      <div className="flex items-center gap-0.5">
                        <FileCheck className="h-5 w-5 text-primary" />
                        {sampleQuestions[currentQuestionIndex]?.title}
                      </div>
                      <div className="text-sm">
                         {t("tran.questions")}  {currentQuestionIndex + 1} {t("tran.of")} {" "}
                        {sampleQuestions.length}
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sampleQuestions[currentQuestionIndex] && (
                    <AssessmentQuestion
                      question={sampleQuestions[currentQuestionIndex]}
                      response={
                        responses.find(
                          (r) =>
                            r.id === sampleQuestions[currentQuestionIndex].id
                        )!
                      }
                      onUpdateResponse={updateResponse}
                    />
                  )}

                  {/* Navigation */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={
                        currentQuestionIndex === 0
                          ? handleBackToOrganization
                          : handlePrevious
                      }
                    >
                      {currentQuestionIndex === 0
                        ? t("tran.backOrg")
                        : t('tran.prev')}
                    </Button>

                    <div className="flex gap-2">
                      {currentQuestionIndex === sampleQuestions.length - 1 ? (
                        <Button
                          onClick={handleShowResults}
                          className="bg-gradient-to-l from-secondary to-primary hover:opacity-90"
                        >
                            {t("tran.ParencyResult")}
                        </Button>
                      ) : (
                        <Button
                          onClick={handleNext}
                          className="bg-gradient-to-l from-secondary to-primary hover:opacity-90"
                        >
                         {t("tran.nextQuestion")}
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {showResultsModal && (
        <ResultsModal
          score={currentScore}
          responses={responses}
          questions={sampleQuestions}
          organizationData={organizationData}
          onClose={handleCloseResults}
        />
      )}
    </div>
  );
};

export default TransparencyAssessment;

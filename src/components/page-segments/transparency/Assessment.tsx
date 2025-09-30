"use client";
import { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, FileCheck, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { OrganizationData } from "./OganisationInfo";
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
  const { t } = useTranslation();
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
    ProjectTitle: "",
    projectDescription: "",
    orgdescription: "",
    status: "",
    specificLocation: "",
    region: [], // e.g. ["Lagos", "Ikeja"]
    images: [], // max 2
    startDate: "",
    endDate: "",
    fundingSource: "",
    budgetAmount: "",
    specificObjectives: "",
    interventionLogic: "",
    programs: [], // e.g. ["education", "health"]
    partners: [], // e.g. ["Partner A"]
    category: "",
    subcategory: null,
    projectType: "",
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
      // ✅ Always count the question (skipped or not)
      maxPoints += 3;

      if (!response.skipped) {
        // Yes/No answer (1 point for yes)
        if (response.yesNoAnswer === true) totalPoints += 1;

        // Checkbox answers (1 point if at least one checked)
        if (response.checkboxAnswers.some((checked) => checked))
          totalPoints += 1;

        // File upload (1 point if file uploaded)
        if (response.fileUploaded) totalPoints += 1;
      }
      // If skipped → contributes 0, but still increases maxPoints
    });

    return maxPoints > 0 ? Math.round((totalPoints / maxPoints) * 100) : 0;
  };

  const handleBackToOrganization = () => {
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
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const [isCalculating, setIsCalculating] = useState(false);

  const handleShowResults = () => {
    setIsCalculating(true);

    setTimeout(() => {
      setIsCalculating(false);
      setShowResultsModal(true);
      setHasCompletedOnce(true);
    }, 5000);
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
      ProjectTitle: "",
      projectDescription: "",
      orgdescription: "",
      status: "",
      specificLocation: "",
      region: [], // e.g. ["Lagos", "Ikeja"]
      images: [], // max 2
      startDate: "",
      endDate: "",
      fundingSource: "",
      budgetAmount: "",
      specificObjectives: "",
      interventionLogic: "",
      programs: [], // e.g. ["education", "health"]
      partners: [], // e.g. ["Partner A"]
      category: "",
      subcategory: null,
      projectType: "",
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
              {t("tran.demonstration")}
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("tran.comprehensive")}
          </p>
        </div>

        {/* {currentSection === "organization" ? (
          <OrganizationInfo
          setData={setOrganizationData}
            data={organizationData}
            onUpdate={setOrganizationData}
            onNext={handleOrganizationNext}
          />
        ) : ( */}
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
                      {t("tran.questions")} {currentQuestionIndex + 1}{" "}
                      {t("tran.of")} {sampleQuestions.length}
                    </div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {sampleQuestions[currentQuestionIndex] && (
                  <AssessmentQuestion
                    question={sampleQuestions[currentQuestionIndex]}
                    response={
                      responses &&
                      responses.find(
                        (r) => r.id === sampleQuestions[currentQuestionIndex].id
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
                    {currentQuestionIndex === 0 ? "Go Back" : t("tran.prev")}
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
        {/* )} */}
      </div>
      {isCalculating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white h-40 p-6 rounded shadow-lg flex flex-col items-center gap-4">
            <div className="loader border-t-4 border-b-4 border-primary w-12 h-12 rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium">
              {t('admin.project.waitTran')}
            </p>
          </div>
        </div>
      )}

      {showResultsModal && !isCalculating && (
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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Trophy, TrendingUp, AlertTriangle, CheckCircle, X } from "lucide-react";
import { QuestionData, QuestionResponse } from "./Assessment";
import { OrganizationData } from "./OganisationInfo";
import { toast } from "sonner";


interface ResultsModalProps {
  score: number;
  responses: QuestionResponse[];
  questions: QuestionData[];
  organizationData: OrganizationData;
  onClose: () => void;
}

export const ResultsModal = ({ score, responses, questions, organizationData, onClose }: ResultsModalProps) => {
 

  const getScoreCategory = (score: number) => {
    if (score >= 80) return { label: "Excellent", color: "default", icon: Trophy };
    if (score >= 60) return { label: "Good", color: "secondary", icon: TrendingUp };
    return { label: "Needs Improvement", color: "destructive", icon: AlertTriangle };
  };

  const scoreCategory = getScoreCategory(score);
  const ScoreIcon = scoreCategory.icon;

  const generateReportData = () => {
    const reportData = {
      organizationInfo: {
        name: organizationData.organizationName,
        date: organizationData.date,
        contactPerson: organizationData.contactPerson,
        email: organizationData.email,
        phone: organizationData.phone,
        address: organizationData.address,
        organizationType: organizationData.organizationType,
        bio: organizationData.bio
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
          yesNoAnswer: response.skipped ? "Skipped" : (response.yesNoAnswer === true ? "Yes" : response.yesNoAnswer === false ? "No" : "Not answered"),
          checkboxAnswers: response.skipped ? "Skipped" : question.checkboxOptions.filter((_, index:any) => response.checkboxAnswers[index]).join(", ") || "None selected",
          fileUploaded: response.skipped ? "Skipped" : (response.fileUploaded ? response.fileUploaded.name : "No file uploaded"),
          questionScore: `${questionScore}/3`,
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
      recommendations.push("Consider developing a comprehensive transparency strategy");
      recommendations.push("Establish regular reporting mechanisms for key metrics");
    }
    
    if (score < 80) {
      recommendations.push("Enhance stakeholder communication channels");
      recommendations.push("Implement more robust documentation practices");
    }

    // Check for specific areas of improvement
    responses.forEach((response, index) => {
      if (response.skipped) {
        recommendations.push(`Consider addressing ${questions[index]?.title.toLowerCase()} practices`);
      } else {
        let questionScore = 0;
        if (response.yesNoAnswer === true) questionScore += 1;
        if (response.checkboxAnswers.some((checked:any) => checked)) questionScore += 1;
        if (response.fileUploaded) questionScore += 1;
        
        if (questionScore < 2) {
          recommendations.push(`Strengthen your ${questions[index]?.title.toLowerCase()} practices`);
        }
      }
    });

    return recommendations.slice(0, 5); // Limit to top 5 recommendations
  };

  const downloadReport = () => {
    const reportData = generateReportData();
    
    // Create a comprehensive text report
    const reportText = `
TRANSPARENCY ASSESSMENT REPORT
Generated on: ${reportData.assessmentDate}

ORGANIZATION INFORMATION
========================
Organization Name: ${reportData.organizationInfo.name}
Assessment Date: ${reportData.organizationInfo.date}
Contact Person: ${reportData.organizationInfo.contactPerson}
Email: ${reportData.organizationInfo.email}
Phone: ${reportData.organizationInfo.phone || 'Not provided'}
Address: ${reportData.organizationInfo.address || 'Not provided'}
Organization Type: ${reportData.organizationInfo.organizationType || 'Not specified'}

Organization Description:
${reportData.organizationInfo.bio || 'No description provided'}

OVERALL RESULTS
===============
Score: ${reportData.overallScore}%
Category: ${reportData.scoreCategory}

DETAILED RESPONSES
==================
${reportData.questionResponses.map((response:any, index) => `
${index + 1}. ${response.question}
   Question: ${response.yesNoQuestion}
   Answer: ${response.yesNoAnswer}
   
   Selected Options: ${response.checkboxAnswers}
   
   File Upload: ${response.fileUploaded}
   
   Score: ${response.questionScore}
   ${response.skipped ? '(SKIPPED)' : ''}
`).join('\n')}

RECOMMENDATIONS
===============
${reportData.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

---
This report was generated by the Transparency Assessment Tool.
For more information on improving your transparency practices, 
consult with governance and compliance experts.
    `.trim();

    // Create and download the file
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `transparency-assessment-${reportData.organizationInfo.name.replace(/[^a-zA-Z0-9]/g, '-')}-${reportData.assessmentDate}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Report Downloaded",{
      
      description: "Your transparency assessment report has been downloaded successfully.",
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
            Your Transparency Results
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Assessment completed on {new Date().toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Overall Score */}
          <div className="text-center bg-gradient-to-l from-secondary to-primary  p-6 rounded-lg">
            <div className="text-6xl font-bold text-primary mb-2">{score}%</div>
            <Badge variant={scoreCategory.color as any} className="mb-4 text-base px-4 py-2">
              {scoreCategory.label}
            </Badge>
            <Progress value={score} className="w-full max-w-md mx-auto" />
          </div>

          {/* Summary Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{completedQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions Completed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">{totalQuestions - completedQuestions}</div>
                <div className="text-sm text-muted-foreground">Questions Skipped</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-success">
                  {responses.filter(r => !r.skipped && r.fileUploaded).length}
                </div>
                <div className="text-sm text-muted-foreground">Files Uploaded</div>
              </CardContent>
            </Card>
          </div>

          {/* Question Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Question Breakdown</h3>
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
                          {response.skipped ? 'Skipped' : `${questionScore}/3 points earned`}
                        </div>
                      </div>
                    </div>
                    <Badge variant={response.skipped ? "destructive" : questionScore >= 2 ? "default" : "secondary"}>
                      {response.skipped ? "Skipped" : `${questionScore}/3`}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
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
              Close Results
            </Button>
            <Button
              onClick={downloadReport}
              className="flex-1 bg-gradient-to-l from-secondary to-primary hover:opacity-90"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import {  QuestionResponse } from "./Assessment";
import { toast } from "sonner";
import { QuestionData } from "@/data/AssessmentQuestions";
import { useTranslation } from "@/hooks/useTranslation";


interface AssessmentQuestionProps {
  question: QuestionData;
  response: QuestionResponse;
  onUpdateResponse: (questionId: number, updates: Partial<QuestionResponse>) => void;
}

export const AssessmentQuestion = ({
  question,
  response,
  onUpdateResponse,
}: AssessmentQuestionProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleYesNoChange = (value: boolean) => {
    onUpdateResponse(question.id, { 
      yesNoAnswer: value,
      skipped: false 
    });
  };

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const newCheckboxAnswers = [...response.checkboxAnswers];
    newCheckboxAnswers[index] = checked;
    onUpdateResponse(question.id, { 
      checkboxAnswers: newCheckboxAnswers,
      skipped: false 
    });
  };

  const handleFileUpload = (file: File) => {
    // Validate file type and size
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error( t("tran.fileType"),{
        description: t("tran.upload") ,
        
      });
      return;
    }

    if (file.size > maxSize) {
      toast.error( t("ran.largeUploadError"),{
    
        description: t("tran.largeUploadErrorDesc"),
      
      });
      return;
    }

    onUpdateResponse(question.id, { 
      fileUploaded: file,
      skipped: false 
    });
    
    toast(t("tran.uploadSuccess") ,{
      description: `${file.name} ${t("tran.uploaded")} .`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleSkip = () => {
    onUpdateResponse(question.id, {
      yesNoAnswer: null,
      checkboxAnswers: [false, false, false],
      fileUploaded: null,
      skipped: true
    });
  };

  const calculateQuestionScore = () => {
    if (response.skipped) return 0;
    
    let score = 0;
    if (response.yesNoAnswer === true) score += 1;
    if (response.checkboxAnswers.some(checked => checked)) score += 1;
    if (response.fileUploaded) score += 1;
    return score;
  };

  const questionScore = calculateQuestionScore();
  const maxScore = response.skipped ? 0 : 3;

  const {t} = useTranslation();

  return (
    <div className="space-y-6">
      {/* Question Score Badge */}
      <div className="flex items-center justify-end">
        {/* <Badge variant={response.skipped ? "destructive" : questionScore >= 2 ? "default" : "secondary"}>
          {response.skipped ? "Skipped" : `${questionScore}/${maxScore} points`}
        </Badge> */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSkip}
          className="text-muted-foreground hover:text-foreground"
        >
          <AlertCircle className="h-4 w-4 mr-1" />
          {t("tran.skipQuestion")}
        </Button>
      </div>

      {!response.skipped && (
        <>
          {/* Part 1: Yes/No Question */}
          <Card className="border border-gray-300">
            <CardContent className="px-6 ">
            
              
              <Label className="text-base font-medium mb-4 block">
                {question.yesNoQuestion}
              </Label>
              
              <div className="flex gap-4">
                <Button
                  variant={response.yesNoAnswer === true ? "default" : "outline"}
                  onClick={() => handleYesNoChange(true)}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  {t("tran.yes")}
                </Button>
                <Button
                  variant={response.yesNoAnswer === false ? "default" : "outline"}
                  onClick={() => handleYesNoChange(false)}
                  className="flex items-center gap-2"
                >
                  <XCircle className="h-4 w-4" />
                  {t("tran.no")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Part 2: Checkbox Options */}
          <Card className="border border-gray-300">
            <CardContent className="px-6 ">
             
              
              <Label className="text-base font-medium mb-4 block">
                {question.checkboxLabel}
              </Label>
              
              <div className="space-y-4">
                {question.checkboxOptions.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`checkbox-${question.id}-${index}`}
                      checked={response.checkboxAnswers[index]}
                      onCheckedChange={(checked) => 
                        handleCheckboxChange(index, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`checkbox-${question.id}-${index}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Part 3: File Upload (Optional) */}
          {question.fileUploadLabel && (
            <Card className="border border-gray-300">
              <CardContent className="px-6">
                <Label className="text-base font-medium mb-4 block">
                  {question.fileUploadLabel}
                </Label>
                
                {response.fileUploaded ? (
                  <div className="flex items-center gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                    <FileText className="h-5 w-5 text-success" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-success">{t("tran.uploadSuccess")}</p>
                      <p className="text-xs text-muted-foreground">{response.fileUploaded.name}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onUpdateResponse(question.id, { fileUploaded: null })}
                    >
                      {t("tran.remove")}
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`border border-gray-300 rounded-lg p-6 text-center transition-colors ${
                      dragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/20 hover:border-primary/50'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                     {t("tran.drag-drop")}
                    </p>
                    <p className="text-xs text-muted-foreground mb-4">
                     {t("tran.supprt")} : Images, PDF, Word documents (max 10MB)
                    </p>
                    <Input
                      type="file"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id={`file-upload-${question.id}`}
                    />
                    <Label
                      htmlFor={`file-upload-${question.id}`}
                      className="cursor-pointer flex w-full justify-center"
                    >
                      <Button variant="outline" size="sm" asChild>
                        <span>{t("tran.chooseFile")}</span>
                      </Button>
                    </Label>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </>
      )}

      {response.skipped && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
             {t("tran.skippedText")}
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateResponse(question.id, { skipped: false })}
              className="mt-2"
            >
             {t("tran.answerQuestion")}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
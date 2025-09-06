'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Info, Upload } from "lucide-react";
import { toast } from "sonner";
import Footer from "@/components/layout/Footer";

const Transparency = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    organization: "",
    email: "",
    projectDescription: "",
    budget: "",
    fundingSources: "",
    beneficiaries: "",
    timeline: "",
    monitoringPlan: "",
    stakeholderEngagement: "",
    riskAssessment: "",
    sustainabilityPlan: ""
  });

  const [checkedCriteria, setCheckedCriteria] = useState<string[]>([]);

  const transparencyCriteria = [
    {
      id: "budget_disclosure",
      title: "Budget Transparency",
      description: "Detailed budget breakdown and fund allocation is publicly available",
      category: "Financial"
    },
    {
      id: "stakeholder_participation",
      title: "Stakeholder Participation",
      description: "Local communities and stakeholders are involved in project planning and implementation",
      category: "Governance"
    },
    {
      id: "environmental_impact",
      title: "Environmental Impact Assessment",
      description: "Comprehensive environmental impact assessment has been conducted and published",
      category: "Environmental"
    },
    {
      id: "monitoring_reporting",
      title: "Monitoring & Reporting",
      description: "Regular monitoring and public reporting mechanisms are established",
      category: "Accountability"
    },
    {
      id: "grievance_mechanism",
      title: "Grievance Mechanism",
      description: "Clear grievance and feedback mechanisms are available for affected communities",
      category: "Governance"
    },
    {
      id: "gender_inclusion",
      title: "Gender Inclusion",
      description: "Project includes gender-responsive approaches and women's participation",
      category: "Social"
    },
    {
      id: "climate_rationale",
      title: "Climate Rationale",
      description: "Clear justification for climate adaptation benefits and outcomes",
      category: "Technical"
    },
    {
      id: "procurement_transparency",
      title: "Procurement Transparency",
      description: "Open and transparent procurement processes for project implementation",
      category: "Financial"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCriteriaChange = (criteriaId: string, checked: boolean) => {
    setCheckedCriteria(prev => 
      checked 
        ? [...prev, criteriaId]
        : prev.filter(id => id !== criteriaId)
    );
  };

  const calculateTransparencyScore = () => {
    return Math.round((checkedCriteria.length / transparencyCriteria.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { text: "Excellent", variant: "default" as const };
    if (score >= 60) return { text: "Good", variant: "secondary" as const };
    if (score >= 40) return { text: "Needs Improvement", variant: "outline" as const };
    return { text: "Poor", variant: "destructive" as const };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateTransparencyScore();
    
    toast('Transparency Assessment Submitted',{
   
      description: `Your adaptation project scored ${score}% on transparency criteria.`,
    });
  };

  const score = calculateTransparencyScore();
  const scoreBadge = getScoreBadge(score);

  return (
    <div className="min-h-screen bg-background">
     
      {/* Hero Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Project Transparency Assessment
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Evaluate and improve the transparency of your climate adaptation project 
              using international best practices and accountability standards.
            </p>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Information */}
            <Card className="border-border bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="projectName">Project Name *</Label>
                    <Input
                      id="projectName"
                      value={formData.projectName}
                      onChange={(e) => handleInputChange("projectName", e.target.value)}
                      placeholder="Enter your adaptation project name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="organization">Organization *</Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) => handleInputChange("organization", e.target.value)}
                      placeholder="Implementing organization"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange("projectDescription", e.target.value)}
                    placeholder="Describe your adaptation project objectives, activities, and expected outcomes"
                    className="min-h-[100px]"
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="budget">Total Budget (USD)</Label>
                    <Input
                      id="budget"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      placeholder="e.g., 500,000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="timeline">Project Timeline</Label>
                    <Input
                      id="timeline"
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      placeholder="e.g., Jan 2024 - Dec 2026"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transparency Criteria Assessment */}
            <Card className="border-border bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    Transparency Criteria
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
                      {score}%
                    </span>
                    <Badge variant={scoreBadge.variant}>
                      {scoreBadge.text}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transparencyCriteria.map((criteria) => (
                    <div key={criteria.id} className="flex items-start space-x-3 p-4 border border-border rounded-lg">
                      <Checkbox
                        id={criteria.id}
                        checked={checkedCriteria.includes(criteria.id)}
                        onCheckedChange={(checked) => handleCriteriaChange(criteria.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={criteria.id} className="text-sm font-medium cursor-pointer">
                            {criteria.title}
                          </Label>
                          <Badge variant="outline" className="text-xs">
                            {criteria.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {criteria.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="border-border bg-gradient-card">
              <CardHeader>
                <CardTitle>Additional Transparency Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="stakeholderEngagement">Stakeholder Engagement Plan</Label>
                  <Textarea
                    id="stakeholderEngagement"
                    value={formData.stakeholderEngagement}
                    onChange={(e) => handleInputChange("stakeholderEngagement", e.target.value)}
                    placeholder="Describe how you engage with local communities and stakeholders"
                  />
                </div>

                <div>
                  <Label htmlFor="monitoringPlan">Monitoring & Evaluation Plan</Label>
                  <Textarea
                    id="monitoringPlan"
                    value={formData.monitoringPlan}
                    onChange={(e) => handleInputChange("monitoringPlan", e.target.value)}
                    placeholder="Outline your monitoring framework and reporting schedule"
                  />
                </div>

                <div>
                  <Label>Supporting Documents</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Upload project documents, environmental assessments, or other transparency materials
                    </p>
                    <Button variant="outline" className="mt-2">
                      Choose Files
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Results Preview */}
            {score > 0 && (
              <Card className="border-border bg-gradient-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-primary" />
                    Assessment Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <span>Transparency Score:</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xl font-bold ${getScoreColor(score)}`}>
                          {score}%
                        </span>
                        <Badge variant={scoreBadge.variant}>
                          {scoreBadge.text}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        <strong>Criteria Met:</strong> {checkedCriteria.length} of {transparencyCriteria.length}
                      </p>
                      {score < 80 && (
                        <p className="text-yellow-600">
                          <strong>Recommendation:</strong> Consider implementing additional transparency measures to improve your score.
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <Button type="submit" size="lg" className="bg-gradient-hero hover:opacity-90 shadow-climate">
                Submit Transparency Assessment
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Your assessment will be reviewed and you'll receive detailed feedback within 5 business days.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Transparency;
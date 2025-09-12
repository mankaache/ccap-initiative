"use client";
import {
  OrganizationData,
  OrganizationInfo,
} from "@/components/page-segments/transparency/OganisationInfo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from "@/hooks/useTranslation";
import { Briefcase, Building2, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateProject = () => {
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    organizationName: "",
    description: "",
    ProjectTitle: "",
    specificLocation: "",
    region: [],
    target: "",
    actors: [],
    startDate: "",
    endDate: "",
    fundingSource: "",
    budgetAmount: "",
    specificObjectives: "",
    interventionLogic: "",
    results: "",
    Goal: "",
    images: [],
    organizationType: "",
    programs: [],
    isOngoing: false,
    status: "planned" as "ongoing" | "completed" | "planned",
  });

  const handleInputChange = (field: keyof OrganizationData, value: string) => {
    //@ts-ignore
    onUpdate({ ...data, [field]: value });
  };
  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setOrganizationData((prev) => ({
        ...prev,
        //@ts-ignore
        images: [...prev.images, ...Array.from(files)],
      }));
    }
  };

  const isFormValid =
    organizationData.organizationName &&
    organizationData.startDate &&
    organizationData.endDate &&
    organizationData.fundingSource &&
    organizationData.budgetAmount;
  const [newActor, setNewActor] = useState("");
  const [newProgram, setNewProgram] = useState("");
  const [newRegion, setNewRegion] = useState("");
  const availableActors = [
    "Etatiques",
    "ONGI",
    "OSC",
    "OBC",
    "SECTEUR PRIVEE",
    "CL",
  ];

  const regions = [
    "Central Region",
    "Northern Region",
    "Southern Region",
    "Eastern Region",
    "Western Region",
    "Coastal Region",
    "Mountain Region",
    "Urban Areas",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating project:", organizationData);

    toast("Project added successfully!", {
      // description: `${organizationData.title} has been added to the project portfolio.`,
    });
  };

  const addProgram = () => {
    if (
      newProgram.trim() &&
      !organizationData.programs.includes(newProgram.trim())
    ) {
      setOrganizationData((prevData) => ({
        ...prevData,
        programs: [...prevData.programs, newProgram.trim()],
      }));
      setNewProgram("");
    }
  };

  const removeProgram = (programToRemove: string) => {
    setOrganizationData((prevData) => ({
      ...prevData,
      programs: prevData.programs.filter(
        (program) => program !== programToRemove
      ),
    }));
  };

  const addRegion = () => {
    if (
      newRegion.trim() &&
      !organizationData.region.includes(newRegion.trim())
    ) {
      setOrganizationData((prevData) => ({
        ...prevData,
        region: [...prevData.region, newRegion.trim()],
      }));
      setNewRegion("");
    }
  };

  const removeRegion = (regiontoRemove: string) => {
    setOrganizationData((prevData) => ({
      ...prevData,
      region: prevData.region.filter((region) => region !== regiontoRemove),
    }));
  };
const {t} = useTranslation()
  return (
    <Card className="max-w-4xl mx-auto py-12 md:py-20">
      <CardHeader>
        <CardTitle className="flex text-2xl font-semibold items-center space-x-2">
          <Briefcase className="w-6 h-6 text-primary" />
          <h1>{t("project.createNew")}</h1>
        </CardTitle>
        <CardDescription>
          {t("project.createNewDesc")}
          </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <Label className="text-lg font-semibold pb-2  border-b border-gray-300">
              {t("project.basicInformation")}
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Actors */}
              <div className="space-y-2">
                <Label className=" capitalize ">{t("project.actor_category")} *</Label>

                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Select value={newActor} onValueChange={setNewActor}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableActors.map((actor) => (
                          <SelectItem key={actor} value={actor}>
                            {actor}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="capitalize" htmlFor="title">
                  {newActor === availableActors[0]
                    ? `${t("project.orgStructure")} *`
                    : `${t("project.orgName")} *`}
                </Label>
                <Input
                  id="title"
                  placeholder={`${
                    newActor === availableActors[0]
                      ?  `${t("project.orgStructureDesc")} *`
                      : `${t("project.orgNameDesc")} *`
                  }`}
                  value={organizationData.organizationName}
                  onChange={(e) =>
                    handleInputChange("organizationName", e.target.value)
                  }
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="" htmlFor="title">
               {t("project.projectTitle")} *
              </Label>
              <Input
                id="title"
                placeholder= {t("project.projectDescription")}
                value={organizationData.ProjectTitle}
                onChange={(e) =>
                  handleInputChange("ProjectTitle", e.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="" htmlFor="description">
               {t("project.orgaDesc")} *
              </Label>
              <Textarea
                id="description"
                placeholder={t("project.orgaDesc2")}
                value={organizationData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                required
                rows={4}
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            <Label className="text-lg font-semibold border-b border-gray-300 pb-2">
              {t("project.projectDetails")}
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="" htmlFor="location">
                  {t("project.projectZone")} *
                </Label>
                <Input
                  id="location"
                  placeholder={t("project.projectZone2")}
                  value={organizationData.specificLocation}
                  onChange={(e) =>
                    handleInputChange("specificLocation", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-4">
                <Label className="" htmlFor="regions">
                  {t("project.region")} *
                </Label>
                <div className="flex space-x-2">
                  <Select value={newRegion} onValueChange={setNewRegion}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder={t("project.region2")} />
                    </SelectTrigger>
                    <SelectContent>
                      {regions
                        .filter(
                          (region) => !organizationData.region.includes(region)
                        )
                        .map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    onClick={addRegion}
                    disabled={!newRegion}
                  >
                    Add
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {organizationData.region.map((region) => (
                    <Badge
                      key={region}
                      variant="secondary"
                      className="px-3 py-1"
                    >
                      {region}
                      <button
                        type="button"
                        onClick={() => removeRegion(region)}
                        className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="" htmlFor="status">
                  {t("projects.status")} *
                </Label>
                <Select
                  value={organizationData.status}
                  onValueChange={(value: typeof organizationData.status) =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">{t("projects.planned")}</SelectItem>
                    <SelectItem value="ongoing">{t("projects.ongoing")}</SelectItem>
                    <SelectItem value="completed">{t("projects.completed")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="" htmlFor="budget">
                {t("project.Budget")} (XAF) *
                </Label>
                <Input
                  id="budget"
                  placeholder="e.g., 5,000,000"
                  value={organizationData.budgetAmount}
                  onChange={(e) =>
                    handleInputChange("budgetAmount", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label className="" htmlFor="fundingSource">
                {t("project.fundingSource")} *
                </Label>
                <Input
                  id="fundingSource"
                  placeholder="e.g., World Bank, Government"
                  value={organizationData.fundingSource}
                  onChange={(e) =>
                    handleInputChange("fundingSource", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            <Label className="text-lg font-semibold border-b border-gray-300 pb-2">
              {t("project.timeline")} *
            </Label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="" htmlFor="startDate">
                {t("project.start_date")} *
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={organizationData.startDate}
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="" htmlFor="endDate">
                    {t("project.end_date")}
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ongoing"
                      checked={organizationData.isOngoing}
                      onCheckedChange={(checked: any) =>
                        handleInputChange("isOngoing", checked)
                      }
                    />
                    <Label className="text-sm capitalize" htmlFor="ongoing">
                      {t("project.ongoing")}
                    </Label>
                  </div>
                </div>
                <Input
                  id="endDate"
                  type="date"
                  value={organizationData.endDate}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  disabled={organizationData.isOngoing}
                />
              </div>
            </div>
          </div>

          {/* Programs */}
          <div className="space-y-2">
            <Label className="   pb-2">
              {t("project.partners")}
            </Label>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder=""
                  value={newProgram}
                  onChange={(e) => setNewProgram(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={addProgram}
                  disabled={!newProgram}
                >
                  {t("project.add")}
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {organizationData.programs.map((program) => (
                  <Badge key={program} variant="outline" className="px-3 py-1">
                    {program}
                    <button
                      type="button"
                      onClick={() => removeProgram(program)}
                      className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="" htmlFor="description">
              {t("project.goal")} *
              </Label>
              <Select>
              <SelectTrigger className="flex-1 w-full ">
                <SelectValue placeholder={t("project.anOption")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"atténuation"}>
                  {t("project.goal1")}
                </SelectItem>
                <SelectItem value={"adaptation"}>
                  {t("project.goal2")}
                </SelectItem>
                <SelectItem value={"finance"}>{t("project.goal3")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="" htmlFor="description">
              {t("project.specific_objective")} *
            </Label>
            <Textarea
              id="specificObjectives"
              placeholder={t("project.specific_objective2")}
              value={organizationData.specificObjectives}
              onChange={(e) =>
                handleInputChange("specificObjectives", e.target.value)
              }
              required
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label className="" htmlFor="description">
              {t("project.intervention_logic")} *
            </Label>
            <Textarea
              id="interventionLogic"
              placeholder={t("project.intervention_logic2")}
              value={organizationData.interventionLogic}
              onChange={(e) =>
                handleInputChange("interventionLogic", e.target.value)
              }
              required
              rows={4}
            />
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b border-gray-300 pb-2">
              {t("project.images")}
            </h3>

            <div className="border border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t("project.drop_images")}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  id="image-upload"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  {t("project.chooseImage")}
                </Button>
                {organizationData.images &&
                  organizationData?.images.length > 0 && (
                    <p className="text-sm text-primary font-medium">
                      {organizationData.images.length} image(s) selected
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-6 border-t border-gray-300 w-full">
            <Button
              disabled={!isFormValid}
              className="bg-gradient-to-l from-secondary   to-primary hover:opacity-90 px-8"
            >
              {t("project.createProject")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProject;

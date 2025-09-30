"use client";
import AutocompleteInput from "@/components/AutoComplete";
import EnhancedLocationForm from "@/components/map/LocationsDetails";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  getAllCategories,
  isEtatiquesCategory,
  parseCategoryValue,
} from "@/data/organisation";
import {
  createProjectAndMaybeOrganisation,
  fetchProjectById,
  ProjectInput,
} from "@/firebase/services/projectService";
import { updateProject } from "@/firebase/services/updateService";
import { useAuth } from "@/firebase/useAuth";
import { useTranslation } from "@/hooks/useTranslation";
import {
  ArrowBigLeft,
  Briefcase,
  Building2,
  Loader2,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CreateProject = ({ projectId }: { projectId?: string }) => {
  // Get categories for reference if needed
  const categories = getAllCategories();

  const [organizationData, setOrganizationData] = useState<{
    organizationName: string;
    ProjectTitle: string;
    projectDescription: string;
    orgdescription: string;
    specificLocation: string[];
    region: string[];
    startDate: string;
    endDate: string;
    fundingSource: string;
    budgetAmount: string;
    specificObjectives: string;
    interventionLogic: string;
    programs: string[];
    partners: string[];
    category: string;
    subcategory: string | null; // ✅ <-- fix here
    projectType: string;
    status: string;
  }>({
    organizationName: "",
    ProjectTitle: "",
    projectDescription: "",
    orgdescription: "",
    specificLocation: [],
    region: [],
    startDate: "",
    endDate: "",
    fundingSource: "",
    budgetAmount: "",
    specificObjectives: "",
    interventionLogic: "",
    programs: [],
    partners: [],
    category: "",
    subcategory: null, // ✅ default value
    projectType: "",
    status: "",
  });
  const { t } = useTranslation();
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 2) {
      setError(`${t("admin.project.maxImages")}`);
      return;
    }
    setImages(files);
    setError(null);
  }
  const [selectedName, setSelectedName] = useState(
    organizationData.organizationName || ""
  );
  const handleNameChange = (value: string) => {
    setSelectedName(value);
    console.log("Selected name:", value);
  };

  const handleAddNewName = (newName: string) => {
    console.log("New name added:", newName);
  };

  const [newActor, setNewActor] = useState("");
  const [newProgram, setNewProgram] = useState("");
  const [newPartner, setNewPartner] = useState("");
  const [newRegion, setNewRegion] = useState("");
  // const categories = getAllCategories();

  // const availableActors = [
  //   {
  //     category: "Etatiques",
  //     subcategories: ["ministries", "institions"],
  //   },
  //   {
  //     category: "ONGI",
  //     subcategories: ["international", "local"],
  //   },
  //   {
  //     category: "OSC",

  //   },
  //   {
  //     category: "OBC",
  //   },
  //   {
  //     category: "SECTEUR-PRIVEE",
  //     subcategories: ["large", "sme"],
  //   },
  //   {
  //     category: "CL", // no subcategories
  //   },
  // ];

  const router = useRouter();

  function handleCategoryChange(value: string) {
    const { category, subcategory } = parseCategoryValue(value);
    setNewActor(value);

    setOrganizationData((prev) => ({
      ...prev,
      category,
      subcategory,
    }));
  }
  const { user } = useAuth();

  useEffect(() => {
    if (projectId) {
      setLoading(true);
      fetchProjectById(projectId)
        .then((proj) => {
          setOrganizationData({
            organizationName: proj.organizationName || "",
            ProjectTitle: proj.ProjectTitle || "",
            projectDescription: proj.projectDescription || "",
            orgdescription: proj.orgdescription || "",
            specificLocation: proj.specificLocation || "",
            region: proj.region || [],
            startDate: proj.startDate || "",
            endDate: proj.endDate || "",
            fundingSource: proj.fundingSource || "",
            budgetAmount: proj.budgetAmount || "",
            specificObjectives: proj.specificObjectives || [],
            interventionLogic: proj.interventionLogic || "",
            programs: proj.programs || [],
            partners: proj.partners || [],
            category: proj.category || "",
            subcategory: proj.subcategory || null,
            projectType: proj.projectType || "",
            status: proj.status || "",
          });
          setImages(proj.images || []); // if you manage images separately
        })
        .finally(() => setLoading(false));
    }
  }, [projectId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    console.log("Creating project:", {
      ...organizationData,
      region: newRegion.trim()
        ? [...organizationData.region, newRegion.trim()]
        : organizationData.region,
      programs: newProgram.trim()
        ? [...organizationData.programs, newProgram.trim()]
        : organizationData.programs,
      partners: newPartner.trim()
        ? [...organizationData.partners, newPartner.trim()]
        : organizationData.partners,
      organizationName: selectedName,

      images,
    });
    setLoading(true);

    try {
      // Basic validation example
      if (
        !selectedName ||
        !organizationData.ProjectTitle ||
        !organizationData.category
      ) {
        throw new Error(`${t("admin.project.requiredFields")}`);
      }

      const input: ProjectInput = {
        ...organizationData,
        region: newRegion.trim()
          ? [...organizationData.region, newRegion.trim()]
          : organizationData.region,
        programs: newProgram.trim()
          ? [...organizationData.programs, newProgram.trim()]
          : organizationData.programs,
        images,
      };

      const project = await createProjectAndMaybeOrganisation(input);
      console.log("project", project);
      // success - you can redirect to the project page or show a message
      toast.success(`${t("admin.project.success")}`);
      user && user.role === 'admin' ? router.push('/admin/subject-review') : router.push('/subject-review')
      // e.g. go to the project view
      user.role === "admin" ? router.push(`/admin/projects`) : router.push(`/`);
    } catch (err: any) {
      setError(err.message || "Failed to create project.");
      console.error(err);
      toast.error(`${t("admin.project.error")}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProject(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    console.log("updating project:", {
      ...organizationData,
      region: newRegion.trim()
        ? [...organizationData.region, newRegion.trim()]
        : organizationData.region,
      programs: newProgram.trim()
        ? [...organizationData.programs, newProgram.trim()]
        : organizationData.programs,
      partners: newPartner.trim()
        ? [...organizationData.partners, newPartner.trim()]
        : organizationData.partners,
      images,
    });
    setLoading(true);

    try {
      // Basic validation example
      if (
        !organizationData.organizationName ||
        !organizationData.ProjectTitle ||
        !organizationData.category
      ) {
        throw new Error(`${t("admin.project.requiredFields")}`);
      }

      const input: ProjectInput = {
        ...organizationData,
        region: newRegion.trim()
          ? [...organizationData.region, newRegion.trim()]
          : organizationData.region,
        programs: newProgram.trim()
          ? [...organizationData.programs, newProgram.trim()]
          : organizationData.programs,
      };

      const project = await updateProject(projectId as string, input, images);
      console.log("updatedproject", project);
      // success - you can redirect to the project page or show a message
      toast.success(`${t("admin.project.success")}`);
      // e.g. go to the project view
      user.role === "admin" ? router.push(`/admin/projects`) : router.push(`/`);
    } catch (err: any) {
      setError(err.message || "Failed to update project.");
      console.error(err);
      toast.error(`${t("admin.project.error")}`);
    } finally {
      setLoading(false);
    }
  }

  const addPartner = () => {
    if (
      newPartner.trim() &&
      !organizationData.partners.includes(newPartner.trim())
    ) {
      setOrganizationData((prevData) => ({
        ...prevData,
        partners: [...prevData.partners, newPartner.trim()],
      }));
      setNewProgram("");
    }
  };

  const removePartner = (programToRemove: string) => {
    setOrganizationData((prevData) => ({
      ...prevData,
      partners: prevData.partners.filter(
        (program) => program !== programToRemove
      ),
    }));
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

  return (
    <>
      {user && user.role === "actor" && (
        <div
          onClick={() => router.back()}
          className="text-primary max-w-4xl mx-auto mb-9 hover:underline cursor-pointer flex items-center gap-4"
        >
          <ArrowBigLeft />
          {t("admin.document.back")}
        </div>
      )}
      <Card className="max-w-4xl mx-auto py-12 md:pb-20 pt-7">
        <CardHeader>
          <CardTitle className="flex text-2xl font-semibold items-center space-x-2">
            <Briefcase className="w-6 h-6 text-primary" />
            {projectId ? (
              <>
                <h1>{t("project.updateProject")}</h1>
              </>
            ) : (
              <>
                <h1>{t("project.createNew")}</h1>
              </>
            )}
          </CardTitle>
          <CardDescription>{t("project.createNewDesc")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={projectId ? handleUpdateProject : handleSubmit}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold pb-2  border-b border-gray-300">
                {t("project.basicInformation")}
              </Label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Actors */}
                <div className="space-y-2">
                  <Label className=" capitalize ">
                    {t("project.actor_category")} *
                  </Label>

                  {/* <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Select value={newActor} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={t("project.anOption")}/>
                      </SelectTrigger>
                      <SelectContent>
                        {availableActors.map((actor) =>
                          actor.subcategories &&
                          actor.subcategories.length > 0 ? (
                            <SelectGroup key={actor.category}>
                              <SelectLabel  className="font-semibold text-sm">{actor.category}</SelectLabel>
                              {actor.subcategories.map((sub) => (
                                <SelectItem
                              
                                className="pl-4"
                                  key={`${actor.category}-${sub}`}
                                  value={`${actor.category.toLowerCase()}:${sub}`}
                                >
                                  {sub}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ) : (
                            <SelectItem
                            className="font-semibold text-sm"
                              key={actor.category}
                              value={actor.category.toLowerCase()}
                            >
                              {actor.category}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
                  <div className="flex space-x-2">
                    <Select
                      value={newActor}
                      onValueChange={handleCategoryChange}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder={t("project.anOption")} />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) =>
                          category.hasSubcategories ? (
                            <SelectGroup key={category.slug}>
                              <SelectLabel className="font-semibold text-sm">
                                {category.name}
                              </SelectLabel>
                              {category.subcategories?.map((sub) => (
                                <SelectItem
                                  className="pl-4"
                                  key={`${category.slug}-${sub.slug}`}
                                  value={`${category.slug}:${sub.slug}`}
                                >
                                  {sub.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          ) : (
                            <SelectItem
                              className="font-semibold text-sm"
                              key={category.slug}
                              value={category.slug}
                            >
                              {category.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="capitalize" htmlFor="title">
                    {isEtatiquesCategory(newActor)
                      ? `${t("project.orgStructure")} *`
                      : `${t("project.orgName")} *`}
                  </Label>
                  <AutocompleteInput
                    value={selectedName}
                    onChange={handleNameChange}
                    placeholder={
                      isEtatiquesCategory(newActor)
                        ? `${t("project.orgStructureDesc")} *`
                        : `${t("project.orgNameDesc")} *`
                    }
                    onAddNew={handleAddNewName}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="" htmlFor="description">
                  {t("project.orgaDesc")} *
                </Label>
                <Textarea
                  id="description"
                  placeholder={t("project.orgaDesc2")}
                  value={organizationData.orgdescription}
                  onChange={(e) =>
                    setOrganizationData({
                      ...organizationData,
                      orgdescription: e.target.value,
                    })
                  }
                  required
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="" htmlFor="title">
                    {t("project.projectTitle")} *
                  </Label>
                  <Input
                    id="title"
                    placeholder={t("project.projectDescription")}
                    value={organizationData.ProjectTitle}
                    onChange={(e) =>
                      setOrganizationData({
                        ...organizationData,
                        ProjectTitle: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="" htmlFor="description">
                    {t("project.goal")} *
                  </Label>
                  <Select
                    value={organizationData.projectType}
                    onValueChange={(value) =>
                      setOrganizationData({
                        ...organizationData,
                        projectType: value,
                      })
                    }
                  >
                    <SelectTrigger className="flex-1 w-full ">
                      <SelectValue placeholder={t("project.anOption")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={t("project.goal1")}>
                        {t("project.goal1")}
                      </SelectItem>
                      <SelectItem value={t("project.goal2")}>
                        {t("project.goal2")}
                      </SelectItem>
                      <SelectItem value={t("project.goal4")}>
                        {t("project.goal4")}
                      </SelectItem>
                      <SelectItem value={t("project.goal3")}>
                        {t("project.goal3")}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="" htmlFor="description">
                  {t("project.Desc")} *
                </Label>
                <Textarea
                  id="description"
                  placeholder={t("project.Desc2")}
                  value={organizationData.projectDescription}
                  onChange={(e) =>
                    setOrganizationData({
                      ...organizationData,
                      projectDescription: e.target.value,
                    })
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
              <EnhancedLocationForm
                organizationData={organizationData}
                setOrganizationData={setOrganizationData}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="" htmlFor="status">
                    {t("projects.status")} *
                  </Label>
                  <Select
                    value={organizationData.status}
                    onValueChange={(value) =>
                      setOrganizationData({
                        ...organizationData,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t("project.state")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value= {t("projects.planned")}>
                        {t("projects.planned")}
                      </SelectItem>
                      <SelectItem value= {t("projects.ongoing")}>
                        {t("projects.ongoing")}
                      </SelectItem>
                      <SelectItem value={t("projects.completed")}>
                        {t("projects.completed")}
                      </SelectItem>
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
                      setOrganizationData({
                        ...organizationData,
                        budgetAmount: e.target.value,
                      })
                    }
                    required
                  />
                </div>
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
                    setOrganizationData({
                      ...organizationData,
                      fundingSource: e.target.value,
                    })
                  }
                  required
                />
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
                      setOrganizationData({
                        ...organizationData,
                        startDate: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="" htmlFor="endDate">
                      {t("project.end_date")}
                    </Label>
                    {/* <div className="flex items-center space-x-2">
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
                  </div> */}
                  </div>
                  <Input
                    id="endDate"
                    type="date"
                    value={organizationData.endDate}
                    onChange={(e) =>
                      setOrganizationData({
                        ...organizationData,
                        endDate: e.target.value,
                      })
                    }
                    // disabled={organizationData.isOngoing}
                  />
                </div>
              </div>
            </div>

            {/* Programs */}
            <div className="space-y-2">
              <Label className="   pb-2">{t("project.program")}</Label>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder=""
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="flex-1"
                    required
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
                  {organizationData &&
                    organizationData.programs?.map((program) => (
                      <Badge
                        key={program}
                        variant="outline"
                        className="px-3 py-1"
                      >
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
              <Label className="   pb-2">{t("project.partners")}</Label>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder=""
                    value={newPartner}
                    onChange={(e) => setNewPartner(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addPartner}
                    disabled={!newPartner}
                  >
                    {t("project.add")}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {organizationData &&
                    organizationData.partners?.map((partner) => (
                      <Badge
                        key={partner}
                        variant="outline"
                        className="px-3 py-1"
                      >
                        {partner}
                        <button
                          type="button"
                          onClick={() => removePartner(partner)}
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
                {t("project.specific_objective")} *
              </Label>
              <Textarea
                id="specificObjectives"
                placeholder={t("project.specific_objective2")}
                value={organizationData.specificObjectives}
                onChange={(e) =>
                  setOrganizationData({
                    ...organizationData,
                    specificObjectives: e.target.value,
                  })
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
                  setOrganizationData({
                    ...organizationData,
                    interventionLogic: e.target.value,
                  })
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
                    onChange={handleImageChange}
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
                  {images && images && images.length > 0 && (
                    <p className="text-sm text-primary font-medium">
                      {images.length} image(s) {t('project.selected')}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6 border-t border-gray-300 w-full">
              <Button
                disabled={loading}
                className="bg-gradient-to-l from-secondary   to-primary hover:opacity-90 px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    {t('auth.creating')} {""}
                  </>
                ) : (
                  `${t("project.createProject")}`
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default CreateProject;

import { use, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/hooks/useTranslation";

export interface OrganizationData {
  organizationName: string;
  ProjectTitle: string;
  projectDescription: string;
  orgdescription: string;
  status: string;
  specificLocation: string;
  region: string[];        // e.g. ["Lagos", "Ikeja"]
  images?: File[];        // max 2
  startDate: string;
  endDate: string;
  fundingSource: string;
  budgetAmount: string;
  specificObjectives: string;
  interventionLogic: string;
  programs: string[];     // e.g. ["education", "health"]
  partners: string[];     // e.g. ["Partner A"]
  category: string;
  subcategory?: string | null;
  projectType: string;
}

interface OrganizationInfoProps {
  data: OrganizationData;
  onUpdate?: (data: OrganizationData) => void;
  setData: React.Dispatch<React.SetStateAction<OrganizationData>>;
  onNext?: () => void;
}

// export const OrganizationInfo = ({
//   data,
//   onUpdate,
//   onNext,
//   setData,
// }: OrganizationInfoProps) => {
//   const handleInputChange = (field: keyof OrganizationData, value: string) => {
//     //@ts-ignore
//     onUpdate({ ...data, [field]: value });
//   };

//   // const isFormValid = data.organizationName && data.startDate && data.endDate && data.fundingSource && data.budgetAmount  ;
//   const [newActor, setNewActor] = useState("");
//   const [newProgram, setNewProgram] = useState("");
//   const [newRegion, setNewRegion] = useState("");
//   const availableActors = ["Etatiques",
//     "ONGI",
//     "OSC",
//     "OBC",
//     "SECTEUR PRIVEE",
//     "CL",];

//   const regions = [
//     "Central Region",
//     "Northern Region",
//     "Southern Region",
//     "Eastern Region",
//     "Western Region",
//     "Coastal Region",
//     "Mountain Region",
//     "Urban Areas",
//   ];

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log("Creating project:", data);

//     toast("Project added successfully!", {
//       // description: `${data.title} has been added to the project portfolio.`,
//     });
//   };
  

//   const addProgram = () => {
//     if (newProgram.trim() && !data.programs.includes(newProgram.trim())) {
//       setData((prevData) => ({
//         ...prevData,
//         programs: [...prevData.programs, newProgram.trim()],
//       }));
//       setNewProgram("");
//     }
//   };

//   const removeProgram = (programToRemove: string) => {
//     setData((prevData) => ({
//       ...prevData,
//       programs: prevData.programs.filter(
//         (program) => program !== programToRemove
//       ),
//     }));
//   };

//   const addRegion = () => {
//     if (newRegion.trim() && !data.region.includes(newRegion.trim())) {
//       setData((prevData) => ({
//         ...prevData,
//         region: [...prevData.region, newRegion.trim()],
//       }));
//       setNewRegion("");
//     }
//   };

//   const removeRegion = (regiontoRemove: string) => {
//     setData((prevData) => ({
//       ...prevData,
//       region: prevData.region.filter((region) => region !== regiontoRemove),
//     }));
//   };

//   const { t } = useTranslation();

//   return (
//     <Card className="max-w-4xl mx-auto">
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {/* Basic Information */}
//           <div className="space-y-6">
//             <Label className="text-lg font-semibold mb-0">
//               {t("project.basicInformation")}
//             </Label>
//             <Label className=" border-b border-gray-300 pb-2 mt-1">
//               {t("project.basicInfoDesc")}{" "}
//             </Label>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <Label className="">
//                   {t("project.actor_category")} *
//                 </Label>{" "}
              
//                 <div className="flex space-x-2 pt-2">
//                   <Select value={newActor} onValueChange={setNewActor}>
//                     <SelectTrigger className="flex-1">
//                       <SelectValue placeholder={t("project.anOption")} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {availableActors
//                         .filter((actor) => !data.actors.includes(actor))
//                         .map((actor) => (
//                           <SelectItem key={actor} value={actor}>
//                             {actor}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>

//                   {/* <Button type="button" onClick={addActor} disabled={!newActor}>
//                     {t("project.add")}
//                   </Button> */}
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label className="" htmlFor="title">
//                   {" "}
//                   {t("project.orgName")} *
//                 </Label>
//                 <Input
//                   id="title"
//                   placeholder={t("project.orgNameDesc")}
//                   value={data.organizationName}
//                   onChange={(e) =>
//                     handleInputChange("organizationName", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <Label className="" htmlFor="title">
//                 {t("project.projectTitle")} *
//               </Label>
//               <Input
//                 id="title"
//                 placeholder={t("project.projectDescription")}
//                 value={data.ProjectTitle}
//                 onChange={(e) =>
//                   handleInputChange("ProjectTitle", e.target.value)
//                 }
//                 required
//               />
//             </div>

//             <div className="space-y-2">
//               <Label className="" htmlFor="description">
//                 {t("project.orgaDesc")}*
//               </Label>
//               <Textarea
//                 id="description"
//                 placeholder={t("project.orgaDesc2")}
//                 value={data.description}
//                 onChange={(e) =>
//                   handleInputChange("description", e.target.value)
//                 }
//                 required
//                 rows={4}
//               />
//             </div>
//           </div>

//           {/* Project Details */}
//           <div className="space-y-6">
//             <Label className="text-lg font-semibold border-b border-gray-300 pb-2">
//               {t("project.projectDetails")}
//             </Label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label className="" htmlFor="location">
//                   {t("project.projectZone")} *
//                 </Label>
//                 <Input
//                   id="location"
//                   placeholder={t("project.projectZone2")}
//                   value={data.specificLocation}
//                   onChange={(e) =>
//                     handleInputChange("specificLocation", e.target.value)
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-4">
//                 <Label className="" htmlFor="regions">
//                   {t("project.region")} *
//                 </Label>
//                 <div className="flex space-x-2">
//                   <Select value={newRegion} onValueChange={setNewRegion}>
//                     <SelectTrigger className="flex-1">
//                       <SelectValue placeholder={t("project.region2")} />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {regions
//                         .filter((region) => !data.region.includes(region))
//                         .map((region) => (
//                           <SelectItem key={region} value={region}>
//                             {region}
//                           </SelectItem>
//                         ))}
//                     </SelectContent>
//                   </Select>
//                   <Button
//                     type="button"
//                     onClick={addRegion}
//                     disabled={!newRegion}
//                   >
//                     {t("project.add")}
//                   </Button>
//                 </div>

//                 <div className="flex flex-wrap gap-2">
//                   {data.region.map((region) => (
//                     <Badge
//                       key={region}
//                       variant="secondary"
//                       className="px-3 py-1"
//                     >
//                       {region}
//                       <button
//                         type="button"
//                         onClick={() => removeRegion(region)}
//                         className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label className="" htmlFor="budget">
//                   {t("project.Budget")} (XAF) *
//                 </Label>
//                 <Input
//                   type="number"
//                   id="budget"
//                   placeholder="5000000"
//                   value={data.budgetAmount}
//                   onChange={(e) =>
//                     handleInputChange("budgetAmount", e.target.value)
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label className="" htmlFor="fundingSource">
//                   {t("project.fundingSource")} *
//                 </Label>
//                 <Input
//                   id="fundingSource"
//                   placeholder=" World Bank"
//                   value={data.fundingSource}
//                   onChange={(e) =>
//                     handleInputChange("fundingSource", e.target.value)
//                   }
//                   required
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Timeline */}
//           <div className="space-y-6">
//             <Label className="text-lg font-semibold border-b border-gray-300 pb-2">
//               {t("project.timeline")}
//             </Label>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label className="" htmlFor="startDate">
//                   {t("project.start_date")} *
//                 </Label>
//                 <Input
//                   id="startDate"
//                   type="date"
//                   value={data.startDate}
//                   onChange={(e) =>
//                     handleInputChange("startDate", e.target.value)
//                   }
//                   required
//                 />
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <Label className="" htmlFor="endDate">
//                     {t("project.end_date")}
//                   </Label>
//                   <div className="flex items-center space-x-2">
//                     <Switch
//                       id="ongoing"
//                       checked={data.isOngoing}
//                       onCheckedChange={(checked: any) =>
//                         handleInputChange("isOngoing", checked)
//                       }
//                     />
//                     <Label className="text-sm capitalize" htmlFor="ongoing">
//                       {t("projects.ongoing")}
//                     </Label>
//                   </div>
//                 </div>
//                 <Input
//                   id="endDate"
//                   type="date"
//                   value={data.endDate}
//                   onChange={(e) => handleInputChange("endDate", e.target.value)}
//                   disabled={data.isOngoing}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Actors */}
//           <div className="space-y-6">
//             {/* <div className="space-y-4"> */}

//             {/* <div className="flex flex-wrap gap-2">
//                 {data.actors.map((actor) => (
//                   <Badge key={actor} variant="secondary" className="px-3 py-1">
//                     {actor}
//                     <button
//                       type="button"
//                       onClick={() => removeActor(actor)}
//                       className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div> */}
//             {/* </div> */}
//           </div>

//           {/* Programs */}
//           <div className="space-y-2">
//             <Label className="   pb-2">{t("project.partners")} *</Label>

//             <div className="space-y-4">
//               <div className="flex space-x-2">
//                 <Input
//                   placeholder=""
//                   value={newProgram}
//                   onChange={(e) => setNewProgram(e.target.value)}
//                   className="flex-1"
//                 />
//                 <Button
//                   type="button"
//                   onClick={addProgram}
//                   disabled={!newProgram}
//                 >
//                   {t("project.add")}
//                 </Button>
//               </div>

//               <div className="flex flex-wrap gap-2">
//                 {data.programs.map((program) => (
//                   <Badge key={program} variant="outline" className="px-3 py-1">
//                     {program}
//                     <button
//                       type="button"
//                       onClick={() => removeProgram(program)}
//                       className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
//                     >
//                       <X className="w-3 h-3" />
//                     </button>
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2 w-full">
//             <Label className="" htmlFor="description">
//               {t("project.goal")} *
//             </Label>
//             <Select>
//               <SelectTrigger className="flex-1 w-full ">
//                 <SelectValue placeholder={t("project.anOption")} />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value={"atténuation"}>
//                   {t("project.goal1")}
//                 </SelectItem>
//                 <SelectItem value={"adaptation"}>
//                   {t("project.goal2")}
//                 </SelectItem>
//                 <SelectItem value={"finance"}>{t("project.goal3")}</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="space-y-2">
//             <Label className="" htmlFor="description">
//               {t("project.specific_objective")} *
//             </Label>
//             <Textarea
//               id="specificObjectives"
//               placeholder={t("project.specific_objective2")}
//               value={data.specificObjectives}
//               onChange={(e) =>
//                 handleInputChange("specificObjectives", e.target.value)
//               }
//               required
//               rows={4}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label className="" htmlFor="description">
//               {t("project.intervention_logic")} *
//             </Label>
//             <Textarea
//               id="interventionLogic"
//               placeholder={t("project.intervention_logic2")}
//               value={data.interventionLogic}
//               onChange={(e) =>
//                 handleInputChange("interventionLogic", e.target.value)
//               }
//               required
//               rows={4}
//             />
//           </div>

//           <div className="flex justify-end pt-6 border-t">
//             <Button
//               onClick={onNext}
//               // disabled={!isFormValid}
//               className="bg-gradient-to-r from-orange-500 to-green-500 px-4 hover:opacity-90"
//             >
//               {t("project.start")}
//             </Button>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

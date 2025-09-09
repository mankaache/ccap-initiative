import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Briefcase, Building2, Save, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

export interface OrganizationData {
  organizationName: string;
  ProjectTitle: string;
  description:string;
  status: string;
  isOngoing: boolean;
  specificLocation:string;
  region:string[];
  target:string;
  startDate: string;
  endDate: string;
  fundingSource: string;
  budgetAmount: string;
  specificObjectives: string;
  interventionLogic: string;
  results: string;
  programs: string[];
  actors: string[];
  Goal: string;
  organizationType: string;
  
}

interface OrganizationInfoProps {
  data: OrganizationData;
  onUpdate?: (data: OrganizationData) => void;
  setData: React.Dispatch<React.SetStateAction<OrganizationData>>
  onNext?: () => void;
}

export const OrganizationInfo = ({ data, onUpdate, onNext,setData }: OrganizationInfoProps) => {
  const handleInputChange = (field: keyof OrganizationData, value: string) => {
    //@ts-ignore
    onUpdate({ ...data, [field]: value });
  };

  const isFormValid = data.organizationName && data.startDate && data.endDate && data.fundingSource && data.budgetAmount  ;
  const [newActor, setNewActor] = useState('');
  const [newProgram, setNewProgram] = useState('');
  const [newRegion, setNewRegion] = useState('');
  const availableActors = [
    'GU Group', 'SU Organization', 'Development Partners', 'Local Community',
    'Government Agency', 'NGO Partners', 'International Organization'
  ];
  const projectCategories = [
    'Infrastructure', 'Education', 'Healthcare', 'Agriculture', 'Technology',
    'Environment', 'Social Development', 'Economic Development', 'Governance'
  ];
  const regions = [
    'Central Region', 'Northern Region', 'Southern Region', 'Eastern Region',
    'Western Region', 'Coastal Region', 'Mountain Region', 'Urban Areas'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Creating project:', data);
    
    toast("Project added successfully!",{
       
      // description: `${data.title} has been added to the project portfolio.`,
    });
    
  };
const addActor = () => {
  if (newActor && !data.actors.includes(newActor)) {
    setData(prevData => ({
      ...prevData,
      actors: [...prevData.actors, newActor]
    }));
    setNewActor('');
  }
};

const removeActor = (actorToRemove: string) => {
  setData(prevData => ({
    ...prevData,
    actors: prevData.actors.filter(actor => actor !== actorToRemove)
  }));
};

const addProgram = () => {
  if (newProgram.trim() && !data.programs.includes(newProgram.trim())) {
    setData(prevData => ({
      ...prevData,
      programs: [...prevData.programs, newProgram.trim()]
    }));
    setNewProgram(''); 
  }
};

const removeProgram = (programToRemove: string) => {
  setData(prevData => ({
    ...prevData,
    programs: prevData.programs.filter(program => program !== programToRemove)
  }));
};

  const addRegion = () => {
     if (newRegion.trim() && !data.region.includes(newRegion.trim())) {
    setData(prevData => ({
      ...prevData,
      region: [...prevData.region, newRegion.trim()]
    }));
    setNewRegion(''); 
  }
  };

  const removeRegion = (regiontoRemove: string) => {
    setData(prevData => ({
    ...prevData,
    region: prevData.region.filter(region => region !== regiontoRemove)
  }));
  };


 



  return (
     <Card className="max-w-4xl mx-auto">
        {/* <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-primary" />
            <span>Create New Project</span>
          </CardTitle>
          <CardDescription>
            Add a new project to track progress and transparency
          </CardDescription>
        </CardHeader> */}
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold mb-0">Basic Information</Label>
              <Label className=" border-b border-gray-300 pb-2 mt-1">Before Starting we need a few details. </Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="uppercase" htmlFor="title">	NOM DE L’ORGANISATION *</Label>
                  <Input
                    id="title"
                    placeholder="Entre le nom de l'organisation"
                    value={data.organizationName}
                    onChange={(e) => handleInputChange('organizationName', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="uppercase" htmlFor="title">TITRE DU PROJET *</Label>
                  <Input
                    id="title"
                    placeholder="Enter project title"
                    value={data.ProjectTitle}
                    onChange={(e) => handleInputChange('ProjectTitle', e.target.value)}
                    required
                  />
                </div>

               
              </div>

              <div className="space-y-2">
                <Label className="uppercase" htmlFor="description">BREF DESCRIPTION DE L’ORGANISATION*</Label>
                <Textarea
                  id="description"
                  placeholder=""
                  value={data.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  rows={4}
                />
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold border-b border-gray-300 pb-2">Project Details</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="uppercase" htmlFor="location">ZONE D’INTERVENTION Specific *</Label>
                  <Input
                    id="location"
                    placeholder="Specific location or address"
                    value={data.specificLocation}
                    onChange={(e) => handleInputChange('specificLocation', e.target.value)}
                    required
                  />
                </div>

                 <div className="space-y-4">
                  <Label className="uppercase" htmlFor="regions">Region D’INTERVENTION  *</Label>
                  <div className="flex space-x-2">
                    <Select value={newRegion} onValueChange={setNewRegion}>
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select a region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.filter(region => !data.region.includes(region)).map((region) => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button type="button" onClick={addRegion} disabled={!newRegion}>
                      Add
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {data.region.map((region) => (
                      <Badge key={region} variant="secondary" className="px-3 py-1">
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
                {/* <div className="space-y-2">
                  <Label className="uppercase" htmlFor="status">Status *</Label>
                  <Select
                    value={data.status}
                    onValueChange={(value: typeof data.status) => handleInputChange('status', value)}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Planned</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}

                <div className="space-y-2">
                  <Label className="uppercase" htmlFor="budget">MONTANT DU BUDGET (XAF) *</Label>
                  <Input
                    id="budget"
                    placeholder="e.g., 5,000,000"
                    value={data.budgetAmount}
                    onChange={(e) => handleInputChange('budgetAmount', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="uppercase" htmlFor="fundingSource">SOURCE DE FINANCEMENT  *</Label>
                  <Input
                    id="fundingSource"
                    placeholder="e.g., World Bank, Government"
                    value={data.fundingSource}
                    onChange={(e) => handleInputChange('fundingSource', e.target.value)}
                    required
                  />
                </div>
              </div>

              
            </div>

              
            

            {/* Timeline */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold border-b border-gray-300 pb-2">Timeline</Label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="uppercase" htmlFor="startDate">début de MISE EN ŒUVRE  *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={data.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="uppercase" htmlFor="endDate">fin de MISE EN ŒUVRE</Label>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="ongoing"
                        checked={data.isOngoing}
                        onCheckedChange={(checked:any) => handleInputChange('isOngoing', checked)}
                      />
                      <Label className="text-sm capitalize" htmlFor="ongoing" >En cours</Label>
                    </div>
                  </div>
                  <Input
                    id="endDate"
                    type="date"
                    value={data.endDate}
                    onChange={(e) => handleInputChange('endDate', e.target.value)}
                    disabled={data.isOngoing}
                  />
                </div>
              </div>
            </div>

            {/* Actors */}
            <div className="space-y-6">
              <Label className=" uppercase pb-2">Acteur</Label>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Select value={newActor} onValueChange={setNewActor}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableActors.filter(actor => !data.actors.includes(actor)).map((actor) => (
                        <SelectItem key={actor} value={actor}>{actor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Button type="button" onClick={addActor} disabled={!newActor}>
                    Ajouter
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {data.actors.map((actor) => (
                    <Badge key={actor} variant="secondary" className="px-3 py-1">
                      {actor}
                      <button
                        type="button"
                        onClick={() => removeActor(actor)}
                        className="ml-2 hover:bg-destructive/20 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Programs */}
            <div className="space-y-6">
              <Label className=" uppercase  pb-2">PARTENAIRES (TECHNIQUE ET FINANCIER)</Label>
              
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder=""
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="button" onClick={addProgram} disabled={!newProgram}>
                   ajouter
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {data.programs.map((program) => (
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
                <Label className="uppercase" htmlFor="description">BUT (Liste déroulante : atténuation, adaptation ,finance……)*</Label>
                <Textarea
                  id="goal"
                  placeholder=""
                  value={data.Goal}
                  onChange={(e) => handleInputChange('Goal', e.target.value)}
                  required
                  rows={4}
                />
              </div>
           <div className="space-y-2">
                <Label className="uppercase" htmlFor="description">OBJECTIFS SPECIFIQUES*</Label>
                <Textarea
                  id="specificObjectives"
                  placeholder=""
                  value={data.specificObjectives}
                  onChange={(e) => handleInputChange('specificObjectives', e.target.value)}
                  required
                  rows={4}
                />
              </div>
           <div className="space-y-2">
                <Label className="uppercase" htmlFor="description">LOGIQUE D’INTERVENTION*</Label>
                <Textarea
                  id="interventionLogic"
                  placeholder=""
                  value={data.interventionLogic}
                  onChange={(e) => handleInputChange('interventionLogic', e.target.value)}
                  required
                  rows={4}
                />
              </div>

            <div className="flex justify-end pt-6 border-t">
              
              <Button 
            onClick={onNext}
            disabled={!isFormValid}
            className="bg-gradient-to-r from-orange-500 to-green-500 px-4 hover:opacity-90"
          >
            commencer
          </Button>
            </div>
          </form>
        </CardContent>
      </Card>
  );
};
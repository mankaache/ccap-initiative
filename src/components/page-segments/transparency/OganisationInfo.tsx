import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

export interface OrganizationData {
  organizationName: string;
  date: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  organizationType: string;
  bio: string;
}

interface OrganizationInfoProps {
  data: OrganizationData;
  onUpdate?: (data: OrganizationData) => void;
  onNext?: () => void;
}

export const OrganizationInfo = ({ data, onUpdate, onNext }: OrganizationInfoProps) => {
  const handleInputChange = (field: keyof OrganizationData, value: string) => {
    //@ts-ignore
    onUpdate({ ...data, [field]: value });
  };

  const isFormValid = data.organizationName && data.date && data.contactPerson && data.email;

  return (
    <Card className="shadow-medium max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Building2 className="h-6 w-6 text-primary" />
          Organization Information
        </CardTitle>
        <p className="text-muted-foreground">
          Please provide your organization details to begin the transparency assessment
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name *</Label>
            <Input
              id="orgName"
              value={data.organizationName}
              onChange={(e) => handleInputChange('organizationName', e.target.value)}
              placeholder="Enter organization name"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Assessment Date *</Label>
            <Input
              id="date"
              type="date"
              value={data.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Person *</Label>
            <Input
              id="contact"
              value={data.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              placeholder="Full name of contact person"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="contact@organization.com"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={data.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgType">Organization Type</Label>
            <Input
              id="orgType"
              value={data.organizationType}
              onChange={(e) => handleInputChange('organizationType', e.target.value)}
              placeholder="e.g., Non-profit, Corporation, Government"
              className="border-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={data.address}
            onChange={(e) => handleInputChange('address', e.target.value)}
            placeholder="Organization's full address"
            className="border-2 min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Organization Description</Label>
          <Textarea
            id="bio"
            value={data.bio}
            onChange={(e) => handleInputChange('bio', e.target.value)}
            placeholder="Brief description of your organization's mission, activities, and purpose"
            className="border-2 min-h-[120px]"
          />
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button 
            onClick={onNext}
            disabled={!isFormValid}
            className="bg-gradient-to-l from-secondary to-primary hover:opacity-90 px-8"
          >
            Next: Begin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
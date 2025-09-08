'use client'
import { OrganizationData, OrganizationInfo } from '@/components/page-segments/transparency/OganisationInfo'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building2 } from 'lucide-react';
import React, { useState } from 'react'

const CreateProject = () => {
      const [organizationData, setOrganizationData] = useState<OrganizationData>({
        organizationName: "",
        date: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        organizationType: "",
        bio: "",
      });
  return (
    <Card className="shadow-medium max-w-4xl mx-auto my-12 md:my-20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 capitalize text-2xl">
          <Building2 className="h-6 w-6 text-primary  " />
          create project
        </CardTitle>
        <p className="text-muted-foreground mt-2">
          Please provide the details below to create your project
        </p>
      </CardHeader>
      <CardContent className="space-y-6 mt-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="orgName">Organization Name *</Label>
            <Input
              id="orgName"
              placeholder="Enter organization name"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Assessment Date *</Label>
            <Input
              id="date"
              type="date"
              
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact">Contact Person *</Label>
            <Input
              id="contact"
              placeholder="Full name of contact person"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="contact@organization.com"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="border-2"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="orgType">Organization Type</Label>
            <Input
              id="orgType"
              placeholder="e.g., Non-profit, Corporation, Government"
              className="border-2"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            placeholder="Organization's full address"
            className="border-2 min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Organization Description</Label>
          <Textarea
            id="bio"
            placeholder="Brief description of your organization's mission, activities, and purpose"
            className="border-2 min-h-[120px]"
          />
        </div>

        <div className="flex justify-end pt-6 border-t">
          <Button 
            className="bg-gradient-to-l from-secondary to-primary hover:opacity-90 px-8"
          >
           Create Project
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateProject
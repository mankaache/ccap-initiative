'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import { ArrowLeft, Users, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateActor() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    actor:'',
    description: '',
    hasLoginAccess: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    console.log('Creating actor:', formData);
    
    toast.success("Actor created successfully!",{
      description: `${formData.name} has been added to the system.`,
    });
    
    navigate.push('/admin/actors');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push('/admin/actors')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Actors
        </Button>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-primary" />
            <span>Create New Actor</span>
          </CardTitle>
          <CardDescription>
            Add a new organization or group to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
          
              <div className="space-y-2">
                <Label className="capitalize" htmlFor="status">
                  Actor Category*
                </Label>
                <Select
                  value={formData.actor}
                  
                  onValueChange={(value: typeof formData.actor) =>
                    handleInputChange("status", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder='Select a category' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Etatiques">Etatiques</SelectItem>
                    <SelectItem value="ONGI">ONGI</SelectItem>
                    <SelectItem value="OSC">OSC</SelectItem>
                    <SelectItem value="OBC">OBC</SelectItem>
                    <SelectItem value="secteur-privee">Sector Privee</SelectItem>
                    <SelectItem value="cl">CL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            <div className="space-y-2">
              <Label htmlFor="name">Organisation Name *</Label>
              <Input
                id="name"
                placeholder="Organisation name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Organisation Description *</Label>
              <Textarea
                id="description"
                placeholder="Provide a brief description of the actor's role and activities..."
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={4}
                className="transition-smooth focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="login-access">Login Access</Label>
                <p className="text-sm text-muted-foreground">
                  Allow this actor to have login credentials and access the dashboard
                </p>
              </div>
              <Switch
                id="login-access"
                checked={formData.hasLoginAccess}
                onCheckedChange={(checked) => handleInputChange('hasLoginAccess', checked)}
              />
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate.push('/admin/actors')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={!formData.name || !formData.description}
              >
                <Save className="w-4 h-4 mr-2" />
                Create Actor
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
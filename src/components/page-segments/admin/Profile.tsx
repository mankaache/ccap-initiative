'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  Edit,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  FileText,
  Briefcase,
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContexta';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+237 123 456 789',
    location: 'Yaoundé, Cameroon',
    bio: 'Dedicated professional working on organizational development and project management.',
    joinDate: '2024-01-15',
    department: user?.role === 'admin' ? 'Administration' : 'Operations',
    title: user?.role === 'admin' ? 'System Administrator' : 'Project Coordinator',
  });

  const stats = user?.role === 'admin' ? {
    articles: 15,
    projects: 12,
    documents: 25,
    actorsManaged: 8,
  } : {
    articles: 8,
    projects: 3,
    collaborations: 5,
    contributions: 12,
  };

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    toast("Profile updated",{
      
      description: "Your profile information has been successfully updated.",
    });
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <User className="w-8 h-8 text-primary" />
          <span>Profile</span>
        </h1>
        <p className="text-muted-foreground">Manage your personal information and account details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold">
                    {getInitials(profileData.name)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <h2 className="text-xl font-bold">{profileData.name}</h2>
                <p className="text-muted-foreground">{profileData.title}</p>
                <Badge className="mt-2" variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                  <Shield className="w-3 h-3 mr-1" />
                  {user?.role === 'admin' ? 'Administrator' : 'Actor'}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profileData.joinDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </div>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
             
              
            </div>
         

            {isEditing && (
              <div className="flex space-x-4">
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Activity Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Overview</CardTitle>
          <CardDescription>Your contribution statistics and activity summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  {key === 'articles' && <FileText className="w-6 h-6 text-white" />}
                  {key === 'projects' && <Briefcase className="w-6 h-6 text-white" />}
                  {(key === 'documents' || key === 'collaborations') && <FileText className="w-6 h-6 text-white" />}
                  {(key === 'actorsManaged' || key === 'contributions') && <User className="w-6 h-6 text-white" />}
                </div>
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-muted-foreground capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
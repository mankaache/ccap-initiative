'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ArrowLeft, FolderOpen, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export default function CreateDocument() {
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'national' as 'international' | 'national' | 'regulation',
    type: '',
    pages: '',
    dateOfCreation: new Date().toISOString().split('T')[0], 
    contentPreview: '',
    author: '',
    language: '',
     document: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Creating document:', formData);
    
    toast("Document created successfully!",{
    
      description: `${formData.title} has been added to the document library.`,
    });
    
    navigate.push('/admin/documents');
  };
  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const languages = [
    'English', 'French'
  ];

  const documentTypes = [
    'Policy Document', 'Research Paper', 'Technical Report', 'Legal Document', 
    'Guidelines', 'Manual', 'Regulation', 'White Paper', 'Case Study'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.push('/admin/documents')}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Documents
        </Button>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="w-6 h-6 text-primary" />
            <span>Add New Document</span>
          </CardTitle>
          <CardDescription>
            Upload and catalog a new document in the library
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Document Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter document title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Source *</Label>
                <Input
                  id="author"
                  placeholder="Document author or organization"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value: typeof formData.category) => handleInputChange('category', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="international">International</SelectItem>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="regulation">Regulation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Document Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pages">Number of Pages *</Label>
                <Input
                  id="pages"
                  type="number"
                  placeholder="e.g., 25"
                  value={formData.pages}
                  onChange={(e) => handleInputChange('pages', e.target.value)}
                  required
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfCreation">Date of Creation/ release *</Label>
                <Input
                  id="dateOfCreation"
                  type="date"
                  value={formData.dateOfCreation}
                  onChange={(e) => handleInputChange('dateOfCreation', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the document"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={3}
              />
            </div>

            {/* <div className="space-y-2 border border-dashed p-4 rounded-lg">
              <Label htmlFor="contentPreview">Content Preview/Brief Description *</Label>
              <RichTextEditor
                value={formData.contentPreview}
                onChange={(value) => handleInputChange('contentPreview', value)}
                placeholder="Provide a brief preview of what the document contains (max 500 words)"
                className="min-h-32"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Maximum 500 words</span>
                <span>{formData.contentPreview.replace(/<[^>]*>/g, '').length}/3000 characters</span>
              </div>
            </div> */}

             <div className="space-y-2">
                <Label htmlFor="document">Upload Document *</Label>
                <div className="border border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Drop your file here or click to browse
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      id="pdf-upload"
                      onChange={(e) => handleFileUpload('document', e.target.files?.[0] || null)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('pdf-upload')?.click()}
                    >
                      Choose File
                    </Button>
                    {formData.document && (
                      <p className="text-sm text-primary font-medium">
                        {formData.document.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate.push('/admin/documents')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                disabled={!formData.title || !formData.author || !formData.type || 
                         !formData.language || !formData.pages || !formData.description || 
                         !formData.contentPreview}
              >
                <Save className="w-4 h-4 mr-2" />
                Add Document
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
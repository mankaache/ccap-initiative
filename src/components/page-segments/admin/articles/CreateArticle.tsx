'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ArrowLeft, FileText, Upload, Save, Image } from 'lucide-react';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/useAuth';


export default function CreateArticle() {

  const {user} = useAuth();
  const navigate = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'text' as 'text' | 'pdf',
    content: '',
    document: null as File | null,
    image: null as File | null,
    category: 'national' as 'national' | 'regional',
    source: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Creating article:', formData);
    
    toast.success("Article created successfully!",{
        
    
      description: `${formData.title} has been published.`,
    });
    
    navigate.push('/admin/articles');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  return (
    <div className="space-y-6">
      { 
        user?.role === 'admin' && (
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => navigate.push('/admin/articles')}
              className="hover:bg-accent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </div>
        )
      }
     

      <Card className="max-w-4xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className='text-lg'>Create New Article</span>
          </CardTitle>
          <CardDescription>
            Publish a new article or upload a document
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Article Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter article title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source *</Label>
                <Input
                  id="source"
                  placeholder="e.g., Reuters, BBC, Local News"
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">Content Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'text' | 'pdf') => handleInputChange('type', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text Article</SelectItem>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  
                  onValueChange={(value: 'national' | 'regional') => handleInputChange('category', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">National</SelectItem>
                    <SelectItem value="regional">Regional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="date">Publication Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the article"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={3}
              />
            </div>

            {formData.type === 'text' ? (
              <div className="space-y-2 border border-dashed p-4 rounded-lg">
                <Label htmlFor="content">Article Content *</Label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => handleInputChange('content', value)}
                  placeholder="Write your article content here..."
                  className="min-h-48"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="document">PDF Document *</Label>
                <div className="border border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Drop your PDF file here or click to browse
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
            )}

            <div className="space-y-2">
              <Label htmlFor="image">Featured Image (Optional)</Label>
              <div className="border border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                <Image className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  onChange={(e) => handleFileUpload('image', e.target.files?.[0] || null)}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('image-upload')?.click()}
                >
                  Upload Image
                </Button>
                {formData.image && (
                  <p className="text-xs text-primary mt-2">{formData.image.name}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate.push('/admin/articles')}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                disabled={!formData.title || !formData.description || !formData.source || 
                         (formData.type === 'text' && !formData.content) ||
                         (formData.type === 'pdf' && !formData.document)}
              >
                <Save className="w-4 h-4 mr-2" />
                Publish Article
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ArrowLeft, FileText, Upload, Save, Image, Loader2 } from 'lucide-react';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase/useAuth';
import { db, storage } from "@/firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from 'react-toastify';
import { uploadFile } from '@/firebase/cloudinary';
import { fetchArticleById } from '@/firebase/services/adminService';
import { updateArticle } from '@/firebase/services/updateService';
import { useTranslation } from '@/hooks/useTranslation';


type ArticleForm = {
  title: string;
  description: string;
  type: "text" | "pdf";
  content: string | null; // <-- now nullable
  document: File | null;
  image: File | null;
  source: string;
  date: string;
};


  function isHtmlMeaningful(html: string | null): boolean {
  if (!html) return false;
  // remove tags and &nbsp; and whitespace — if any text remains it's meaningful
  const stripped = html.replace(/<[^>]*>/g, "").replace(/&nbsp;|&#160;/g, "").replace(/\s+/g, "").trim();
  return stripped.length > 0;
}

export default function CreateArticle({ articleId }: { articleId?: string }) {
  const { user } = useAuth();
  const{t} = useTranslation()
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "text" as "text" | "pdf",
    content: null,
    document: null as File | null,
    image: null as File | null,
    source: "",
    date: new Date().toISOString().split("T")[0],



  });

   useEffect(() => {
    if (articleId) {
      setLoading(true);
      fetchArticleById(articleId)
        .then((proj:any) => {
          setFormData({
            title: proj.title || "",
            description: proj.description || "",
            content: proj.content || "",
            source: proj.source || "",
            date: proj.date || new Date().toISOString().split("T")[0],
            type: proj.type || "text",
            document: proj.documentUrl,
            image: proj.imageUrl

            
          });
      
        })
        .finally(() => setLoading(false));
    }
  }, [articleId]);
  


async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!user) {
    toast.error(`${t('admin.articles.noUser')}`);
    return;
  }
  console.log(`${t('admin.articles.article')}`, formData);

  // Validation
  if (!formData.title || !formData.description || !formData.source) {
    toast.error(`${t('admin.articles.requiredFields')}`);
    return;
  }
  if (formData.type === "text" && !isHtmlMeaningful(formData.content)) {
    toast.error(`${t('admin.articles.writeContent')}`);
    return;
  }
  if (formData.type === "pdf" && !formData.document) {
    toast.error(`${t('admin.articles.uploadPDF')}`);
    return;
  }

  setLoading(true);

  try {
    let documentUrl: string | null = null;
    let imageUrl: string | null = null;

    // Upload PDF if type=pdf
      if (formData.type === "pdf" && formData.document) {
      documentUrl = await uploadFile(formData.document, "article_presets");
    }

   // Upload Image
    if (formData.image) {
      imageUrl = await uploadFile(formData.image, "article_presets");
    }
    // Build payload
    const payload: any = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      source: formData.source,
      date: formData.date,
      authorId: user.uid,
      createdAt: serverTimestamp(),
    };

    
    if (formData.type === "text" && isHtmlMeaningful(formData.content)) {
      payload.content = formData.content;
    }
    if (documentUrl) payload.documentUrl = documentUrl;
    if (imageUrl) payload.imageUrl = imageUrl;

    // Save to Firestore
    const res = await addDoc(collection(db, "articles"), payload);
    console.log('results', res)
    toast.success(`${t('admin.articles.success')}`);
     user.role==='actor' ? navigate.push('/news/national') : navigate.push("/admin/articles");
  } catch (err: any) {
    console.error(err);
    toast.error(`${t('admin.articles.error')}`);
  } finally {
    setLoading(false);
  }
}

async function handleUpdate(e: React.FormEvent) {
  e.preventDefault();
  if (!user) {
    toast.error(`${t('admin.articles.noUser')}`);
    return;
  }
  console.log('article', formData);

  // Validation
  if (!formData.title || !formData.description || !formData.source) {
    toast.error(`${t('admin.articles.requiredFields')}`);
    return;
  }
  if (formData.type === "text" && !isHtmlMeaningful(formData.content)) {
    toast.error(`${t('admin.articles.writeContent')}`);
    return;
  }
  if (formData.type === "pdf" && !formData.document) {
    toast.error(`${t('admin.articles.uploadPDF')}`);
    return;
  }

  setLoading(true);

  try {
  
    // Build payload
    const payload: any = {
      title: formData.title,
      description: formData.description,
      type: formData.type,
      source: formData.source,
      date: formData.date,
      authorId: user.uid,
      createdAt: serverTimestamp(),
    };


    // Save to Firestore
    //@ts-ignore
    const res = await updateArticle(articleId as string,payload, formData.image, formData.document );
    console.log('results', res)
    toast.success(`${t('admin.articles.success')}`);
     user.role==='actor' ? navigate.push('/news/national') : navigate.push("/admin/articles");
  } catch (err: any) {
    console.error(err);
    toast.error(`${t('admin.articles.error')}`);
  } finally {
    setLoading(false);
  }
}
  const handleInputChange = (field: keyof ArticleForm | "type", value: any) => {
    //@ts-ignore
    setFormData((prev) => {
      // When switching type, null out the other field
      if (field === "type") {
        if (value === "pdf") {
          return { ...prev, type: "pdf", content: null }; // set content to null
        } else {
          return { ...prev, type: "text", document: null }; // set document to null
        }
      }

      // Normal update
      return { ...prev, [field]: value } as ArticleForm;
    });
  };


  const handleFileUpload = (field: string, file: File | null) => {
    setFormData((prev) => ({ ...prev, [field]: file }));
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
              {t('admin.articles.back')}
            </Button>
          </div>
        )
      }
     

      <Card className="max-w-4xl mx-auto my-10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-6 h-6 text-primary" />
            <span className='text-lg capitalize'> 
            
              {/* {document ? "Modifier" : "Ajouter un"} */}
              {articleId ? `${t('admin.articles.edit')}` : `${t('admin.articles.create')}`} {t('admin.articles.article')}</span>
          </CardTitle>
          <CardDescription>
            {t('admin.articles.formDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={articleId ? handleUpdate : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('admin.articles.titleField')} *</Label>
                <Input
                  id="title"
                  placeholder={t('admin.articles.titlePlaceholder')}
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">{t('admin.articles.sourceField')} *</Label>
                <Input
                  id="source"
                  placeholder="e.g., Reuters, BBC"
                  value={formData.source}
                  onChange={(e) => handleInputChange('source', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">{t('admin.articles.contentTypeField')} *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: 'text' | 'pdf') => handleInputChange('type', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">{t('admin.articles.contentTypeOption1')}</SelectItem>
                    <SelectItem value="pdf">{t('admin.articles.contentTypeOption2')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>


              <div className="space-y-2">
                <Label htmlFor="date">{t('admin.articles.publishedDateField')} *</Label>
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
              <Label htmlFor="description">{t('admin.articles.briefDescriptionField')} *</Label>
              <Textarea
                id="description"
                placeholder={t('admin.articles.briefDescriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={3}
              />
            </div>

            {formData.type === 'text' ? (
              <div className="space-y-2 border border-dashed p-4 rounded-lg">
                <Label htmlFor="content">{t('admin.articles.contentField')} *</Label>
                <RichTextEditor
                value={formData.content ?? ""} // editor expects string
                  onChange={(value: string) => {
                    // convert empty-like HTML to null
                    if (isHtmlMeaningful(value)) {
                      handleInputChange("content", value);
                    } else {
                      handleInputChange("content", null);
                    }
                  }}
                  placeholder={t('admin.articles.contentPlaceholder')}
                  className="min-h-48"
                
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="document">{t('admin.articles.pdfField')} *</Label>
                <div className="border border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      {t('admin.articles.pdfPlaceholder')}
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
                      {t('admin.articles.chooseFile')}
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
                  {t('admin.articles.uploadImage')}
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
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                
              >
                <Save className="w-4 h-4 mr-2" />
              {(loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" /> )? `${t('admin.articles.loading')}`: `${t('admin.articles.published')}` }
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { ArrowLeft, FolderOpen, Loader2, Save, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

import { useAuth } from '@/firebase/useAuth';
import { toast } from 'react-toastify';
import { uploadFile } from '@/firebase/cloudinary';
import { fetchDocumentById } from '@/firebase/services/adminService';
import { updateDocument } from '@/firebase/services/updateService';
import { useTranslation } from '@/hooks/useTranslation';

export default function CreateDocument({ docuId }: { docuId?: string }) {
  const navigate = useRouter();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'national',
    type: '',
    pages: '',
    dateOfCreation: new Date().toISOString().split('T')[0],
    contentPreview: '',
    author: '',
    language: '',
    // document holds the URL (string). documentFile holds the actual File when user uploads a new one.
    document: '',
    documentFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (docuId) {
      setLoading(true);
      fetchDocumentById(docuId)
        .then((proj: any) => {
          setFormData((prev) => ({
            ...prev,
            title: proj.title || '',
            description: proj.description || '',
            category: proj.category || 'national',
            type: proj.type || '',
            pages: proj.pages || '',
            dateOfCreation: proj.dateOfCreation || new Date().toISOString().split('T')[0],
            contentPreview: proj.contentPreview || '',
            author: proj.author || '',
            language: proj.language || '',
            document: proj.documentUrl || proj.document || '', // accept either field name
            documentFile: null, // ensure no File object is present
          }));
        })
        .catch((err) => {
          console.error('Error fetching document:', err);
          toast.error(t('admin.document.errorFetch') ?? 'Error fetching document');
        })
        .finally(() => setLoading(false));
    }
  }, [docuId, t]);

  const handleFileUpload = (file: File | null) => {
    setFormData((prev) => ({ ...prev, documentFile: file }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Count words in preview (ignores HTML tags)
  const wordCount = formData.contentPreview
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // use t(...) directly
  const languages = [t("admin.document.english"), t("admin.document.french")];
  const documentTypes = [
    t("admin.document.policy"),
    t("admin.document.research"),
    t("admin.document.technical"),
    t("admin.document.legal"),
    t("admin.document.guidelines"),
    t("admin.document.manual"),
    t("admin.document.regulation"),
  ];

  const validateWordCount = () => {
    if (wordCount > 500) {
      toast.error(t('admin.document.wordError'));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateWordCount()) return;

    // For create: require an uploaded file (documentFile)
    if (!formData.documentFile) {
      toast.error(t('admin.document.format'));
      return;
    }

    setLoading(true);

    try {
      // upload file
      const fileUrl = await uploadFile(formData.documentFile as File, "document_preset");

      // Save metadata to Firestore (document stores URL)
      await addDoc(collection(db, "documents"), {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        type: formData.type,
        language: formData.language,
        pages: formData.pages,
        description: formData.description,
        dateOfCreation: formData.dateOfCreation,
        contentPreview: formData.contentPreview,
        documentUrl: fileUrl,
        uploadedBy: user.uid,
        documentReview: "Pending",
        createdAt: serverTimestamp(),
      });

      toast.success(t('admin.document.success'));
      user.role === 'actor' ? navigate.push('/documents/national') : navigate.push("/admin/documents");
    } catch (err) {
      console.error("Error creating document:", err);
      toast.error(t('admin.document.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateWordCount()) return;

    setLoading(true);

    try {
      // If user selected a new file, upload and use its URL; otherwise use existing URL in formData.document
      let fileUrl = formData.document;
      if (formData.documentFile instanceof File) {
        fileUrl = await uploadFile(formData.documentFile, "document_preset");
      }

      // Prepare updated data to save (only primitives/strings)
      const updatedData: any = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        type: formData.type,
        language: formData.language,
        pages: formData.pages,
        description: formData.description,
        dateOfCreation: formData.dateOfCreation,
        contentPreview: formData.contentPreview,
        documentUrl: fileUrl,
        documentReview: "Pending",
        updatedAt: serverTimestamp(),
      };

      await updateDocument(docuId as string, updatedData);

      toast.success(t('admin.document.success'));
      user.role === 'actor' ? navigate.push('/documents/national') : navigate.push("/admin/documents");
    } catch (err) {
      console.error("Error updating document:", err);
      toast.error(t('admin.document.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate.back()}
          className="hover:bg-accent"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('admin.document.back')}
        </Button>
      </div>

      <Card className="max-w-5xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderOpen className="w-6 h-6 text-primary capitalize" />
            <span>{docuId ? `${t('admin.document.edit')}` : `${t("admin.articles.create")}`} {t('admin.document.document')}</span>
          </CardTitle>
          <CardDescription>
            {t('admin.document.titleDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={docuId ? handleUpdate : handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">{t('admin.document.titleField')} *</Label>
                <Input
                  id="title"
                  placeholder={t('admin.document.titlePlaceholder')}
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">{t('admin.document.sourceField')} *</Label>
                <Input
                  id="author"
                  placeholder={t('admin.document.sourcePlaceholer')}
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="type">{t('admin.document.type')} *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange('type', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={t('admin.document.typePlaceholder')} />
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
                <Label htmlFor="language">{t('admin.document.language')} *</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => handleInputChange('language', value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={t('admin.document.languagePlaceholder')} />
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
                <Label htmlFor="pages">{t('admin.document.numPageField')} *</Label>
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
                <Label htmlFor="dateOfCreation">{t('admin.document.creationDate')} *</Label>
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
              <Label htmlFor="description">{t('admin.document.briefDescription')} *</Label>
              <Textarea
                id="description"
                placeholder={t('admin.document.descriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                rows={3}
              />
            </div>

            <div className="space-y-2 border border-dashed p-4 rounded-lg">
              <Label htmlFor="contentPreview">{t('admin.document.contentPreview')} *</Label>
              <RichTextEditor
                value={formData.contentPreview}
                onChange={(value) => handleInputChange('contentPreview', value)}
                placeholder={t('admin.document.contentPreviewPlaceholder')}
                className="min-h-32"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{t('admin.document.maxwords')}</span>
                <span>{wordCount}/500 {t('admin.document.word')}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="document">{t('admin.document.upload')} *</Label>
              <div className="border border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {t('admin.document.uploadDesc')}
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    id="pdf-upload"
                    onChange={(e) => handleFileUpload(e.target.files?.[0] || null)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('pdf-upload')?.click()}
                  >
                    {t('admin.articles.chooseFile')}
                  </Button>

                  {/* show current URL or selected file name */}
                  {formData.documentFile ? (
                    <p className="text-sm text-primary font-medium">{formData.documentFile.name}</p>
                  ) : formData.document ? (
                    <p className="text-sm text-primary font-medium break-words">{formData.document}</p>
                  ) : null}
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
                {t('common.cancel')}
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-secondary to-primary hover:opacity-90"
                disabled={loading}
              >
                {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> {t('admin.document.loading')}</> : <><Save className="w-4 h-4 mr-2" /> {t('admin.document.add')}</>}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

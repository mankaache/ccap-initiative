"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  FileText,
  Calendar,
  User,
  Eye,
  Languages,
  Edit2Icon,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { fetchAllDocuments, fetchReviewDocuments } from "@/firebase/services/adminService";
import { toast } from "react-toastify";
import FullPageLoader from "@/components/layout/FullPageLoader";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

interface DocumentData {
  id: string;
  title: string;
  description: string;
  category: string;
  type: string;
  pages: string;
  dateOfCreation: string;
  contentPreview: string;
  author: string;
  language: string;
  documentUrl: string;
}

export default function DocumentsList() {
  const navigate = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
const{t} = useTranslation()
  const [loading, setLoading] = useState<boolean>(false);
  const [documentsData, setDocumentsData] = useState<DocumentData[]>([]);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        setLoading(true);
        const allDocs = await fetchReviewDocuments();
        //@ts-ignore
        setDocumentsData(allDocs);
        console.log("allreviewingDocs", allDocs);
      } catch (err: any) {
        console.error(err);
        console.error("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    getDocuments();
  }, []);

  const filteredDocuments = documentsData?.filter((doc) =>
    [doc.title, doc.type, doc.category, doc.language]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <FullPageLoader />
      </div>
    );
  }

  if (!documentsData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t("admin.document.notFound")}</h1>
          <p className="text-muted-foreground mb-6">
           {t("admin.document.msg")}
          </p>
        </div>
      </div>
    );
  }

 

  

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        {t('admin.document.document_review')}
      </h1>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder={t("admin.document.search")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Badge variant="outline">
          {filteredDocuments.length} {t("admin.document.document")}
          {filteredDocuments.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments?.map((document) => (
          <Card
            key={document.id}
            className="hover:shadow-medium transition-smooth"
          >
            <CardHeader>
                <div className="flex justify-end w-full">
                     <Link
                      href={`/admin/documents/edit/${document.id}`}
                      className=" flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                          <Edit2Icon className="w-4 h-4"/>{t("admin.document.edit")}
                      </Link>
                </div>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />

                  <span className="text-lg">
                    {document.category}
                  </span>
                </div>
                <Badge
                  
                >
                  {document.category}
                </Badge>
              </div>
              <CardTitle className="text-lg line-clamp-2">
                {document.title}
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {document.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-2 bg-muted rounded-lg">
                    <div className="font-semibold text-lg">
                      {document.pages}
                    </div>
                    <div className="text-muted-foreground">{t("admin.document.pages")}</div>
                  </div>
                  <div className="flex items-center justify-center p-2 bg-muted rounded-lg">
                    <Languages className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">
                      {document.language}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span className="truncate">{document.author}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(document.dateOfCreation).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="text-sm">
                  <Badge variant="outline" className="text-xs">
                    {document.type}
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    navigate.push(`/admin/documents/${document.id}`)
                  }
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t("admin.document.view")}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments?.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('admin.document.noDocs')}</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm
              ? t('admin.articles.adjustSearch')
              : t('admin.document.noDocsYet')}
          </p>

          <Button onClick={() => navigate.push("/admin/documents/create")}>
            <Plus className="w-4 h-4 mr-2" />
            {t("admin.document.add")}
          </Button>
        </div>
      )}
    </div>
  );
}

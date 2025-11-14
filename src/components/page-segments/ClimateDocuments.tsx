"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Eye, Search, FileText, Lock, Edit2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Footer from "@/components/layout/Footer";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/firebase/useAuth";
import { getCategoryTitle } from "@/data/organisation";
import { fetchAcceptedArticles, fetchAcceptedDocuments, fetchDocumentsByCategory } from "@/firebase/services/adminService";
import { toast } from "react-toastify";
import FullPageLoader from "../layout/FullPageLoader";
import { useTranslation } from "@/hooks/useTranslation";
import { forceDownload } from "@/utils/download";

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

const ClimateDocuments = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadDocs = async () => {
      try {
        setLoading(true);
       

        const docs = await fetchAcceptedDocuments()
        setDocuments(docs as DocumentData[]);
        console.log(docs);
      } catch (err) {
        console.error(err);
        console.error("Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    loadDocs();
  }, []);
  const { user } = useAuth();
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen">
        <FullPageLoader />
      </div>
    );
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  const getDocumentTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      Agreement: "bg-primary/10 text-primary",
      Report: "bg-secondary/10 text-secondary",
      Guidance: "bg-accent text-accent-foreground",
      Policy: "bg-muted text-muted-foreground",
      Amendment: "bg-destructive/10 text-destructive",
      Framework: "bg-primary/20 text-primary",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };


  return (
    <div className="min-h-screen bg-background">
      <div className="w-full h-80 py-5 bg-gradient-to-r flex flex-col justify-center items-center gap-3 from-secondary via-primary/80 to-secondary">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold uppercase text-foreground mb-6">
            {t('admin.document.category2')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("actor.documentDesc")}
          </p>
        </div>{" "}
      </div>
      {/* Hero Section */}
        {
          user && (
            <div className="flex justify-end pr-16 mt-8">
              <Link href={'/create-document'} className="px-4 py-2 rounded-lg text-white font-semibold cursor-pointer bg-gradient-to-l from-primary to-secondary">{t('admin.document.add')}</Link>
            </div>
          )
        }
      <section className="py-16 bg-gradient-subtle">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("actor.documentSearch")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-4 w-full"
            />
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="py-16">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDocuments.map((document, index) => (
              <Card
                key={document.id}
                className="border-border bg-gradient-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >

                <CardContent className="p-6">
                  <div className="w-full flex justify-end">
                    {user && (
                    <Link
                      href={`/documents/national/edit/${document.id}`}
                      className=" flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                          <Edit2Icon className="w-4 h-4"/>{t('actor.edit')}
                      </Link>
                      )} 
                  </div>
                  <div className="flex items-start justify-between mb-4">
                    <Badge className={getDocumentTypeColor(document.type)}>
                      {document.type}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <FileText className="h-4 w-4 mr-1" />
                      {document.pages} pages
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                    {document.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed text-sm">
                    {document.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Source:</span>
                      <span className="font-medium text-foreground">
                        {document.author}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {t("actor.documentPub")}:
                      </span>
                      <span className="text-foreground">
                        {formatDate(document.dateOfCreation)}
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">File Size:</span>
                      <span className="text-foreground">{document.}</span>
                    </div> */}
                  </div>

                  <div className="flex items-center space-x-3">
                    <Link
                      href={`/documents/national/${document.id}`}
                      className="flex items-center px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {t("actor.view")}
                    </Link>

                    {!user ? (
                      <button
                        disabled
                        className="flex items-center px-3 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed text-sm"
                      >
                        <Lock className="h-4 w-4 mr-1" />
                       {t("actor.documentDownload")}
                      </button>
                    ) : (
                      <>
                        {document.documentUrl ? (
                          <button
                            onClick={() =>
                              forceDownload(
                                document.documentUrl,
                                document.title
                              )
                            }
                            className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors text-sm"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            {t("actor.documentDownload")}
                          </button>
                        ) : (
                          <span>{t("actor.documentNone")}</span>
                        )}
                      </>
                    )}
                  </div>

                  {!user && (
                    <p className="text-xs text-red-600 text-center mt-2">
                      <Lock className="h-3 w-3 inline mr-1" />
                      {t("actor.login")}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                {t("admin.document.noDocs")}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ClimateDocuments;

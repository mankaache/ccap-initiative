"use client";

import React, { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  Download,
  Eye,
  Calendar,
  FileText,
  Lock,
  Edit2Icon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/firebase/useAuth";
import { fetchDocumentById, updateArticleReview, updateDocumentReview } from "@/firebase/services/adminService";
import FullPageLoader from "../layout/FullPageLoader";
import DeleteDocumentButton from "../DeleteButtons/DeleteDocument";
import { useTranslation } from "@/hooks/useTranslation";
import { forceDownload } from "@/utils/download";
import { toast } from "react-toastify";

interface DocumentType {
      id: string;
   title: string;
    description: string;
    category: string
    type: string
    pages: string
    dateOfCreation: string
    contentPreview: string
    author: string
    language: string
     documentUrl: string
     documentReview:string
}


const DocumentDetail = () => {
    const { user } = useAuth();
    const {t} = useTranslation()
    const router = useRouter()
  const param = useParams();
 const { id } = useParams();
  const [documentData, setDocumentData] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchDocument() {
      try {
        setLoading(true);
        const doc = await fetchDocumentById(id as string); 

        if (doc) {
          setDocumentData(doc as DocumentType);
          console.log("doc", doc);
        } else {
          setError("Document not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch document.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDocument();
    }
  }, [id]);
 
    const handleReview = async (status: "Accepted" | "Rejected") => {
      try {
        setLoading(true);
        await updateDocumentReview(id as string, status);
        toast.success(`${t("admin.document.hasbeen")} ${status.toLowerCase()}.`);
        router.back();
      } catch (err: any) {
        console.error(err);
        toast.error(`${t("admin.project.failed")}`);
      } finally {
        setLoading(false);
      }
    };

     if (loading) {
      return (
        <div className="min-h-screen">
  
          <FullPageLoader/>
        </div>
      );
    }

  if (!documentData) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('admin.document.notFound')}</h1>
          <p className="text-muted-foreground mb-6">
            {t('admin.document.msg')}
          </p>
          <Link href={`${user.role==='admin'? '/admin/documents':'/documents/national'}`}>
            <Button>{t('admin.document.back')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  };


  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`${user && user.role==='admin'? '/admin/documents' :  `/documents/national`}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('admin.document.backTo')} {user && user.role==='admin'? '' : `national`} {t('admin.document.document')}
        </Link>
        {
           (user && user.role === "admin") && (documentData.documentReview !== "Accepted") && (documentData.documentReview !== "Rejected") && (
                
                  <div className="flex w-full mx-auto mb-10 pl-8 justify-between items-center">
                    <div className=" w-full">
                    <h2 className="text-2xl font-bold">
                      {t("admin.project.reviewArticle")}
                    </h2></div>
                    <div className="w-full flex flex-wrap round mt-6 items-center gap-4">
                      <Button
                        className="bg-secondary hover:bg-secondary/80 cursor-pointer text-white"
                        disabled={loading}
                        onClick={() => handleReview("Accepted")}
                      >
                        {loading ? t("project.acceptProces") : t("article.accept")}
                      </Button>
                      <Button
                        className="bg-red-600 hover:bg-red-600/80 cursor-pointer text-white"
                        disabled={loading}
                        onClick={() => handleReview("Rejected")}
                      >
                        {loading ? t("project.acceptProces") : t("article.reject")}
                      </Button>
                    </div>
                  </div>
                
              )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 md:p-8 border-b border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center">
                <FileText className="h-10 w-10 text-orange-500 mr-4" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    {documentData && documentData.title}
                  </h1>
                  <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                    {documentData && documentData.type}
                  </span>
                </div>
              </div>
              <div>
                 {!user && (
                <Lock className="h-6 w-6 text-gray-400" />
              )}
              </div>
             

            </div>
            

            <p className="text-gray-600 text-lg mb-6">
              {documentData && documentData.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
               {user && (
                    <Link
                      href={`/documents/national/edit/${documentData.id}`}
                      className=" flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                          <Edit2Icon className="w-4 h-4"/>{t('actor.edit')}
                      </Link>
                      )} 
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {documentData && documentData.pages}
                </div>
                <div className="text-sm text-gray-600">{t('admin.document.pages')}</div>
              </div>
              {/* <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {documentData && documentData.size}
                </div>
                <div className="text-sm text-gray-600">File Size</div>
              </div> */}
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {documentData && documentData.language}
                </div>
                <div className="text-sm text-gray-600">{t('admin.document.language')}</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="h-4 w-4 mr-2" />
                {t('admin.articles.publishedOn')} {" "}
                {
                  
                  formatDate(documentData && documentData.dateOfCreation)
                }
                {documentData && documentData.author && (
                  <span className="ml-4">
                    {t('admin.articles.by')} {documentData && documentData.author}
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {!user ? (
                  <div>
                    <button
                      disabled
                      className="flex items-center px-4 text-sm py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {t('admin.document.download')}
                    </button>
                    <p className="text-xs text-red-600">
                     {t('admin.document.loginDesc')}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={() => forceDownload(documentData && documentData.documentUrl, documentData && documentData.title)}
                    className="flex items-center px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                  >
                    {/* {isDownloading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Downloading...
                      </>
                    ) : ( */}
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        {t('admin.document.download')}
                      </>
                    {/* )} */}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {t('admin.document.preview')}
            </h2>
             <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: documentData && documentData.contentPreview,
                  }}
                />
            

            {!user && (
              <div className="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-orange-500 mr-2" />
                  <p className="text-orange-700 font-medium">
                    {t('admin.document.viewDocumentAcess')}
                  </p>
                </div>
                <p className="text-orange-600 text-sm mt-2">
                  {t('admin.document.please')} {" "}
                  <Link
                    href="/auth/signin"
                    className="underline hover:no-underline"
                  >
                    {t('admin.document.signin')}
                  </Link>{" "}
                  {t('admin.document.toDownload')}
                </p>
              </div>
            )}

            {
              user && user?.role === 'admin' && (
                <DeleteDocumentButton documentId={documentData.id} />
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;

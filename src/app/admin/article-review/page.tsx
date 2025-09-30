"use client";

import { useEffect, useState,  } from "react";


import FullPageLoader from "@/components/layout/FullPageLoader";

import Link from "next/link";
import {
  Calendar,
  DollarSign,
  Edit2Icon,
  ExternalLink,
  FileText,
  MapPin,
  User,
  Users,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";
import { Badge } from "@/components/ui/badge";
import { fetchReviewArticles } from "@/firebase/services/adminService";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";




const ArticlesUnderReview = () => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const navigate = useRouter();

  const { t } = useTranslation();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const pending = await fetchReviewArticles();
        setArticles(pending as any);
        console.log("pendingArticles", pending);
      } catch (err) {
        console.error(err);
        console.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);
  const getTypeIcon = (type: 'text' | 'pdf') => {
    return type === 'pdf' ? '📄' : '📝';
  };

  return (
    <div className="min-h-screen ">
      {loading ? (
        <div className="min-h-screen">
          <FullPageLoader />
        </div>
      ) : (
        <>
          <h1 className="font-bold text-3xl mb-10">{t("admin.articles.underReview")}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles && articles.map((article:any) => (
          <Card key={article.id} className="hover:shadow-medium transition-smooth">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span className="text-lg">{getTypeIcon(article.type)}</span>
                </div>
                 <Link
                      href={`/admin/articles/edit/${article.id}`}
                      className=" flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                          <Edit2Icon className="w-4 h-4"/>{t('admin.articles.edit')}
                      </Link>
              </div>
              <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {article.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>{article.source}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <span>{t('admin.articles.source')}: {article.source}</span>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate.push(`/admin/articles/${article.id}`)}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('admin.articles.readArticle')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


          <div className="flex items-center justify-center">
            {articles?.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {t('admin.articles.noUnderReview')}
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ArticlesUnderReview
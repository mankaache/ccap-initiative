'use client';
import React, { useEffect, useState } from "react";
import { Calendar, ArrowRight, Edit2Icon } from "lucide-react";
import Link from "next/link";
import NewsHero from "./News-hero";
import intlImage from "@/assets/intl-news.jpg";
import national from "@/assets/national-news.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { useAuth } from "@/firebase/useAuth";
import { Article } from "@/types";
import { fetchAcceptedArticles, fetchAllArticles } from "@/firebase/services/adminService";
import { toast } from "react-toastify";
import FullPageLoader from "../layout/FullPageLoader";
import nationalnewimage from '@/assets/national-news.jpg'
import { useTranslation } from "@/hooks/useTranslation";

const News = () => {
  const { t } = useTranslation();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const allArticles = await fetchAcceptedArticles();
        setArticles(allArticles as Article[]);
        console.log('allArticles', allArticles);
      } catch (err) {
        console.error(err);
        console.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const { user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen">

        <FullPageLoader />
      </div>
    );
  }


  if (articles?.length === 0) {
    return (
      <>
        <NewsHero
          image={national}
          title={`${t('admin.news.title')}`}
          desc={t('admin.news.desc')}
        />
        {
          user && (
            <div className="flex justify-end pr-16 mt-8">
              <Link href={'/create-article'} className="px-4 py-2 rounded-lg text-white font-semibold cursor-pointer bg-gradient-to-l from-primary to-secondary">{t('admin.article.create')}</Link>
            </div>
          )
        }

        <div className="text-center h-[80vh] flex items-center justify-center text-gray-500">
          {t('actor.newsNone')}
        </div>
      </>
    );
  }

  return (
    <>
      <NewsHero
        image={national}
        title={`${t('actor.newstitle')}`}
        desc={t('admin.news.desc')}
      />
      <div>
        {
          user && (
            <div className="flex justify-end pr-16 mt-8">
              <Link href={'/create-article'} className="px-4 py-2 rounded-lg text-white font-semibold cursor-pointer bg-gradient-to-l from-primary to-secondary">{t('admin.article.create')}</Link>
            </div>
          )
        }

      </div>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {articles.map((article: any) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full h-48 ">
                  <Image
                    src={article.imageUrl ?? nationalnewimage}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
                    fill
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(article.date).toLocaleDateString()}

                    </div>
                    {user && (user.uid === article.authorId) && (
                      <Link
                        href={`/news/national/edit/${article.id}`}
                        className=" flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium">
                        <Edit2Icon className="w-4 h-4" />{t('actor.edit')}
                      </Link>
                    )}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  {article.type === "text" ? (
                    <Link
                      href={`/news/national/${article.id}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      {t('actor.readMore')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  ) : article.type === "pdf" ? (
                    <Link
                      href={`/news/national/${article.id}/`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      {t('actor.readMore')}
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  ) : null}
                </div>
                <div className="mt-3 py-3 px-8 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Source: {article.source}
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default News;

"use client";

import React from "react";
import { Calendar, ArrowRight, Download } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import NewsHero from "./News-hero";
import intlImage from "@/assets/intl-news.jpg";
import national from "@/assets/national-news.jpg";
import Image, { StaticImageData } from "next/image";
import image from "@/assets/vegetation.jpg";
import { Button } from "../ui/button";

interface InewType {
  id: string | number;
  type: "text" | "pdf";
  content?: string | null;
  document: string | null;
  title: string;
  date: string;
  image: StaticImageData;
  category: string;
  source: string;
  description:string;
}

const mockNews: Record<string, InewType[]> = {
  international: [],
  regional: [],
  national: [
    {
      id: '1',
      type: "pdf",
      document: "/art1.pdf",
      description:"Ce texte juridique fondamental au Cameroun est celui qui fixe les règles générales pour la protection de l'environnement et la gestion durable de ses ressources, et est un patrimoine commun national.",
      title:
        "LOI N°96/12 DU 5 août 1996 PORTANT LOI-CADRE RELATIVE À LA GESTION DE L’ENVIRONNEMENT",
      content:null,
      date: "2012-03-14",
      image: image,
      category: "National",
      source: "MINEDEP",
    },
    {
      id: '2',
      source: "L’ONACC ",
      type: "text",
      document: null,
      title: "Cadre institutionnel sur le changement climatique au Cameroun",
      description:
        "L’ONACC crée le 10 déc. 2009, collecter, traiter et diffuser l’information sur l’évolution du Climat ",
      date: "2024-03-11",
      image: image,
      category: "National",
    },
  ],
};

const News = () => {
  const { category } = useParams<{ category: string }>();
  const newsItems = mockNews[category as keyof typeof mockNews] || [];

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case "international":
        return "International News";
      case "regional":
        return "Regional News";
      case "national":
        return "National News";
      default:
        return "News";
    }
  };

  return (
    <>
      <NewsHero
        image={category === "national" ? national : intlImage}
        title={getCategoryTitle(category || "")}
        desc="Stay updated with the latest climate change news and developments"
      />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {newsItems.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full h-48 ">
                  <Image
                    src={article.image}
                    fill
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(article.date).toLocaleDateString()}
                    <span className="ml-4 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                      {article.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  {article.type === "text"  ? (
                    <Link
                      href={`/news/${category}/${article.id}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  ) : article.type === "pdf" ? (
                    <Link
                      href={`/news/${category}/${article.id}/`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                      
                    >
                      Read more
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

          {newsItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No news articles available in this category.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default News;

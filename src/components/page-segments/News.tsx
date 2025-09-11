import React from "react";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import NewsHero from "./News-hero";
import intlImage from "@/assets/intl-news.jpg";
import national from "@/assets/national-news.jpg";
import Image from "next/image";

const News = ({
  newsItems,
  category,
}: {
  newsItems: any[];
  category: string;
}) => {
  if (!newsItems.length) {
    return (
      <div className="text-center h-[80vh] flex items-center justify-center text-gray-500">
        No news found
      </div>
    );
  }
  //  newsItems = mockNews[category as keyof typeof mockNews] || [];

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
            {newsItems.map((article: any) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="relative w-full h-48 ">
                  <Image
                    src={article.image}
                      placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
              
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
                  {article.type === "text" ? (
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
                  ) : category === "international" ? (
                    <Link
                      href={`/news/${category}/${article.id}`}
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

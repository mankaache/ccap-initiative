import React from "react";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShareModal } from "../ShareModal";
import image from "@/assets/vegetation.jpg";
import Image from "next/image";
import { getClimateNews } from "./GetClimateNews";
import { InewType } from "@/data/mockNews";
const NewsDetail = async ({
  article,
  category,
}: {
  article: InewType;
  category: string;
}) => {
  console.log("article details", article);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The requested article could not be found.
          </p>
          <Link href="/news/national">
            <Button>Back to national news</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/5 py-12">
      <div
        className={` ${
          article.type === "pdf" ? "max-w-6xl" : "max-w-4xl"
        }  mx-auto px-4 sm:px-6 lg:px-8`}
      >
        <Link
          href={`/news/${category}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {category} news
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative w-full h-64 md:h-80">
            <Image
              src={article && article.image}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII="
              fill
              alt={article && article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {formatDate(article && article.date)}
                <span className="ml-4 px-2 py-1 capitalize bg-orange-100 text-orange-700 rounded-full text-xs">
                  {article && article.category}
                </span>
              </div>
              <ShareModal
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={article && article.title}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <p className="text-gray-600 mb-6">By {article && article.author}</p>
            <p className="text-gray-600 mb-6">
              {article && article.description}
            </p>

            {article.type === "text" && article.content && (
              <>
                <div
                  className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: article && article.content,
                  }}
                />

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 mt-2">
                      <Button
                        onClick={() =>
                          window.open(
                            `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                              window.location.href
                            )}&text=${encodeURIComponent(
                              article && article.title
                            )}`,
                            "_blank"
                          )
                        }
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                      >
                        Twitter
                      </Button>
                      <Button
                        onClick={() =>
                          window.open(
                            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                              window.location.href
                            )}`,
                            "_blank"
                          )
                        }
                        className="px-4 py-2 bg-blue-800 text-white text-sm rounded hover:bg-blue-900 transition-colors"
                      >
                        Facebook
                      </Button>
                      <Button
                        onClick={() =>
                          window.open(
                            `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                              window.location.href
                            )}&title=${encodeURIComponent(
                              article && article.title
                            )}`,
                            "_blank"
                          )
                        }
                        className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                      >
                        LinkedIn
                      </Button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Published on</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(article && article.date)}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {article.type === "pdf" && article.document && (
              <div className="w-full h-[100vh]">
                <iframe
                  src={`/api/pdf/${article.document}`}
                  className="w-full h-full border rounded-lg"
                  title={article.title}
                />
              </div>
            )}
            
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;

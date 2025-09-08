"use client";

import React from "react";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShareModal } from "../ShareModal";
import image from "@/assets/vegetation.jpg";
import Image from "next/image";
const NewsDetail = () => {
  const param = useParams();
  const { category, id } = param;

  const mockNews = {
    international: [],
    regional: [],
    national: [
      {
        id: "1",
        title:
          "LOI N°96/12 DU 5 août 1996 PORTANT LOI-CADRE RELATIVE À LA GESTION DE L’ENVIRONNEMENT",
        description:
          "Ce texte juridique fondamental au Cameroun est celui qui fixe les règles générales pour la protection de l'environnement et la gestion durable de ses ressources, et est un patrimoine commun national. ",
        date: "1996-08-5",
        image: image,
        category: "national",
        type: "pdf",
        document: "/art1.pdf",
        content: "",
        author: "Climate News Team",
        source: "MINEDEP",
      },
      {
        id: "2",
        type: "text",
        document: null,
        title: "Cadre institutionnel sur le changement climatique au Cameroun",
        description:
          "L’ONACC crée le 10 déc. 2009, collecter, traiter et diffuser l’information sur l’évolution du Climat ",
        date: "2009-03-11",
        image: image,
        category: "national",
        content: `
      <p>The recent COP29 Climate Summit has marked a significant milestone in international climate cooperation, with world leaders announcing groundbreaking new funding mechanisms designed to accelerate climate action in developing nations.</p>
      
      <p>The summit, held in Dubai, brought together representatives from over 190 countries to discuss innovative approaches to climate finance. Key outcomes include:</p>
      
      <ul>
        <li>A new $100 billion climate adaptation fund specifically for African nations</li>
        <li>Enhanced carbon credit mechanisms to support renewable energy projects</li>
        <li>Streamlined processes for accessing climate finance for small island developing states</li>
        <li>Public-private partnership frameworks for large-scale climate infrastructure</li>
      </ul>
      
      <p>For countries like Cameroon, these new mechanisms represent unprecedented opportunities to scale up climate action initiatives. The enhanced funding pathways will particularly benefit forest conservation projects, renewable energy infrastructure, and climate-resilient agriculture programs.</p>
      
      <p>Dr. Sarah Johnson, lead negotiator for the African Union, emphasized the importance of these developments: "These new funding mechanisms address long-standing barriers that have prevented developing nations from accessing the resources needed for effective climate action."</p>
      
      <p>The implementation of these funding mechanisms is expected to begin in early 2024, with the first disbursements anticipated by mid-year. Countries will need to submit detailed project proposals through the enhanced application processes established by the summit.</p>
    `,
        author: "Climate News Team",
        source: "L’ONACC ",
      },
    ],
  };

  const categoryDocuments =
    mockNews[param.category as keyof typeof mockNews] || [];
  const article = categoryDocuments.find(
    (doc) => doc.id.toString() === param.id
  );

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
      <div className={` ${article.type === "pdf" ? "max-w-6xl" : "max-w-4xl"}  mx-auto px-4 sm:px-6 lg:px-8`}>
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

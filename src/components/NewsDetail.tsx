"use client";

import React from "react";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ShareModal } from "./ShareModal";
import { Button } from "./ui/button";

const NewsDetail = () => {
  const param = useParams();
  const { category, id } = param;

  // Mock article data - in a real app, this would be fetched based on the ID
  const article = {
    title: "COP29 Climate Summit Announces New Funding Mechanisms",
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
    date: "2024-03-15",
    image: "https://images.pexels.com/photos/2570171/pexels-photo-2570171.jpeg",
    category: "International",
    author: "Climate News Team",
  };

  return (
    <div className="min-h-screen bg-secondary/5 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href={`/news/${category}`}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {category} news
        </Link>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />

          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {new Date(article.date).toLocaleDateString()}
                <span className="ml-4 px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs">
                  {article.category}
                </span>
              </div>
              <ShareModal
                url={typeof window !== "undefined" ? window.location.href : ""}
                title={article.title}
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {article.title}
            </h1>

            <p className="text-gray-600 mb-6">By {article.author}</p>

            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 mt-2">
                  <Button
                    onClick={() =>
                      window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                          window.location.href
                        )}&text=${encodeURIComponent(article.title)}`,
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
                        )}&title=${encodeURIComponent(article.title)}`,
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
                    {new Date(article.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;

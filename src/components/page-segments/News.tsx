'use client';

import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import NewsHero from './News-hero';
import intlImage from "@/assets/intl-news.jpg";
import national from '@/assets/national-news.jpg'
const mockNews = {
  international: [
    {
      id: '1',
      title: 'COP29 Climate Summit Announces New Funding Mechanisms',
      excerpt: 'International leaders agree on innovative climate finance solutions for developing nations.',
      date: '2024-03-15',
      image: 'https://images.pexels.com/photos/2570171/pexels-photo-2570171.jpeg',
      category: 'International',
    },
    {
      id: '2',
      title: 'Global Carbon Market Reaches New Milestone',
      excerpt: 'Carbon trading mechanisms show promise for accelerating climate action worldwide.',
      date: '2024-03-10',
      image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
      category: 'International',
    },
  ],
  regional: [
    {
      id: '3',
      title: 'Central African Forest Initiative Expands',
      excerpt: 'Regional cooperation strengthens forest conservation efforts across Central Africa.',
      date: '2024-03-12',
      image: 'https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg',
      category: 'Regional',
    },
    {
      id: '4',
      title: 'CEMAC Countries Unite for Climate Action',
      excerpt: 'Economic union members commit to coordinated climate policies.',
      date: '2024-03-08',
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg',
      category: 'Regional',
    },
  ],
  national: [
    {
      id: '5',
      title: 'Cameroon Launches National Adaptation Plan',
      excerpt: 'Government unveils comprehensive strategy to address climate change impacts.',
      date: '2024-03-14',
      image: 'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg',
      category: 'National',
    },
    {
      id: '6',
      title: 'New Renewable Energy Projects in Northern Regions',
      excerpt: 'Solar and wind installations bring clean energy to rural communities.',
      date: '2024-03-11',
      image: 'https://images.pexels.com/photos/2800832/pexels-photo-2800832.jpeg',
      category: 'National',
    },
  ],
};

const News = () => {
  const { category } = useParams<{ category: string }>();
  const newsItems = mockNews[category as keyof typeof mockNews] || [];

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'international':
        return 'International News';
      case 'regional':
        return 'Regional News';
      case 'national':
        return 'National News';
      default:
        return 'News';
    }
  };

  return (
    <>
    <NewsHero image={ category === 'national' ? national : intlImage} title={getCategoryTitle(category || '')} desc='Stay updated with the latest climate change news and developments'/>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {}
          </h1>
          <p className="text-xl text-gray-600">
            
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newsItems.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
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
                  {article.excerpt}
                </p>
                <Link
                  href={`/news/${category}/${article.id}`}
                  className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                >
                  Read more
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="mt-3 py-3 px-8 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Source: Union Bank
                    </span>
                  </div>
            </article>
          ))}
        </div>

        {newsItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No news articles available in this category.</p>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default News;
import { getClimateNews } from '@/components/page-segments/GetClimateNews';
import News from '@/components/page-segments/News'
import { mockNews } from '@/data/mockNews';
import React from 'react'

const NewsPage = async ({ params }: any) => {
  const { category } = params;

   let newsItems = [];
  if (category === "international") {
    newsItems = await getClimateNews();
  } else {
    newsItems = (mockNews[category as keyof typeof mockNews] || []).filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  return (
   <News newsItems={newsItems} category={category} />
  )
}

export default NewsPage

import { getClimateNews } from '@/components/page-segments/GetClimateNews';
import NewsDetail from '@/components/page-segments/NewsDetail'
import { mockNewsDetails } from '@/data/mockNewsDetails';
import React from 'react'


const NewsDetailsPage = async({ params }: any ) => {
   const { category, id } = params;

  const categoryDocuments =
    mockNewsDetails[params.category as keyof typeof mockNewsDetails] || [];

  // const article = categoryDocuments.find(
  //   (doc) => doc.id.toString() === param.id
  // );

  let article: any;
  if (category === "international") {
    const articles = await getClimateNews();
    article = articles.find((item: any) => String(item.id) === id);
  } else {
    article = categoryDocuments.find(item => item.category.toLowerCase() === category.toLowerCase() && String(item.id) === id);
  }


  return (
    <div>
        <NewsDetail article={article} category={category}/>
    </div>
  )
}

export default NewsDetailsPage
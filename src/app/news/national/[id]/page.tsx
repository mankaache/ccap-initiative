
import { getClimateNews } from '@/components/page-segments/GetClimateNews';
import NewsDetail from '@/components/page-segments/NewsDetail'
import { mockNewsDetails } from '@/data/mockNewsDetails';
import React from 'react'


const NewsDetailsPage = ( ) => {
 

  return (
    <div>
        <NewsDetail article={mockNewsDetails} />
    </div>
  )
}

export default NewsDetailsPage
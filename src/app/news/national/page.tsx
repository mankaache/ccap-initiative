'use client'

import { getClimateNews } from '@/components/page-segments/GetClimateNews';
import News from '@/components/page-segments/News'
import { mockNews } from '@/data/mockNews';
import React from 'react'

const NewsPage =  () => {
  

   

  return (
   <News newsItems={mockNews} />
  )
}

export default NewsPage
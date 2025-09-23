'use client'

import CreateArticle from '@/components/page-segments/admin/articles/CreateArticle'
import { useParams } from 'next/navigation';
import React from 'react'

const EditPage = () => {
    const {id} = useParams();
  return (
    <div>
        <CreateArticle articleId={id as string} />
    </div>
  )
}

export default EditPage
'use client'
import Create from '@/app/create-article/page'
import CreateArticle from '@/components/page-segments/admin/articles/CreateArticle'
import { useParams } from 'next/navigation'
import React from 'react'

const EditArticlePage = () => {
const {id} = useParams();
  return (
    <div>
      <CreateArticle articleId={id as string} />
    </div>
  )
}

export default EditArticlePage
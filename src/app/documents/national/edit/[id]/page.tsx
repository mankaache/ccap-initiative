'use client'

import CreateDocument from '@/components/page-segments/admin/documents/CreateDocument'
import { useParams } from 'next/navigation'
import React from 'react'

const EditDocumentsActor = () => {
    const {id} = useParams()
  return (
    <div className='flex w-full justify-center'>
         <CreateDocument docuId={id as string} />
    </div>
  )
}

export default EditDocumentsActor
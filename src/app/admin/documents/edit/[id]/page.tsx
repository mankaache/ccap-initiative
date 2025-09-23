'use client'

import CreateDocument from '@/components/page-segments/admin/documents/CreateDocument'
import { useParams } from 'next/navigation'
import React from 'react'

const EditDocumentPage = () => {
    const {id} = useParams();
  return (
    <div>
        <CreateDocument docuId={id as string} />
    </div>
  )
}

export default EditDocumentPage
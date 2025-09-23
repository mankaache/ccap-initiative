'use client'

import CreateProject from '@/components/page-segments/auth/CreateProject';
import { useParams } from 'next/navigation';
import React from 'react'

const EditAdminProject = () => {

 const {id} = useParams();
  return (
    <div>
        <CreateProject projectId={id as string} />
    </div>
  )
}

export default EditAdminProject
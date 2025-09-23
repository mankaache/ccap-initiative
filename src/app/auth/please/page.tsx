'use client'

import { useTranslation } from "@/hooks/useTranslation"

const Please = () => {
  const {t} = useTranslation()
  return (
    <div className='h-[70vh] text-center text-2xl flex justify-center items-center max-w-lg mx-auto w-full'>
       {t('auth.please')}
    </div>
  )
}

export default Please
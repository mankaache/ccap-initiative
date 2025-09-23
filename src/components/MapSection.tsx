'use client'
import MapComp from '@/app/map/page'
import { useTranslation } from '@/hooks/useTranslation'
import React from 'react'

const MapSection = () => {
  const {t} = useTranslation()
  return (
    
      <div className="max-w-[1350px]  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {t('map.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('map.description')}
          </p>
        </div>
      <MapComp/>
    </div>
  )
}

export default MapSection
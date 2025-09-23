
'use client'
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowLeft, HelpCircle, Home, Search } from 'lucide-react';
import React from 'react'

const NotFound = () => {
  const {t} = useTranslation();
   return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        {/* Main 404 Content */}
        <div className="text-center mb-12">
          {/* Large 404 Number with Animation */}
          <div className="relative mb-8">
            <h1 
              className="text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-300 select-none"
              style={{
                textShadow: '0 0 40px rgba(255, 165, 0, 0.1)'
              }}
            >
              404
            </h1>
            
            {/* Floating Orange Elements */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: '#ffa500', animationDelay: '0s' }}></div>
            </div>
            <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#ffa500', animationDelay: '0.5s' }}></div>
            </div>
            <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: '#ffa500', animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              {t('notFound.title')}
            </h2>
            <p className="text-lg text-slate-600 max-w-md mx-auto leading-relaxed">
              {t('notFound.desc')}
               </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button 
              className="group flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              style={{ backgroundColor: '#ffa500' }}
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
              {t('notFound.back')}
            </button>
            
            <button 
              className="group flex items-center gap-3 px-6 py-3 bg-white border-2 rounded-full font-semibold text-slate-700 hover:bg-slate-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              style={{ borderColor: '#ffa500' }}
              onClick={() => window.location.href = '/'}
            >
              <Home size={20} className="group-hover:scale-110 transition-transform duration-300" />
              {t('notFound.home')}
            </button>
          </div>
        </div>

        {/* Additional Help Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4" style={{ borderTopColor: '#ffa500' }}>
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-full mb-4" style={{ backgroundColor: 'rgba(255, 165, 0, 0.1)' }}>
              <HelpCircle size={32} style={{ color: '#ffa500' }} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">
              {t('notFound.cando')}
            </h3>
          </div>      
        </div>

        {/* Decorative Elements */}
        <div className="fixed top-10 left-10 w-20 h-20 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#ffa500' }}></div>
        <div className="fixed bottom-10 right-10 w-16 h-16 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#ffa500', animationDelay: '1s' }}></div>
        <div className="fixed top-1/2 right-20 w-8 h-8 rounded-full opacity-20 animate-pulse" style={{ backgroundColor: '#ffa500', animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}


export default NotFound
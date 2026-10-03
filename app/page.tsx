'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobPortalPage from './components/JobPortal';
import WorkshopPage from './components/Workshop';
import MentalHealthPage from './components/MentalHealth';
import SpeechToTextPage from './components/SpeechToText';
import { features } from './components/Features';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };

  // Tampilan Login dengan Logo Asli & Bahasa Inggris
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#EEF2FF] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Aksen Latar Belakang */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#A5B4FC]/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D8B4FE]/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl border border-[#C7D2FE]/50 relative z-10">
          <div className="text-center mb-8 flex flex-col items-center">
            {/* Logo Resmi LESTARI */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-[#6366F1] to-[#9333EA] rounded-xl flex items-center justify-center shadow-md">
                {/* SVG Ikon Telinga Dicoret */}
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 8.5a6.5 6.5 0 0 1 11.53-3.08" />
                  <path d="M18.42 12.5A6.5 6.5 0 0 1 10.5 19.5h-1a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h1a2 2 0 0 0 2-2v-.5" />
                  <line x1="2" y1="2" x2="22" y2="22" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-[#6366F1] to-[#9333EA] bg-clip-text text-transparent">
                LESTARI
              </span>
            </div>
            
            <h1 className="text-2xl font-extrabold text-[#374151]">Welcome!</h1>
            <p className="text-sm text-[#4B5563] mt-1">Sign in to explore our inclusive portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm bg-[#F3F4F6] text-[#374151] focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 focus:outline-none transition"
                placeholder="name@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#374151] mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-[#D1D5DB] px-4 py-3 text-sm bg-[#F3F4F6] text-[#374151] focus:bg-white focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] py-3.5 text-white font-bold shadow-lg shadow-[#4F46E5]/25 transition transform active:scale-[0.98]"
            >
              Sign In to Portal
            </button>
          </form>
        </div>
      </main>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'job-portal':
        return <JobPortalPage />;
      case 'workshop':
        return <WorkshopPage />;
      case 'mental-health':
        return <MentalHealthPage />;
      case 'speech-to-text':
        return <SpeechToTextPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} features={features} />
      
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <button 
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            setIsAuthenticated(false);
          }}
          className="text-xs bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5] px-3 py-1.5 rounded-lg font-medium hover:bg-[#FCA5A5]/30 transition shadow-sm"
        >
          Logout Account
        </button>
      </div>

      {renderPage()}
    </div>
  );
}
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

  // Tampilan Login dengan Nuansa Warna-Warni / Colorful yang Ceria
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-tr from-pink-50 via-purple-50 to-indigo-100 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Aksen Bola Warna-Warni di Background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/50 relative z-10">
          <div className="text-center mb-8">
            {/* Badge Warna-Warni */}
            <span className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
              Lestari
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-4">Selamat Datang!</h1>
            <p className="text-sm text-gray-600 mt-1">Masuk untuk menjelajahi portal inklusif kami</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition"
                placeholder="nama@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-gray-50/50 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 py-3.5 text-white font-bold shadow-lg shadow-purple-500/30 hover:opacity-95 transition transform active:scale-[0.98]"
            >
              Masuk ke Portal
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} features={features} />
      
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-end">
        <button 
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            setIsAuthenticated(false);
          }}
          className="text-xs bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg font-medium hover:bg-red-200 transition shadow-sm"
        >
          Logout Akun
        </button>
      </div>

      {renderPage()}
    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobPortalPage from './components/JobPortal';
import WorkshopPage from './components/Workshop';
import MentalHealthPage from './components/MentalHealth';
import SpeechToTextPage from './components/SpeechToText';
import { features } from './components/Features';
import { ArrowRight, X, Lock, Mail } from 'lucide-react';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalType, setModalType] = useState<'none' | 'forgot' | 'contact'>('none');

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

  // Tampilan Login: Centered Minimalist (Tanpa Logo) dengan Color Palette Lestari
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F3F4F6] to-[#EDE9FE] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Dekorasi Background Cahaya Lembut */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#A5B4FC]/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#D8B4FE]/30 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Card Login Tengah */}
        <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl border border-white/80 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl relative z-10">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">LESTARI</h1>
            <p className="text-xs sm:text-sm text-[#4B5563] mt-1.5">Sign in to explore the inclusive portal</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#E5E7EB] pl-11 pr-4 py-3.5 text-sm bg-[#F9FAFB] text-[#111827] focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 focus:outline-none transition font-medium placeholder-[#9CA3AF]"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151]">Password</label>
                <button 
                  type="button"
                  onClick={() => setModalType('forgot')}
                  className="text-xs font-semibold text-[#4F46E5] hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-[#E5E7EB] pl-11 pr-4 py-3.5 text-sm bg-[#F9FAFB] text-[#111827] focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 focus:outline-none transition font-medium placeholder-[#9CA3AF]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-2 rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] py-4 text-white font-bold text-sm shadow-lg shadow-[#4F46E5]/30 transition transform active:scale-[0.98] flex items-center justify-center space-x-2 group cursor-pointer"
            >
              <span>Sign In to Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-[#6B7280]">
            Don't have an account yet?{' '}
            <button 
              type="button"
              onClick={() => setModalType('contact')}
              className="font-semibold text-[#4F46E5] hover:underline bg-transparent border-none cursor-pointer p-0"
            >
              Contact Administrator
            </button>
          </div>

        </div>

        {/* Modal Pop-up */}
        {modalType !== 'none' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-[#111827] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setModalType('none')}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              {modalType === 'forgot' ? (
                <div>
                  <div className="w-12 h-12 bg-indigo-100 text-[#4F46E5] rounded-2xl flex items-center justify-center mb-4 font-bold text-xl">
                    🔑
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reset Password</h3>
                  <p className="text-sm text-gray-600 mb-6">Please contact the system administrator or IT support team to reset your password and recover your Lestari account access.</p>
                  <button onClick={() => setModalType('none')} className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-semibold shadow-md hover:bg-[#4338CA] transition cursor-pointer">Got It</button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 bg-purple-100 text-[#7C3AED] rounded-2xl flex items-center justify-center mb-4 font-bold text-xl">
                    💬
                  </div>
                  <h3 className="text-xl font-bold mb-2">Account Registration</h3>
                  <p className="text-sm text-gray-600 mb-6">Registration for new accounts is currently managed by the Lestari platform administrator. Please reach out via email at <span className="font-semibold text-[#4F46E5]">admin@lestari-app.com</span> to request access.</p>
                  <button onClick={() => setModalType('none')} className="w-full py-3 bg-[#7C3AED] text-white rounded-xl font-semibold shadow-md hover:bg-[#6D28D9] transition cursor-pointer">Close</button>
                </div>
              )}
            </div>
          </div>
        )}
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
          className="text-xs bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5] px-3 py-1.5 rounded-lg font-medium cursor-pointer shadow-sm hover:bg-[#FCA5A5]/30 transition"
        >
          Logout Account
        </button>
      </div>

      {renderPage()}
    </div>
  );
}
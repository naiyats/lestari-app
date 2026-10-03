'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobPortalPage from './components/JobPortal';
import WorkshopPage from './components/Workshop';
import MentalHealthPage from './components/MentalHealth';
import SpeechToTextPage from './components/SpeechToText';
import { features } from './components/Features';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Users, X } from 'lucide-react';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk modal interaktif
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

  // Tampilan Login Modern Split-Screen (Responsive Margin/Padding)
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F3F4F6] to-[#EDE9FE] flex items-center justify-center p-3 sm:p-4 lg:p-8 relative overflow-hidden">
        {/* Dekorasi Background Blur Modern */}
        <div className="absolute top-0 left-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#A5B4FC]/30 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-[#D8B4FE]/30 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Container Utama Login */}
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2rem] lg:rounded-[2.5rem] shadow-2xl border border-white/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative z-10">
          
          {/* Sisi Kiri: Branding & Informasi Inklusif */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#4F46E5] to-[#9333EA] p-6 sm:p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 lg:mb-6 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Inclusive Platform</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-2 lg:mb-4">LESTARI</h2>
              <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed">
                Empowering the Deaf community through accessible job portals, interactive workshops, and mental health support.
              </p>
            </div>

            <div className="space-y-3 my-6 lg:my-8">
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-indigo-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
                </div>
                <span>Secure & Reliable Access</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-indigo-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <HeartHandshake className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-300" />
                </div>
                <span>Inclusive Community Support</span>
              </div>
              <div className="flex items-center space-x-3 text-xs sm:text-sm text-indigo-100">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-300" />
                </div>
                <span>Equal Opportunities for Everyone</span>
              </div>
            </div>

            <div className="text-[11px] text-indigo-200/80">
              © 2026 Lestari Portal. All rights reserved.
            </div>
          </div>

          {/* Sisi Kanan: Form Login (Padding Responsif: p-5 di HP, p-8/12 di Desktop) */}
          <div className="lg:col-span-7 p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#111827]">Welcome! 👋</h1>
              <p className="text-xs sm:text-sm text-[#4B5563] mt-1">Please enter your credentials to access your account.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 lg:space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#374151] mb-1.5">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl lg:rounded-2xl border border-[#E5E7EB] px-4 py-3 text-xs sm:text-sm bg-[#F9FAFB] text-[#111827] focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 focus:outline-none transition font-medium"
                  placeholder="name@email.com"
                />
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
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl lg:rounded-2xl border border-[#E5E7EB] px-4 py-3 text-xs sm:text-sm bg-[#F9FAFB] text-[#111827] focus:bg-white focus:border-[#4F46E5] focus:ring-4 focus:ring-[#4F46E5]/10 focus:outline-none transition font-medium"
                  placeholder="••••••••"
                />
              </div>

              <button 
                type="submit"
                className="w-full rounded-xl lg:rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] py-3.5 lg:py-4 text-white font-bold text-sm shadow-lg shadow-[#4F46E5]/30 transition transform active:scale-[0.98] flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Sign In to Explore</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="mt-6 lg:mt-8 text-center text-xs text-[#6B7280]">
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

        </div>

        {/* MODAL / POPUP INTERAKTIF */}
        {modalType !== 'none' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <button 
                onClick={() => setModalType('none')}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {modalType === 'forgot' ? (
                <div>
                  <div className="w-12 h-12 bg-indigo-100 text-[#4F46E5] rounded-2xl flex items-center justify-center mb-4 font-bold text-xl">
                    🔑
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Reset Password</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Please contact the system administrator or IT support team to reset your password and recover your Lestari account access.
                  </p>
                  <button 
                    onClick={() => setModalType('none')}
                    className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-semibold shadow-md hover:bg-[#4338CA] transition cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 bg-purple-100 text-[#7C3AED] rounded-2xl flex items-center justify-center mb-4 font-bold text-xl">
                    💬
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Account Registration</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    Registration for new accounts is currently managed by the Lestari platform administrator. Please reach out via email at <span className="font-semibold text-[#4F46E5]">admin@lestari-app.com</span> to request access.
                  </p>
                  <button 
                    onClick={() => setModalType('none')}
                    className="w-full py-3 bg-[#7C3AED] text-white rounded-xl font-semibold shadow-md hover:bg-[#6D28D9] transition cursor-pointer"
                  >
                    Close
                  </button>
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
          className="text-xs bg-[#FEE2E2] text-[#DC2626] border border-[#FCA5A5] px-3 py-1.5 rounded-lg font-medium hover:bg-[#FCA5A5]/30 transition shadow-sm cursor-pointer"
        >
          Logout Account
        </button>
      </div>

      {renderPage()}
    </div>
  );
}
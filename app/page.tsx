'use client';

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import JobPortalPage from './components/JobPortal';
import WorkshopPage from './components/Workshop';
import MentalHealthPage from './components/MentalHealth';
import SpeechToTextPage from './components/SpeechToText';
import { features } from './components/Features';
import { ArrowRight, X, Lock, Mail, EarOff, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 3 Kategori Role: 'jobseeker' | 'company' | 'admin'
  const [role, setRole] = useState<'jobseeker' | 'company' | 'admin'>('jobseeker');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalType, setModalType] = useState<'none' | 'forgot' | 'contact'>('none');

  // Cek status login saat halaman dibuka
  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const savedRole = localStorage.getItem('userRole');

    if (authStatus === 'true') {
      setIsAuthenticated(true);
      if (savedRole) {
        setRole(savedRole as 'jobseeker' | 'company' | 'admin');
      }
    }
  }, []);

  // Fungsi Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    setIsAuthenticated(true);
  };

  // Fungsi Logout
  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setCurrentPage('home');
    setEmail('');
    setPassword('');
    setRole('jobseeker');
  };

  // Tampilan Login
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#EEF2FF] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

        {/* Bulatan (Blob) Background Estetik Persis Homepage */}
        <div className="absolute top-5 left-5 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-purple-300/40 rounded-full blur-[90px] sm:blur-[110px] pointer-events-none"></div>
        <div className="absolute bottom-5 right-5 w-[350px] sm:w-[450px] h-[350px] sm:h-[450px] bg-pink-300/40 rounded-full blur-[90px] sm:blur-[110px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] bg-indigo-200/30 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Outer Container Glassmorphism */}
        <div className="w-full max-w-md lg:max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10 lg:bg-white/40 lg:backdrop-blur-2xl lg:border lg:border-white/60 lg:p-10 lg:rounded-[3rem] lg:shadow-2xl lg:shadow-indigo-500/10">
          
          {/* SISI KIRI: Branding (Desktop) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-between py-2 lg:pr-6 h-full min-h-[480px]">
            
            {/* Logo Persis Homepage */}
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md shadow-purple-500/20">
                <EarOff className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Lestari
              </span>
            </div>

            {/* Konten Teks */}
            <div className="my-auto py-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-semibold mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                100% Deaf-Friendly Platform
              </div>

              <h1 className="text-3xl xl:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
                Empowering the <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Deaf Community
                </span>
              </h1>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Platform inklusif komprehensif pertama yang dirancang khusus untuk komunitas Tuli. Temukan peluang kerja, belajar keahlian baru, dan akses layanan pendukung karir.
              </p>

              {/* Badge Fitur */}
              <div className="flex flex-wrap gap-2.5">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-white shadow-sm text-xs font-medium text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" /> Visual First
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-white shadow-sm text-xs font-medium text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-purple-600" /> BISINDO Ready
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/80 border border-white shadow-sm text-xs font-medium text-slate-700">
                  <Briefcase className="w-4 h-4 text-pink-600" /> Equal Opportunity
                </div>
              </div>
            </div>

            <div></div>
          </div>

          {/* SISI KANAN / UTAMA DI MOBILE: Card Login */}
          <div className="w-full lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-2xl border border-white/90 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-indigo-500/10">

              {/* Header Mobile: Logo di Kiri, Judul Login di Tengah */}
              <div className="mb-6">
                <div className="lg:hidden flex items-center justify-start space-x-2.5 mb-5">
                  <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/20">
                    <EarOff className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                    Lestari
                  </span>
                </div>
                
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Login
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {role === 'jobseeker' && 'Masuk untuk menjelajahi portal karir.'}
                    {role === 'company' && 'Masuk untuk mempublikasikan lowongan kerja.'}
                    {role === 'admin' && 'Masuk untuk meninjau & memoderasi loker perusahaan.'}
                  </p>
                </div>
              </div>

              {/* Role Selector Tabs (3 Kategori) */}
              <div className="grid grid-cols-3 bg-slate-100/80 p-1 rounded-2xl mb-6 text-[11px] sm:text-xs font-semibold border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => setRole('jobseeker')}
                  className={`py-2 px-1 text-center rounded-xl transition-all cursor-pointer truncate ${role === 'jobseeker' ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Pencari Kerja
                </button>
                <button
                  type="button"
                  onClick={() => setRole('company')}
                  className={`py-2 px-1 text-center rounded-xl transition-all cursor-pointer truncate ${role === 'company' ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Perusahaan
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`py-2 px-1 text-center rounded-xl transition-all cursor-pointer truncate ${role === 'admin' ? 'bg-white text-indigo-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Admin
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">

                {/* Email / Identifier */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    {role === 'company' ? 'Email or Phone' : 'Email Address'}
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-200/80 pl-11 pr-4 py-3.5 text-xs sm:text-sm bg-slate-50/50 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition font-medium placeholder-slate-400"
                      placeholder={role === 'company' ? 'name@company.com / 08xxxx' : 'name@email.com'}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setModalType('forgot')}
                      className="text-xs font-semibold text-indigo-600 hover:underline bg-transparent border-none cursor-pointer p-0"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-2xl border border-slate-200/80 pl-11 pr-4 py-3.5 text-xs sm:text-sm bg-slate-50/50 text-slate-900 focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition font-medium placeholder-slate-400"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full mt-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-4 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/25 transition transform active:scale-[0.98] flex items-center justify-center space-x-2 group cursor-pointer"
                >
                  <span>Sign In to Portal</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

              </form>

              {/* Footer Dynamic Text */}
              <div className="mt-6 text-center text-xs text-slate-500">
                {role === 'company' ? (
                  <>
                    Do not have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setModalType('contact')}
                      className="font-semibold text-indigo-600 hover:underline bg-transparent border-none cursor-pointer p-0"
                    >
                      Register your company
                    </button>
                  </>
                ) : role === 'admin' ? (
                  <span className="text-slate-400">Protected area. Authorized personnel only.</span>
                ) : (
                  <>
                    Don't have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setModalType('contact')}
                      className="font-semibold text-indigo-600 hover:underline bg-transparent border-none cursor-pointer p-0"
                    >
                      Contact Administrator
                    </button>
                  </>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Modal Bantuan */}
        {modalType !== 'none' && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
              <button
                onClick={() => setModalType('none')}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {modalType === 'forgot' ? (
                <div>
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 font-bold text-xl">
                    🔑
                  </div>
                  <h3 className="text-xl font-bold mb-2">Reset Password</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Please contact the system administrator or IT support team to reset your password and recover your Lestari account access.
                  </p>
                  <button
                    onClick={() => setModalType('none')}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4 font-bold text-xl">
                    💬
                  </div>
                  <h3 className="text-xl font-bold mb-2">Account Registration</h3>
                  <p className="text-sm text-slate-600 mb-6">
                    Registration for new accounts is currently managed by the Lestari platform administrator. Please reach out via email at{' '}
                    <span className="font-semibold text-indigo-600">admin@lestari-app.com</span> to request access.
                  </p>
                  <button
                    onClick={() => setModalType('none')}
                    className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold shadow-md hover:bg-purple-700 transition cursor-pointer"
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

  // Navigasi Halaman
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

  // Tampilan Utama Setelah Login
  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        features={features}
        onLogout={handleLogout}
      />
      {renderPage()}
    </div>
  );
}
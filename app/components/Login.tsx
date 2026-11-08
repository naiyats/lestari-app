'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function LoginPage({ onLoginSuccess }: LoginProps) {
  // 3 Kategori Role: 'jobseeker' | 'company' | 'admin'
  const [role, setRole] = useState<'jobseeker' | 'company' | 'admin'>('jobseeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Logika autentikasi sederhana (bisa dikembangkan sesuai role)
    if (email === "admin@disabilitas.com" && password === "123456") {
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', role);
      onLoginSuccess();
    } else {
      alert('Email atau password salah! (Gunakan admin@disabilitas.com / 123456)');
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-8 bg-slate-50/50">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-slate-100">
        
        {/* Header & Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white font-bold text-xl mb-3 shadow-md shadow-indigo-200">
            L
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">LESTARI</h2>
          <p className="text-xs text-slate-500 mt-1">
            {role === 'jobseeker' && 'Masuk untuk menjelajahi portal inklusif.'}
            {role === 'company' && 'Masuk untuk mengelola lowongan kerja.'}
            {role === 'admin' && 'Masuk untuk mengontrol sistem portal.'}
          </p>
        </div>

        {/* Role Selector Tabs (3 Kategori) */}
        <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-xl mb-6 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setRole('jobseeker')}
            className={`py-2 rounded-lg transition-all ${role === 'jobseeker' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Pencari Kerja
          </button>
          <button
            type="button"
            onClick={() => setRole('company')}
            className={`py-2 rounded-lg transition-all ${role === 'company' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Perusahaan
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`py-2 rounded-lg transition-all ${role === 'admin' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Admin
          </button>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1">
              {role === 'company' ? 'Email or Phone' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder={role === 'company' ? 'name@company.com / 08xxxx' : 'nama@email.com'}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600">Password</label>
              <a href="#forgot" className="text-[11px] font-medium text-indigo-600 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-10 py-2.5 text-xs border border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input 
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
              />
              Remember me
            </label>
          </div>

          <button 
            type="submit"
            className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 transition-all"
          >
            Sign In to Portal <ArrowRight size={16} />
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-xs text-slate-500">
          {role === 'company' ? (
            <p>Do not have an account yet? <a href="#register" className="text-indigo-600 font-semibold hover:underline">Register your company</a></p>
          ) : role === 'admin' ? (
            <p>Protected area. Authorized personnel only.</p>
          ) : (
            <p>Don't have an account yet? <a href="#register" className="text-indigo-600 font-semibold hover:underline">Sign up as job seeker</a></p>
          )}
        </div>
      </div>
    </div>
  );
}
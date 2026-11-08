'use client';

import React from 'react';
import { ArrowLeft, Menu, X, EarOff } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  features: Array<{
    id: string;
    title: string;
    page: string;
  }>;
  onLogout: () => void;
}

export default function Header({
  currentPage,
  setCurrentPage,
  features,
  onLogout
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bg-white/85 backdrop-blur-md border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/20">
                <EarOff className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                Lestari
              </h1>
            </button>
          </div>

          {/* Desktop Navigation & Logout */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center space-x-8">
              <button
                onClick={() => setCurrentPage('home')}
                className={`transition-colors font-medium text-sm cursor-pointer ${
                  currentPage === 'home'
                    ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Home
              </button>

              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => setCurrentPage(feature.page)}
                  className={`transition-colors font-medium text-sm cursor-pointer ${
                    currentPage === feature.page
                      ? 'text-indigo-600 border-b-2 border-indigo-600 pb-1'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {feature.title}
                </button>
              ))}
            </nav>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              Logout Account
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 transition-colors p-2 cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4 bg-white/95 backdrop-blur-lg px-2 rounded-2xl shadow-xl mt-2 mb-4">
            <div className="flex flex-col space-y-3">

              <button
                onClick={() => {
                  setCurrentPage('home');
                  setMobileMenuOpen(false);
                }}
                className={`text-left font-medium px-4 py-2 rounded-xl transition-colors ${
                  currentPage === 'home'
                    ? 'bg-indigo-50 text-indigo-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Home
              </button>

              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => {
                    setCurrentPage(feature.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium px-4 py-2 rounded-xl transition-colors ${
                    currentPage === feature.page
                      ? 'bg-indigo-50 text-indigo-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {feature.title}
                </button>
              ))}

              {currentPage !== 'home' && (
                <button
                  onClick={() => {
                    setCurrentPage('home');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-colors font-medium text-left cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Kembali ke Beranda</span>
                </button>
              )}

              {/* Mobile Logout */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-left text-red-500 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl font-medium transition-colors"
              >
                Logout Account
              </button>

            </div>
          </div>
        )}
      </div>
    </header>
  );
}

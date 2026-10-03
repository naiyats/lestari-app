import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Video, 
  MessageSquare, 
  FileText, 
  Volume2, 
  Briefcase, 
  BookOpen, 
  HeartHandshake, 
  Mic, 
  ShieldCheck, 
  Globe, 
  Star,
  CheckCircle2,
  Award,
  Users,
  TrendingUp,
  Building
} from 'lucide-react';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  return (
    <div className="min-h-screen text-gray-800 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Background Decorative Blurs */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-purple-300/30 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full shadow-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-semibold text-emerald-700 tracking-wide uppercase">
            100% Deaf-Friendly Platform
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-6">
          Empowering the <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Deaf Community
          </span>
        </h1>

        {/* Hero Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
          The world’s first comprehensive platform designed exclusively for deaf individuals. Find employment, learn new skills, and maintain mental wellness through accessible technology.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => setCurrentPage('job-portal')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-purple-500/25 hover:opacity-95 transition flex items-center justify-center space-x-2 group"
          >
            <span>Start Your Journey</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => alert("Demo video coming soon!")}
            className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl shadow-sm hover:bg-gray-50 transition flex items-center justify-center space-x-2"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Play className="w-3.5 h-3.5 fill-current" />
            </div>
            <span>Watch Demo</span>
          </button>
        </div>
      </section>

      {/* 2. BUILT FOR ACCESSIBILITY */}
      <section className="py-16 bg-white/60 backdrop-blur-md border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Built for Accessibility</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">Every feature is designed with the deaf community’s unique needs in mind.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Visual Communication</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                In-app video calling designed for seamless sign language communication.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Sign Language Support</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                AI-powered translators available for all video content and live sessions.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Text-Based Interface</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Clear visual interfaces and live text prompts throughout the platform.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 mb-4">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Audio-Visual Alerts</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Visual notification and caption alerts for important system updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM FEATURES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Platform Features</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Four powerful tools designed specifically for the deaf community’s success.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature Card 1 */}
          <div 
            onClick={() => setCurrentPage('job-portal')}
            className="bg-white p-8 rounded-3xl border border-indigo-100/80 shadow-sm hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Briefcase className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Job Portal</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Find deaf-friendly jobs with remote communication support.
              </p>
            </div>
            <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              <span>Explore Feature</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>

          {/* Feature Card 2 */}
          <div 
            onClick={() => setCurrentPage('workshop')}
            className="bg-white p-8 rounded-3xl border border-emerald-100/80 shadow-sm hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Workshop</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Learn new skills through visual classes and sign language.
              </p>
            </div>
            <div className="mt-6 flex items-center text-emerald-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              <span>Explore Feature</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>

          {/* Feature Card 3 */}
          <div 
            onClick={() => setCurrentPage('mental-health')}
            className="bg-white p-8 rounded-3xl border border-purple-100/80 shadow-sm hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-purple-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mental Health Chat</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Professional mental health support with captioning and visual counselor.
              </p>
            </div>
            <div className="mt-6 flex items-center text-purple-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              <span>Explore Feature</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>

          {/* Feature Card 4 */}
          <div 
            onClick={() => setCurrentPage('speech-to-text')}
            className="bg-white p-8 rounded-3xl border border-rose-100/80 shadow-sm hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 bg-rose-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <Mic className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Speech to Text</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Convert speech to text for better communication.
              </p>
            </div>
            <div className="mt-6 flex items-center text-rose-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
              <span>Explore Feature</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE LESTARI? */}
      <section className="py-16 bg-white/80 backdrop-blur-md border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Why Choose LESTARI?</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">We understand the unique challenges faced by the deaf community and have created solutions that truly work.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Item 1 */}
            <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm mb-4">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Visual-First Design</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Every feature designed with visual communication in mind.
              </p>
            </div>

            {/* Item 2 */}
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">AI Integration</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Sign language translation and interpretation services.
              </p>
            </div>

            {/* Item 3 */}
            <div className="bg-purple-50/50 p-6 rounded-2xl border border-purple-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Accessibility Verified</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                All job postings verified for true 'deaf-friendly' workplaces.
              </p>
            </div>

            {/* Item 4 */}
            <div className="bg-pink-50/50 p-6 rounded-2xl border border-pink-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-pink-600 shadow-sm mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Mental Wellness</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                24/7 AI-powered mental health support chat.
              </p>
            </div>

            {/* Item 5 */}
            <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-600 shadow-sm mb-4">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Real-Time Tools</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Speech-to-text and live transcription services.
              </p>
            </div>

            {/* Item 6 */}
            <div className="bg-sky-50/50 p-6 rounded-2xl border border-sky-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-sky-600 shadow-sm mb-4">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Global Community</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Connect with a global deaf professional workforce.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Success Stories</h2>
          <p className="text-sm sm:text-base text-gray-600 mt-2">Hear from our community members</p>
        </div>

        <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-indigo-50/40 p-8 sm:p-10 rounded-3xl border border-indigo-100 shadow-lg relative">
          <div className="flex items-center space-x-1 text-amber-400 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <p className="text-base sm:text-lg text-gray-700 italic leading-relaxed mb-6">
            "LESTARI helped me find my dream job in tech. The accessibility features made my job searching so much easier!"
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold flex items-center justify-center text-lg shadow-md">
              SC
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Sarin Chen</h4>
              <p className="text-xs text-gray-500">Software Developer at TechCare</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TRUSTED BY THE COMMUNITY */}
      <section className="py-16 bg-white/60 backdrop-blur-md border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Trusted by the Community</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-2">See how we're making a difference every day</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                2,500+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Job Posted</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                1,200+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Active Users</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                98%
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Satisfaction Rate</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-indigo-50 shadow-sm">
              <div className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1">
                150+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">Workshops</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER / CALL TO ACTION (CTA) */}
      <section className="mt-20 mx-4 sm:mx-8 max-w-7xl sm:mx-auto rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-16 px-6 sm:px-12 text-center text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Ready to Transform Your Future?
          </h2>
          <p className="text-sm sm:text-base text-purple-100 mb-8 leading-relaxed">
            Join thousands of deaf professionals who trust LESTARI for their career and wellness journey. Start with a personalized assessment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => alert("Assessment feature starting...")}
              className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl shadow-lg hover:bg-gray-100 transition"
            >
              Take Assessment
            </button>
            <button 
              onClick={() => setCurrentPage('workshop')}
              className="w-full sm:w-auto px-8 py-4 bg-white/10 border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition backdrop-blur-sm"
            >
              Browse Workshops
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
'use client';

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Users, 
  Star, 
  Play, 
  Eye,
  Hand,
  MessageSquare,
  Volume2,
  ArrowRight,
  BookOpen,
  Briefcase,
  Heart,
  Zap,
  Shield,
  Clock,
  Globe,
  Accessibility
} from 'lucide-react';
import { features } from './Features'; // Disesuaikan dengan F besar
import AssessmentModal from './AssessmentModal';

export default function HomePage({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showAssessment, setShowAssessment] = useState<boolean>(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 5000);
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    
    return () => {
      clearInterval(interval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const stats = [
    { number: "2,500+", label: "Jobs Posted", color: "text-indigo-600", icon: <Briefcase className="w-6 h-6" /> },
    { number: "1,200+", label: "Active Users", color: "text-purple-600", icon: <Users className="w-6 h-6" /> },
    { number: "98%", label: "Satisfaction Rate", color: "text-green-600", icon: <Star className="w-6 h-6" /> },
    { number: "150+", label: "Workshops", color: "text-blue-600", icon: <BookOpen className="w-6 h-6" /> }
  ];

  const accessibilityFeatures = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Visual Communication",
      description: "All content optimized for visual learning with clear icons and illustrations",
      color: "bg-blue-100 text-blue-600",
      shadow: "shadow-blue-200"
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: "Sign Language Support",
      description: "ASL interpretation available for all video content and live sessions",
      color: "bg-green-100 text-green-600",
      shadow: "shadow-green-200"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Text-Based Interface",
      description: "Chat and text communication prioritized throughout the platform",
      color: "bg-purple-100 text-purple-600",
      shadow: "shadow-purple-200"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Audio-Visual Alerts",
      description: "Visual notifications and vibration alerts for important updates",
      color: "bg-orange-100 text-orange-600",
      shadow: "shadow-orange-200"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Developer",
      company: "TechCorp",
      quote: "Lestari helped me find my dream job in tech. The accessibility features made job searching so much easier!",
      rating: 5
    },
    {
      name: "Marcus Johnson",
      role: "UX Designer",
      company: "DesignStudio",
      quote: "The workshops are amazing! I learned new skills with full ASL support and visual tutorials.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Analyst",
      company: "Analytics Pro",
      quote: "The mental health support and community aspect of Lestari has been life-changing for me.",
      rating: 5
    }
  ];

  const benefits = [
    {
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      title: "Visual-First Design",
      description: "Every feature designed with visual communication in mind",
      gradient: "from-blue-50 to-blue-100"
    },
    {
      icon: <Hand className="w-6 h-6 text-green-500" />,
      title: "ASL Integration",
      description: "Sign language tutorials and interpretation services",
      gradient: "from-green-50 to-green-100"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      title: "Accessibility Verified",
      description: "All job postings verified for deaf-friendly workplaces",
      gradient: "from-purple-50 to-purple-100"
    },
    {
      icon: <Heart className="w-6 h-6 text-red-500" />,
      title: "Mental Wellness",
      description: "24/7 AI-powered mental health support chat",
      gradient: "from-red-50 to-red-100"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Real-Time Tools",
      description: "Speech-to-text and live transcription services",
      gradient: "from-yellow-50 to-yellow-100"
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-500" />,
      title: "Global Community",
      description: "Connect with deaf professionals worldwide",
      gradient: "from-indigo-50 to-indigo-100"
    }
  ];

  const handleGetStarted = () => {
    setShowAssessment(true);
  };

  const handleAssessmentComplete = (results: Record<string, any>) => {
    setShowAssessment(false);
    if (results.primaryGoal === 'employment') {
      setCurrentPage('job-portal');
    } else if (results.primaryGoal === 'learning') {
      setCurrentPage('workshop');
    } else {
      setCurrentPage('job-portal');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
          
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-2xl opacity-60 animate-float"></div>
          <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-60 animate-float-delayed"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-medium mb-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Accessibility className="w-4 h-4 mr-2" />
              100% Deaf-Friendly Platform
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-30 -z-10"></div>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tight mb-6">
              Empowering the <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Deaf Community
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
              The world’s first comprehensive platform designed exclusively for deaf individuals. Find employment, learn new skills, and maintain mental wellness through accessible technology.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
              <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <Eye className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">Visual First</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <Hand className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium text-gray-700">ASL Support</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">Text Based</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button 
                onClick={handleGetStarted}
                className="group bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-lg opacity-50 -z-10"></div>
                <span>Start Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="group border-2 border-indigo-600 text-indigo-600 px-8 py-4 rounded-2xl font-semibold hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2 bg-white cursor-pointer"
              >
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Built for Accessibility
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every feature designed with the deaf community's unique needs in mind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessibilityFeatures.map((feature, index) => (
              <div key={index} className={`bg-white rounded-3xl p-6 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 shadow-lg ${feature.shadow}`}>
                <div className={`w-16 h-16 ${feature.color} rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg transform hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Four powerful tools designed specifically for the deaf community's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer transform hover:-translate-y-3 hover:scale-[1.02] relative overflow-hidden ${
                    currentFeature === index ? 'ring-4 ring-indigo-300 scale-105 shadow-2xl' : ''
                  }`}
                  onMouseEnter={() => setCurrentFeature(index)}
                  onClick={() => setCurrentPage(feature.page)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="flex items-start space-x-6 relative z-10">
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0 shadow-lg`}>
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="flex items-center text-indigo-600 font-medium group-hover:text-indigo-700 transition-colors">
                        <span>Explore Feature</span>
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Lestari?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We understand the unique challenges faced by the deaf community and have created solutions that truly work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className={`group bg-gradient-to-br ${benefit.gradient} rounded-3xl p-6 hover:shadow-xl transition-all duration-500 border border-gray-100 transform hover:scale-105 hover:-translate-y-2 shadow-lg`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-4 bg-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-300 to-purple-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our community members
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-indigo-50 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </p>
                  </div>
                  <div className="ml-auto flex space-x-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
                    ))}
                  </div>
                </div>
                <blockquote className="text-xl text-gray-700 italic leading-relaxed">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
              </div>
            </div>
            
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-3 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110 cursor-pointer ${
                    currentTestimonial === index 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 w-8' 
                      : 'bg-gray-300 w-3 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by the Community
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            See how we're making a difference every day
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className={`${stat.color} mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-2xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-float-delayed"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg">
            Ready to Transform Your Future?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
            Join thousands of deaf professionals who trust Lestari for their career and wellness journey. Start with a personalized assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <button 
              onClick={handleGetStarted}
              className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2 relative overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-white blur-lg opacity-50 -z-10"></div>
              <span>Take Assessment</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setCurrentPage('workshop')}
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 flex items-center justify-center space-x-2 bg-white bg-opacity-10 backdrop-blur-sm cursor-pointer"
            >
              <BookOpen className="w-5 h-5" />
              <span>Browse Workshops</span>
            </button>
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 opacity-90">
            <div className="flex items-center space-x-2 text-white bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Shield className="w-5 h-5" />
              <span className="text-sm">100% Secure</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Clock className="w-5 h-5" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2 text-white bg-white bg-opacity-10 px-4 py-2 rounded-full backdrop-blur-sm">
              <Globe className="w-5 h-5" />
              <span className="text-sm">Global Community</span>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Modal */}
      {showAssessment && (
        <AssessmentModal
          isOpen={showAssessment}
          onClose={() => setShowAssessment(false)}
          onComplete={handleAssessmentComplete}
        />
      )}

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
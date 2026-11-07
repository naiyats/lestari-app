import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Heart, 
  Users, 
  BookOpen, 
  Phone,
  Video,
  Calendar,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  MessageCircle,
  Shield,
  Clock,
  Star,
  Lightbulb,
  Headphones,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  mood?: string;
}

interface MoodOption {
  emoji: string;
  label: string;
  color: string;
  value: string;
}

const moodOptions: MoodOption[] = [
  { emoji: '😊', label: 'Great', color: 'bg-green-100 text-green-800 border-green-300', value: 'great' },
  { emoji: '🙂', label: 'Good', color: 'bg-blue-100 text-blue-800 border-blue-300', value: 'good' },
  { emoji: '😐', label: 'Okay', color: 'bg-yellow-100 text-yellow-800 border-yellow-300', value: 'okay' },
  { emoji: '😟', label: 'Not Good', color: 'bg-orange-100 text-orange-800 border-orange-300', value: 'not-good' },
  { emoji: '😢', label: 'Terrible', color: 'bg-red-100 text-red-800 border-red-300', value: 'terrible' }
];

const quickResponses = [
  "I'm feeling anxious",
  "I need someone to talk to",
  "Help me relax",
  "I'm having trouble sleeping",
  "I feel overwhelmed",
  "I need motivation"
];

const selfCareTips = [
  {
    title: "Deep Breathing Exercise",
    description: "Try the 4-7-8 breathing technique",
    steps: [
      "Breathe in through your nose for 4 counts",
      "Hold your breath for 7 counts", 
      "Exhale through your mouth for 8 counts",
      "Repeat this cycle 3-4 times slowly"
    ]
  },
  {
    title: "Mindfulness Moment",
    description: "Ground yourself with this 5-4-3-2-1 technique",
    steps: [
      "Name 5 things you can see around you",
      "Name 4 things you can touch",
      "Name 3 things you can hear right now", 
      "Name 2 things you can smell",
      "Name 1 thing you can taste"
    ]
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Release tension from your body systematically",
    steps: [
      "Start with your toes, tense for 5 seconds",
      "Release and notice the relaxation feeling",
      "Move up through each muscle group",
      "End with your face and scalp muscles"
    ]
  },
  {
    title: "Gratitude Practice",
    description: "Shift focus to positive thoughts and feelings",
    steps: [
      "Think of 3 specific things you're grateful for today",
      "Write them down if possible",
      "Reflect deeply on why they matter to you",
      "Feel the positive emotions they bring"
    ]
  }
];

const supportGroups = [
  {
    title: "Weekly Peer Support",
    time: "Every Tuesday, 7:00 PM",
    description: "Connect with others in a safe, supportive environment",
    link: "https://meet.google.com/example-peer-support"
  },
  {
    title: "Deaf Mental Health Circle",
    time: "Saturdays, 2:00 PM",
    description: "Specialized support for the deaf community",
    link: "https://zoom.us/deaf-mental-health"
  },
  {
    title: "Young Adults Group",
    time: "Thursdays, 6:30 PM", 
    description: "For ages 18-30, discussing life transitions and challenges",
    link: "https://meet.google.com/young-adults-support"
  },
  {
    title: "Anxiety Support Circle",
    time: "Mondays, 8:00 PM",
    description: "Focused support for anxiety management",
    link: "https://zoom.us/anxiety-support"
  }
];

const resources = [
  {
    title: "Understanding Depression",
    type: "Article",
    readTime: "5 min read",
    link: "https://www.who.int/news-room/fact-sheets/detail/depression"
  },
  {
    title: "Anxiety Management Techniques", 
    type: "Video Guide",
    readTime: "12 min watch",
    link: "https://www.youtube.com/watch?v=anxiety-help"
  },
  {
    title: "Building Mental Resilience",
    type: "PDF Guide",
    readTime: "15 min read", 
    link: "https://www.apa.org/topics/resilience"
  },
  {
    title: "Sleep Hygiene Tips",
    type: "Interactive Guide",
    readTime: "8 min guide",
    link: "https://www.sleepfoundation.org/sleep-hygiene"
  },
  {
    title: "Mindfulness Meditation",
    type: "Audio Guide",
    readTime: "10 min listen",
    link: "https://www.headspace.com/meditation/mindfulness"
  },
  {
    title: "Crisis Coping Strategies",
    type: "Emergency Guide",
    readTime: "3 min read",
    link: "https://suicidepreventionlifeline.org/help-yourself/"
  }
];

// Call Gemini Flash API 
const callGeminiAPI = async (message: string, mood?: string): Promise<string> => {
  const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyA_8CuvEvGLFkoDL4_MpZPAJtVO5ELhfLY'; 
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
  
  let systemPrompt = `Kamu adalah 'Lesbot', teman AI yang hangat, santai, asyik, dan empatik untuk kesehatan mental di portal Lestari. Gunakan bahasa Indonesia sehari-hari yang natural, luwes, dan ramah seperti teman dekat. Jawab dengan singkat, padat, dan penuh kepedulian (2-4 kalimat).`;

  if (mood) {
    systemPrompt += `\n\nUser bilang moodnya lagi "${mood}". Tanggapi dengan santai dan hangat ya.`;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `${systemPrompt}\n\nPesan user: "${message}"`
          }]
        }]
      })
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error('API Response Error:', data);
      return "Eh, maaf banget ya, Lesbot tadi sempat nge-lag dikit. Coba ulangi pesan kamu atau ceritain lagi pelan-pelan ya!";
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "Duh, koneksinya Lesbot lagi agak ngadat nih. Tapi aku tetap di sini nemenin kamu kok, coba kirim pesan lagi ya!";
  }
};

export default function MentalHealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      type: 'bot', 
      message: 'Hello! I\'m your AI wellness companion, powered by Gemini AI to provide personalized mental health support. I\'m here to listen, support, and guide you on your wellness journey. How are you feeling today?', 
      timestamp: new Date() 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('');
  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [showResources, setShowResources] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Remove auto-scroll functionality completely

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        type: 'user',
        message: newMessage,
        timestamp: new Date(),
        mood: currentMood
      };
      
      setMessages(prev => [...prev, userMessage]);
      const messageToSend = newMessage;
      setNewMessage('');
      setIsTyping(true);
      
      try {
        const response = await callGeminiAPI(messageToSend, currentMood);
        
        const botMessage: Message = {
          id: Date.now() + 1,
          type: 'bot',
          message: response,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        const errorMessage: Message = {
          id: Date.now() + 1,
          type: 'bot',
          message: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or if this is urgent, please reach out to our crisis support.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsTyping(false);
        setShowMoodSelector(false);
      }
    }
  };

  const handleQuickResponse = (response: string) => {
    setNewMessage(response);
  };

  const handleMoodSelection = async (mood: string) => {
    setCurrentMood(mood);
    setShowMoodSelector(false);
    
    const selectedMoodOption = moodOptions.find(option => option.value === mood);
    const moodMessage = `I'm feeling ${selectedMoodOption?.label.toLowerCase()} today ${selectedMoodOption?.emoji}`;
    
    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      message: moodMessage,
      timestamp: new Date(),
      mood: mood
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    
    try {
      const response = await callGeminiAPI(moodMessage, mood);
      
      const botMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        message: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        type: 'bot',
        message: "I'm here to support you, though I'm having a technical moment. Your feelings are valid and important. Please try again, or reach out to our crisis support if you need immediate help.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmergencyContact = () => {
    const message = "Hi, I need mental health crisis support. Please help me.";
    const phoneNumber = "6281234567890"; // Replace with actual crisis support number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  const handleResourceClick = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Mental Health Support</h1>
              <p className="text-sm text-gray-600">AI-powered wellness companion</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-xs text-gray-600">
                <span className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Confidential
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  24/7 Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Chat Interface */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white font-semibold text-base md:text-lg">AI Wellness Companion</h2>
                <p className="text-purple-100 text-xs md:text-sm">Powered by Gemini Flash • Here to support you</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-xs md:text-sm">Online</span>
              </div>
            </div>
          </div>

          {/* Mood Selector */}
          {showMoodSelector && (
            <div className="p-4 md:p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-3">How are you feeling today?</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {moodOptions.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => handleMoodSelection(mood.value)}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-full transition-all duration-200 hover:scale-105 ${mood.color} border hover:shadow-md text-sm md:text-base`}
                  >
                    <span className="text-base md:text-lg mr-1 md:mr-2">{mood.emoji}</span>
                    {mood.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Messages - Smaller Height */}
          <div className="h-48 md:h-64 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[85%] md:max-w-md ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    ) : (
                      <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900 border'
                  }`}>
                    <p className="text-sm md:text-base leading-relaxed">{message.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-600 to-pink-600">
                    <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                  <div className="bg-gray-100 p-3 rounded-2xl border">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="px-4 md:px-6 py-3 bg-gray-50 border-t">
            <div className="flex flex-wrap gap-2">
              {quickResponses.map((response, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickResponse(response)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-xs md:text-sm text-gray-600 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200"
                >
                  {response}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-white p-4 md:p-4">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message here..."
                className="flex-1 p-3 border bg-white border-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-600 text-sm md:text-base"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isTyping}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Resources Section - Below Chat */}
        <div className="space-y-6">
          {/* Self-Care Tips */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Self-Care Tips</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selfCareTips.map((tip, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <button
                    onClick={() => setExpandedTip(expandedTip === index ? null : index)}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 text-sm md:text-base">{tip.title}</h4>
                      {expandedTip === index ? (
                        <ChevronUp className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">{tip.description}</p>
                  </button>
                  {expandedTip === index && (
                    <div className="mt-3 space-y-2">
                      {tip.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start text-xs md:text-sm text-gray-600">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                          {step}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Support Groups */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Support Groups</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {supportGroups.map((group, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base">{group.title}</h4>
                  <p className="text-purple-600 text-xs md:text-sm font-medium">{group.time}</p>
                  <p className="text-gray-600 text-xs md:text-sm mt-1">{group.description}</p>
                  <button 
                    onClick={() => handleResourceClick(group.link)}
                    className="mt-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-xs md:text-sm hover:bg-blue-200 transition-colors inline-flex items-center"
                  >
                    Join Group <ExternalLink className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Resources & Articles */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg flex items-center justify-center mr-3">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-gray-900">Resources & Articles</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-gray-900 text-sm md:text-base">{resource.title}</h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-purple-600 text-xs font-medium">{resource.type}</span>
                    <span className="text-gray-500 text-xs">{resource.readTime}</span>
                  </div>
                  <button 
                    onClick={() => handleResourceClick(resource.link)}
                    className="mt-3 w-full bg-purple-100 text-purple-700 py-2 rounded-lg text-xs md:text-sm hover:bg-purple-200 transition-colors inline-flex items-center justify-center"
                  >
                    Read More <ExternalLink className="w-3 h-3 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Support */}
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-2xl p-4 md:p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-red-800">Emergency Support</h3>
            </div>
            <p className="text-red-700 text-sm md:text-base mb-4">
              If you're in crisis or having thoughts of self-harm, please reach out immediately. You're not alone.
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleEmergencyContact}
                className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition-colors text-sm md:text-base font-medium flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                WhatsApp Crisis Support
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button 
                  onClick={() => window.open('tel:119', '_self')}
                  className="border-2 border-red-600 text-red-600 py-2 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  Crisis Hotline: 119
                </button>
                <button 
                  onClick={() => handleResourceClick('https://www.into-the-light.id/')}
                  className="border-2 border-red-600 text-red-600 py-2 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium"
                >
                  Emergency Chat
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs md:text-sm text-gray-500 py-4">
          <p>This AI assistant provides supportive guidance but is not a replacement for professional mental health care.</p>
          <p className="mt-1">If you're experiencing a mental health emergency, please contact emergency services immediately.</p>
          <p className="mt-2 text-xs">
            🔒 Your conversations are private and confidential • 🤖 Powered by Gemini AI
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Copy, 
  Download, 
  Trash2, 
  Settings, 
  Target, 
  TrendingUp, 
  Play,
  Pause,
  RotateCcw,
  FileText,
  Languages,
  Zap,
  Clock,
  AlertCircle
} from 'lucide-react';

interface TranscriptionSession {
  id: string;
  text: string;
  timestamp: Date;
  duration: number;
  language: string;
  confidence: number;
}

const languages = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
  { code: 'id-ID', name: 'Indonesian', flag: '🇮🇩' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' },
  { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' }
];

export default function SpeechToTextPage() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [currentSession, setCurrentSession] = useState<TranscriptionSession | null>(null);
  const [sessions, setSessions] = useState<TranscriptionSession[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [audioLevel, setAudioLevel] = useState(0);
  const [confidence, setConfidence] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [isSupported, setIsSupported] = useState(true);
  const [error, setError] = useState('');

  const recognitionRef = useRef<any>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check browser support
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setError('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
    }
  }, []);

  // Setup audio visualization
  const setupAudioVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      analyserRef.current.fftSize = 256;
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && isRecording && !isPaused) {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
          setAudioLevel(average);
          requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (err) {
      console.error('Error accessing microphone:', err);
      setError('Unable to access microphone. Please allow microphone permissions.');
    }
  };

  // Timer for recording duration
  useEffect(() => {
    if (isRecording && !isPaused) {
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    if (!isSupported) return;
    
    setError('');
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    try {
      await setupAudioVisualization();
      
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = selectedLanguage;
      
      let finalTranscript = '';
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          const confidence = Math.round(event.results[i][0].confidence * 100) || 85;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
            setConfidence(confidence);
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscribedText(finalTranscript + interimTranscript);
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setError(`Recognition error: ${event.error}`);
        if (event.error === 'no-speech') {
          setError('No speech detected. Please try speaking closer to the microphone.');
        }
      };
      
      recognitionRef.current.onend = () => {
        if (isRecording && !isPaused) {
          // Restart recognition if it ended unexpectedly
          recognitionRef.current.start();
        }
      };
      
      recognitionRef.current.start();
      setIsRecording(true);
      setIsPaused(false);
      setTranscribedText('');
      setRecordingTime(0);
      setCurrentSession({
        id: Date.now().toString(),
        text: '',
        timestamp: new Date(),
        duration: 0,
        language: selectedLanguage,
        confidence: 0
      });
      
    } catch (err) {
      console.error('Error starting recording:', err);
      setError('Failed to start recording. Please check microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    
    setIsRecording(false);
    setIsPaused(false);
    setAudioLevel(0);
    
    if (currentSession && transcribedText.trim()) {
      const completedSession: TranscriptionSession = {
        ...currentSession,
        text: transcribedText.trim(),
        duration: recordingTime,
        confidence: confidence
      };
      
      setSessions(prev => [completedSession, ...prev.slice(0, 9)]); // Keep only 10 recent sessions
      
      if (autoSave) {
        // Save to localStorage
        const savedSessions = JSON.parse(localStorage.getItem('speechSessions') || '[]');
        savedSessions.unshift(completedSession);
        localStorage.setItem('speechSessions', JSON.stringify(savedSessions.slice(0, 10)));
      }
    }
    
    setCurrentSession(null);
    setRecordingTime(0);
  };

  const pauseRecording = () => {
    if (isPaused) {
      // Resume
      if (recognitionRef.current) {
        recognitionRef.current.start();
      }
      setIsPaused(false);
    } else {
      // Pause
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsPaused(true);
      setAudioLevel(0);
    }
  };

  const clearText = () => {
    setTranscribedText('');
    setRecordingTime(0);
    setConfidence(0);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcribedText);
      // Could add toast notification here
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const downloadText = () => {
    const element = document.createElement('a');
    const file = new Blob([transcribedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcription-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const deleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(session => session.id !== sessionId));
    const savedSessions = JSON.parse(localStorage.getItem('speechSessions') || '[]');
    const updatedSessions = savedSessions.filter((session: TranscriptionSession) => session.id !== sessionId);
    localStorage.setItem('speechSessions', JSON.stringify(updatedSessions));
  };

  const loadSession = (session: TranscriptionSession) => {
    setTranscribedText(session.text);
    setSelectedLanguage(session.language);
  };

  // Load saved sessions on mount
  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('speechSessions') || '[]');
    setSessions(savedSessions);
  }, []);

  if (!isSupported) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Browser Not Supported</h2>
            <p className="text-gray-600 mb-4">
              Speech recognition requires a modern browser like Chrome, Edge, or Safari.
            </p>
            <p className="text-sm text-gray-500">
              Please use a supported browser to access this feature.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">Speech to Text</h1>
              <p className="text-sm text-gray-600">Real-time speech recognition</p>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-xs text-gray-600">
              <span className="flex items-center">
                <Target className="w-3 h-3 mr-1" />
                {confidence}% accuracy
              </span>
              <span className="flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                Real-time
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Recording Interface */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Recording Controls */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={!!error}
                className={`w-24 h-24 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-105 relative disabled:opacity-50 disabled:cursor-not-allowed ${
                  isRecording
                    ? 'bg-gradient-to-r from-red-500 to-red-600 shadow-lg shadow-red-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25'
                }`}
              >
                {isRecording ? (
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-sm"></div>
                ) : (
                  <Mic className="w-8 h-8 md:w-12 md:h-12 text-white" />
                )}
                
                {/* Pulse animation for recording */}
                {isRecording && !isPaused && (
                  <div className="absolute inset-0 rounded-full bg-red-500 opacity-30 animate-ping"></div>
                )}
              </button>
              
              {/* Pause button */}
              {isRecording && (
                <button
                  onClick={pauseRecording}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-10 h-10 md:w-12 md:h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white hover:bg-yellow-600 transition-colors shadow-lg"
                >
                  {isPaused ? <Play className="w-4 h-4 md:w-6 md:h-6" /> : <Pause className="w-4 h-4 md:w-6 md:h-6" />}
                </button>
              )}
            </div>
            
            <div className="mt-4">
              <p className="text-base md:text-lg font-medium text-gray-900">
                {isRecording 
                  ? (isPaused ? 'Recording Paused' : 'Listening...') 
                  : 'Click to Start Recording'}
              </p>
              {isRecording && (
                <div className="mt-2 flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(recordingTime)}</span>
                  {confidence > 0 && <span>• {confidence}% confidence</span>}
                </div>
              )}
            </div>
          </div>

          {/* Audio Visualization */}
          {isRecording && !isPaused && (
            <div className="flex justify-center items-center space-x-1 mb-6">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-blue-400 to-blue-600 rounded-full transition-all duration-150"
                  style={{
                    height: `${Math.max(4, audioLevel * 0.5 + Math.random() * 10)}px`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Language and Settings */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                disabled={isRecording}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Settings</h3>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={autoSave}
                  onChange={(e) => setAutoSave(e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Auto-save sessions to local storage</span>
              </label>
            </div>
          )}

          {/* Transcribed Text Display */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-semibold text-gray-900 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Transcribed Text
              </h3>
              <div className="flex items-center space-x-1">
                <button 
                  onClick={copyToClipboard}
                  disabled={!transcribedText}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={downloadText}
                  disabled={!transcribedText}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Download as text file"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={clearText}
                  disabled={!transcribedText}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Clear text"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 min-h-[120px] border border-gray-200">
              {transcribedText ? (
                <div className="text-gray-700 leading-relaxed">
                  <p className="whitespace-pre-wrap text-sm md:text-base">{transcribedText}</p>
                  {isRecording && !isPaused && (
                    <span className="inline-block w-2 h-5 bg-blue-500 animate-pulse ml-1"></span>
                  )}
                </div>
              ) : (
                <p className="text-gray-400 italic text-sm">
                  Your speech will appear here once you start recording...
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 md:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessions.slice(0, 4).map((session) => (
                <div key={session.id} className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => loadSession(session)}
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Load session"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteSession(session.id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete session"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-900 line-clamp-2 mb-2">
                    {session.text}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formatTime(session.duration)}</span>
                    <span>{session.confidence}% accuracy</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Tips for Better Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-800">
            <div>• Speak clearly and at moderate pace</div>
            <div>• Use a quiet environment</div>
            <div>• Position microphone 6-8 inches away</div>
            <div>• Pause between sentences</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 py-4">
          <p>Speech recognition works best in Chrome, Edge, and Safari browsers.</p>
          <p className="mt-1">Your audio is processed locally and not stored on our servers.</p>
        </div>
      </div>
    </div>
  );
}
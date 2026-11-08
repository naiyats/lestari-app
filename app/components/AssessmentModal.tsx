'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  X, 
  User, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Palette, 
  Megaphone, 
  CheckCircle, 
  Check, 
  MapPin, 
  Phone, 
  Camera 
} from 'lucide-react';

const steps = [
  { id: 1, name: 'Info Pribadi' },
  { id: 2, name: 'Minat & Keahlian' },
  { id: 3, name: 'Tujuan Utama' },
  { id: 4, name: 'Ringkasan' }
];

const interestOptions = [
  { name: 'Teknologi', icon: <Code className="w-6 h-6" /> },
  { name: 'Desain Kreatif', icon: <Palette className="w-6 h-6" /> },
  { name: 'Marketing', icon: <Megaphone className="w-6 h-6" /> },
  { name: 'Karir Lainnya', icon: <Briefcase className="w-6 h-6" /> }
];

const goalOptions = [
  { name: 'Mencari Pekerjaan', icon: <Briefcase className="w-6 h-6" /> },
  { name: 'Belajar Skill Baru', icon: <GraduationCap className="w-6 h-6" /> }
];

const communicationOptions = [
  'Bahasa Isyarat (BISINDO/SIBI)',
  'Teks / Chatting',
  'Isyarat Bibir (Lip Reading)',
  'Lainnya'
];

export default function AssessmentModal({ 
  isOpen, 
  onClose, 
  onComplete 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onComplete: (results: any) => void; 
}) {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    communicationPreference: '',
    experienceLevel: '',
    interests: [] as string[],
    primaryGoal: '',
    profileImage: null as string | null
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.scrollTop = 0;
    }
  }, [step]);

  const handleNext = () => setStep(prev => Math.min(prev + 1, steps.length));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));
  
  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const handleSubmit = () => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete(formData);
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 flex items-center justify-center p-3 sm:p-4 z-50 overflow-y-auto">
          <motion.div 
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 15 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            exit={{ opacity: 0, scale: 0.95, y: 15 }} 
            className="bg-white rounded-2xl max-w-lg w-full flex flex-col shadow-2xl overflow-hidden my-auto max-h-[90vh]"
          >
            {isFinished ? (
              <div className="p-12 text-center flex flex-col items-center justify-center h-96">
                <CheckCircle size={64} className="text-green-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-slate-900">Profil Berhasil Disimpan</h2>
                <p className="text-slate-600 mt-2">Terima kasih. Kami sedang mengarahkan Anda ke halaman yang sesuai...</p>
              </div>
            ) : (
              <>
                {/* Header Modal */}
                <header className="px-5 sm:px-6 py-4 border-b flex justify-between items-start flex-shrink-0 bg-white sticky top-0 z-10">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">Lengkapi Profil</h2>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">Bantu kami mengenal Anda lebih baik untuk personalisasi layanan.</p>
                  </div>
                  <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-800">
                    <X size={20} />
                  </button>
                </header>

                {/* Stepper Header (Dibuat super rapi dengan indikator step aktif di bawahnya) */}
                <div className="px-6 py-3 border-b bg-slate-50 flex-shrink-0 sticky top-[69px] sm:top-[73px] z-10">
                  <div className="flex items-center justify-between max-w-xs mx-auto">
                    {steps.map((s, index) => (
                      <React.Fragment key={s.id}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 transition-colors shadow-sm ${step === s.id ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : step > s.id ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {step > s.id ? <Check size={14} /> : s.id}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`h-1 w-10 sm:w-16 mx-1 transition-colors flex-shrink-0 rounded-full ${step > s.id ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xs font-semibold text-indigo-600">
                      Langkah {step} dari {steps.length}: {steps[step - 1].name}
                    </span>
                  </div>
                </div>

                {/* Modal Body */}
                <main className="p-5 sm:p-6 overflow-y-auto bg-slate-50 flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={step} 
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }} 
                      transition={{ duration: 0.2 }}
                    >
                      {/* Step 1: Info Pribadi */}
                      {step === 1 && (
                        <div className="space-y-4">
                          <div className="text-center mb-2">
                            <h3 className="font-bold text-base sm:text-lg text-slate-800">Kenalan dulu yuk! 👋</h3>
                          </div>
                          
                          {/* Bagian Upload Foto Profil */}
                          <div className="flex flex-col items-center justify-center">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-200 border-2 border-indigo-500 flex items-center justify-center shadow-md flex-shrink-0">
                              {formData.profileImage ? (
                                <img src={formData.profileImage} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-8 h-8 text-slate-400" />
                              )}
                            </div>
                            <label className="mt-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 transition-colors">
                              <Camera className="w-3 h-3" />
                              Pilih Foto Profil
                              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                            </label>
                          </div>

                          <div>
                            <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1">Nama Lengkap</label>
                            <input 
                              type="text" 
                              id="name" 
                              value={formData.name} 
                              onChange={e => setFormData({...formData, name: e.target.value})} 
                              className="w-full p-2.5 text-sm border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none" 
                              placeholder="Contoh: Budi Santoso"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="location" className="block text-xs font-semibold text-slate-700 mb-1">Domisili / Kota</label>
                              <div className="relative">
                                <MapPin className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                                <input 
                                  type="text" 
                                  id="location" 
                                  value={formData.location} 
                                  onChange={e => setFormData({...formData, location: e.target.value})} 
                                  className="w-full pl-8 p-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none" 
                                  placeholder="Contoh: Jakarta Selatan"
                                />
                              </div>
                            </div>
                            <div>
                              <label htmlFor="phone" className="block text-xs font-semibold text-slate-700 mb-1">Nomor WhatsApp</label>
                              <div className="relative">
                                <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                                <input 
                                  type="text" 
                                  id="phone" 
                                  value={formData.phone} 
                                  onChange={e => setFormData({...formData, phone: e.target.value})} 
                                  className="w-full pl-8 p-2 text-xs border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none" 
                                  placeholder="Contoh: 08123456789"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Preferensi Komunikasi Utama</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {communicationOptions.map(option => (
                                <button
                                  key={option}
                                  type="button"
                                  onClick={() => setFormData({...formData, communicationPreference: option})}
                                  className={`p-2.5 text-xs text-left rounded-lg border font-medium transition-all ${formData.communicationPreference === option ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-300 hover:border-indigo-300 text-slate-700'}`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Level Pengalaman Kerja</label>
                            <div className="grid grid-cols-3 gap-2">
                              {['Pemula', 'Menengah', 'Mahir'].map(level => (
                                <button 
                                  key={level} 
                                  type="button"
                                  onClick={() => setFormData({...formData, experienceLevel: level})} 
                                  className={`p-2.5 text-xs text-center rounded-lg border font-medium transition-all ${formData.experienceLevel === level ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-white border-slate-300 hover:border-indigo-400 text-slate-800'}`}
                                >
                                  {level}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 2: Minat & Keahlian */}
                      {step === 2 && (
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-1">Apa bidang yang paling menarik bagi Anda?</h3>
                          <p className="text-slate-600 text-xs mb-4">Pilih satu atau lebih opsi di bawah ini.</p>
                          <div className="grid grid-cols-2 gap-3">
                            {interestOptions.map(opt => (
                              <button 
                                key={opt.name} 
                                type="button"
                                onClick={() => toggleInterest(opt.name)} 
                                className={`p-4 text-center rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.interests.includes(opt.name) ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-white border-slate-300 hover:border-indigo-400 text-slate-800'}`}
                              >
                                {opt.icon}
                                <span className="font-semibold text-xs sm:text-sm">{opt.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Tujuan Utama */}
                      {step === 3 && (
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-slate-800 mb-1">Apa tujuan utama Anda bergabung?</h3>
                          <p className="text-slate-600 text-xs mb-4">Pilih salah satu yang paling menggambarkan kebutuhan Anda.</p>
                          <div className="grid grid-cols-2 gap-3">
                            {goalOptions.map(opt => (
                              <button 
                                key={opt.name} 
                                type="button"
                                onClick={() => setFormData({...formData, primaryGoal: opt.name})} 
                                className={`p-4 text-center rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.primaryGoal === opt.name ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-white border-slate-300 hover:border-indigo-400 text-slate-800'}`}
                              >
                                {opt.icon}
                                <span className="font-semibold text-xs sm:text-sm">{opt.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step 4: Ringkasan */}
                      {step === 4 && (
                        <div className="space-y-3">
                          <h3 className="font-bold text-base sm:text-lg text-slate-800">Ringkasan Profil</h3>
                          <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200 space-y-1.5 text-xs text-slate-700 flex flex-col items-center sm:items-start">
                            {formData.profileImage && (
                              <div className="w-14 h-14 rounded-full overflow-hidden mb-2 border border-indigo-300 shadow-sm flex-shrink-0">
                                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                              </div>
                            )}
                            <p><strong>Nama Lengkap:</strong> {formData.name || '-'}</p>
                            <p><strong>Domisili:</strong> {formData.location || '-'}</p>
                            <p><strong>No. WhatsApp:</strong> {formData.phone || '-'}</p>
                            <p><strong>Metode Komunikasi:</strong> {formData.communicationPreference || '-'}</p>
                            <p><strong>Level Pengalaman:</strong> {formData.experienceLevel || '-'}</p>
                            <p><strong>Minat & Keahlian:</strong> {formData.interests.length > 0 ? formData.interests.join(', ') : '-'}</p>
                            <p><strong>Tujuan Utama:</strong> {formData.primaryGoal || '-'}</p>
                          </div>
                          <p className="text-[11px] text-slate-500">Pastikan informasi di atas sudah benar sebelum menyimpan profil Anda.</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </main>

                {/* Footer Modal */}
                <footer className="px-5 sm:px-6 py-4 border-t bg-white flex justify-between items-center flex-shrink-0 sticky bottom-0 z-10">
                  <button 
                    type="button"
                    onClick={handleBack} 
                    disabled={step === 1} 
                    className="px-4 py-2 text-xs text-slate-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Kembali
                  </button>
                  
                  {step < steps.length ? (
                    <button 
                      type="button"
                      onClick={handleNext} 
                      className="px-5 py-2 text-xs bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                    >
                      Lanjutkan
                    </button>
                  ) : (
                    <button 
                      type="button"
                      onClick={handleSubmit} 
                      className="px-5 py-2 text-xs bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-sm"
                    >
                      Simpan & Selesai
                    </button>
                  )}
                </footer>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
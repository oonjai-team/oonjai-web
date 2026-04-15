"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  EmptyState,
  ActiveRequestCard,
  ServiceTypeCard
} from './components';
import {
  ClipboardList,
  Plus,
  ChevronLeft,
  BriefcaseMedical,
  Home,
  Sun,
  User,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import LocationPicker from '@/components/common/LocationPicker';
import { Header } from '@/components/common/Header';
import { RequestServiceSkeleton } from '@/components/common/Skeleton';
import { useRouter } from 'next/navigation';
import { fetchBookings, type BookingResponse } from '@/lib/api/bookings';
import { fetchSeniors, fetchSeniorServiceConflicts, type SeniorProfile } from '@/lib/api/seniors';
import { useAuth } from '@/lib/auth/AuthContext';

const SERVICE_TYPE_MAP: Record<string, string> = {
  "Medical Escort": "medical_escort",
  "Home Care": "home_care",
  "Outings": "outings",
}

export default function RequestServicePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [view, setView] = useState<'list' | 'form'>('list');
  const [activeRequests, setActiveRequests] = useState<BookingResponse[]>([]);
  const [seniors, setSeniors] = useState<SeniorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [seniorConflicts, setSeniorConflicts] = useState<string[]>([]);
  const [seniorDropdownOpen, setSeniorDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    startDate: '',
    startHour: '09',
    startMinute: '00',
    endDate: '',
    endHour: '17',
    endMinute: '00',
    location: '',
    seniorId: '',
    serviceType: 'Medical Escort',
    additionalInfo: ''
  });

  const hourOptions = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minuteOptions = ['00', '15', '30', '45'];

  // Combined ISO strings for downstream use (conflict checks, submission)
  const combinedStartDate = formData.startDate
    ? `${formData.startDate}T${formData.startHour}:${formData.startMinute}` : '';
  const combinedEndDate = formData.endDate
    ? `${formData.endDate}T${formData.endHour}:${formData.endMinute}` : '';

  const loadData = async () => {
    setLoading(true);
    const [bookingsData, seniorsData] = await Promise.all([
      fetchBookings(),
      fetchSeniors(),
    ]);
    setActiveRequests(bookingsData.filter(b => b.serviceType !== 'activity'));
    setSeniors(seniorsData);
    setLoading(false);
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
      return;
    }
    if (isAuthenticated) {
      loadData(); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, [isAuthenticated, authLoading, router]);

  // Check senior conflicts when dates/times change — deselect senior if now conflicted
  useEffect(() => {
    if (!combinedStartDate || !combinedEndDate) {
      React.startTransition(() => setSeniorConflicts([]));
      return;
    }
    let cancelled = false;
    fetchSeniorServiceConflicts(combinedStartDate, combinedEndDate).then(conflicts => {
      if (cancelled) return;
      React.startTransition(() => {
        setSeniorConflicts(conflicts);
        // Auto-deselect senior if they became unavailable
        setFormData(prev => {
          if (prev.seniorId && conflicts.includes(prev.seniorId)) {
            return { ...prev, seniorId: '' };
          }
          return prev;
        });
      });
    });
    return () => { cancelled = true; };
  }, [combinedStartDate, combinedEndDate]);  

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setSeniorDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedSenior = seniors.find(s => s.id === formData.seniorId);

  const getAge = (dob: string) => {
    const birth = new Date(dob);
    if (isNaN(birth.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    if (today.getMonth() < birth.getMonth() || (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())) age--;
    return age > 0 && age < 150 ? age : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store booking request data in sessionStorage for the caretaker selection page
    const bookingRequest = {
      seniorId: formData.seniorId,
      serviceType: SERVICE_TYPE_MAP[formData.serviceType] || "medical_escort",
      startDate: combinedStartDate,
      endDate: combinedEndDate,
      location: formData.location,
      note: formData.additionalInfo,
    };

    sessionStorage.setItem("pendingBookingRequest", JSON.stringify(bookingRequest));
    router.push("/booking");
  };

  const isFormComplete = combinedStartDate && combinedEndDate && formData.location && formData.seniorId;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FCFAEF] font-sans text-gray-900 pb-20">
        <Header />
        <main className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-10">
          <RequestServiceSkeleton />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAEF] font-sans text-gray-900 pb-20 selection:bg-teal-200">
      <Header />

      <main className="max-w-5xl mx-auto px-5 md:px-8 py-8 md:py-10">

        {view === 'list' ? (
          <>
            <div className="mb-6 md:mb-8 text-[#3A5A40]">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Request a Service</h1>
              <p className="text-xs md:text-sm font-medium">Fill in the details below to find a verified caregiver for your loved one.</p>
            </div>

            <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              <ClipboardList size={16} className="text-orange-400" />
              Service Requests
            </div>

            {activeRequests.length === 0 ? (
              <EmptyState onRequestClick={() => setView('form')} />
            ) : (
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {activeRequests.map(req => (
                    <ActiveRequestCard
                      key={req.id}
                      title={req.serviceType.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      date={new Date(req.startDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                      time={new Date(req.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      status={req.status === 'created' ? 'WAITING CONFIRMATION' : req.status.toUpperCase()}
                      variant={req.status === 'created' ? 'orange' : 'white'}
                      location={req.location}
                      notes={req.note}
                      assignee={req.caretakerName ? {
                        name: req.caretakerName,
                        role: req.caretakerSpecialization?.split(',')[0]?.trim() || 'Professional Caretaker',
                      } : undefined}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setView('form')}
                  className="w-full border-2 border-dashed border-teal-200/80 rounded-2xl py-8 flex flex-col items-center justify-center text-teal-800 bg-teal-50/30 hover:bg-teal-50 transition"
                >
                  <div className="w-10 h-10 bg-teal-100 text-[#3A5A40] rounded-full flex items-center justify-center mb-3">
                    <Plus size={20} strokeWidth={2.5} />
                  </div>
                  <span className="font-extrabold text-gray-800">New Care Request</span>
                  <span className="text-xs text-gray-500 font-medium mt-1">Book a specialist today</span>
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setView('list')}
              className="flex items-center gap-1 text-sm font-bold text-[#3A5A40] mb-6 hover:opacity-70 transition"
            >
              <ChevronLeft size={18} /> Back
            </button>

            <div className="mb-8 md:mb-10 text-[#3A5A40]">
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">Request a Service</h1>
              <p className="text-xs md:text-sm font-medium">Fill in the details below to find a verified caregiver for your loved one.</p>
            </div>

            <div className="space-y-8 md:space-y-10">
              <section>
                <h3 className="text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-4">1. Select Service Type</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ServiceTypeCard
                    icon={BriefcaseMedical} title="Medical Escort" desc="Appointments & Check-ups"
                    selected={formData.serviceType === 'Medical Escort'}
                    onClick={() => setFormData({...formData, serviceType: 'Medical Escort'})}
                  />
                  <ServiceTypeCard
                    icon={Home} title="Home Care" desc="Daily Living Assistance"
                    selected={formData.serviceType === 'Home Care'}
                    onClick={() => setFormData({...formData, serviceType: 'Home Care'})}
                  />
                  <ServiceTypeCard
                    icon={Sun} title="Outings" desc="Social Trips & Walks"
                    selected={formData.serviceType === 'Outings'}
                    onClick={() => setFormData({...formData, serviceType: 'Outings'})}
                  />
                </div>
              </section>

              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <section>
                  <h3 className="text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-4">2. Logistics</h3>
                  <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
                    <div className="space-y-5">
                      {/* Start Date & Time */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-2">Start Date & Time</label>
                        <div className="flex items-center gap-2">
                          <input
                            required
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="flex-1 min-w-0 border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
                          />
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <select
                              name="startHour"
                              value={formData.startHour}
                              onChange={handleChange}
                              className="w-[62px] border border-gray-300 rounded-xl py-3 px-2 text-sm font-medium text-center focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] bg-white appearance-none cursor-pointer"
                            >
                              {hourOptions.map(h => (
                                <option key={`sh-${h}`} value={h}>{h}</option>
                              ))}
                            </select>
                            <span className="text-sm font-bold text-gray-400">:</span>
                            <select
                              name="startMinute"
                              value={formData.startMinute}
                              onChange={handleChange}
                              className="w-[62px] border border-gray-300 rounded-xl py-3 px-2 text-sm font-medium text-center focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] bg-white appearance-none cursor-pointer"
                            >
                              {minuteOptions.map(m => (
                                <option key={`sm-${m}`} value={m}>{m}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* End Date & Time */}
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-2">End Date & Time</label>
                        <div className="flex items-center gap-2">
                          <input
                            required
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="flex-1 min-w-0 border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
                          />
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <select
                              name="endHour"
                              value={formData.endHour}
                              onChange={handleChange}
                              className="w-[62px] border border-gray-300 rounded-xl py-3 px-2 text-sm font-medium text-center focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] bg-white appearance-none cursor-pointer"
                            >
                              {hourOptions.map(h => (
                                <option key={`eh-${h}`} value={h}>{h}</option>
                              ))}
                            </select>
                            <span className="text-sm font-bold text-gray-400">:</span>
                            <select
                              name="endMinute"
                              value={formData.endMinute}
                              onChange={handleChange}
                              className="w-[62px] border border-gray-300 rounded-xl py-3 px-2 text-sm font-medium text-center focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] bg-white appearance-none cursor-pointer"
                            >
                              {minuteOptions.map(m => (
                                <option key={`em-${m}`} value={m}>{m}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <LocationPicker
                        value={formData.location}
                        onChange={(location) => {
                          setFormData(prev => ({ ...prev, location }));
                        }}
                      />
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-4">3. Patient Information</h3>
                  <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <label className="block text-xs font-bold text-gray-800 mb-2">Select Senior Profile</label>

                    {/* Custom Senior Dropdown */}
                    <div ref={dropdownRef} className="relative w-full md:w-2/3">
                      <button
                        type="button"
                        onClick={() => setSeniorDropdownOpen(o => !o)}
                        className={`w-full border rounded-xl py-3 px-4 text-left flex items-center justify-between transition-all ${
                          seniorDropdownOpen ? 'border-[#3A5A40] ring-1 ring-[#3A5A40]' : 'border-gray-300'
                        } bg-white`}
                      >
                        {selectedSenior ? (
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#D3E6D6] rounded-full flex items-center justify-center flex-shrink-0">
                              <User size={14} className="text-[#3A5A40]" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-900">{selectedSenior.fullname}</span>
                              {getAge(selectedSenior.dateOfBirth) && (
                                <span className="text-xs text-gray-500 ml-2">({getAge(selectedSenior.dateOfBirth)} yrs)</span>
                              )}
                            </div>
                            {seniorConflicts.includes(selectedSenior.id) && (
                              <span className="ml-auto mr-2 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold flex items-center gap-1">
                                <AlertTriangle size={10} /> Busy
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Select a senior profile...</span>
                        )}
                        <ChevronDown size={16} className={`text-gray-400 transition-transform flex-shrink-0 ${seniorDropdownOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {seniorDropdownOpen && (
                        <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden max-h-72 overflow-y-auto">
                          {seniors.length === 0 ? (
                            <div className="p-4 text-center text-sm text-gray-400">No senior profiles found</div>
                          ) : (
                            seniors.map(senior => {
                              const hasConflict = seniorConflicts.includes(senior.id);
                              const isSelected = formData.seniorId === senior.id;
                              const age = getAge(senior.dateOfBirth);
                              return (
                                <button
                                  key={senior.id}
                                  type="button"
                                  disabled={hasConflict}
                                  onClick={() => {
                                    if (!hasConflict) {
                                      setFormData(prev => ({ ...prev, seniorId: senior.id }));
                                      setSeniorDropdownOpen(false);
                                    }
                                  }}
                                  className={`w-full px-4 py-3 flex items-start gap-3 text-left transition-colors border-b border-gray-50 last:border-0 ${
                                    hasConflict
                                      ? 'opacity-50 cursor-not-allowed bg-gray-50'
                                      : isSelected
                                        ? 'bg-[#EEF5F0]'
                                        : 'hover:bg-gray-50 cursor-pointer'
                                  }`}
                                >
                                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                                    isSelected ? 'bg-[#3A5A40] text-white' : 'bg-[#D3E6D6] text-[#3A5A40]'
                                  }`}>
                                    <User size={16} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-bold text-gray-900">{senior.fullname}</span>
                                      {age && <span className="text-xs text-gray-400">{age} yrs</span>}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-medium">
                                        {senior.mobilityLevel}
                                      </span>
                                      {senior.healthNote && (
                                        <span className="text-[10px] text-gray-400 truncate max-w-[180px]">
                                          {senior.healthNote}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  {hasConflict && (
                                    <span className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-[10px] font-bold flex-shrink-0 mt-1">
                                      <AlertTriangle size={10} />
                                      Unavailable
                                    </span>
                                  )}
                                  {isSelected && !hasConflict && (
                                    <svg className="w-5 h-5 text-[#3A5A40] flex-shrink-0 mt-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>

                    {/* Hint when seniors are unavailable */}
                    {seniorConflicts.length > 0 && (
                      <div className="mt-3 p-3 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-2">
                        <AlertTriangle size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-orange-700">
                          Some seniors are unavailable for this time period due to existing bookings.
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-4">4. Additional Information (Optional)</h3>
                  <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <textarea
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Specific instructions..."
                      className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] resize-none"
                    />
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={!isFormComplete}
                  className={`w-full font-extrabold text-lg py-4 rounded-xl transition shadow-lg flex items-center justify-center gap-2
                    ${isFormComplete
                      ? 'bg-[#3A5A40] text-white hover:bg-[#2c4430] cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                    }`}
                >
                  Choose Caretaker <ChevronLeft size={20} className="rotate-180" />
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

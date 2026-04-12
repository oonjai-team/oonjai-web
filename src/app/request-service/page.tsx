"use client";

import React, { useState, useEffect } from 'react';
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
  Search,
  MapPin
} from 'lucide-react';
import { Header } from '@/components/common/Header';
import { useRouter } from 'next/navigation';
import { fetchBookings, type BookingResponse } from '@/lib/api/bookings';
import { fetchSeniors, type SeniorProfile } from '@/lib/api/seniors';
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

  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    location: '',
    seniorId: '',
    serviceType: 'Medical Escort',
    additionalInfo: ''
  });

  const [inputValue, setInputValue] = useState('');

  const loadData = async () => {
    setLoading(true);
    const [bookingsData, seniorsData] = await Promise.all([
      fetchBookings(),
      fetchSeniors(),
    ]);
    setActiveRequests(bookingsData);
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

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setFormData(prev => ({ ...prev, location: inputValue }));
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store booking request data in sessionStorage for the caretaker selection page
    const bookingRequest = {
      seniorId: formData.seniorId,
      serviceType: SERVICE_TYPE_MAP[formData.serviceType] || "medical_escort",
      startDate: formData.startDate,
      endDate: formData.endDate,
      location: formData.location,
      note: formData.additionalInfo,
    };

    sessionStorage.setItem("pendingBookingRequest", JSON.stringify(bookingRequest));
    router.push("/booking");
  };

  const isFormComplete = formData.startDate && formData.endDate && inputValue && formData.seniorId;

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#FCFAEF]">
        <Header />
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-PrimaryGreen border-t-transparent" />
        </div>
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
                      time={new Date(req.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      status={req.status === 'created' ? 'WAITING CONFIRMATION' : req.status.toUpperCase()}
                      variant={req.status === 'created' ? 'orange' : 'white'}
                      notes={req.note}
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
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-2">Start Date & Start Time</label>
                        <input
                          required
                          type="datetime-local"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-800 mb-2">End Date & End Time</label>
                        <input
                          required
                          type="datetime-local"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-800 mb-2">Location</label>
                      <div className="relative mb-3">
                        <input
                          required
                          type="text"
                          placeholder="City, Country"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          className="w-full border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40]"
                        />
                        <Search size={18} className="absolute right-4 top-3 text-gray-400" />
                      </div>

                      <div className="h-40 bg-gray-100 rounded-xl border border-gray-200 relative overflow-hidden shadow-inner">
                        {formData.location ? (
                          <iframe
                            key={formData.location}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            src={`https://www.openstreetmap.org/export/embed.html?layer=mapnik&q=${encodeURIComponent(formData.location)}`}
                            className="grayscale-[0.2]"
                          ></iframe>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full bg-[#f8f8f8]">
                            <MapPin size={28} className="text-[#3A5A40] opacity-20 mb-1" />
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center px-4">
                              Awaiting location...
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xs font-bold text-[#3A5A40] uppercase tracking-widest mb-4">3. Patient Information</h3>
                  <div className="bg-white p-5 md:p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <label className="block text-xs font-bold text-gray-800 mb-2">Select Senior Profile</label>
                    <select
                      required
                      name="seniorId"
                      value={formData.seniorId}
                      onChange={handleChange}
                      className="w-full md:w-1/2 border border-gray-300 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-[#3A5A40] focus:ring-1 focus:ring-[#3A5A40] bg-white"
                    >
                      <option value="">Select a profile...</option>
                      {seniors.map(senior => (
                        <option key={senior.id} value={senior.id}>
                          {senior.fullname}
                        </option>
                      ))}
                    </select>
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

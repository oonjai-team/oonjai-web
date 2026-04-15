'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronLeft, ChevronDown, Calendar as CalendarIcon,
  MapPin, FileText, User, Plus
} from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export const PhotoGallery = ({ images }: { images: string[] }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const openModal = (index: number) => {
    setModalIndex(index);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setShowModal(false);
    document.body.style.overflow = '';
  }, []);

  const prevPhoto = useCallback(() => setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1)), [images.length]);
  const nextPhoto = useCallback(() => setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0)), [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showModal) return;
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal, prevPhoto, nextPhoto, closeModal]);

  return (
    <>
      <div className="hidden lg:grid grid-cols-4 grid-rows-2 gap-4 h-[400px]">
        <div 
          onClick={() => openModal(0)}
          className="col-span-2 row-span-2 rounded-2xl cursor-pointer overflow-hidden relative group"
        >
          <Image src={images[0]} alt="Activity gallery 1" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        
        {images.slice(1, 4).map((img, index) => (
          <div 
            key={index} 
            onClick={() => openModal(index + 1)}
            className="rounded-2xl cursor-pointer overflow-hidden relative group"
          >
            <Image src={img} alt={`Activity gallery ${index + 2}`} fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300" />
          </div>
        ))}
        <div 
          onClick={() => openModal(4)}
          className="bg-gray-300 rounded-2xl relative flex items-center justify-center cursor-pointer hover:opacity-90 transition overflow-hidden group"
        >
          <Image src={images[4]} alt="Activity gallery 5" fill unoptimized className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-60" />
          <span className="relative text-white font-bold text-lg">+{images.length - 4} More Photos</span>
        </div>
      </div>

      <div className="relative h-64 w-full lg:hidden group">
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          className="h-full w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                <Image src={img} alt={`Activity slide ${index + 1}`} fill unoptimized className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <div className="custom-pagination absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-1.5" />

        <Link href="/activities" className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-800 z-10">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
        </Link>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center text-white p-4">
          
          <div className="w-full max-w-7xl flex justify-end p-4">
            <button onClick={closeModal} className="p-2 bg-black/50 rounded-full hover:bg-black/80 transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="relative flex-1 w-full max-w-7xl flex items-center justify-center group">
            
            <button 
              onClick={prevPhoto}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-black/80 transition opacity-0 group-hover:opacity-100 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>

            <div className="relative flex items-center justify-center max-h-[80vh] w-full overflow-hidden rounded-xl h-full">
              <Image 
                src={images[modalIndex]} 
                alt={`Gallery detail ${modalIndex + 1}`} 
                fill
                unoptimized
                className="object-contain"
              />
            </div>

            <button 
              onClick={nextPhoto}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-3 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-black/80 transition opacity-0 group-hover:opacity-100 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>

          <div className="flex gap-2 p-6">
            {images.map((_, index) => (
              <div 
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition ${modalIndex === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>

        </div>
      )}
    </>
  );
};

export interface FilterState {
  search: string;
  category: string | null;
  location: string | null;
  priceMin: number;
  priceMax: number;
}

interface FilterBarProps {
  onChange: (filters: FilterState) => void;
}

export const FilterBar = ({ onChange }: FilterBarProps) => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const trackRef = useRef<HTMLDivElement>(null);
    const [draggingThumb, setDraggingThumb] = useState<'min' | 'max' | null>(null);

    const MAX_SLIDER_PRICE = 2000;
    const [priceRange, setPriceRange] = useState({ min: 0, max: MAX_SLIDER_PRICE });

    const emitChange = useCallback((overrides?: Partial<{ search: string; category: string | null; location: string | null; priceMin: number; priceMax: number }>) => {
      onChange({
        search: overrides?.search ?? searchValue,
        category: overrides?.category !== undefined ? overrides.category : selectedCategory,
        location: overrides?.location !== undefined ? overrides.location : selectedLocation,
        priceMin: overrides?.priceMin ?? priceRange.min,
        priceMax: overrides?.priceMax ?? priceRange.max,
      });
    }, [onChange, searchValue, selectedCategory, selectedLocation, priceRange]);

    const toggleDropdown = (name: string) => setOpenDropdown(openDropdown === name ? null : name);
    const handleCategorySelect = (cat: string) => {
      const next = selectedCategory === cat ? null : cat;
      setSelectedCategory(next);
      setOpenDropdown(null);
      emitChange({ category: next });
    };
    const handleLocationSelect = (loc: string) => {
      const next = selectedLocation === loc ? null : loc;
      setSelectedLocation(next);
      setOpenDropdown(null);
      emitChange({ location: next });
    };

    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (!draggingThumb || !trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
            const newValue = Math.round(percent * MAX_SLIDER_PRICE);
            if (draggingThumb === 'min') {
                setPriceRange(prev => ({ ...prev, min: Math.min(newValue, prev.max - 10) }));
            } else {
                setPriceRange(prev => ({ ...prev, max: Math.max(newValue, prev.min + 10) }));
            }
        };
        const handlePointerUp = () => setDraggingThumb(null);
        if (draggingThumb) {
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('pointerup', handlePointerUp);
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        };
    }, [draggingThumb]);

    const isPriceChanged = priceRange.min > 0 || priceRange.max < MAX_SLIDER_PRICE;
    const hasActiveFilter = !!searchValue || !!selectedCategory || !!selectedLocation || isPriceChanged;

    const handleReset = () => {
      setSearchValue('');
      setSelectedCategory(null);
      setSelectedLocation(null);
      setPriceRange({ min: 0, max: MAX_SLIDER_PRICE });
      setOpenDropdown(null);
      onChange({ search: '', category: null, location: null, priceMin: 0, priceMax: MAX_SLIDER_PRICE });
    };

    const getFilterBtnClass = (name: string, isSelected: boolean) => `flex items-center justify-between w-full px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm border rounded-full md:rounded-lg transition-colors whitespace-nowrap ${openDropdown === name || isSelected ? 'bg-[#385C4B] text-white border-[#385C4B]' : 'bg-white text-gray-600 border-gray-300'}`;

    return (
        <div className="flex flex-col lg:flex-row justify-between gap-4 my-6">
            <div className="relative w-full lg:max-w-md">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg className="w-4 h-4 text-[#385C4B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <input type="text" value={searchValue} onChange={(e) => { setSearchValue(e.target.value); emitChange({ search: e.target.value }); }} className="w-full pl-10 pr-4 py-2 text-[#385C4B] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#385C4B] bg-white text-sm" placeholder="Search activities, yoga, gardening..." />
            </div>
            <div className="flex gap-2 md:gap-4 w-full lg:w-auto">
                {[{ id: 'category', label: selectedCategory || 'Category', items: ['Social Companion', 'Exercise', 'Food', 'Wellness', 'Religion'], onSelect: handleCategorySelect }, { id: 'location', label: selectedLocation || 'Location', items: ['Bangkok', 'Chiang Mai', 'Phuket', 'Pattaya', 'Hua Hin'], onSelect: handleLocationSelect }].map((filter) => (
                    <div key={filter.id} className="flex-1 lg:flex-none relative">
                        <button onClick={() => toggleDropdown(filter.id)} className={getFilterBtnClass(filter.id, filter.id === 'category' ? !!selectedCategory : !!selectedLocation)}>
                            <span className="truncate max-w-[80px] md:max-w-full">{filter.label}</span>
                            <ChevronLeft className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform -rotate-90 ${openDropdown === filter.id ? 'rotate-90' : ''}`} />
                        </button>
                        {openDropdown === filter.id && (
                            <div className="absolute top-full left-0 mt-2 w-[220px] bg-white border border-[#385C4B] rounded-lg shadow-lg z-50 overflow-hidden">
                                <ul className="flex flex-col text-sm text-gray-600 divide-y divide-gray-100">
                                    {filter.items.map((item) => (
                                        <li key={item} onClick={() => filter.onSelect(item)} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">{item}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex-1 lg:flex-none relative">
                    <button onClick={() => toggleDropdown('price')} className={getFilterBtnClass('price', isPriceChanged)}><span className="truncate max-w-[80px] md:max-w-full">{isPriceChanged ? `${priceRange.min} - ${priceRange.max} ฿` : 'Price'}</span><ChevronLeft className={`w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform -rotate-90 ${openDropdown === 'price' ? 'rotate-90' : ''}`} /></button>
                    {openDropdown === 'price' && (
                        <div className="absolute top-full right-0 mt-2 w-[260px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                            <div className="flex items-center justify-between gap-2 mb-4">
                                {['min', 'max'].map((type) => (
                                    <input key={type} type="number" placeholder={type === 'min' ? 'Min' : 'Max'} min="0" value={type === 'min' ? priceRange.min : priceRange.max} onChange={(e) => { const val = Math.max(0, Number(e.target.value)); if (type === 'min') { setPriceRange({ ...priceRange, min: Math.min(val, priceRange.max - 10) }); } else { setPriceRange({ ...priceRange, max: Math.max(val, priceRange.min + 10) }); } }} className="w-1/2 px-2 py-1.5 text-xs border border-gray-300 rounded focus:outline-none focus:border-[#385C4B]" />
                                ))}
                            </div>
                            <div className="relative h-1.5 bg-[#A8D0B8] rounded-full mx-2 mt-6 mb-4 select-none touch-none" ref={trackRef}><div className="absolute h-full bg-[#385C4B] rounded-full" style={{ left: `${(priceRange.min / MAX_SLIDER_PRICE) * 100}%`, right: `${100 - (priceRange.max / MAX_SLIDER_PRICE) * 100}%` }} />{['min', 'max'].map((type) => (<div key={type} className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#385C4B] rounded-full shadow z-10 ${draggingThumb === type ? 'cursor-grabbing scale-125' : 'cursor-grab'} transition-transform duration-100`} style={{ left: `calc(${(type === 'min' ? priceRange.min : priceRange.max) / MAX_SLIDER_PRICE * 100}% - 8px)` }} onPointerDown={(e) => { e.preventDefault(); setDraggingThumb(type as 'min' | 'max'); }} />))}</div>
                            <div className="flex justify-end mt-4"><button onClick={() => { setOpenDropdown(null); emitChange({ priceMin: priceRange.min, priceMax: priceRange.max }); }} className="text-xs text-[#385C4B] font-bold">Apply</button></div>
                        </div>
                    )}
                </div>
                {hasActiveFilter && (
                  <button
                    onClick={handleReset}
                    className="flex-shrink-0 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-[#385C4B] font-semibold hover:text-red-600 transition-colors whitespace-nowrap"
                  >
                    Reset
                  </button>
                )}
            </div>
        </div>
    );
};

interface ActivityCardProps {
  id: number | string;
  title: string;
  category: string;
  host: string;
  displayDate: string;
  location: string;
  price: number;
  participantCount: number;
  maxPeople: number;
  imageUrl?: string;
}

export const ActivityCard = ({ id, title, category, host, displayDate, location, price, participantCount, maxPeople, imageUrl }: ActivityCardProps) => {
    const spotsLeft = Math.max(0, maxPeople - participantCount);
    const isFull = spotsLeft === 0;
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col w-full sm:w-[280px]">
            <div className="relative h-48 bg-gray-200">
                {imageUrl ? <Image src={imageUrl} alt={title} fill unoptimized className="object-cover" /> : <div className="w-full h-full bg-[#82A895]" />}
                <div className="absolute bottom-3 right-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">฿{price}</div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-1 text-[#385C4B] text-[10px] font-bold tracking-wider mb-2"><FileText className="w-3 h-3" /> {category.toUpperCase()}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
                <div className="space-y-1.5 mb-6">{[{ Icon: User, text: `Hosted by ${host}` }, { Icon: CalendarIcon, text: displayDate }, { Icon: MapPin, text: location }].map((item, i) => (<div key={i} className="flex items-center gap-2 text-xs text-gray-600"><item.Icon className="w-3.5 h-3.5" />{item.text}</div>))}</div>
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4"><span className={`text-xs font-bold ${isFull ? 'text-[#E54D4D]' : 'text-[#E67E22]'}`}>{isFull ? 'FULL' : `${spotsLeft} SPOTS LEFT!`}</span><Link href={`/activities/${id}`}><button className={`px-4 py-1.5 rounded-full text-xs font-semibold ${isFull ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#385C4B] text-white'}`}>{isFull ? 'Waiting List' : 'View Activity'}</button></Link></div>
            </div>
        </div>
    );
};

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion = ({ title, children, defaultOpen = false }: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-[#385C4B] border-opacity-20 rounded-xl mb-4 overflow-hidden bg-white">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-900 cursor-pointer"
            >
              <span>{title}</span>
              <ChevronDown
                className={`w-5 h-5 text-[#385C4B] transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-4 pt-3 text-sm text-gray-600 border-t border-gray-100">
                  {children}
                </div>
              </div>
            </div>
        </div>
    );
};

import { fetchSeniors, createSenior, type SeniorProfile, type CreateSeniorPayload } from '@/lib/api/seniors';
import { createActivityBooking, fetchSeniorConflicts } from '@/lib/api/activities';
import { createCheckoutSession } from '@/lib/api/payments';
import LocationPicker from '@/components/common/LocationPicker';

interface BookingFormProps {
  activity: {
    id: number | string;
    title: string;
    price: number;
    participantCount: number;
    maxPeople: number;
    images: string[];
    displayDate: string;
    location: string;
    hostAvatar: string;
    host: string;
  };
}

const MOBILITY_OPTIONS = [
  "Independent",
  "Require a cane",
  "Wheelchair",
  "Bed Bound",
]

export const BookingForm = ({ activity }: BookingFormProps) => {
  const spotsLeft = Math.max(0, activity.maxPeople - activity.participantCount);
  const [seniors, setSeniors] = useState<SeniorProfile[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [seniorsLoading, setSeniorsLoading] = useState(true)
  const [transport, setTransport] = useState('self');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [payment, setPayment] = useState('qr');
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [bookedSeniorIds, setBookedSeniorIds] = useState<Set<string>>(new Set())
  const [conflictSeniorIds, setConflictSeniorIds] = useState<Set<string>>(new Set())

  const [newFullName, setNewFullName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newMobility, setNewMobility] = useState('');
  const [newHealthNote, setNewHealthNote] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetchSeniors(),
      fetchSeniorConflicts(String(activity.id)),
    ]).then(([list, conflicts]) => {
      setSeniors(list)
      setBookedSeniorIds(new Set(conflicts.alreadyBooked))
      setConflictSeniorIds(new Set(conflicts.timeConflicts))
    }).finally(() => setSeniorsLoading(false))
  }, [activity.id])

  const toggleSenior = (id: string) => {
    if (bookedSeniorIds.has(id) || conflictSeniorIds.has(id)) return
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        if (next.size >= spotsLeft) return prev // can't exceed available spots
        next.add(id)
      }
      return next
    })
  }

  const handleAddSenior = async () => {
    const errors: Record<string, string> = {}
    if (!newFullName.trim()) errors.fullName = "Full name is required."
    if (!newAge.trim()) errors.age = "Age is required."
    if (!newMobility) errors.mobility = "Mobility level is required."
    if (Object.keys(errors).length) { setFormErrors(errors); return }

    setAddLoading(true)
    // Fold the picked home address into the health note so it's preserved
    // without requiring a schema change.
    const healthNoteParts = [
      newHealthNote.trim(),
      newLocation.trim() ? `Home: ${newLocation.trim()}` : '',
    ].filter(Boolean)
    const payload: CreateSeniorPayload = {
      fullname: newFullName.trim(),
      dateOfBirth: newAge.trim(),
      mobilityLevel: newMobility,
      healthNote: healthNoteParts.length ? healthNoteParts.join(' | ') : undefined,
    }
    const created = await createSenior(payload)
    if (created) {
      setSeniors(prev => [...prev, created])
      setSelectedIds(prev => new Set(prev).add(created.id))
      setShowAddForm(false)
      setNewFullName(''); setNewAge(''); setNewMobility(''); setNewHealthNote(''); setNewLocation('');
      setFormErrors({})
    }
    setAddLoading(false)
  }

  const [checkoutError, setCheckoutError] = useState('');

  const handleCheckout = async () => {
    if (selectedIds.size === 0) return
    if (selectedIds.size > spotsLeft) {
      setCheckoutError(`Only ${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} available, but ${selectedIds.size} selected.`)
      return
    }
    setCheckoutLoading(true)
    setCheckoutError('')

    // Step 1: Create booking(s) via BookingService (status: CREATED, not paid)
    const transportLocation =
      transport === 'pickup' ? pickupLocation :
      transport === 'dropoff' ? dropoffLocation :
      undefined

    if ((transport === 'pickup' || transport === 'dropoff') && !transportLocation) {
      setCheckoutError(`Please select a ${transport === 'pickup' ? 'pick up' : 'drop off'} location.`)
      setCheckoutLoading(false)
      return
    }

    const bookingResult = await createActivityBooking({
      activityId: String(activity.id),
      seniorIds: Array.from(selectedIds),
      transport: transport as 'self' | 'pickup' | 'dropoff',
      transportLocation,
    })

    if (bookingResult) {
      // Step 2: Create checkout session → get redirect URL (simulated Stripe)
      const paymentMethod = payment === 'qr' ? 'qr_promptpay' : 'credit_card' as const
      const checkoutSession = await createCheckoutSession({
        bookingId: bookingResult.bookingId,
        amount: bookingResult.totalAmount,
        currency: 'THB',
        method: paymentMethod,
      })

      if (checkoutSession) {
        // Store booking data for the confirmation page
        sessionStorage.setItem('activitySession', JSON.stringify(bookingResult))
        sessionStorage.setItem('activityBookingDetail', JSON.stringify(activity))
        // Step 3: Redirect to payment gateway
        window.location.href = checkoutSession.checkoutUrl
        return
      }
    } else {
      setCheckoutError('Booking failed. The activity may be fully booked or not enough spots are available.')
    }

    setCheckoutLoading(false)
  }

  const selectedCount = selectedIds.size;
  const activityFee = activity.price * (selectedCount > 0 ? selectedCount : 1);
  const transportFee = (transport === 'pickup' || transport === 'dropoff') ? 150 : 0;
  const total = activityFee + transportFee;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="mb-6">
        <Link href={`/activities/${activity.id}`} className="flex items-center text-sm font-semibold text-[#385C4B] hover:underline mb-6">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#385C4B] mb-6">Activity Summary & Booking Detail</h1>
        
        <div className="bg-white border border-[#385C4B] border-opacity-20 rounded-xl p-4 flex gap-4 items-center shadow-sm">
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 relative">
            <Image src={activity.images[0]} alt={activity.title} fill unoptimized className="object-cover" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{activity.title}</h3>
            <div className="text-xs text-gray-600 flex items-center gap-1.5 mt-1">
              <CalendarIcon className="w-3 h-3" /> {activity.displayDate}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3" /> {activity.location}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1.5 mt-1">
              <div className="w-4 h-4 rounded-full overflow-hidden inline-block align-middle relative">
                <Image src={activity.hostAvatar} alt={activity.host} fill unoptimized className="object-cover" />
              </div>
              <span className="font-semibold text-gray-800 ml-1.5">Hosted By: {activity.host}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900 text-lg">Who is Participating?</h2>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedCount >= spotsLeft ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'}`}>
            {selectedCount} / {spotsLeft} spots
          </span>
        </div>
        {selectedCount >= spotsLeft && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-3 text-xs text-red-600 font-medium">
            All available spots are selected. Remove a participant to add a different one.
          </div>
        )}
        {seniorsLoading ? (
          <div className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-[#385C4B] border-opacity-20 border-t-[#385C4B] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            {seniors.map(s => {
              const isSelected = selectedIds.has(s.id)
              const isBooked = bookedSeniorIds.has(s.id)
              const hasConflict = conflictSeniorIds.has(s.id)
              const isDisabled = isBooked || hasConflict
              const isFull = !isSelected && !isDisabled && selectedIds.size >= spotsLeft
              const isClickable = !isDisabled && !isFull

              let statusLabel = ''
              if (isBooked) statusLabel = 'Already booked'
              else if (hasConflict) statusLabel = 'Time conflict'

              return (
              <div
                key={s.id}
                onClick={() => isClickable && toggleSenior(s.id)}
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  isDisabled ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' :
                  isSelected ? 'border-[#385C4B] bg-[#F4F9F6] cursor-pointer' :
                  isFull ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed' :
                  'border-gray-200 bg-white cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isDisabled ? 'bg-gray-100 text-gray-400' : 'bg-gray-200 text-gray-500'}`}>
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm font-semibold text-gray-800">{s.fullname}</span>
                    <span className="block text-xs text-gray-500">{s.mobilityLevel}</span>
                    {statusLabel && (
                      <span className={`inline-block text-[10px] font-bold mt-0.5 px-1.5 py-0.5 rounded ${isBooked ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                        {statusLabel}
                      </span>
                    )}
                  </div>
                </div>
                <div>
                  {isDisabled ? (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                    </div>
                  ) : isSelected ? (
                    <svg className="w-6 h-6 text-[#385C4B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>
                  )}
                </div>
              </div>
              )
            })}

            {seniors.length === 0 && (
              <p className="text-sm text-gray-500 text-center py-4">No seniors added yet. Add one below to get started.</p>
            )}

            {!showAddForm ? (
              <button onClick={() => setShowAddForm(true)} className="flex flex-col items-start p-4 rounded-xl border border-gray-200 bg-white w-full hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#385C4B] border-opacity-30 text-[#385C4B] flex items-center justify-center bg-white">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-gray-900">Add Senior</span>
                    <span className="block text-xs text-gray-500">Register a new senior to your care</span>
                  </div>
                </div>
              </button>
            ) : (
              <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm">
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                  <div className="w-8 h-8 rounded-full border border-[#385C4B] border-opacity-30 text-[#385C4B] flex items-center justify-center bg-white">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <span className="block text-sm font-bold text-[#385C4B]">Add Senior</span>
                    <span className="block text-xs text-gray-500">Register a new senior to your care</span>
                  </div>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                    <input
                      type="text"
                      value={newFullName}
                      onChange={(e) => { setNewFullName(e.target.value); setFormErrors(prev => { const n = {...prev}; delete n.fullName; return n }) }}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#385C4B] text-sm ${formErrors.fullName ? 'border-red-400' : 'border-gray-300'}`}
                      placeholder="e.g. Somchai Jaidee"
                    />
                    {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName}</p>}
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Date of Birth *</label>
                      <input
                        type="date"
                        value={newAge}
                        onChange={(e) => { setNewAge(e.target.value); setFormErrors(prev => { const n = {...prev}; delete n.age; return n }) }}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#385C4B] text-sm ${formErrors.age ? 'border-red-400' : 'border-gray-300'}`}
                      />
                      {formErrors.age && <p className="text-xs text-red-500 mt-1">{formErrors.age}</p>}
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Mobility Level *</label>
                      <div className="relative">
                        <select
                          value={newMobility}
                          onChange={(e) => { setNewMobility(e.target.value); setFormErrors(prev => { const n = {...prev}; delete n.mobility; return n }) }}
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#385C4B] text-sm appearance-none bg-white ${formErrors.mobility ? 'border-red-400' : 'border-gray-300'}`}
                        >
                          <option value="">Select...</option>
                          {MOBILITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                        <ChevronLeft className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 -rotate-90 text-gray-400 pointer-events-none" />
                      </div>
                      {formErrors.mobility && <p className="text-xs text-red-500 mt-1">{formErrors.mobility}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">Health Note</label>
                    <textarea
                      value={newHealthNote}
                      onChange={(e) => setNewHealthNote(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#385C4B] text-sm resize-none"
                      rows={2}
                      placeholder="Any health conditions or notes (optional)"
                    />
                  </div>
                  <div>
                    <LocationPicker
                      value={newLocation}
                      onChange={(loc) => setNewLocation(loc)}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => { setShowAddForm(false); setFormErrors({}); setNewFullName(''); setNewAge(''); setNewMobility(''); setNewHealthNote(''); setNewLocation('') }}
                      className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-sm font-semibold text-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSenior}
                      disabled={addLoading}
                      className="flex-1 py-2 bg-[#385C4B] text-white rounded-lg hover:bg-[#2A4437] transition text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {addLoading ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><Plus className="w-4 h-4" /> Add Senior</>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-900 mb-3 text-lg">Transportation</h2>
        <div className="space-y-3">
          <div 
            onClick={() => setTransport('self')}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${transport === 'self' ? 'border-[#385C4B] bg-[#F4F9F6]' : 'border-gray-200 bg-white'}`}
          >
            <span className="text-sm font-semibold text-gray-800">Self Travel</span>
            {transport === 'self' ? <svg className="w-6 h-6 text-[#385C4B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>}
          </div>

          <div className={`rounded-xl border transition-colors overflow-hidden ${transport === 'pickup' ? 'border-[#385C4B] bg-white' : 'border-gray-200 bg-white'}`}>
            <div onClick={() => setTransport('pickup')} className={`flex items-center justify-between p-4 cursor-pointer ${transport === 'pickup' ? 'bg-[#F4F9F6]' : ''}`}>
              <span className="text-sm font-semibold text-gray-800">Arrange a Pick Up</span>
              {transport === 'pickup' ? <svg className="w-6 h-6 text-[#385C4B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>}
            </div>
            
            {transport === 'pickup' && (
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Select Your Pick Up Location</h3>
                <LocationPicker
                  value={pickupLocation}
                  onChange={(loc) => setPickupLocation(loc)}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-4 mb-2">
                  <span>Pick Up Time (based on Google Maps Calculation)</span>
                  <span className="font-bold text-gray-900">5:30 PM</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Additional Fees</span>
                  <span className="font-bold text-gray-900">150 Baht</span>
                </div>
              </div>
            )}
          </div>

          <div className={`rounded-xl border transition-colors overflow-hidden ${transport === 'dropoff' ? 'border-[#385C4B] bg-white' : 'border-gray-200 bg-white'}`}>
            <div onClick={() => setTransport('dropoff')} className={`flex items-center justify-between p-4 cursor-pointer ${transport === 'dropoff' ? 'bg-[#F4F9F6]' : ''}`}>
              <span className="text-sm font-semibold text-gray-800">Arrange a Drop Off</span>
              {transport === 'dropoff' ? <svg className="w-6 h-6 text-[#385C4B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>}
            </div>
            
            {transport === 'dropoff' && (
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-3">Select Your Drop Off Location</h3>
                <LocationPicker
                  value={dropoffLocation}
                  onChange={(loc) => setDropoffLocation(loc)}
                />
                <div className="flex justify-between text-xs text-gray-600 mt-4 mb-2">
                  <span>Drop Off Time (based on Google Maps Calculation)</span>
                  <span className="font-bold text-gray-900">7:30 PM</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Additional Fees</span>
                  <span className="font-bold text-gray-900">150 Baht</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="font-bold text-gray-900 mb-3 text-lg">Select Payment Method</h2>
        <div className="space-y-3">
          <div 
            onClick={() => setPayment('qr')}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${payment === 'qr' ? 'border-[#385C4B] bg-[#F4F9F6]' : 'border-gray-200 bg-white'}`}
          >
            <span className="text-sm font-semibold text-gray-800">QR PromptPay</span>
            {payment === 'qr' ? <svg className="w-6 h-6 text-[#385C4B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>}
          </div>
          <div 
            onClick={() => setPayment('card')}
            className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-colors ${payment === 'card' ? 'border-[#385C4B] bg-[#F4F9F6]' : 'border-gray-200 bg-white'}`}
          >
            <span className="text-sm font-semibold text-gray-800">Credit / Debit Card</span>
            {payment === 'card' ? <svg className="w-6 h-6 text-[#385C4B]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> : <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>}
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 bg-white border border-[#385C4B] border-opacity-20 rounded-xl shadow-sm">
        <h2 className="font-bold text-gray-900 mb-4 text-lg">Total Fee</h2>
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Activity Fee</span>
            <span className="font-medium text-gray-900">{activityFee} Baht</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Transportation Fee</span>
            <span className="font-medium text-gray-900">{transportFee} Baht</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-6">
          <span className="font-bold text-gray-900 text-lg">Total Amount</span>
          <span className="font-bold text-gray-900 text-xl">{total} Baht</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={checkoutLoading || selectedIds.size === 0}
          className="w-full py-3.5 bg-[#385C4B] text-white font-bold rounded-xl hover:bg-[#2A4437] transition shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checkoutLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Check Out
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </>
          )}
        </button>
        {checkoutError && (
          <div className="mt-3 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 text-xs text-red-600 font-medium text-center">
            {checkoutError}
          </div>
        )}
      </div>
    </div>
  );
};
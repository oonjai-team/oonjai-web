import Image from "next/image";
import { BookingDetailDTO } from "@/dto/booking.dto"; 

interface BookingSummaryProps {
  booking: BookingDetailDTO;
  caretaker: {
    name: string;
    imageUrl: string;
    rating: number;
    reviewCount: number;
  };
  location: string;
  estimatedTotal: number;
}

export default function BookingSummaryCard({ booking, caretaker, location, estimatedTotal }: BookingSummaryProps) {
  
  const startDateObj = new Date(booking.startDate);
  const endDateObj = new Date(booking.endDate);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
  }).format(startDateObj);

  const formattedStartTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit'
  }).format(startDateObj);

  const formattedEndTime = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit', minute: '2-digit'
  }).format(endDateObj);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 mb-8">
      
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start">
        <div>
          <p className="text-xs font-bold tracking-wider opacity-70 mb-1">CONFIRMED DETAILS</p>
          <h2 className="text-xl font-bold">Booking Summary</h2>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold tracking-wider opacity-70 mb-1">BOOKING ID</p>
          <p className="font-bold text-base">#{booking.bookingId}</p>
        </div>
      </div>

      {/* Body: Desktop Side-by-Side */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
        
        {/* Left Column: Caretaker */}
        <div>
          <p className="text-xs opacity-70 mb-2">Caretaker</p>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
              <Image src={caretaker.imageUrl} alt={caretaker.name} fill className="object-cover" sizes="64px" />
            </div>
            <div>
              <h3 className="text-lg font-bold">{caretaker.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-sm font-medium">
                <span className="text-yellow-500">★</span>
                <span>{caretaker.rating}</span>
                <span className="opacity-70 font-normal">({caretaker.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Schedule */}
        <div className="space-y-4 md:border-l md:border-gray-100 md:pl-8">
          
          {/* Custom Calendar Icon */}
          <div className="flex items-start gap-3">
            <Image 
              src="/images/calendar-icon.svg" 
              alt="Calendar Icon" 
              width={20} 
              height={20} 
              className="mt-0.5 opacity-70" 
            />
            <div>
              <p className="text-xs opacity-70">Scheduled Date</p>
              <p className="font-bold">{formattedDate}</p>
            </div>
          </div>
          
          {/* Custom Clock Icon */}
          <div className="flex items-start gap-3">
            <Image 
              src="/images/clock-icon.svg" 
              alt="Clock Icon" 
              width={20} 
              height={20} 
              className="mt-0.5 opacity-70" 
            />
            <div>
              <p className="text-xs opacity-70">Service Hours</p>
              <p className="font-bold">{formattedStartTime} - {formattedEndTime}</p>
            </div>
          </div>
          
        </div>
      </div>

      {/* Footer: Desktop 3 Columns */}
      <div className="bg-[#EBF1ED] p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wide">Service Type</p>
          <p className="font-medium text-lg mt-1">{booking.serviceType}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wide">Location</p>
          <p className="font-medium text-lg mt-1">{location}</p>
        </div>
        <div>
          <p className="text-xs opacity-70 uppercase tracking-wide">Estimated Total</p>
          <p className="font-bold text-lg mt-1">${estimatedTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
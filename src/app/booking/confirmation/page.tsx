import Link from "next/link";
import Image from "next/image";
import BookingSummaryCard from "@/components/ui/booking/BookingSummaryCard";

// Importing pure DTOs
import { ServiceType, BookingStatus } from "@dto/enums";
import { BookingDetailDTO } from "@dto/booking.dto";
import { ReviewDTO } from "@dto";
import { Header } from "@components/common/Header";

export default function BookingConfirmationPage() {
  
  // 1. The Pure Backend DTO (Mocked API Response)
  const mockBooking: BookingDetailDTO = {
    bookingId: "BK-88291",
    adultChildId: "user-123",
    seniorId: "senior-456",
    startDate: "2024-10-24T09:00:00Z",
    endDate: "2024-10-24T17:00:00Z",
    serviceType: ServiceType.Caretaker, // Updated to your new enum
    provider: "Oonjai Care",
    note: "",
    caretakeId: "ct-789",
    activityId: null,
    review: null,
    status: BookingStatus.Confirmed, // Updated to your new enum
  };

  const mockReview: ReviewDTO = {
    reviewType: "Caretaker",
    rating: 4.5,
    comment: "Sarah was wonderful and very attentive to my mother's needs.",
    createdAt: "2024-10-25T12:00:00Z",
  };

  // 2. Supplementary Client-Side Data
const caretakerDetails = {
    name: "Sarah Jenkins",
    // Remove @/public and just start with /images
    imageUrl: "/images/caretaker.png", 
    rating: mockReview.rating,
    reviewCount: 124,
  };
  const locationDetails = "123 Health Ave, San Francisco";
  const paymentDetails = 320.00;

  return (
    <div className="min-h-screen bg-lightCream text-PrimaryGreen font-sans">
      <Header />
      <header className="p-4 flex items-center justify-between max-w-lg mx-auto md:max-w-3xl lg:max-w-5xl">
        <Link href="/" className="flex items-center gap-2 font-semibold hover:opacity-80 transition-opacity">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back
        </Link>
      </header>

      <main className="px-4 pb-12 mx-auto max-w-lg md:max-w-3xl lg:max-w-4xl">
        
        {/* Custom Success Icon */}
        <div className="flex flex-col items-center text-center mt-6 mb-8">
          <div className="w-16 h-16 bg-[#A4D4BE] rounded-full flex items-center justify-center mb-4">
            <Image 
                src="/images/success-icon.svg" 
                alt="Success Checkmark" 
                width={32} 
                height={32} 
             />
          </div>
          <h1 className="text-2xl font-bold mb-2">Service Successfully Booked!</h1>
          <p className="text-sm opacity-80">Your caretaker has been notified and the schedule is confirmed.</p>
        </div>

        {/* Passing the pure DTO and client-side data separately! */}
        <BookingSummaryCard 
          booking={mockBooking} 
          caretaker={caretakerDetails}
          location={locationDetails}
          estimatedTotal={paymentDetails}
        />

        {/* Action Buttons with Custom Icons */}
        <div className="space-y-3 md:flex md:space-y-0 md:gap-4 md:justify-center">
          <button className="w-full md:w-64 bg-PrimaryGreen text-white font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-PrimaryGreen/90 transition-colors">
            <Image 
              src="/images/dashboard-icon.svg" 
              alt="Dashboard Icon" 
              width={20} 
              height={20} 
            />
            Return to Dashboard
          </button>
          
          <button className="w-full md:w-64 bg-white border-2 border-PrimaryGreen text-PrimaryGreen font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-PrimaryGreen/5 transition-colors">
            <Image 
              src="/images/print-icon.svg" 
              alt="Print Icon" 
              width={20} 
              height={20} 
            />
            Print Receipt
          </button>
        </div>
          <footer className="mt-16 w-full max-w-4xl mx-auto">
            {/* Horizontal Line */}
            <hr className="border-t border-PrimaryGreen/20 mb-8" />
            
            {/* Footer Text */}
            <p className="text-center text-PrimaryGreen/80 text-sm md:text-base">
                Need to make a change?{" "}
                <Link href="/bookings/manage" className="font-bold text-PrimaryGreen hover:underline transition-all">
                Manage your booking
                </Link>
                {" or "}
                <Link href="/support" className="font-bold text-PrimaryGreen hover:underline transition-all">
                Contact Support
                </Link>
            </p>
        </footer>
      </main>
    </div>
  );
}
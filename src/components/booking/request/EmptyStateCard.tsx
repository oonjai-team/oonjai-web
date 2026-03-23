import {Calendar as CalendarIcon, Plus} from "lucide-react"
import React from "react"

export const EmptyState = ({ onRequestClick }: { onRequestClick: () => void }) => (
  <div className="border border-gray-200 rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center bg-white shadow-sm w-full">
    <div className="w-40 h-28 md:w-48 md:h-32 bg-orange-100 rounded-xl mb-6 relative overflow-hidden flex items-center justify-center border-2 border-dashed border-orange-200">
      <CalendarIcon size={48} className="text-orange-400 relative z-10" />
    </div>
    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">You Have No Active Request</h3>
    <p className="text-gray-500 text-xs md:text-sm max-w-sm mb-6 leading-relaxed">
      It looks like you haven&apos;t scheduled any services yet. Start by requesting a professional caretaker to help manage your home.
    </p>
    <button
      onClick={onRequestClick}
      className="flex items-center gap-2 bg-[#3A5A40] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#2c4430] transition shadow-md"
    >
      <Plus size={16} /> Add Request
    </button>
  </div>
);

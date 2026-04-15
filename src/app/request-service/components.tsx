import React from 'react';
import {
  User,
  MessageSquare, Plus, Calendar as CalendarIcon,
  MapPin, FileText,
  LucideIcon
} from 'lucide-react';


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

export const ActiveRequestCard = ({
  title, status, time, date, variant = 'orange', assignee, notes, location
}: {
  title: string; status: string; time: string; date?: string; variant?: 'orange' | 'white'; assignee?: { name: string; role: string }; notes?: string; location?: string
}) => {
  return (
    <div className={`p-5 rounded-2xl border w-full h-full flex flex-col transition-all hover:shadow-md ${
      variant === 'orange' ? 'bg-[#FFF9EE] border-orange-200' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      {/* Top row: title + status */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className="font-extrabold text-gray-900 text-lg">{title}</h4>
          <div className="text-sm text-gray-500 font-medium mt-1">
            <span>Schedule for</span>
            {date && <span> {date}</span>}
          </div>
          <div className="text-sm text-gray-500 font-medium">
            @ {time}
          </div>
        </div>
        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider whitespace-nowrap ${
          status === 'WAITING CONFIRMATION' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-[#3A5A40]'
        }`}>
          {status}
        </span>
      </div>

      {location && (
        <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-2 line-clamp-1">
          <MapPin size={13} className="text-gray-400 flex-shrink-0" />
          <span>{location}</span>
        </div>
      )}

      {notes && (
        <div className="mt-3 p-3 bg-black/5 rounded-xl border border-black/5">
          <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            <FileText size={10} />
            <span>Note</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-2">
            {notes}
          </p>
        </div>
      )}

      {/* Caretaker row */}
      {assignee && (
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-50 rounded-full flex items-center justify-center text-teal-800 border border-teal-100 shrink-0">
              <User size={18} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">{assignee.name}</p>
              <p className="text-xs text-gray-500 font-medium">{assignee.role}</p>
            </div>
          </div>
          <button className="p-2 hover:bg-teal-50 rounded-lg transition-colors">
            <MessageSquare size={20} className="text-[#3A5A40]" />
          </button>
        </div>
      )}
    </div>
  );
};

export const ServiceTypeCard = ({ 
  icon: Icon, title, desc, selected, onClick 
}: { 
  icon: LucideIcon; title: string; desc: string; selected: boolean; onClick: () => void 
}) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all w-full text-center ${
      selected ? 'border-[#3A5A40] bg-[#F4F9F5] scale-[1.02]' : 'border-gray-200 bg-white hover:border-gray-300'
    }`}
  >
    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-colors ${
      selected ? 'bg-[#3A5A40] text-white' : 'bg-[#D3E6D6] text-[#3A5A40]'
    }`}>
      <Icon size={24} strokeWidth={2} />
    </div>
    <h4 className="font-bold text-gray-900">{title}</h4>
    <p className="text-xs text-gray-500 mt-1 font-medium leading-tight">{desc}</p>
  </button>
);
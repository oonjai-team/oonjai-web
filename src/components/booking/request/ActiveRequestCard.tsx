import {Calendar as CalendarIcon, FileText, MapPin, MessageSquare, User} from "lucide-react"
import React from "react"

export const ActiveRequestCard = ({
                                    title, status, time, variant = 'orange', assignee, notes, location
                                  }: {
  title: string; status: string; time: string; variant?: 'orange' | 'white'; assignee?: { name: string; role: string }; notes?: string; location?: string
}) => {
  const isOrange = variant === 'orange';
  return (
    <div className={`p-5 rounded-2xl border w-full h-full flex justify-between items-start transition-all hover:shadow-md ${
      isOrange ? 'bg-[#FFF9EE] border-orange-200' : 'bg-white border-gray-200 shadow-sm'
    }`}>
      <div className="flex-1">
        <h4 className="font-extrabold text-gray-900 text-base">{title}</h4>

        <div className="space-y-1 mt-2">
          <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
            <CalendarIcon size={12} className="text-orange-400" />
            <span>Scheduled for {time}</span>
          </div>

          {location && (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium line-clamp-1">
              <MapPin size={12} className="text-red-400" />
              <span>{location}</span>
            </div>
          )}
        </div>

        {notes && (
          <div className="mt-4 p-3 bg-black/5 rounded-xl border border-black/5">
            <div className="flex items-center gap-1.5 mb-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              <FileText size={10} />
              <span>Note</span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed italic line-clamp-2">
              {notes}
            </p>
          </div>
        )}

        {assignee && (
          <div className="flex items-center gap-3 mt-5">
            <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center text-teal-800 border border-teal-100 shrink-0">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">{assignee.name}</p>
              <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{assignee.role}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end justify-between self-stretch ml-4">
        <span className={`text-[9px] font-bold px-2 py-1.5 rounded-md uppercase tracking-wider whitespace-nowrap ${
          status === 'WAITING CONFIRMATION' ? 'bg-orange-200 text-orange-900' : 'bg-green-100 text-[#3A5A40]'
        }`}>
          {status}
        </span>
        {assignee && (
          <button className="p-2 hover:bg-teal-50 rounded-full transition-colors mt-auto">
            <MessageSquare size={20} className="text-[#3A5A40]" />
          </button>
        )}
      </div>
    </div>
  );
};
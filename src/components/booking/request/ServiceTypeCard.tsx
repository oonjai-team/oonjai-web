import {LucideIcon} from "lucide-react"
import React from "react"

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
import { clsx } from "clsx"

interface OJChipProps {
  label: string
  selected: boolean
  onClick: () => void
  icon?: string
}

export default function OJChip({ label, selected, onClick, icon }: OJChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "px-4 py-2.5 rounded-full border text-sm transition-all duration-150 cursor-pointer",
        selected
          ? "bg-oonjai-green-50 border-oonjai-green-500 text-oonjai-green-500 font-medium"
          : "bg-white border-oonjai-cream-500 text-lightGrey hover:border-oonjai-green-300 hover:text-oonjai-green-500"
      )}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {selected && <span className="mr-1">✓</span>}
      {label}
    </button>
  )
}
import { SelectHTMLAttributes } from "react"
import { clsx } from "clsx"

interface OJSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  required?: boolean
  error?: string
  options: { value: string; label: string }[]
  placeholder?: string
}

export default function OJSelect({
  label, required, error, options, placeholder, className, ...props
}: OJSelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-oonjai-green-700">
          {label}
          {required && <span className="text-PrimaryRed ml-0.5">*</span>}
        </label>
      )}
      <select
        className={clsx(
          "w-full h-12 border rounded-xl px-4 text-sm outline-none bg-white",
          "text-oonjai-green-700 appearance-none cursor-pointer",
          "transition-colors duration-150",
          error
            ? "border-PrimaryRed"
            : "border-oonjai-cream-500 hover:border-oonjai-green-300 focus:border-oonjai-green-500",
          className
        )}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      {error && (
        <p className="text-xs text-PrimaryRed flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}
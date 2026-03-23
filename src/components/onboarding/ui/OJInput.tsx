import { InputHTMLAttributes } from "react"
import { clsx } from "clsx"

interface OJInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  required?: boolean
  error?: string
  prefix?: string
  hint?: string
}

export default function OJInput({
  label, required, error, prefix, hint, className, ...props
}: OJInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-oonjai-green-700">
          {label}
          {required && <span className="text-PrimaryRed ml-0.5">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-4 text-sm text-oonjai-green-700 pointer-events-none z-10">
            {prefix}
          </span>
        )}
        <input
          className={clsx(
            "w-full h-12 border rounded-xl px-4 text-sm outline-none",
            "bg-white text-oonjai-green-700 placeholder:text-lightGrey",
            "transition-colors duration-150",
            prefix && "pl-12",
            error
              ? "border-PrimaryRed bg-oonjai-red-50"
              : "border-oonjai-cream-500 hover:border-oonjai-green-300 focus:border-oonjai-green-500",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-PrimaryRed flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      )}
      {hint && !error && (
        <p className="text-xs text-lightGrey">{hint}</p>
      )}
    </div>
  )
}
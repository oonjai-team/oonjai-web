import { ButtonHTMLAttributes } from "react"
import { clsx } from "clsx"

interface OJButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost"
  loading?: boolean
}

export default function OJButton({
  variant = "primary", loading, children, className, disabled, ...props
}: OJButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={clsx(
        "w-full h-12 rounded-xl font-medium text-base transition-all duration-150",
        "flex items-center justify-center gap-2 cursor-pointer",
        variant === "primary" && [
          "bg-oonjai-green-500 text-white",
          "hover:bg-oonjai-green-600 active:scale-[0.99]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        ],
        variant === "ghost" && [
          "bg-transparent text-lightGrey underline underline-offset-2 text-sm h-auto py-2",
          "hover:text-oonjai-green-700",
        ],
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="flex gap-1 items-center">
          <span className="animate-bounce [animation-delay:0ms]">·</span>
          <span className="animate-bounce [animation-delay:150ms]">·</span>
          <span className="animate-bounce [animation-delay:300ms]">·</span>
        </span>
      ) : children}
    </button>
  )
}
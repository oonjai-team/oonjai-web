export default function OJContinueButton({
  label = "Continue", onClick, disabled, loading
}: Props) {
  return (
    <div className="w-full flex justify-center">
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className="w-full max-w-[564px] px-5 py-3.5 bg-oonjai-green-500
        rounded-[10px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.15)]
        flex justify-center items-center gap-2.5
        hover:bg-oonjai-green-600 transition-colors cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed">
        <span className="text-center text-white text-xl
        font-medium font-['Lexend']">
          {loading ? "Loading..." : label}
        </span>
      </button>
    </div>

  )
}
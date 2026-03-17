// src/components/onboarding/ui/OJSelectionCard.tsx
import Image from "next/image"
import { clsx } from "clsx"

interface Props {
  label: string
  image: string
  imageW: number
  imageH: number
  selected: boolean
  onClick: () => void
  labelSize?: string // default text-2xl for relationship, text-xl for goal, text-base for concern
}

export default function OJSelectionCard({
  label, image, imageW, imageH, selected, onClick, labelSize = "text-2xl"
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "w-64 px-20 py-3 bg-white rounded-lg",
        "outline outline-2 outline-offset-[-2px]",
        "flex flex-col items-center gap-2 overflow-hidden",
        "transition-all duration-150 cursor-pointer",
        selected
          ? "outline-oonjai-green-500 bg-oonjai-green-50"
          : "outline-lightGrey hover:outline-oonjai-green-300"
      )}
    >
      <Image src={image} alt={label} width={imageW} height={imageH}
        className="object-contain" />
      <span className={clsx(
        "text-center text-oonjai-green-500 font-['Lexend']",
        labelSize,
        selected ? "font-medium" : "font-normal"
      )}>
        {label}
      </span>
    </button>
  )
}
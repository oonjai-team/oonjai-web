interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export default function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-PrimaryGreen bg-white px-4 py-2 text-[11px] font-medium text-DarkGrey transition-colors hover:bg-oonjai-green-50 xl:gap-2.5 xl:px-5 xl:py-2.5 xl:text-xs 2xl:text-[13px]"
    >
      {icon}
      {label}
    </button>
  );
}

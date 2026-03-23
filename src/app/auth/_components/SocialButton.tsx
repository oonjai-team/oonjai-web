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
      className="flex w-full items-center justify-center gap-2 rounded-[8px] border border-PrimaryGreen bg-white px-4 py-3 text-md font-medium text-DarkGrey transition-colors hover:bg-oonjai-green-50"
    >
      {icon}
      {label}
    </button>
  );
}

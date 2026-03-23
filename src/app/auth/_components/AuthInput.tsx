interface AuthInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}

export default function AuthInput({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
}: AuthInputProps) {
  return (

    <div>
      <span className="sr-only">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="w-full rounded-[8px] border border-black/20 bg-white px-4 py-3.5 text-sm text-DarkGrey placeholder:text-lightGrey focus:border-oonjai-green-400 focus:outline-none transition-colors "
      />
    </div>

  );
}

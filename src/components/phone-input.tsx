import { forwardRef } from 'react';
import PhoneInput, { type Country } from 'react-phone-number-input';

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  defaultCountry?: Country;
}

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => (
  <input
    ref={ref}
    {...props}
  />
));
CustomInput.displayName = 'CustomInput';

export function PhoneInputField({
  value,
  onChange,
  disabled,
  name,
  placeholder,
  defaultCountry = 'IN',
}: PhoneInputFieldProps) {
  const bgClass = 'bg-white/2';

  const inputClass = `w-full rounded-xl border border-white/10 ${bgClass} py-2.5 px-4 text-sm text-white placeholder-gray-500 transition-all duration-300 outline-none focus:border-cyan-500/50 focus:bg-white/4 focus:ring-1 focus:ring-cyan-500/30 disabled:opacity-50 h-[42px]`;

  const containerClass = `flex items-center gap-2 [&>.PhoneInputCountry]:flex [&>.PhoneInputCountry]:items-center [&>.PhoneInputCountry]:rounded-xl [&>.PhoneInputCountry]:border [&>.PhoneInputCountry]:border-white/10 [&>.PhoneInputCountry]:${bgClass} [&>.PhoneInputCountry]:px-3 [&>.PhoneInputCountry]:h-[42px] [&>.PhoneInputCountry]:transition-all [&>.PhoneInputCountry:hover]:bg-white/5 [&_select]:cursor-pointer [&_.PhoneInputCountryIcon]:bg-transparent [&_.PhoneInputCountryIcon]:shadow-none [&_.PhoneInputCountryIconImg]:rounded-[2px]`;

  return (
    <PhoneInput
      international
      defaultCountry={defaultCountry}
      value={value}
      onChange={(val) => onChange(val || '')}
      disabled={disabled}
      name={name}
      placeholder={placeholder}
      inputComponent={CustomInput}
      numberInputProps={{ className: inputClass } as React.InputHTMLAttributes<HTMLInputElement>}
      className={containerClass}
    />
  );
}

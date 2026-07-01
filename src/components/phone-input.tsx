import { forwardRef, useEffect, useRef, useState } from 'react';

import { LuSearch } from 'react-icons/lu';
import PhoneInput, { type Country } from 'react-phone-number-input';

interface PhoneInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  name?: string;
  placeholder?: string;
  defaultCountry?: Country;
}

interface CountrySelectOption {
  value?: string;
  label: string;
  divider?: boolean;
}

interface CountrySelectProps {
  value?: string;
  onChange: (value?: string) => void;
  options: CountrySelectOption[];
  disabled?: boolean;
  readOnly?: boolean;
  iconComponent: React.ComponentType<{ country: string; label: string }>;
}

const CustomInput = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} />);
CustomInput.displayName = 'CustomInput';

function TailwindCountrySelect({
  value,
  onChange,
  options,
  disabled,
  readOnly,
  iconComponent: Icon,
}: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Reset query on close
  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchQuery('');
    }
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (val?: string) => {
    onChange(val === 'ZZ' ? undefined : val);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled || readOnly) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  // Filter options based on search query
  const filteredOptions = options.filter((option) => {
    if (option.divider) return !searchQuery; // Only show dividers when not searching
    return (
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (option.value &&
        option.value.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <div
      ref={containerRef}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="country-listbox"
      tabIndex={disabled || readOnly ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={() => {
        if (!disabled && !readOnly) {
          setIsOpen(!isOpen);
        }
      }}
      className="PhoneInputCountry relative cursor-pointer outline-none focus-visible:border-cyan-500/50 focus-visible:ring-1 focus-visible:ring-cyan-500/30"
    >
      {/* Current Flag & Arrow */}
      <span className="flex items-center gap-1.5 select-none">
        {value && Icon ? (
          <span className="flex items-center [&_svg]:h-[14px] [&_svg]:w-[21px] [&_svg]:rounded-[2px]">
            <Icon country={value} label={selectedOption?.label || ''} />
          </span>
        ) : (
          <span className="text-xs">🌍</span>
        )}
        <span className="text-[9px] font-black tracking-widest text-gray-500 uppercase transition-transform duration-200">
          {isOpen ? '▲' : '▼'}
        </span>
      </span>

      {/* Custom Dropdown List */}
      {isOpen && (
        <div
          id="country-listbox"
          role="listbox"
          className="absolute top-full left-0 z-50 mt-2 flex max-h-60 w-64 flex-col rounded-2xl border border-white/10 bg-[#05050A]/95 p-1.5 shadow-2xl backdrop-blur-md"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking scrollbar or menu padding
        >
          {/* Search Box */}
          <div className="relative mb-1.5 px-1 pt-0.5 pb-1">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
              <LuSearch className="size-3.5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country..."
              className="w-full rounded-lg border border-white/10 bg-white/5 py-1.5 pr-3 pl-8 text-xs text-white placeholder-gray-500 outline-none focus:border-cyan-500/50 focus:bg-white/5 focus:ring-1 focus:ring-cyan-500/30"
              onClick={(e) => e.stopPropagation()} // Prevent closing dropdown when clicking input
            />
          </div>

          {/* Options Container */}
          <div className="scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent space-y-0.5 overflow-y-auto pr-0.5">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-gray-500 select-none">
                No countries found
              </div>
            ) : (
              filteredOptions.map((option, idx) => {
                if (option.divider) {
                  return (
                    <div
                      key={`divider-${idx}`}
                      className="my-1 h-px bg-white/10"
                      role="separator"
                    />
                  );
                }
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value || 'ZZ'}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(option.value)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-xs font-semibold transition-all hover:bg-white/5 ${
                      isSelected
                        ? 'bg-cyan-500/10 text-cyan-400'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {option.value && Icon && (
                      <span className="flex shrink-0 items-center [&_svg]:h-[10px] [&_svg]:w-[15px] [&_svg]:rounded-[1px]">
                        <Icon country={option.value} label={option.label} />
                      </span>
                    )}
                    <span className="truncate">{option.label}</span>
                    {isSelected && (
                      <span className="ml-auto text-[10px] text-cyan-400">
                        ✓
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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

  const containerClass = `flex items-center gap-2 [&>.PhoneInputCountry]:flex [&>.PhoneInputCountry]:items-center [&>.PhoneInputCountry]:rounded-xl [&>.PhoneInputCountry]:border [&>.PhoneInputCountry]:border-white/10 [&>.PhoneInputCountry]:${bgClass} [&>.PhoneInputCountry]:px-3 [&>.PhoneInputCountry]:h-[42px] [&>.PhoneInputCountry]:transition-all [&>.PhoneInputCountry:hover]:bg-white/5 [&_.PhoneInputCountryIcon]:bg-transparent [&_.PhoneInputCountryIcon]:shadow-none [&_.PhoneInputCountryIconImg]:rounded-[2px]`;

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
      numberInputProps={
        { className: inputClass } as React.InputHTMLAttributes<HTMLInputElement>
      }
      countrySelectComponent={TailwindCountrySelect}
      className={containerClass}
      countryOptionsOrder={['IN', 'US', 'GB', '|', '...']}
      countryCallingCodeEditable={false}
    />
  );
}

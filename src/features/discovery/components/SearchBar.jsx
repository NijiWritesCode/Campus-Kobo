import { Search, X } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function SearchBar({
  value,
  onChange,
  onSubmit = null,
  placeholder = 'Search braids, tapers, acrylics, hostels...',
  autoFocus = false,
  className = '',
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn('relative w-full', className)}
    >
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
          <Search className="w-4 h-4 text-emerald-600" />
        </div>

        <input
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          enterKeyHint="search"
          autoComplete="off"
          spellCheck="false"
          className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-white border border-neutral-200/90 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 shadow-xs transition-all duration-200"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange?.('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 p-0.5 rounded-full bg-neutral-100 hover:bg-neutral-200" />
          </button>
        )}
      </div>
    </form>
  );
}

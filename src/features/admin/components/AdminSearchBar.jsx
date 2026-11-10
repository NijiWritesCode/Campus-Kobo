import { Search, X } from 'lucide-react';

export default function AdminSearchBar({
  value,
  onChange,
  placeholder = 'Search records...',
  className = '',
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-purple-800 shadow-2xs transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="p-1 rounded-md text-neutral-400 hover:text-neutral-600 absolute right-2 top-1/2 -translate-y-1/2"
          aria-label="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}

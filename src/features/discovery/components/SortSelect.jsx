import { ArrowUpDown } from 'lucide-react';

export default function SortSelect({ value, onChange }) {
  return (
    <div className="inline-flex items-center gap-2">
      <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
      <label htmlFor="sort-select" className="text-xs text-neutral-500 font-semibold whitespace-nowrap">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-xs font-bold text-neutral-900 bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-primary-500 cursor-pointer shadow-2xs"
      >
        <option value="recommended">Recommended & Top Rated</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Star Rating</option>
        <option value="popularity">Most Completed Bookings</option>
      </select>
    </div>
  );
}

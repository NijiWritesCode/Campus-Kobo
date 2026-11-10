import { Filter, RotateCcw } from 'lucide-react';
import Card from '@/components/ui/Card';
import { useCategories } from '../hooks/useCategories';
import { formatCurrency } from '@/lib/formatCurrency';

export default function FilterPanel({
  selectedCategory,
  onSelectCategory,
  maxPriceKobo,
  onChangeMaxPrice,
  minRating,
  onChangeMinRating,
  onReset,
  activeCount = 0,
}) {
  const { categories } = useCategories();

  return (
    <Card variant="default" padding="md" className="space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
            Filter Services
          </h3>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>

        {activeCount > 0 && (
          <button
            type="button"
            onClick={onReset}
            className="text-[11px] font-bold text-neutral-400 hover:text-emerald-700 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-700">Category</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              selectedCategory === 'all' || !selectedCategory
                ? 'bg-neutral-900 text-white shadow-2xs'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.slug || selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-purple-800 text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Ceiling Filter */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <label htmlFor="price-range" className="text-neutral-700">Max Starting Price</label>
          <span className="text-emerald-700 font-bold font-mono">
            {formatCurrency(maxPriceKobo)}
          </span>
        </div>
        <input
          id="price-range"
          type="range"
          min={150000} // ₦1,500
          max={1000000} // ₦10,000
          step={50000} // ₦500
          value={maxPriceKobo}
          onChange={(e) => onChangeMaxPrice(Number(e.target.value))}
          className="w-full accent-emerald-700 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-neutral-400 font-medium">
          <span>₦1,500</span>
          <span>₦10,000+</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-neutral-700">Minimum Rating</label>
        <div className="grid grid-cols-4 gap-1.5 text-center">
          {[0, 4.0, 4.5, 4.8].map((rt) => (
            <button
              key={rt}
              type="button"
              onClick={() => onChangeMinRating(rt)}
              className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                minRating === rt
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {rt === 0 ? 'Any' : `${rt}★+`}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}

import { Link } from 'react-router-dom';
import {
  Sparkles,
  Hand,
  Scissors,
  Palette,
  Eye,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { useCategories } from '../hooks/useCategories';

const CATEGORY_ICONS = {
  Sparkles: Sparkles,
  Hand: Hand,
  Scissors: Scissors,
  Palette: Palette,
  Eye: Eye,
  Heart: Heart,
};

export default function CategoryGrid({ showHeader = true }) {
  const { categories } = useCategories();

  return (
    <section aria-labelledby="explore-categories-heading" className="space-y-3">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h2 id="explore-categories-heading" className="text-base sm:text-lg font-bold text-neutral-900 font-display">
              Browse Categories
            </h2>
            <p className="text-xs text-neutral-500">
              Verified student providers across UNILAG
            </p>
          </div>
          <Link
            to="/app/search"
            className="text-xs font-semibold text-purple-800 hover:text-purple-950 inline-flex items-center gap-0.5"
          >
            <span>View All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}

      {/* Mobile-Friendly Category Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
        {categories.map((cat, idx) => {
          const Icon = CATEGORY_ICONS[cat.icon] || Sparkles;
          const isPurple = idx % 2 === 0;
          return (
            <Link
              key={cat.id}
              to={`/app/categories/${cat.slug}`}
              className="flex flex-col items-center text-center p-2.5 sm:p-3 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs group"
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-105 ${
                  isPurple
                    ? 'bg-purple-50 text-purple-900 border border-purple-200/80'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200/80'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-xs text-neutral-900 group-hover:text-neutral-950 truncate w-full">
                {cat.name}
              </h3>
              <span className="text-[10px] text-neutral-500 mt-0.5">
                {cat.providerCount} peers
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

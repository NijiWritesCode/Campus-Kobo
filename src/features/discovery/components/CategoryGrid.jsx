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
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import Badge from '@/components/ui/Badge';
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
    <section aria-labelledby="explore-categories-heading" className="space-y-4">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h2 id="explore-categories-heading" className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
              Browse by Category
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              Fixed-price services offered by verified university peers
            </p>
          </div>
          <Link
            to="/app/search"
            className="text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 group"
          >
            <span>All Services</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.icon] || Sparkles;
          return (
            <Link key={cat.id} to={`/app/categories/${cat.slug}`}>
              <SpotlightCard className="h-full p-4 sm:p-5 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
                {cat.badge && (
                  <div className="absolute top-2.5 right-2.5">
                    <Badge variant="primary" size="sm" className="text-[10px]">
                      {cat.badge}
                    </Badge>
                  </div>
                )}

                <div>
                  <div className="w-11 h-11 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:bg-primary-500 group-hover:text-white group-hover:scale-105 transition-all duration-200 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-neutral-900 group-hover:text-primary-600 transition-colors font-display">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-700">
                  <span>{cat.providerCount} student providers</span>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
                </div>
              </SpotlightCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

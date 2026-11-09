import { useParams, Link } from 'react-router-dom';
import { Sparkles, Hand, Scissors, Palette, Eye, Heart } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import ProviderCard from '../components/ProviderCard';
import EmptyState from '@/components/ui/EmptyState';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { useCategories } from '../hooks/useCategories';
import { mockProviders } from '@/mocks/data/providers';

const ICONS = {
  Sparkles,
  Hand,
  Scissors,
  Palette,
  Eye,
  Heart,
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { getCategoryBySlug } = useCategories();
  const category = getCategoryBySlug(categoryId);

  const Icon = category?.icon ? ICONS[category.icon] || Sparkles : Sparkles;

  const providers = mockProviders.filter(
    (prov) => prov.categoryId === categoryId || prov.categoryId === category?.id
  );

  if (!category) {
    return (
      <div className="py-12">
        <EmptyState
          title="Category not found"
          description="The service category you are looking for does not exist or has been retired."
          action={
            <Link to="/app">
              <Button variant="primary" size="sm">
                Back to Explore
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title={category.name}
        subtitle={`${providers.length} verified student providers at UNILAG`}
        backTo="/app"
      />

      {/* Category Hero Info Card */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-2xs space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Icon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-neutral-900 font-display">
                {category.name}
              </h2>
              {category.badge && (
                <Badge variant="primary" size="sm">
                  {category.badge}
                </Badge>
              )}
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-xl">
              {category.description}
            </p>
          </div>
        </div>

        {/* Popular Category Styles */}
        {category.popularStyles?.length > 0 && (
          <div className="pt-2 border-t border-neutral-100 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-400 font-medium">Popular:</span>
            {category.popularStyles.map((style) => (
              <Link
                key={style}
                to={`/app/search?q=${encodeURIComponent(style)}`}
                className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold transition-colors text-[11px]"
              >
                {style}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Provider List */}
      <section aria-labelledby="category-providers-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 id="category-providers-heading" className="text-sm font-bold text-neutral-900 font-display">
            Available Providers
          </h3>
          <span className="text-xs text-neutral-500 font-medium">
            {providers.length} verified
          </span>
        </div>

        {providers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((prov, index) => (
              <ProviderCard key={prov.id} provider={prov} isLCP={index === 0} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Sparkles className="w-6 h-6" />}
            title="No providers in this category yet"
            description="Be the first verified student to publish a service in this category."
            action={
              <Link to="/provider/services/new">
                <Button variant="primary" size="sm">
                  Become a Provider
                </Button>
              </Link>
            }
          />
        )}
      </section>
    </div>
  );
}

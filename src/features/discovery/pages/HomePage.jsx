import { useNavigate } from 'react-router-dom';
import { Sparkles, KeyRound, ArrowRight } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProviderCard from '../components/ProviderCard';
import Button from '@/components/ui/Button';
import { mockProviders } from '@/mocks/data/providers';

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (term) => {
    if (term.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(term.trim())}`);
    } else {
      navigate('/app/search');
    }
  };

  const topProviders = mockProviders.slice(0, 5);
  const recentProviders = mockProviders.slice(2, 6);

  return (
    <div className="space-y-10 pb-6">
      {/* Hero Greeting & Search */}
      <section className="space-y-4 pt-1">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-[11px] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNILAG Student Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
            Find student services on campus
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium">
            Book braids, fresh tapers, acrylics & glam right in your hostels
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="pt-1">
          <SearchBar
            placeholder="Search braids, skin fades, gel nails, Moremi Hall..."
            onChange={() => {}}
            onSubmit={handleSearchSubmit}
          />
        </div>
      </section>

      {/* Featured Campus Talent Carousel */}
      <FeaturedCarousel providers={topProviders} />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* Campus Trust Banner */}
      <section className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-lg text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 text-xs font-bold border border-emerald-800/80">
            <KeyRound className="w-3.5 h-3.5" />
            <span>Escrow-Protected Settlement</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Never pay before seeing your hair or nails
          </h2>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Your booking payment is safely held until you share your 6-digit completion PIN with your provider. No cash awkwardness.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/app/search')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Explore Listings
          </Button>
        </div>
      </section>

      {/* Popular in Hostels Grid */}
      <section aria-labelledby="nearby-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="nearby-heading" className="text-lg font-bold text-neutral-900 font-display">
              Popular Around Hostels
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              Verified providers serving Moremi, New Hall, and Jaja axis
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/app/search')}
          >
            View all ({mockProviders.length})
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProviders.map((prov) => (
            <ProviderCard key={prov.id} provider={prov} />
          ))}
        </div>
      </section>
    </div>
  );
}

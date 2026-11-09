import { useNavigate } from 'react-router-dom';
import { KeyRound, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import CategoryGrid from '../components/CategoryGrid';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProviderCard from '../components/ProviderCard';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { mockProviders } from '@/mocks/data/providers';

const QUICK_TAGS = [
  'Knotless Braids',
  'Skin Fade & Lineup',
  'Gel Acrylics',
  'Lash Sets',
  'Moremi Hall',
  'New Hall',
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleSearchSubmit = (term) => {
    if (term?.trim()) {
      navigate(`/app/search?q=${encodeURIComponent(term.trim())}`);
    } else {
      navigate('/app/search');
    }
  };

  const topProviders = mockProviders.slice(0, 5);
  const recentProviders = mockProviders.slice(2, 6);

  return (
    <div className="space-y-12 pb-8">
      {/* Hero Greeting & Search Header */}
      <section className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-white via-primary-50/20 to-neutral-50 border border-neutral-200/80 shadow-xs overflow-hidden">
        {/* Soft background ambient gradient */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm" dot>
              UNILAG Campus Pilot
            </Badge>
            <div className="hidden xs:flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Hostel-Verified Providers</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 font-display leading-tight">
              Book student talent on campus
            </h1>
            <p className="text-xs sm:text-base text-neutral-600 font-normal leading-relaxed">
              Find hairstylists, nail techs, barbers, and makeup artists right in your hostels. Transparent prices and escrow PIN safety.
            </p>
          </div>

          {/* Global Search Bar */}
          <div className="pt-2">
            <SearchBar
              placeholder="Search braids, skin fades, gel nails, Moremi Hall..."
              onSubmit={handleSearchSubmit}
              className="shadow-sm"
            />
          </div>

          {/* Quick search tags */}
          <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1 shrink-0">
              <Zap className="w-3 h-3 text-amber-500" />
              <span>Popular:</span>
            </span>
            {QUICK_TAGS.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSearchSubmit(tag)}
                className="shrink-0 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-neutral-100 text-neutral-700 text-[11px] font-medium border border-neutral-200/80 hover:border-neutral-300 transition-all cursor-pointer shadow-2xs"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campus Talent Carousel */}
      <FeaturedCarousel providers={topProviders} />

      {/* Categories Grid */}
      <CategoryGrid />

      {/* Campus Trust Banner */}
      <section className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden border border-neutral-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2.5 max-w-lg text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 text-xs font-bold border border-emerald-800/80">
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escrow-Protected Settlement</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
            Never pay before seeing your hair or nails
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            Your booking payment is safely held until you share your 6-digit completion PIN with your provider. No cash awkwardness.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto relative z-10">
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/app/search')}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="shadow-md shadow-primary-500/30"
          >
            Explore Listings
          </Button>
        </div>
      </section>

      {/* Popular in Hostels Grid */}
      <section aria-labelledby="nearby-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="nearby-heading" className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
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

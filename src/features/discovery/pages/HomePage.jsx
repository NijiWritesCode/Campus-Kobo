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
  'Skin Fade',
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
    <div className="space-y-6 sm:space-y-8 pb-4">
      {/* Mobile-First Search & Greeting Header */}
      <section className="space-y-3 pt-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" size="sm" dot>
              UNILAG Campus
            </Badge>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Hostel-Verified</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
            Find student services on campus
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600">
            Book verified peers in Moremi, New Hall, Jaja & across campus hostels
          </p>
        </div>

        {/* Search Bar */}
        <div>
          <SearchBar
            placeholder="Search braids, tapers, gel nails, Moremi Hall..."
            onSubmit={handleSearchSubmit}
          />
        </div>

        {/* Quick Search Tags */}
        <div className="flex items-center gap-1.5 pt-0.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1 shrink-0">
            <Zap className="w-3 h-3 text-purple-700" />
            <span>Popular:</span>
          </span>
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleSearchSubmit(tag)}
              className="shrink-0 px-2.5 py-1 rounded-md bg-white text-neutral-700 hover:text-neutral-950 text-[11px] font-medium border border-neutral-200 hover:border-neutral-300 transition-colors shadow-2xs"
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Categories Grid (Swipeable / Compact on Mobile) */}
      <CategoryGrid />

      {/* Featured Campus Talent Carousel */}
      <FeaturedCarousel providers={topProviders} />

      {/* Clean Escrow Trust Callout Banner (NO GRADIENTS) */}
      <section className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
            <KeyRound className="w-4 h-4 text-emerald-700" />
            <span>6-Digit Completion PIN Escrow</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
            Never pay before seeing your hair or nails
          </h2>
          <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
            Your booking funds are safely held until the service is delivered. You release payment by giving your provider the 6-digit PIN.
          </p>
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/app/search')}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Explore Services
          </Button>
        </div>
      </section>

      {/* Popular Around Hostels Grid */}
      <section aria-labelledby="nearby-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="nearby-heading" className="text-base sm:text-lg font-bold text-neutral-900 font-display">
              Popular Around Hostels
            </h2>
            <p className="text-xs text-neutral-500">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {recentProviders.map((prov) => (
            <ProviderCard key={prov.id} provider={prov} />
          ))}
        </div>
      </section>
    </div>
  );
}

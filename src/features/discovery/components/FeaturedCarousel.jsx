import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Award } from 'lucide-react';
import ProviderCard from './ProviderCard';

export default function FeaturedCarousel({ providers = [] }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section aria-labelledby="featured-providers-heading" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h2 id="featured-providers-heading" className="text-lg font-bold text-neutral-900 font-display">
              Featured Campus Talent
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              Top-rated student providers with verified booking records
            </p>
          </div>
        </div>

        {/* Desktop Carousel Controls */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="p-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 shadow-2xs transition-all focus:outline-none"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="p-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-600 hover:text-neutral-900 shadow-2xs transition-all focus:outline-none"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none snap-x snap-mandatory"
      >
        {providers.map((prov, idx) => (
          <div
            key={prov.id}
            className="w-[280px] sm:w-[310px] shrink-0 snap-start"
          >
            <ProviderCard provider={prov} isLCP={idx === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}

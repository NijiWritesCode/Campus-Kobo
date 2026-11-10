import { Link } from 'react-router-dom';
import { MapPin, Star, ShieldCheck } from 'lucide-react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ProviderCard({
  provider,
  isLCP = false,
  className = '',
}) {
  return (
    <Link to={`/app/providers/${provider.slug}`} className="block h-full group focus:outline-none">
      <Card
        variant="interactive"
        padding="none"
        className={`h-full flex flex-col justify-between overflow-hidden border border-neutral-200 hover:border-neutral-300 rounded-xl bg-white shadow-2xs ${className}`}
      >
        {/* Cover Image & Badges */}
        <div className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden">
          <img
            src={provider.coverPhoto}
            alt={provider.businessName}
            {...(isLCP
              ? { fetchpriority: 'high' }
              : { loading: 'lazy' })}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
          />

          {/* Top badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {provider.verified && (
              <span className="inline-flex items-center gap-1 bg-white text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
                <ShieldCheck className="w-3 h-3 text-emerald-700" />
                <span>Verified</span>
              </span>
            )}
            {provider.badges?.slice(0, 1).map((b) => (
              <span
                key={b}
                className="bg-purple-800 text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-2xs"
              >
                {b}
              </span>
            ))}
          </div>

          {/* Starting Price Pill */}
          <div className="absolute bottom-2 right-2 bg-neutral-900 text-white px-2 py-0.5 rounded-md text-xs font-bold shadow-2xs">
            From {formatCurrency(provider.startingPriceKobo)}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-3.5 flex-1 flex flex-col justify-between space-y-2.5">
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <Avatar
                size="sm"
                src={provider.avatar}
                name={provider.studentName}
                verified={provider.verified}
                className="mt-0.5 ring-1 ring-neutral-200"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-sm text-neutral-900 truncate group-hover:text-purple-900 transition-colors">
                  {provider.businessName}
                </h3>
                <p className="text-[11px] text-neutral-500 truncate">
                  {provider.studentName}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed pt-0.5">
              {provider.bio}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1 font-semibold text-neutral-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{Number(provider.rating).toFixed(1)}</span>
              <span className="text-neutral-500 font-normal">({provider.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-neutral-500 truncate max-w-[140px]">
              <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
              <span className="truncate">{provider.serviceArea}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

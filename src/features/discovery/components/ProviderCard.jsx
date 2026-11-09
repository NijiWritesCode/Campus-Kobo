import { Link } from 'react-router-dom';
import { MapPin, Star } from 'lucide-react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
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
        className={`h-full flex flex-col justify-between overflow-hidden ${className}`}
      >
        {/* Cover Image & Badges */}
        <div className="relative aspect-16/9 w-full bg-neutral-100 overflow-hidden">
          <img
            src={provider.coverPhoto}
            alt={provider.businessName}
            {...(isLCP
              ? { fetchpriority: 'high' }
              : { loading: 'lazy' })}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent" />

          {/* Top badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
            {provider.badges?.slice(0, 1).map((b) => (
              <Badge key={b} variant="primary" size="sm" className="bg-white/90 backdrop-blur-xs text-neutral-900 border-none shadow-xs">
                {b}
              </Badge>
            ))}
          </div>

          {/* Starting Price Pill */}
          <div className="absolute bottom-2.5 right-2.5 bg-neutral-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs">
            From {formatCurrency(provider.startingPriceKobo)}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-start gap-2.5">
              <Avatar
                size="sm"
                src={provider.avatar}
                name={provider.studentName}
                verified={provider.verified}
                className="mt-0.5"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-neutral-900 font-display truncate group-hover:text-primary-600 transition-colors">
                    {provider.businessName}
                  </h3>
                </div>
                <p className="text-[11px] text-neutral-500 truncate">
                  {provider.studentName}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed pt-1">
              {provider.bio}
            </p>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2.5 border-t border-neutral-100/90 flex items-center justify-between text-[11px] text-neutral-500">
            <div className="flex items-center gap-1 font-semibold text-neutral-900">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{Number(provider.rating).toFixed(1)}</span>
              <span className="text-neutral-400 font-normal">({provider.reviewCount})</span>
            </div>

            <div className="flex items-center gap-1 text-neutral-500 truncate max-w-[150px]">
              <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
              <span className="truncate">{provider.serviceArea}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

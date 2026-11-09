import { MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';

export default function ProviderHeader({ provider }) {
  return (
    <div className="space-y-4">
      {/* Cover Banner */}
      <div className="relative aspect-21/9 sm:aspect-4/1 w-full rounded-3xl overflow-hidden bg-neutral-200 shadow-xs border border-neutral-200/80">
        <img
          src={provider.coverPhoto}
          alt={`${provider.businessName} cover`}
          {...{ fetchpriority: 'high' }}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {provider.badges?.map((b) => (
            <Badge key={b} variant="primary" size="sm" className="bg-white/95 backdrop-blur-md text-neutral-900 border-none shadow-xs font-bold">
              {b}
            </Badge>
          ))}
        </div>
      </div>

      {/* Profile Info Row */}
      <div className="px-2 sm:px-4 -mt-12 sm:-mt-14 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex items-end gap-3.5">
          <Avatar
            size="xl"
            src={provider.avatar}
            name={provider.studentName}
            verified={provider.verified}
            className="ring-4 ring-white shadow-md shrink-0"
          />
          <div className="pt-2 sm:pt-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display">
                {provider.businessName}
              </h1>
              {provider.verified && (
                <span title="Verified Student Provider" className="inline-flex items-center gap-1 text-[11px] font-bold text-secondary-700 bg-secondary-50 px-2 py-0.5 rounded-full border border-secondary-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Student</span>
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500 font-medium">
              {provider.studentName} • {provider.campus}
            </p>
          </div>
        </div>

        {/* Rating & Quick Stats */}
        <div className="flex items-center gap-3 text-xs bg-white p-3 rounded-2xl border border-neutral-200/80 shadow-2xs">
          <div className="flex items-center gap-1.5 pr-3 border-r border-neutral-100">
            <StarRating value={provider.rating} size="sm" showValue reviewCount={provider.reviewCount} />
          </div>
          <div className="flex items-center gap-1 text-neutral-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-bold text-neutral-900">{provider.completedBookings}</span>
            <span>completed</span>
          </div>
        </div>
      </div>

      {/* Location & Bio */}
      <div className="px-2 sm:px-4 space-y-2 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
          <MapPin className="w-4 h-4 text-primary-500 shrink-0" />
          <span className="font-semibold text-neutral-800">Campus Base:</span>
          <span>{provider.serviceArea}</span>
          <span className="text-neutral-400">•</span>
          <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="text-neutral-500">Responds {provider.responseTime}</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-3xl">
          {provider.bio}
        </p>
      </div>
    </div>
  );
}

import { MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import StarRating from '@/components/ui/StarRating';

export default function ProviderHeader({ provider }) {
  return (
    <div className="space-y-4">
      {/* Cover Banner */}
      <div className="relative aspect-21/9 sm:aspect-4/1 w-full rounded-xl overflow-hidden bg-neutral-200 border border-neutral-200">
        <img
          src={provider.coverPhoto}
          alt={`${provider.businessName} cover`}
          {...{ fetchpriority: 'high' }}
          className="w-full h-full object-cover"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {provider.badges?.map((b) => (
            <span key={b} className="bg-purple-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-2xs">
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Profile Info Row */}
      <div className="px-1 sm:px-2 -mt-10 sm:-mt-12 relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="flex items-end gap-3">
          <Avatar
            size="xl"
            src={provider.avatar}
            name={provider.studentName}
            verified={provider.verified}
            className="ring-3 ring-white shadow-xs shrink-0"
          />
          <div className="pt-2 sm:pt-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
                {provider.businessName}
              </h1>
              {provider.verified && (
                <span title="Verified Student Provider" className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
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
        <div className="flex items-center gap-3 text-xs bg-white p-2.5 rounded-xl border border-neutral-200 shadow-2xs">
          <div className="flex items-center gap-1.5 pr-3 border-r border-neutral-200">
            <StarRating value={provider.rating} size="sm" showValue reviewCount={provider.reviewCount} />
          </div>
          <div className="flex items-center gap-1 text-neutral-600">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="font-bold text-neutral-900">{provider.completedBookings}</span>
            <span>completed</span>
          </div>
        </div>
      </div>

      {/* Location & Bio */}
      <div className="px-1 sm:px-2 space-y-2 pt-1">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0" />
            <span className="font-semibold text-neutral-800">Campus Base:</span>
            <span>{provider.serviceArea}</span>
          </div>
          <div className="flex items-center gap-1 text-neutral-500">
            <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span>Responds {provider.responseTime}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed max-w-3xl">
          {provider.bio}
        </p>
      </div>
    </div>
  );
}

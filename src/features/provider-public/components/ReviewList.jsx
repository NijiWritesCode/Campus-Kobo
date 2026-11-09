import { Star, ShieldCheck, MessageSquare } from 'lucide-react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import StarRating from '@/components/ui/StarRating';
import EmptyState from '@/components/ui/EmptyState';

export default function ReviewList({ reviews = [], ratingSummary }) {
  if (!reviews.length) {
    return (
      <EmptyState
        icon={<MessageSquare className="w-6 h-6" />}
        title="No reviews yet"
        description="Bookings fulfilled through Campus Kobo will display verified reviews here."
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Rating Breakdown Overview */}
      <Card variant="elevated" padding="md" className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
        <div className="text-center sm:border-r sm:border-neutral-100 sm:pr-4 space-y-1">
          <div className="text-4xl font-extrabold text-neutral-900 font-display">
            {Number(ratingSummary.average).toFixed(1)}
          </div>
          <StarRating value={ratingSummary.average} size="md" />
          <p className="text-xs text-neutral-400 font-medium">
            Based on {ratingSummary.count} verified booking{ratingSummary.count === 1 ? '' : 's'}
          </p>
        </div>

        {/* 5-Star to 1-Star Bar Distribution */}
        <div className="sm:col-span-2 space-y-1.5 text-xs">
          {[5, 4, 3, 2, 1].map((stars) => {
            const pct = ratingSummary.breakdown?.[stars] || 0;
            return (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-6 font-semibold text-neutral-600 flex items-center gap-0.5">
                  <span>{stars}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1 h-2 rounded-full bg-neutral-100 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-[11px] text-neutral-400 font-mono">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Review Items */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <Card key={rev.id} variant="default" padding="md" className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Avatar size="sm" src={rev.reviewerAvatar} name={rev.reviewerName} />
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">
                    {rev.reviewerName}
                  </h4>
                  <p className="text-[10px] text-neutral-400">
                    {rev.serviceTitle} • {rev.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {rev.verifiedBooking && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Booking</span>
                  </span>
                )}
                <StarRating value={rev.rating} size="sm" />
              </div>
            </div>

            <p className="text-xs text-neutral-700 leading-relaxed">
              "{rev.comment}"
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}

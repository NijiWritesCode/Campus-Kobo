import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowRight, KeyRound } from 'lucide-react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import BookingStatusBadge from './BookingStatusBadge';
import { formatCurrency } from '@/lib/formatCurrency';
import { BOOKING_STATUSES } from '@/lib/constants';

export default function BookingCard({ booking, onOpenReview = null }) {
  const isAccepted = booking.status === BOOKING_STATUSES.ACCEPTED || booking.status === BOOKING_STATUSES.AWAITING_PAYMENT;
  const isConfirmed = booking.status === BOOKING_STATUSES.CONFIRMED || booking.status === BOOKING_STATUSES.IN_PROGRESS;
  const isCompleted = booking.status === BOOKING_STATUSES.COMPLETED;

  return (
    <Card
      variant="interactive"
      padding="md"
      className="border border-neutral-200 hover:border-neutral-300 rounded-xl bg-white shadow-2xs space-y-3.5 transition-all"
    >
      {/* Top Header: Provider & Status */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <Avatar
            size="md"
            src={booking.providerAvatar}
            name={booking.providerName}
            className="ring-1 ring-neutral-200 shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-neutral-900 truncate font-display">
              {booking.businessName}
            </h3>
            <p className="text-[11px] text-neutral-500 truncate">
              {booking.providerName} • Ref: {booking.bookingReference}
            </p>
          </div>
        </div>

        <BookingStatusBadge status={booking.status} size="xs" />
      </div>

      {/* Service Details */}
      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100 space-y-1">
        <h4 className="text-xs font-bold text-neutral-900 font-display">
          {booking.serviceTitle}
        </h4>
        <p className="text-[11px] text-neutral-600">
          {booking.variantName} ({booking.durationMinutes} mins)
        </p>
      </div>

      {/* Date, Time & Location Badges */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-neutral-600">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="font-semibold text-neutral-800">{booking.displayDate || booking.date}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
          <span>{booking.timeSlot}</span>
        </div>
        <div className="flex items-center gap-1 text-neutral-500 truncate max-w-[200px]">
          <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="truncate">{booking.locationDetails || booking.locationTitle}</span>
        </div>
      </div>

      {/* Footer: Price & Contextual CTA */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
        <div>
          <span className="text-[10px] text-neutral-400 block font-medium">Total</span>
          <span className="text-sm font-bold text-neutral-900 font-display">
            {formatCurrency(booking.totalPriceKobo)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAccepted && (
            <Link to={`/app/checkout/${booking.id}`}>
              <Button variant="primary" size="sm">
                Pay Now
              </Button>
            </Link>
          )}

          {isConfirmed && (
            <Link to={`/app/bookings/${booking.id}/pin`}>
              <Button
                variant="secondary"
                size="sm"
                icon={<KeyRound className="w-3.5 h-3.5" />}
              >
                PIN: {booking.pin}
              </Button>
            </Link>
          )}

          {isCompleted && !booking.review && onOpenReview && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenReview(booking)}
            >
              Write Review
            </Button>
          )}

          <Link to={`/app/bookings/${booking.id}`}>
            <Button
              variant="ghost"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

import { Link } from 'react-router-dom';
import { Calendar, MapPin, Check, ArrowRight } from 'lucide-react';
import Card from '@/components/ui/Card';
import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatCurrency';

export default function BookingRequestCard({
  booking,
  onAccept,
  onDecline,
}) {
  return (
    <Card
      variant="elevated"
      padding="md"
      className="border border-neutral-200 rounded-xl bg-white shadow-2xs space-y-3.5"
    >
      {/* Client Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar size="md" src={booking.clientAvatar} name={booking.clientName} />
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-neutral-900 truncate font-display">
              {booking.clientName}
            </h3>
            <p className="text-[11px] text-neutral-500">
              Ref: {booking.bookingReference}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 shrink-0">
          New Request
        </span>
      </div>

      {/* Service & Rate Pill */}
      <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-100 flex items-center justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-neutral-900 font-display">
            {booking.serviceTitle}
          </h4>
          <span className="text-[11px] text-neutral-600">
            {booking.variantName} ({booking.durationMinutes} mins)
          </span>
        </div>
        <span className="text-sm font-black text-neutral-900 font-display shrink-0">
          {formatCurrency(booking.servicePriceKobo)}
        </span>
      </div>

      {/* Date, Time & Meeting Location */}
      <div className="space-y-1.5 text-xs text-neutral-600">
        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span className="font-semibold text-neutral-900">
            {booking.displayDate || booking.date} at {booking.timeSlot}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0" />
          <span className="truncate">{booking.locationDetails || booking.locationTitle}</span>
        </div>

        {booking.specialNotes && (
          <p className="text-[11px] text-neutral-500 italic pt-0.5 line-clamp-1">
            "{booking.specialNotes}"
          </p>
        )}
      </div>

      {/* Action Buttons: Accept / Decline / Details */}
      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-2">
        <Link to={`/provider/bookings/${booking.id}`}>
          <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3 h-3" />} iconPosition="right">
            Details
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          {onDecline && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDecline(booking.id)}
              className="text-rose-700 border-rose-200 hover:bg-rose-50"
            >
              Decline
            </Button>
          )}

          {onAccept && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onAccept(booking.id)}
              icon={<Check className="w-3.5 h-3.5" />}
            >
              Accept
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

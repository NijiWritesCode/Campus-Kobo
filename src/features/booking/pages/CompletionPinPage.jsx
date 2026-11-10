import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/ui/EmptyState';
import PinDisplay from '../components/PinDisplay';
import { useBookings } from '../hooks/useBookings';
import { formatCurrency } from '@/lib/formatCurrency';

export default function CompletionPinPage() {
  const { bookingId } = useParams();
  const { getBooking } = useBookings();

  const booking = getBooking(bookingId);

  if (!booking) {
    return (
      <div className="py-12">
        <EmptyState
          title="Booking not found"
          description="Could not locate this booking."
          action={
            <Link to="/app/bookings">
              <Button variant="primary" size="sm">
                View All Bookings
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16 max-w-lg mx-auto">
      <PageHeader
        title="Completion Release PIN"
        subtitle={`Ref: ${booking.bookingReference}`}
        backTo={`/app/bookings/${booking.id}`}
      />

      {/* Main 6-Digit PIN Display Card */}
      <PinDisplay
        pin={booking.pin}
        bookingReference={booking.bookingReference}
      />

      {/* Appointment Snapshot */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
        <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
          <Avatar size="md" src={booking.providerAvatar} name={booking.providerName} />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 font-display truncate">
              {booking.businessName}
            </h4>
            <p className="text-[11px] text-neutral-500">
              {booking.serviceTitle} • {booking.variantName}
            </p>
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-neutral-600">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Date:</span>
            </span>
            <span className="font-semibold text-neutral-900">
              {booking.displayDate || booking.date}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>Time Slot:</span>
            </span>
            <span className="font-semibold text-neutral-900">
              {booking.timeSlot}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-neutral-500">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Location:</span>
            </span>
            <span className="font-semibold text-neutral-900 truncate max-w-[200px]">
              {booking.locationDetails || booking.locationTitle}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
            <span className="text-neutral-500">Total Escrowed:</span>
            <span className="font-black text-sm text-emerald-800 font-display">
              {formatCurrency(booking.totalPriceKobo)}
            </span>
          </div>
        </div>
      </div>

      {/* Return to Booking Details Button */}
      <Link to={`/app/bookings/${booking.id}`} className="block">
        <Button variant="outline" size="md" fullWidth>
          Return to Booking Details
        </Button>
      </Link>
    </div>
  );
}

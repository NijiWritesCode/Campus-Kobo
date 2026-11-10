import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  ShieldCheck,
  KeyRound,
  MessageCircle,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/ui/EmptyState';
import BookingStatusBadge from '@/features/booking/components/BookingStatusBadge';
import BookingTimeline from '@/features/booking/components/BookingTimeline';
import PinSubmissionModal from '../components/PinSubmissionModal';
import { useProviderBookings } from '../hooks/useProviderBookings';
import { useProviderEarnings } from '../hooks/useProviderEarnings';
import { BOOKING_STATUSES } from '@/lib/constants';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ProviderBookingDetail() {
  const { bookingId } = useParams();
  const { getBooking, verifyPin } = useProviderBookings();
  const { creditReleasedEscrow } = useProviderEarnings();
  const [pinModalOpen, setPinModalOpen] = useState(false);

  const booking = getBooking(bookingId);

  if (!booking) {
    return (
      <div className="py-12">
        <EmptyState
          title="Booking not found"
          description="We couldn't locate this booking."
          action={
            <Link to="/provider/bookings">
              <Button variant="primary" size="sm">
                Return to Bookings
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isConfirmedOrInProgress =
    booking.status === BOOKING_STATUSES.CONFIRMED ||
    booking.status === BOOKING_STATUSES.IN_PROGRESS;

  const isCompleted = booking.status === BOOKING_STATUSES.COMPLETED;

  const handleVerifyPin = (id, pin) => {
    const res = verifyPin(id, pin);
    if (res.success) {
      creditReleasedEscrow(res.netPayoutKobo, res.booking.bookingReference);
      toast.success('PIN verified! Payment disbursed to your wallet.');
    }
    return res;
  };

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title={`Appointment #${booking.bookingReference}`}
        subtitle={`Client: ${booking.clientName} • UNILAG`}
        backTo="/provider/bookings"
      />

      {/* Status & PIN CTA Banner */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-bold font-display">
            Current Status
          </span>
          <div className="pt-1">
            <BookingStatusBadge status={booking.status} size="md" />
          </div>
        </div>

        {isConfirmedOrInProgress && (
          <Button
            variant="primary"
            size="md"
            onClick={() => setPinModalOpen(true)}
            icon={<KeyRound className="w-4 h-4" />}
          >
            Enter 6-Digit Release PIN
          </Button>
        )}

        {isCompleted && (
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Escrow Settled & Transferred</span>
          </div>
        )}
      </div>

      {/* Stepper Timeline */}
      <BookingTimeline status={booking.status} />

      {/* Client Profile Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
          Client Information
        </h3>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg" src={booking.clientAvatar} name={booking.clientName} />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-neutral-900 font-display">
                  {booking.clientName}
                </h4>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>Verified Student</span>
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                UNILAG Student • {booking.clientPhone}
              </p>
            </div>
          </div>

          {booking.clientPhone && (
            <a
              href={`https://wa.me/${booking.clientPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp Client</span>
            </a>
          )}
        </div>
      </div>

      {/* Appointment Location & Instructions */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
          Location & Service Scope
        </h3>

        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4 pb-2 border-b border-neutral-100">
            <div>
              <span className="font-bold text-sm text-neutral-900 block font-display">
                {booking.serviceTitle}
              </span>
              <span className="text-neutral-500">
                {booking.variantName} ({booking.durationMinutes} mins)
              </span>
            </div>
            <span className="font-bold text-sm text-neutral-900 font-display">
              {formatCurrency(booking.servicePriceKobo)}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-700">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-700" />
              <span>Date & Time</span>
            </span>
            <span className="font-semibold text-neutral-900">
              {booking.displayDate || booking.date} at {booking.timeSlot}
            </span>
          </div>

          <div className="flex items-start justify-between text-neutral-700 gap-4">
            <span className="text-neutral-500 flex items-center gap-1.5 shrink-0">
              <MapPin className="w-3.5 h-3.5 text-neutral-400" />
              <span>Location</span>
            </span>
            <span className="font-semibold text-neutral-900 text-right">
              {booking.locationDetails || booking.locationTitle}
            </span>
          </div>

          {booking.specialNotes && (
            <div className="pt-2 border-t border-neutral-100">
              <span className="text-neutral-400 font-medium block mb-0.5">
                Client Notes:
              </span>
              <p className="text-neutral-700 italic bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                "{booking.specialNotes}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Financial Payout Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-2 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
          Payout Terms
        </h3>

        <div className="flex items-center justify-between text-neutral-600">
          <span>Your Net Service Payout</span>
          <strong className="text-base font-black text-emerald-800 font-display">
            {formatCurrency(booking.servicePriceKobo)}
          </strong>
        </div>

        <p className="text-[11px] text-neutral-500 pt-1 leading-relaxed">
          The 10% platform safety & dispute fee was covered by the client at checkout. You receive 100% of your listed rate directly into your wallet upon PIN release.
        </p>
      </div>

      {/* PIN Submission Modal */}
      <PinSubmissionModal
        isOpen={pinModalOpen}
        onClose={() => setPinModalOpen(false)}
        booking={booking}
        onVerifyPin={handleVerifyPin}
      />
    </div>
  );
}

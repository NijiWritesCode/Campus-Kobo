import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  KeyRound,
  MessageCircle,
  Star,
  CheckCircle2,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/ui/EmptyState';
import BookingStatusBadge from '../components/BookingStatusBadge';
import BookingTimeline from '../components/BookingTimeline';
import CancelBookingModal from '../components/CancelBookingModal';
import ReviewModal from '../components/ReviewModal';
import { useBookings } from '../hooks/useBookings';
import { BOOKING_STATUSES } from '@/lib/constants';
import { formatCurrency } from '@/lib/formatCurrency';

export default function BookingDetailPage() {
  const { bookingId } = useParams();
  const { getBooking, cancelBooking, submitReview } = useBookings();

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  const booking = getBooking(bookingId);

  if (!booking) {
    return (
      <div className="py-12">
        <EmptyState
          title="Booking not found"
          description="We couldn't locate this booking reference. It may have been cancelled or deleted."
          action={
            <Link to="/app/bookings">
              <Button variant="primary" size="sm">
                Back to Appointments
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isAccepted =
    booking.status === BOOKING_STATUSES.ACCEPTED ||
    booking.status === BOOKING_STATUSES.AWAITING_PAYMENT;
  const isConfirmed =
    booking.status === BOOKING_STATUSES.CONFIRMED ||
    booking.status === BOOKING_STATUSES.IN_PROGRESS;
  const isCompleted = booking.status === BOOKING_STATUSES.COMPLETED;
  const isCancellable = [
    BOOKING_STATUSES.REQUESTED,
    BOOKING_STATUSES.ACCEPTED,
    BOOKING_STATUSES.AWAITING_PAYMENT,
    BOOKING_STATUSES.CONFIRMED,
  ].includes(booking.status);

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title={`Booking #${booking.bookingReference}`}
        subtitle={`Placed on ${new Date(booking.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
        backTo="/app/bookings"
      />

      {/* Top Status & Contextual Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs">
        <div>
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block font-display">
            Current Booking Status
          </span>
          <div className="pt-1">
            <BookingStatusBadge status={booking.status} size="md" />
          </div>
        </div>

        {/* Action button inside banner */}
        <div className="flex items-center gap-2">
          {isAccepted && (
            <Link to={`/app/checkout/${booking.id}`}>
              <Button variant="primary" size="sm">
                Complete Payment ({formatCurrency(booking.totalPriceKobo)})
              </Button>
            </Link>
          )}

          {isConfirmed && (
            <Link to={`/app/bookings/${booking.id}/pin`}>
              <Button
                variant="primary"
                size="sm"
                icon={<KeyRound className="w-4 h-4" />}
              >
                View 6-Digit PIN
              </Button>
            </Link>
          )}

          {isCompleted && !booking.review && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setReviewModalOpen(true)}
              icon={<Star className="w-4 h-4" />}
            >
              Write Review
            </Button>
          )}
        </div>
      </div>

      {/* Visual Stepper Timeline */}
      <BookingTimeline status={booking.status} />

      {/* 6-Digit PIN Banner (if confirmed) */}
      {isConfirmed && (
        <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-2.5">
            <KeyRound className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-purple-950 font-display">
                Completion PIN: {booking.pin}
              </span>
              <p className="text-[11px] text-purple-800 leading-tight">
                Hold this code until your service is completed. Giving this PIN to the provider releases their payment.
              </p>
            </div>
          </div>

          <Link to={`/app/bookings/${booking.id}/pin`} className="shrink-0">
            <Button variant="secondary" size="sm">
              Show Full Screen
            </Button>
          </Link>
        </div>
      )}

      {/* Provider Contact & Info Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
          Student Provider
        </h3>

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar size="lg" src={booking.providerAvatar} name={booking.providerName} />
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-neutral-900 font-display">
                  {booking.businessName}
                </h4>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                {booking.providerName} • {booking.providerCampusArea}
              </p>
            </div>
          </div>

          {booking.providerPhone && (
            <a
              href={`https://wa.me/${booking.providerPhone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors shadow-2xs"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Service & Meeting Details Card */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
          Appointment Details
        </h3>

        <div className="space-y-3 text-xs">
          <div className="flex items-start justify-between gap-4 pb-2.5 border-b border-neutral-100">
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
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Date</span>
            </span>
            <span className="font-semibold text-neutral-900">
              {booking.displayDate || booking.date}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-700">
            <span className="text-neutral-500 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-700" />
              <span>Time Slot</span>
            </span>
            <span className="font-semibold text-neutral-900">
              {booking.timeSlot}
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
                Special Instructions:
              </span>
              <p className="text-neutral-700 italic bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                "{booking.specialNotes}"
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment & Receipt Summary */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
          Financial Summary
        </h3>

        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between text-neutral-600">
            <span>Service Rate</span>
            <span className="font-semibold text-neutral-800">
              {formatCurrency(booking.servicePriceKobo)}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-600">
            <span>Campus Escrow & Safety (10%)</span>
            <span className="font-semibold text-neutral-800">
              {formatCurrency(booking.platformFeeKobo)}
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-200 flex items-center justify-between">
            <span className="font-bold text-sm text-neutral-900 font-display">Total Price</span>
            <span className="text-base font-black text-emerald-800 font-display">
              {formatCurrency(booking.totalPriceKobo)}
            </span>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Payment Status</span>
            <span className="font-bold text-neutral-800 flex items-center gap-1">
              {booking.isEscrowFunded ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Escrow Funded ({booking.paymentMethod || 'Card'})</span>
                </>
              ) : (
                <span>Unpaid / Pending Escrow</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Review Card if reviewed */}
      {booking.review && (
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
              Your Verified Review
            </h3>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{booking.review.rating} / 5</span>
            </div>
          </div>

          {booking.review.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {booking.review.tags.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-50 text-purple-900 border border-purple-200">
                  {t}
                </span>
              ))}
            </div>
          )}

          {booking.review.comment && (
            <p className="text-xs text-neutral-700 leading-relaxed italic bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
              "{booking.review.comment}"
            </p>
          )}
        </div>
      )}

      {/* Cancellation or Dispute Button */}
      {isCancellable && (
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setCancelModalOpen(true)}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 underline focus:outline-none"
          >
            Cancel this booking request
          </button>
        </div>
      )}

      {/* Cancellation Modal */}
      <CancelBookingModal
        isOpen={cancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
        booking={booking}
        onConfirmCancel={cancelBooking}
      />

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        booking={booking}
        onSubmitReview={submitReview}
      />
    </div>
  );
}

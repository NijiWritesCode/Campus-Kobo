import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  KeyRound,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import BookingStatusBadge from '@/features/booking/components/BookingStatusBadge';
import BookingTimeline from '@/features/booking/components/BookingTimeline';
import { mockBookings } from '@/mocks/data/bookings';
import { formatCurrency } from '@/lib/formatCurrency';

export default function AdminBookingDetail() {
  const { id } = useParams();
  const booking = mockBookings.find((b) => b.id === id);

  if (!booking) {
    return (
      <div className="py-12">
        <EmptyState
          title="Booking record not found"
          description="We couldn't locate this campus appointment."
          action={
            <Link to="/admin/bookings">
              <Button variant="primary" size="sm">
                Return to Bookings
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handleManualRelease = () => {
    const confirmed = window.confirm(
      'Administrative Override: Manually release escrow to provider without client PIN?'
    );
    if (confirmed) {
      toast.success(`Escrow of ${formatCurrency(booking.servicePriceKobo)} released to ${booking.providerName}`);
    }
  };

  const handleForceRefund = () => {
    const confirmed = window.confirm(
      'Administrative Action: Cancel booking and refund 100% of escrow back to client?'
    );
    if (confirmed) {
      toast.error(`Refund of ${formatCurrency(booking.totalAmountKobo || booking.servicePriceKobo)} initiated to client.`);
    }
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <PageHeader
        title={`Appointment #${booking.bookingReference}`}
        subtitle={`${booking.serviceTitle} • ${booking.displayDate || booking.date}`}
        backTo="/admin/bookings"
      />

      {/* Status & PIN Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-display">
            Current Status
          </span>
          <div className="pt-1 flex items-center gap-2">
            <BookingStatusBadge status={booking.status} size="md" />
            <span className="text-xs text-neutral-500 font-mono">
              ID: {booking.id}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {booking.completionPin && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-900">
              <KeyRound className="w-4 h-4 text-purple-700" />
              <span>PIN: {booking.completionPin}</span>
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={handleForceRefund}
            className="text-rose-700 border-rose-300 hover:bg-rose-50"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Force Refund
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleManualRelease}
            icon={<ShieldCheck className="w-3.5 h-3.5" />}
          >
            Manual Escrow Release
          </Button>
        </div>
      </div>

      {/* Stepper Timeline */}
      <BookingTimeline status={booking.status} />

      {/* Grid: Parties & Financial Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client & Provider Parties */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
            Appointment Participants
          </h3>

          <div className="space-y-4 text-xs">
            {/* Client */}
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1">
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                Client (Student)
              </span>
              <div className="flex items-center justify-between">
                <strong className="text-neutral-900 font-display">{booking.clientName}</strong>
                <span className="font-mono text-neutral-600">{booking.clientPhone}</span>
              </div>
            </div>

            {/* Provider */}
            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-200 space-y-1">
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                Provider Business
              </span>
              <div className="flex items-center justify-between">
                <strong className="text-purple-950 font-display">{booking.providerName}</strong>
                <span className="font-mono text-purple-800">{booking.providerPhone}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2 pt-1 text-neutral-700">
              <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-neutral-900 block">Meeting Campus Location:</span>
                <span className="text-neutral-600">{booking.locationDetails || booking.locationTitle}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Escrow Financial Ledger Card */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
              Escrow Financial Ledger
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              Paystack Mock Verified
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500">Service Base Amount</span>
              <span className="font-bold text-neutral-900 font-display">
                {formatCurrency(booking.servicePriceKobo)}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500">Platform Safety Fee (10%)</span>
              <span className="font-bold text-emerald-800 font-display">
                +{formatCurrency(booking.platformFeeKobo || Math.round(booking.servicePriceKobo * 0.1))}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-neutral-900 font-display">Total Charged to Client</span>
              <strong className="text-base font-black text-neutral-900 font-display">
                {formatCurrency(booking.totalAmountKobo || Math.round(booking.servicePriceKobo * 1.1))}
              </strong>
            </div>

            <div className="p-3 rounded-xl bg-neutral-900 text-white space-y-1.5 mt-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">Locked Escrow Payout:</span>
                <strong className="text-emerald-400 font-display text-sm">
                  {formatCurrency(booking.servicePriceKobo)}
                </strong>
              </div>
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Funds are held in secure escrow until the 6-digit PIN is verified or an administrative verdict is reached.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

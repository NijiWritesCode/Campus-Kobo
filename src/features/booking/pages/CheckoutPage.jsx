import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/ui/EmptyState';
import PriceBreakdown from '../components/PriceBreakdown';
import PaystackMockModal from '../components/PaystackMockModal';
import { useBookings } from '../hooks/useBookings';
import { BOOKING_STATUSES } from '@/lib/constants';
import { formatCurrency } from '@/lib/formatCurrency';

export default function CheckoutPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getBooking, confirmPayment } = useBookings();
  const [payModalOpen, setPayModalOpen] = useState(false);

  const booking = getBooking(bookingId);

  if (!booking) {
    return (
      <div className="py-12">
        <EmptyState
          title="Booking not found"
          description="The booking reference does not exist or has expired."
          action={
            <Link to="/app/bookings">
              <Button variant="primary" size="sm">
                View My Bookings
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isAlreadyPaid =
    booking.status === BOOKING_STATUSES.CONFIRMED ||
    booking.status === BOOKING_STATUSES.IN_PROGRESS ||
    booking.status === BOOKING_STATUSES.COMPLETED;

  const handlePaymentSuccess = (paymentDetails) => {
    confirmPayment(booking.id, paymentDetails);
    toast.success('Payment successfully escrowed! 6-Digit PIN generated.');
    navigate(`/app/bookings/${booking.id}/pin`, { replace: true });
  };

  return (
    <div className="space-y-6 pb-12 max-w-xl mx-auto">
      <PageHeader
        title="Checkout & Escrow Lock"
        subtitle={`Booking Reference: ${booking.bookingReference}`}
        backTo="/app/bookings"
      />

      {isAlreadyPaid ? (
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-2xs text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-neutral-900 font-display">
              Payment Already Escrowed
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Your appointment is confirmed and payment is held safely in campus escrow.
            </p>
          </div>
          <Link to={`/app/bookings/${booking.id}/pin`}>
            <Button variant="primary" size="md">
              View 6-Digit Completion PIN
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Booking Summary Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-3">
                <Avatar size="lg" src={booking.providerAvatar} name={booking.providerName} />
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 font-display">
                    {booking.businessName}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {booking.providerName} • UNILAG
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block font-medium">Total Due</span>
                <span className="text-base font-black text-neutral-900 font-display">
                  {formatCurrency(booking.totalPriceKobo)}
                </span>
              </div>
            </div>

            {/* Service & Variant details */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-700">
                <span className="text-neutral-500">Service:</span>
                <span className="font-bold text-neutral-900 font-display">
                  {booking.serviceTitle}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-700">
                <span className="text-neutral-500">Variant:</span>
                <span className="font-semibold text-purple-900">
                  {booking.variantName}
                </span>
              </div>

              <div className="flex items-center justify-between text-neutral-700">
                <span className="text-neutral-500">Date & Time:</span>
                <span className="font-semibold text-neutral-800">
                  {booking.displayDate || booking.date} at {booking.timeSlot}
                </span>
              </div>

              <div className="flex items-start justify-between text-neutral-700 gap-4">
                <span className="text-neutral-500 shrink-0">Meeting Spot:</span>
                <span className="font-semibold text-neutral-800 text-right">
                  {booking.locationDetails || booking.locationTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <PriceBreakdown
            servicePriceKobo={booking.servicePriceKobo}
            platformFeeKobo={booking.platformFeeKobo}
            totalPriceKobo={booking.totalPriceKobo}
            showTrustCallout={true}
          />

          {/* Checkout CTA */}
          <div className="space-y-3 pt-1">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => setPayModalOpen(true)}
              icon={<Lock className="w-4 h-4" />}
            >
              Pay {formatCurrency(booking.totalPriceKobo)} into Escrow
            </Button>

            <p className="text-[11px] text-center text-neutral-500 leading-relaxed">
              Secured with 256-bit encryption. Funds remain in escrow until you release your 6-digit PIN upon service satisfaction.
            </p>
          </div>
        </div>
      )}

      {/* Paystack Simulation Gateway Modal */}
      <PaystackMockModal
        isOpen={payModalOpen}
        onClose={() => setPayModalOpen(false)}
        booking={booking}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}

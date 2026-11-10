import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Clock,
  KeyRound,
  ShieldCheck,
  Calendar,
  Wallet,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import DashboardStats from '../components/DashboardStats';
import BookingRequestCard from '../components/BookingRequestCard';
import PinSubmissionModal from '../components/PinSubmissionModal';
import { useProviderBookings } from '../hooks/useProviderBookings';
import { useProviderEarnings } from '../hooks/useProviderEarnings';
import { useAuthStore } from '@/stores/authStore';

export default function ProviderDashboard() {
  const { user } = useAuthStore();
  const {
    pendingRequests,
    upcomingBookings,
    completedBookings,
    verifyPin,
  } = useProviderBookings();

  const {
    availableBalanceKobo,
    pendingEscrowBalanceKobo,
    creditReleasedEscrow,
  } = useProviderEarnings();

  const [activePinBooking, setActivePinBooking] = useState(null);

  const handleAcceptRequest = (_bookingId) => {
    toast.success('Booking request accepted! Client has been notified to complete payment.');
  };

  const handleDeclineRequest = (_bookingId) => {
    toast.success('Booking request declined.');
  };

  const handleVerifyPin = (bookingId, pin) => {
    const res = verifyPin(bookingId, pin);
    if (res.success) {
      creditReleasedEscrow(res.netPayoutKobo, res.booking.bookingReference);
      toast.success('PIN verified! Payment disbursed to your wallet.');
    }
    return res;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Provider Greeting Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded-md border border-purple-200">
              Provider Hub
            </span>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Verified Campus Provider</span>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display mt-1">
            Welcome, {user?.name || 'Adaeze'}!
          </h1>
          <p className="text-xs text-neutral-500">
            Beauty by Ada • UNILAG Campus Operations
          </p>
        </div>

        {/* Public Profile Link */}
        <div className="flex items-center gap-2">
          <Link to="/app/providers/beauty-by-ada" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              View My Public Listing
            </Button>
          </Link>
          <Link to="/provider/services/new">
            <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              Add Service
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Overview Cards */}
      <DashboardStats
        pendingCount={pendingRequests.length}
        upcomingCount={upcomingBookings.length}
        completedCount={completedBookings.length}
        availableBalanceKobo={availableBalanceKobo}
        pendingEscrowKobo={pendingEscrowBalanceKobo}
      />

      {/* Quick Provider Actions Pill Bar */}
      <div className="p-3.5 rounded-xl bg-white border border-neutral-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-bold text-neutral-700 font-display">
          Quick Actions:
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {upcomingBookings.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setActivePinBooking(upcomingBookings[0])}
              icon={<KeyRound className="w-3.5 h-3.5" />}
            >
              Verify Client PIN
            </Button>
          )}
          <Link to="/provider/availability">
            <Button variant="outline" size="sm" icon={<Clock className="w-3.5 h-3.5" />}>
              Weekly Hours
            </Button>
          </Link>
          <Link to="/provider/earnings">
            <Button variant="outline" size="sm" icon={<Wallet className="w-3.5 h-3.5" />}>
              Withdraw Earnings
            </Button>
          </Link>
        </div>
      </div>

      {/* Incoming Requests Section */}
      <section aria-labelledby="requests-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="requests-heading" className="text-base sm:text-lg font-bold text-neutral-900 font-display">
              New Booking Requests ({pendingRequests.length})
            </h2>
            <p className="text-xs text-neutral-500">
              Students waiting for your acceptance before escrowing payment
            </p>
          </div>
          <Link to="/provider/bookings" className="text-xs font-semibold text-purple-800 hover:text-purple-950">
            View All
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-white border border-neutral-200">
            <p className="text-xs text-neutral-500">
              No pending requests at this moment. You are all caught up!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingRequests.map((b) => (
              <BookingRequestCard
                key={b.id}
                booking={b}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
              />
            ))}
          </div>
        )}
      </section>

      {/* Upcoming Today / Tomorrow Schedule */}
      <section aria-labelledby="upcoming-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="upcoming-heading" className="text-base sm:text-lg font-bold text-neutral-900 font-display">
              Confirmed Appointments ({upcomingBookings.length})
            </h2>
            <p className="text-xs text-neutral-500">
              Funds are locked in escrow. Obtain client PIN upon service completion to release funds.
            </p>
          </div>
          <Link to="/provider/bookings" className="text-xs font-semibold text-purple-800 hover:text-purple-950">
            Schedule View
          </Link>
        </div>

        {upcomingBookings.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-white border border-neutral-200">
            <p className="text-xs text-neutral-500">
              No confirmed appointments scheduled for today or tomorrow.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-neutral-900 font-display">
                      {b.serviceTitle}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Escrow Funded
                    </span>
                  </div>
                  <p className="text-neutral-500">
                    Client: <strong className="text-neutral-800">{b.clientName}</strong> • {b.variantName}
                  </p>
                  <div className="flex items-center gap-3 text-neutral-600 pt-0.5">
                    <span className="flex items-center gap-1 font-semibold text-neutral-800">
                      <Calendar className="w-3.5 h-3.5 text-purple-700" />
                      {b.displayDate || b.date} at {b.timeSlot}
                    </span>
                    <span>•</span>
                    <span className="truncate max-w-[200px]">{b.locationDetails || b.locationTitle}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setActivePinBooking(b)}
                    icon={<KeyRound className="w-3.5 h-3.5" />}
                  >
                    Enter Release PIN
                  </Button>
                  <Link to={`/provider/bookings/${b.id}`}>
                    <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PIN Submission Verification Modal */}
      <PinSubmissionModal
        isOpen={Boolean(activePinBooking)}
        onClose={() => setActivePinBooking(null)}
        booking={activePinBooking}
        onVerifyPin={handleVerifyPin}
      />
    </div>
  );
}

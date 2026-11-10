import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  KeyRound,
  ArrowRight,
  MapPin,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import BookingStatusBadge from '@/features/booking/components/BookingStatusBadge';
import BookingRequestCard from '../components/BookingRequestCard';
import PinSubmissionModal from '../components/PinSubmissionModal';
import { useProviderBookings } from '../hooks/useProviderBookings';
import { useProviderEarnings } from '../hooks/useProviderEarnings';
import { formatCurrency } from '@/lib/formatCurrency';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'requests', label: 'New Requests' },
  { id: 'upcoming', label: 'Upcoming / Confirmed' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function ProviderBookings() {
  const [activeTab, setActiveTab] = useState('requests');
  const [pinBooking, setPinBooking] = useState(null);

  const {
    pendingRequests,
    upcomingBookings,
    completedBookings,
    cancelledBookings,
    verifyPin,
  } = useProviderBookings();

  const { creditReleasedEscrow } = useProviderEarnings();

  const handleAccept = (_bookingId) => {
    toast.success('Request accepted! Client notified to make escrow payment.');
  };

  const handleDecline = (_bookingId) => {
    toast.success('Request declined.');
  };

  const handleVerifyPin = (bookingId, pin) => {
    const res = verifyPin(bookingId, pin);
    if (res.success) {
      creditReleasedEscrow(res.netPayoutKobo, res.booking.bookingReference);
      toast.success('PIN verified! Payment disbursed to your wallet.');
    }
    return res;
  };

  const getCount = (tabId) => {
    if (tabId === 'requests') return pendingRequests.length;
    if (tabId === 'upcoming') return upcomingBookings.length;
    if (tabId === 'completed') return completedBookings.length;
    if (tabId === 'cancelled') return cancelledBookings.length;
    return 0;
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
            Provider Bookings
          </h1>
          <p className="text-xs text-neutral-500">
            Accept student requests, track upcoming jobs, and enter release PINs
          </p>
        </div>
      </div>

      {/* Filter Tabs Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-neutral-200 overflow-x-auto shadow-2xs">
        {TABS.map((t) => {
          const count = getCount(t.id);
          const isSelected = activeTab === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={cn(
                'flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all focus:outline-none shrink-0',
                isSelected
                  ? 'bg-purple-800 text-white font-bold shadow-2xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
              )}
            >
              <span>{t.label}</span>
              <span
                className={cn(
                  'text-[10px] px-1.5 py-0.2 rounded-full font-bold',
                  isSelected
                    ? 'bg-purple-900/60 text-purple-100'
                    : 'bg-neutral-100 text-neutral-600'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {pendingRequests.length === 0 ? (
            <div className="py-12">
              <EmptyState
                title="No new requests"
                description="When students request appointments for your services, they will appear here."
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingRequests.map((b) => (
                <BookingRequestCard
                  key={b.id}
                  booking={b}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'upcoming' && (
        <div className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <div className="py-12">
              <EmptyState
                title="No upcoming bookings"
                description="Accepted requests that have been escrow-funded will appear here."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <Card
                  key={b.id}
                  variant="default"
                  padding="md"
                  className="border border-neutral-200 rounded-xl bg-white shadow-2xs space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="md" src={b.clientAvatar} name={b.clientName} />
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 font-display">
                          {b.clientName}
                        </h3>
                        <p className="text-[11px] text-neutral-500">
                          {b.serviceTitle} • {b.variantName}
                        </p>
                      </div>
                    </div>
                    <BookingStatusBadge status={b.status} size="xs" />
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600 pt-1">
                    <span className="flex items-center gap-1 font-semibold text-neutral-800">
                      <Calendar className="w-3.5 h-3.5 text-purple-700" />
                      {b.displayDate || b.date} at {b.timeSlot}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-neutral-500">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                      {b.locationDetails || b.locationTitle}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-neutral-400 block font-medium">Payout Due</span>
                      <span className="text-sm font-bold text-neutral-900 font-display">
                        {formatCurrency(b.servicePriceKobo)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setPinBooking(b)}
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
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'completed' && (
        <div className="space-y-4">
          {completedBookings.length === 0 ? (
            <div className="py-12">
              <EmptyState
                title="No completed bookings yet"
                description="Jobs where PIN verification was successful will be cataloged here."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {completedBookings.map((b) => (
                <Card
                  key={b.id}
                  variant="default"
                  padding="md"
                  className="border border-neutral-200 rounded-xl bg-white shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 font-display">
                        {b.serviceTitle}
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Client: {b.clientName} • Delivered on {b.displayDate || b.date}
                      </p>
                    </div>
                    <BookingStatusBadge status={b.status} size="xs" />
                  </div>

                  {b.review && (
                    <div className="p-2.5 rounded-lg bg-neutral-50 text-xs space-y-1">
                      <div className="flex items-center justify-between font-semibold text-neutral-800">
                        <span>Client Rating:</span>
                        <span className="text-amber-600 font-bold">⭐ {b.review.rating} / 5</span>
                      </div>
                      {b.review.comment && (
                        <p className="text-[11px] text-neutral-600 italic">"{b.review.comment}"</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-neutral-500 font-medium">Released to Wallet:</span>
                    <strong className="text-emerald-800 font-display font-black text-sm">
                      {formatCurrency(b.servicePriceKobo)}
                    </strong>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'cancelled' && (
        <div className="space-y-4">
          {cancelledBookings.length === 0 ? (
            <div className="py-12">
              <EmptyState
                title="No cancelled bookings"
                description="Cancelled or declined bookings will be recorded here."
              />
            </div>
          ) : (
            <div className="space-y-3">
              {cancelledBookings.map((b) => (
                <Card
                  key={b.id}
                  variant="default"
                  padding="md"
                  className="border border-neutral-200 rounded-xl bg-white shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 font-display">
                        {b.serviceTitle}
                      </h3>
                      <p className="text-[11px] text-neutral-500">
                        Client: {b.clientName} • {b.bookingReference}
                      </p>
                    </div>
                    <BookingStatusBadge status={b.status} size="xs" />
                  </div>
                  {b.cancellationReason && (
                    <p className="text-xs text-rose-800 bg-rose-50 p-2 rounded-lg border border-rose-100">
                      Reason: {b.cancellationReason}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PIN Submission Modal */}
      <PinSubmissionModal
        isOpen={Boolean(pinBooking)}
        onClose={() => setPinBooking(null)}
        booking={pinBooking}
        onVerifyPin={handleVerifyPin}
      />
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import BookingCard from '../components/BookingCard';
import ReviewModal from '../components/ReviewModal';
import { useBookings } from '../hooks/useBookings';
import { BOOKING_STATUSES } from '@/lib/constants';
import { cn } from '@/lib/cn';

const TABS = [
  { id: 'active', label: 'Upcoming & Active' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled / Other' },
];

export default function MyBookingsPage() {
  const { bookings, submitReview } = useBookings();
  const [activeTab, setActiveTab] = useState('active');
  const [reviewBooking, setReviewBooking] = useState(null);

  const activeStatuses = [
    BOOKING_STATUSES.CONFIRMED,
    BOOKING_STATUSES.IN_PROGRESS,
    BOOKING_STATUSES.ACCEPTED,
    BOOKING_STATUSES.REQUESTED,
    BOOKING_STATUSES.AWAITING_PAYMENT,
  ];

  const completedStatuses = [BOOKING_STATUSES.COMPLETED];

  const cancelledStatuses = [
    BOOKING_STATUSES.CANCELLED,
    BOOKING_STATUSES.DECLINED,
    BOOKING_STATUSES.EXPIRED,
    BOOKING_STATUSES.DISPUTED,
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'active') return activeStatuses.includes(b.status);
    if (activeTab === 'completed') return completedStatuses.includes(b.status);
    if (activeTab === 'cancelled') return cancelledStatuses.includes(b.status);
    return true;
  });

  const activeCount = bookings.filter((b) => activeStatuses.includes(b.status)).length;
  const completedCount = bookings.filter((b) => completedStatuses.includes(b.status)).length;
  const cancelledCount = bookings.filter((b) => cancelledStatuses.includes(b.status)).length;

  const getTabCount = (tabId) => {
    if (tabId === 'active') return activeCount;
    if (tabId === 'completed') return completedCount;
    if (tabId === 'cancelled') return cancelledCount;
    return 0;
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
            My Appointments
          </h1>
          <p className="text-xs text-neutral-500">
            Track student bookings, escrow payments, and completion PINs
          </p>
        </div>

        <Link to="/app/search">
          <Button variant="outline" size="sm" icon={<Search className="w-3.5 h-3.5" />}>
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Tab Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-neutral-200 overflow-x-auto shadow-2xs">
        {TABS.map((t) => {
          const count = getTabCount(t.id);
          const isSelected = activeTab === t.id;

          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={cn(
                'flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all focus:outline-none shrink-0',
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

      {/* Booking List */}
      {filteredBookings.length === 0 ? (
        <div className="py-12">
          <EmptyState
            title={`No ${TABS.find((t) => t.id === activeTab)?.label.toLowerCase()} bookings`}
            description="Explore verified student hairstylists, nail techs, barbers, and skincare artists across UNILAG hostels."
            action={
              <Link to="/app">
                <Button variant="primary" size="sm">
                  Discover Campus Services
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBookings.map((b) => (
            <BookingCard
              key={b.id}
              booking={b}
              onOpenReview={(bookingToReview) => setReviewBooking(bookingToReview)}
            />
          ))}
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={Boolean(reviewBooking)}
        onClose={() => setReviewBooking(null)}
        booking={reviewBooking}
        onSubmitReview={submitReview}
      />
    </div>
  );
}

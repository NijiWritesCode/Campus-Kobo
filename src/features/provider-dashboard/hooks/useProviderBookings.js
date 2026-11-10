import { useBookings } from '@/features/booking/hooks/useBookings';
import { BOOKING_STATUSES } from '@/lib/constants';

export function useProviderBookings(providerId = 'prov-001') {
  const { bookings, getBooking, completeBooking } = useBookings();

  // All bookings belonging to this provider
  const providerBookings = bookings.filter((b) => b.providerId === providerId);

  const pendingRequests = providerBookings.filter(
    (b) => b.status === BOOKING_STATUSES.REQUESTED
  );

  const upcomingBookings = providerBookings.filter(
    (b) =>
      b.status === BOOKING_STATUSES.ACCEPTED ||
      b.status === BOOKING_STATUSES.CONFIRMED ||
      b.status === BOOKING_STATUSES.IN_PROGRESS
  );

  const completedBookings = providerBookings.filter(
    (b) => b.status === BOOKING_STATUSES.COMPLETED
  );

  const cancelledBookings = providerBookings.filter(
    (b) =>
      b.status === BOOKING_STATUSES.CANCELLED ||
      b.status === BOOKING_STATUSES.DECLINED ||
      b.status === BOOKING_STATUSES.EXPIRED
  );

  const verifyPin = (bookingId, pinEntered) => {
    const booking = getBooking(bookingId);
    if (!booking) {
      return { success: false, error: 'Booking not found.' };
    }

    if (booking.status === BOOKING_STATUSES.COMPLETED) {
      return { success: false, error: 'This booking has already been verified and completed.' };
    }

    const cleanInput = String(pinEntered || '').trim();
    if (cleanInput !== String(booking.pin).trim()) {
      return {
        success: false,
        error: 'Incorrect 6-digit PIN. Please request the exact release PIN shown on your student client’s screen.',
      };
    }

    // Complete booking and release escrow
    completeBooking(bookingId);

    // Provider net earnings: 90% of service price
    const netPayoutKobo = booking.servicePriceKobo;

    return {
      success: true,
      booking,
      netPayoutKobo,
    };
  };

  return {
    bookings: providerBookings,
    pendingRequests,
    upcomingBookings,
    completedBookings,
    cancelledBookings,
    getBooking,
    verifyPin,
  };
}

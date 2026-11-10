import { useVerifications } from './useVerifications';
import { useDisputes } from './useDisputes';
import { useAdminProviders } from './useAdminProviders';
import { useAdminPayouts } from './useAdminPayouts';
import { mockBookings } from '@/mocks/data/bookings';

export function useAdminStats() {
  const { pendingCount: pendingVerifications, verifications } = useVerifications();
  const { openCount: openDisputes, disputes } = useDisputes();
  const { activeCount: activeProviders } = useAdminProviders();
  const { payouts } = useAdminPayouts();

  // Compute platform transaction totals from mock bookings
  const totalBookingsCount = mockBookings.length;
  const completedBookings = mockBookings.filter((b) => b.status === 'COMPLETED');
  const activeEscrowBookings = mockBookings.filter(
    (b) => b.status === 'CONFIRMED' || b.status === 'IN_PROGRESS' || b.status === 'DISPUTED'
  );

  // GMV: sum of all service prices + platform fees
  const totalGmvKobo = mockBookings.reduce(
    (acc, b) => acc + (b.totalAmountKobo || b.servicePriceKobo || 0),
    0
  );

  // Platform 10% revenue collected
  const platformFeeKobo = mockBookings.reduce(
    (acc, b) => acc + (b.platformFeeKobo || Math.round((b.servicePriceKobo || 0) * 0.1)),
    0
  );

  // Currently locked escrow pool
  const activeEscrowKobo = activeEscrowBookings.reduce(
    (acc, b) => acc + (b.servicePriceKobo || 0),
    0
  );

  return {
    totalGmvKobo,
    platformFeeKobo,
    activeEscrowKobo,
    totalBookingsCount,
    completedBookingsCount: completedBookings.length,
    activeProvidersCount: activeProviders,
    pendingVerificationsCount: pendingVerifications,
    openDisputesCount: openDisputes,
    recentVerifications: verifications.slice(0, 5),
    recentDisputes: disputes.slice(0, 4),
    recentPayouts: payouts.slice(0, 4),
  };
}

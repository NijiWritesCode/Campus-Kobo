import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockPayouts } from '@/mocks/data/payouts';

const STORAGE_KEY = 'campus-kobo-admin-payouts';

function loadStoredPayouts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : mockPayouts;
  } catch {
    return mockPayouts;
  }
}

export function useAdminPayouts() {
  const [payouts, setPayouts] = useState(loadStoredPayouts);

  const savePayouts = (updated) => {
    setPayouts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save payouts to localStorage', e);
    }
  };

  const approvePayout = (id) => {
    const updated = payouts.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: 'COMPLETED',
          processedAt: new Date().toISOString(),
          failureReason: null,
        };
      }
      return p;
    });

    savePayouts(updated);
    toast.success('Payout marked as transferred to bank via NIP.');
    return { success: true };
  };

  const failPayout = (id, reason) => {
    const updated = payouts.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status: 'FAILED',
          processedAt: new Date().toISOString(),
          failureReason: reason || 'Transfer declined by bank switch.',
        };
      }
      return p;
    });

    savePayouts(updated);
    toast.error('Payout failed. Funds returned to provider in-app wallet.');
    return { success: true };
  };

  const pendingCount = payouts.filter((p) => p.status === 'PENDING_APPROVAL').length;
  const completedCount = payouts.filter((p) => p.status === 'COMPLETED').length;

  return {
    payouts,
    approvePayout,
    failPayout,
    pendingCount,
    completedCount,
  };
}

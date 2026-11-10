import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockDisputes } from '@/mocks/data/disputes';

const STORAGE_KEY = 'campus-kobo-admin-disputes';

function loadStoredDisputes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : mockDisputes;
  } catch {
    return mockDisputes;
  }
}

export function useDisputes() {
  const [disputes, setDisputes] = useState(loadStoredDisputes);

  const saveDisputes = (updated) => {
    setDisputes(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save disputes to localStorage', e);
    }
  };

  const getDispute = (id) => disputes.find((d) => d.id === id);

  const resolveDispute = (id, resolution, arbitratorNotes) => {
    if (!arbitratorNotes?.trim()) {
      toast.error('Arbitration notes are required');
      return { success: false, error: 'Notes required' };
    }

    const updated = disputes.map((d) => {
      if (d.id === id) {
        return {
          ...d,
          status: 'RESOLVED',
          resolution,
          arbitratorNotes: arbitratorNotes.trim(),
          resolvedAt: new Date().toISOString(),
        };
      }
      return d;
    });

    saveDisputes(updated);
    const actionLabel =
      resolution === 'REFUND_CLIENT'
        ? '100% Escrow refunded to client'
        : resolution === 'RELEASE_PROVIDER'
        ? '100% Escrow disbursed to provider'
        : '50/50 Mutual split executed';

    toast.success(`Dispute arbitrated: ${actionLabel}`);
    return { success: true };
  };

  const openCount = disputes.filter((d) => d.status === 'OPEN').length;
  const resolvedCount = disputes.filter((d) => d.status === 'RESOLVED').length;

  return {
    disputes,
    getDispute,
    resolveDispute,
    openCount,
    resolvedCount,
  };
}

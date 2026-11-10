import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockVerifications } from '@/mocks/data/verifications';

const STORAGE_KEY = 'campus-kobo-admin-verifications';

function loadStoredVerifications() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : mockVerifications;
  } catch {
    return mockVerifications;
  }
}

export function useVerifications() {
  const [verifications, setVerifications] = useState(loadStoredVerifications);

  const saveVerifications = (updated) => {
    setVerifications(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save verifications to localStorage', e);
    }
  };

  const getVerification = (id) => verifications.find((v) => v.id === id);

  const approveVerification = (id, notes = '') => {
    const updated = verifications.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          status: 'APPROVED',
          reviewedAt: new Date().toISOString(),
          reviewerName: 'Campus Admin (UNILAG)',
          notes: notes || v.notes,
        };
      }
      return v;
    });
    saveVerifications(updated);
    toast.success('Student verified & granted provider status');
    return { success: true };
  };

  const rejectVerification = (id, reason) => {
    if (!reason?.trim()) {
      toast.error('Rejection reason is required');
      return { success: false, error: 'Reason required' };
    }
    const updated = verifications.map((v) => {
      if (v.id === id) {
        return {
          ...v,
          status: 'REJECTED',
          reviewedAt: new Date().toISOString(),
          reviewerName: 'Campus Admin (UNILAG)',
          notes: reason,
        };
      }
      return v;
    });
    saveVerifications(updated);
    toast.error('Verification rejected with notice to student');
    return { success: true };
  };

  const pendingCount = verifications.filter((v) => v.status === 'PENDING').length;
  const approvedCount = verifications.filter((v) => v.status === 'APPROVED').length;
  const rejectedCount = verifications.filter((v) => v.status === 'REJECTED').length;

  return {
    verifications,
    getVerification,
    approveVerification,
    rejectVerification,
    pendingCount,
    approvedCount,
    rejectedCount,
  };
}

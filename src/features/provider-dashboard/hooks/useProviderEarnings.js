import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'campus_kobo_provider_earnings';

const INITIAL_EARNINGS = {
  availableBalanceKobo: 4250000, // ₦42,500 available for withdrawal
  pendingEscrowBalanceKobo: 900000, // ₦9,000 held in conditional escrow from active bookings
  totalEarnedKobo: 38500000, // ₦385,000 lifetime earnings
  bankDetails: {
    bankName: 'Access Bank',
    accountNumber: '0123456789',
    accountName: 'Adaeze Okafor',
  },
  transactions: [
    {
      id: 'tx-001',
      type: 'BOOKING_PAYOUT',
      description: 'Completed Knotless Braids (Standard / Boho) - Ref: CKB-39182',
      amountKobo: 650000, // ₦6,500
      feeKobo: 0,
      netKobo: 650000,
      status: 'PAID',
      createdAt: '2026-11-01T15:00:00Z',
    },
    {
      id: 'tx-002',
      type: 'BANK_WITHDRAWAL',
      description: 'Bank Payout to Access Bank (•••• 6789)',
      amountKobo: -2500000, // -₦25,000
      feeKobo: 0,
      netKobo: -2500000,
      status: 'PAID',
      createdAt: '2026-11-02T10:30:00Z',
    },
    {
      id: 'tx-003',
      type: 'BOOKING_PAYOUT',
      description: 'Completed Stitch Cornrows - Ref: CKB-21094',
      amountKobo: 450000, // ₦4,500
      feeKobo: 0,
      netKobo: 450000,
      status: 'PAID',
      createdAt: '2026-11-05T16:20:00Z',
    },
  ],
};

function loadStoredEarnings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (err) {
    console.warn('Failed to load provider earnings from localStorage:', err);
  }
  return INITIAL_EARNINGS;
}

export function useProviderEarnings() {
  const [earnings, setEarnings] = useState(loadStoredEarnings);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(earnings));
    } catch (err) {
      console.error('Failed to sync provider earnings to localStorage:', err);
    }
  }, [earnings]);

  const requestPayout = useCallback(({ amountKobo, bankDetails }) => {
    if (amountKobo > earnings.availableBalanceKobo) {
      return { success: false, error: 'Requested amount exceeds available balance.' };
    }

    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'BANK_WITHDRAWAL',
      description: `Bank Payout to ${bankDetails.bankName} (•••• ${bankDetails.accountNumber.slice(-4)})`,
      amountKobo: -amountKobo,
      feeKobo: 0,
      netKobo: -amountKobo,
      status: 'PAID', // Instant simulation in MVP
      createdAt: new Date().toISOString(),
    };

    setEarnings((prev) => ({
      ...prev,
      availableBalanceKobo: prev.availableBalanceKobo - amountKobo,
      transactions: [newTx, ...prev.transactions],
    }));

    return { success: true, transaction: newTx };
  }, [earnings.availableBalanceKobo]);

  const saveBankDetails = useCallback((bankDetails) => {
    setEarnings((prev) => ({
      ...prev,
      bankDetails,
    }));
  }, []);

  const creditReleasedEscrow = useCallback((amountKobo, bookingReference) => {
    const newTx = {
      id: `tx-${Date.now()}`,
      type: 'BOOKING_PAYOUT',
      description: `PIN Verified Payout - Ref: ${bookingReference}`,
      amountKobo,
      feeKobo: 0,
      netKobo: amountKobo,
      status: 'PAID',
      createdAt: new Date().toISOString(),
    };

    setEarnings((prev) => ({
      ...prev,
      availableBalanceKobo: prev.availableBalanceKobo + amountKobo,
      pendingEscrowBalanceKobo: Math.max(0, prev.pendingEscrowBalanceKobo - amountKobo),
      totalEarnedKobo: prev.totalEarnedKobo + amountKobo,
      transactions: [newTx, ...prev.transactions],
    }));
  }, []);

  return {
    ...earnings,
    requestPayout,
    saveBankDetails,
    creditReleasedEscrow,
  };
}

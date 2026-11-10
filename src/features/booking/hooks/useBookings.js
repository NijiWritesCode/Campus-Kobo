import { useState, useEffect, useCallback } from 'react';
import { mockBookings } from '@/mocks/data/bookings';
import { BOOKING_STATUSES } from '@/lib/constants';

const STORAGE_KEY = 'campus_kobo_bookings_store';

function loadStoredBookings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Failed to parse stored bookings, fallback to initial mock:', err);
  }
  return mockBookings;
}

export function useBookings() {
  const [bookings, setBookings] = useState(loadStoredBookings);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (err) {
      console.error('Failed to sync bookings to local storage:', err);
    }
  }, [bookings]);

  const getBooking = useCallback(
    (idOrRef) => {
      return (
        bookings.find((b) => b.id === idOrRef || b.bookingReference === idOrRef) ||
        null
      );
    },
    [bookings]
  );

  const createBooking = useCallback(
    ({
      service,
      variant,
      provider,
      client,
      date,
      displayDate,
      timeSlot,
      locationType,
      locationTitle,
      locationDetails,
      specialNotes = '',
    }) => {
      const servicePriceKobo = variant.priceKobo;
      const platformFeeKobo = Math.round(servicePriceKobo * 0.1); // 10% strictly in kobo
      const totalPriceKobo = servicePriceKobo + platformFeeKobo;
      const randomRefNumber = Math.floor(10000 + Math.random() * 90000);
      const generatedPin = String(Math.floor(100000 + Math.random() * 900000));
      const bookingId = `bk-${Date.now()}`;

      const newBooking = {
        id: bookingId,
        bookingReference: `CKB-${randomRefNumber}`,
        serviceId: service.id,
        serviceTitle: service.title,
        variantId: variant.id,
        variantName: variant.name,
        durationMinutes: variant.durationMinutes || 60,
        servicePriceKobo,
        platformFeeKobo,
        totalPriceKobo,
        providerId: provider.id,
        providerName: provider.studentName,
        businessName: provider.businessName,
        providerAvatar: provider.avatar,
        providerPhone: provider.phone || '+234 803 000 1234',
        providerCampusArea: provider.serviceArea || 'UNILAG Campus',
        clientId: client?.id || 'usr-student-01',
        clientName: client?.name || 'Adaeze Okafor',
        clientPhone: client?.phone || '+234 812 345 6789',
        clientAvatar: client?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
        date,
        displayDate: displayDate || date,
        timeSlot,
        locationType,
        locationTitle,
        locationDetails,
        specialNotes,
        status: BOOKING_STATUSES.ACCEPTED, // Instantly accepted in MVP flow so client can proceed to payment
        pin: generatedPin,
        isEscrowFunded: false,
        paymentMethod: null,
        paymentReference: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        confirmedAt: null,
        review: null,
      };

      setBookings((prev) => [newBooking, ...prev]);
      return newBooking;
    },
    []
  );

  const confirmPayment = useCallback((bookingId, { method, reference }) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: BOOKING_STATUSES.CONFIRMED,
          isEscrowFunded: true,
          paymentMethod: method,
          paymentReference: reference,
          confirmedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const cancelBooking = useCallback((bookingId, reason) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: BOOKING_STATUSES.CANCELLED,
          cancellationReason: reason,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const submitReview = useCallback((bookingId, { rating, comment, tags = [] }) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          review: {
            rating,
            comment,
            tags,
            createdAt: new Date().toISOString(),
          },
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const completeBooking = useCallback((bookingId) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          status: BOOKING_STATUSES.COMPLETED,
          completedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const resetAllBookings = useCallback(() => {
    setBookings(mockBookings);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    bookings,
    getBooking,
    createBooking,
    confirmPayment,
    cancelBooking,
    submitReview,
    completeBooking,
    resetAllBookings,
  };
}

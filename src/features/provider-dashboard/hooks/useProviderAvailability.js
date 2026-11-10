import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'campus_kobo_provider_availability';

const DEFAULT_SCHEDULE = [
  { day: 'Monday', short: 'Mon', enabled: false, start: '14:00', end: '19:00', note: 'Morning classes' },
  { day: 'Tuesday', short: 'Tue', enabled: true, start: '10:00', end: '18:00' },
  { day: 'Wednesday', short: 'Wed', enabled: true, start: '12:00', end: '18:00' },
  { day: 'Thursday', short: 'Thu', enabled: true, start: '10:00', end: '18:00' },
  { day: 'Friday', short: 'Fri', enabled: true, start: '10:00', end: '20:00' },
  { day: 'Saturday', short: 'Sat', enabled: true, start: '09:00', end: '20:00', note: 'Peak campus hours' },
  { day: 'Sunday', short: 'Sun', enabled: false, start: '13:00', end: '18:00', note: 'Rest day / Church' },
];

const DEFAULT_BLOCKED_DATES = [
  { date: '2026-11-25', reason: 'GST 102 Semester Test' },
  { date: '2026-11-26', reason: 'CSC 301 Midterm Exam' },
];

function loadStoredAvailability() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') return parsed;
    }
  } catch (err) {
    console.warn('Failed to load provider availability from localStorage:', err);
  }
  return {
    weeklySchedule: DEFAULT_SCHEDULE,
    blockedDates: DEFAULT_BLOCKED_DATES,
    bufferMinutes: 15,
  };
}

export function useProviderAvailability() {
  const [data, setData] = useState(loadStoredAvailability);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Failed to sync provider availability to localStorage:', err);
    }
  }, [data]);

  const toggleDay = useCallback((dayName) => {
    setData((prev) => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.map((d) =>
        d.day === dayName ? { ...d, enabled: !d.enabled } : d
      ),
    }));
  }, []);

  const updateDayHours = useCallback((dayName, field, value) => {
    setData((prev) => ({
      ...prev,
      weeklySchedule: prev.weeklySchedule.map((d) =>
        d.day === dayName ? { ...d, [field]: value } : d
      ),
    }));
  }, []);

  const addBlockedDate = useCallback((date, reason = 'Exam or lecture conflict') => {
    setData((prev) => ({
      ...prev,
      blockedDates: [...prev.blockedDates, { date, reason }],
    }));
  }, []);

  const removeBlockedDate = useCallback((date) => {
    setData((prev) => ({
      ...prev,
      blockedDates: prev.blockedDates.filter((b) => b.date !== date),
    }));
  }, []);

  const setBufferMinutes = useCallback((mins) => {
    setData((prev) => ({ ...prev, bufferMinutes: mins }));
  }, []);

  return {
    ...data,
    toggleDay,
    updateDayHours,
    addBlockedDate,
    removeBlockedDate,
    setBufferMinutes,
  };
}

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'campus_kobo_provider_availability_v2';

const DEFAULT_SCHEDULE = [
  { day: 'Monday', short: 'Mon', enabled: true, start: '08:00', end: '20:00' },
  { day: 'Tuesday', short: 'Tue', enabled: true, start: '08:00', end: '20:00' },
  { day: 'Wednesday', short: 'Wed', enabled: true, start: '08:00', end: '20:00' },
  { day: 'Thursday', short: 'Thu', enabled: true, start: '08:00', end: '20:00' },
  { day: 'Friday', short: 'Fri', enabled: true, start: '08:00', end: '21:00' },
  { day: 'Saturday', short: 'Sat', enabled: true, start: '09:00', end: '21:00' },
  { day: 'Sunday', short: 'Sun', enabled: false, start: '13:00', end: '18:00' },
];

const DEFAULT_LECTURE_BLOCKS = [
  {
    id: 'lb-1',
    courseCode: 'CSC 301',
    title: 'Data Structures & Algorithms',
    day: 'Monday',
    start: '10:00',
    end: '12:00',
    location: 'Science LT 1',
  },
  {
    id: 'lb-2',
    courseCode: 'GST 102',
    title: 'Philosophy & Logic Tutorial',
    day: 'Monday',
    start: '14:00',
    end: '16:00',
    location: 'Arts Hall Room 2',
  },
  {
    id: 'lb-3',
    courseCode: 'CSC 305',
    title: 'Operating Systems',
    day: 'Tuesday',
    start: '09:00',
    end: '11:00',
    location: 'Faculty of Science',
  },
  {
    id: 'lb-4',
    courseCode: 'CSC 309',
    title: 'Software Engineering Lab',
    day: 'Wednesday',
    start: '11:00',
    end: '14:00',
    location: 'CITS Lab 3',
  },
  {
    id: 'lb-5',
    courseCode: 'MAT 201',
    title: 'Linear Algebra',
    day: 'Thursday',
    start: '10:00',
    end: '12:00',
    location: 'Science LT 2',
  },
  {
    id: 'lb-6',
    courseCode: 'CSC 311',
    title: 'Web Systems Tutorial',
    day: 'Friday',
    start: '13:00',
    end: '15:00',
    location: 'Science LT 1',
  },
];

const DEFAULT_BLOCKED_DATES = [
  { date: '2026-11-25', reason: 'GST 102 In-Person Test' },
  { date: '2026-11-26', reason: 'CSC 301 Midterm Test' },
];

const DEFAULT_EXAM_FREEZE = {
  isActive: false,
  startDate: '2026-11-28',
  endDate: '2026-12-08',
  reason: '1st Semester Examination Period',
  allowWeekends: false,
};

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  // Handles '14:00' or '02:00 PM'
  if (timeStr.includes('AM') || timeStr.includes('PM')) {
    const [timePart, modifier] = timeStr.trim().split(' ');
    let [hours, mins] = timePart.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + (mins || 0);
  }
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + (m || 0);
}

function formatMinutesToTime(mins) {
  const h24 = Math.floor(mins / 60);
  const m = mins % 60;
  const modifier = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  const padM = m < 10 ? `0${m}` : m;
  const padH = h12 < 10 ? `0${h12}` : h12;
  return `${padH}:${padM} ${modifier}`;
}

function loadStoredAvailability() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        return {
          weeklySchedule: parsed.weeklySchedule || DEFAULT_SCHEDULE,
          lectureBlocks: parsed.lectureBlocks || DEFAULT_LECTURE_BLOCKS,
          blockedDates: parsed.blockedDates || DEFAULT_BLOCKED_DATES,
          examFreeze: parsed.examFreeze || DEFAULT_EXAM_FREEZE,
          bufferMinutes: parsed.bufferMinutes ?? 15,
          commuteBufferMinutes: parsed.commuteBufferMinutes ?? 15,
        };
      }
    }
  } catch (err) {
    console.warn('Failed to load provider availability from localStorage:', err);
  }
  return {
    weeklySchedule: DEFAULT_SCHEDULE,
    lectureBlocks: DEFAULT_LECTURE_BLOCKS,
    blockedDates: DEFAULT_BLOCKED_DATES,
    examFreeze: DEFAULT_EXAM_FREEZE,
    bufferMinutes: 15,
    commuteBufferMinutes: 15,
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

  // Schedule Toggles
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

  // Lecture & Tutorial Blocks
  const addLectureBlock = useCallback((block) => {
    const newBlock = {
      id: `lb-${Date.now()}`,
      courseCode: block.courseCode.trim().toUpperCase(),
      title: block.title.trim(),
      day: block.day,
      start: block.start,
      end: block.end,
      location: block.location?.trim() || 'Campus Faculty',
    };
    setData((prev) => ({
      ...prev,
      lectureBlocks: [...prev.lectureBlocks, newBlock],
    }));
  }, []);

  const removeLectureBlock = useCallback((id) => {
    setData((prev) => ({
      ...prev,
      lectureBlocks: prev.lectureBlocks.filter((b) => b.id !== id),
    }));
  }, []);

  // Blocked Dates
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

  // Exam Freeze
  const updateExamFreeze = useCallback((updates) => {
    setData((prev) => ({
      ...prev,
      examFreeze: { ...prev.examFreeze, ...updates },
    }));
  }, []);

  const setBufferMinutes = useCallback((mins) => {
    setData((prev) => ({ ...prev, bufferMinutes: mins }));
  }, []);

  const setCommuteBufferMinutes = useCallback((mins) => {
    setData((prev) => ({ ...prev, commuteBufferMinutes: mins }));
  }, []);

  /**
   * The University Slot Calculation Engine
   * Dynamically filters out lectures, walking buffers, existing bookings, and checks if duration fits!
   */
  const computeAvailableSlots = useCallback(
    ({ dateIso, durationMinutes = 60, existingBookings = [] }) => {
      if (!dateIso) return { slots: [], freeWindows: [], blockedReason: null };

      // 1. Check if date is in Blocked Dates
      const blockedMatch = data.blockedDates.find((b) => b.date === dateIso);
      if (blockedMatch) {
        return {
          slots: [],
          freeWindows: [],
          blockedReason: `Provider is unavailable: ${blockedMatch.reason}`,
        };
      }

      // 2. Check if date is in Exam Freeze
      if (data.examFreeze?.isActive) {
        const target = new Date(dateIso).getTime();
        const start = new Date(data.examFreeze.startDate).getTime();
        const end = new Date(data.examFreeze.endDate).getTime();
        if (target >= start && target <= end) {
          return {
            slots: [],
            freeWindows: [],
            blockedReason: `Academic Freeze: ${data.examFreeze.reason}`,
          };
        }
      }

      // 3. Get Day of Week
      const dateObj = new Date(`${dateIso}T00:00:00`);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'long' });
      const dayConfig = data.weeklySchedule.find((d) => d.day === dayName);

      if (!dayConfig || !dayConfig.enabled) {
        return {
          slots: [],
          freeWindows: [],
          blockedReason: `Provider does not take appointments on ${dayName}s.`,
        };
      }

      const dayStartMins = parseTimeToMinutes(dayConfig.start);
      const dayEndMins = parseTimeToMinutes(dayConfig.end);
      const commute = Number(data.commuteBufferMinutes) || 15;
      const buffer = Number(data.bufferMinutes) || 15;
      const requiredSpanMins = durationMinutes + buffer;

      // 4. Find all busy intervals for this day:
      // A) Lectures on this day
      const daysLectures = data.lectureBlocks.filter((lb) => lb.day === dayName);
      const busyIntervals = [];

      daysLectures.forEach((lb) => {
        const startMins = Math.max(dayStartMins, parseTimeToMinutes(lb.start) - commute);
        const endMins = Math.min(dayEndMins, parseTimeToMinutes(lb.end) + commute);
        busyIntervals.push({
          start: startMins,
          end: endMins,
          reason: `${lb.courseCode} (${lb.start} - ${lb.end})`,
        });
      });

      // B) Existing active bookings on this exact date
      const daysBookings = existingBookings.filter(
        (b) =>
          b.date === dateIso &&
          b.status !== 'CANCELLED' &&
          b.status !== 'DECLINED'
      );

      daysBookings.forEach((b) => {
        const startMins = parseTimeToMinutes(b.timeSlot);
        const endMins = startMins + (b.durationMinutes || 60) + buffer;
        busyIntervals.push({
          start: Math.max(dayStartMins, startMins),
          end: Math.min(dayEndMins, endMins),
          reason: `Booked: ${b.variantName || 'Appointment'}`,
        });
      });

      // 5. Sort and merge busy intervals
      busyIntervals.sort((a, b) => a.start - b.start);
      const mergedBusy = [];
      busyIntervals.forEach((curr) => {
        if (!mergedBusy.length) {
          mergedBusy.push(curr);
        } else {
          const last = mergedBusy[mergedBusy.length - 1];
          if (curr.start <= last.end) {
            last.end = Math.max(last.end, curr.end);
            last.reason = `${last.reason} & ${curr.reason}`;
          } else {
            mergedBusy.push(curr);
          }
        }
      });

      // 6. Calculate Free Windows
      const freeWindows = [];
      let cursor = dayStartMins;

      mergedBusy.forEach((busy) => {
        if (busy.start > cursor) {
          freeWindows.push({
            start: cursor,
            end: busy.start,
            durationMins: busy.start - cursor,
            startFormatted: formatMinutesToTime(cursor),
            endFormatted: formatMinutesToTime(busy.start),
          });
        }
        cursor = Math.max(cursor, busy.end);
      });

      if (cursor < dayEndMins) {
        freeWindows.push({
          start: cursor,
          end: dayEndMins,
          durationMins: dayEndMins - cursor,
          startFormatted: formatMinutesToTime(cursor),
          endFormatted: formatMinutesToTime(dayEndMins),
        });
      }

      // 7. Generate Candidate Slots that fit durationMinutes + buffer
      const candidateSlots = [];

      freeWindows.forEach((win) => {
        // Only windows that can accommodate the required duration
        if (win.durationMins >= requiredSpanMins) {
          // Generate slots on 30-minute intervals
          let slotCursor = win.start;
          while (slotCursor + durationMinutes <= win.end) {
            const timeFormatted = formatMinutesToTime(slotCursor);

            // Determine friendly student campus badge
            let tag = '☀️ Afternoon Window';
            if (slotCursor < 720) {
              tag = '🌅 Morning (Before Lectures)';
            } else if (slotCursor >= 1020) {
              tag = '🌙 Evening (Post-Classes)';
            } else {
              tag = '☕ Lecture Gap';
            }

            candidateSlots.push({
              time: timeFormatted,
              tag,
              windowDurationMins: win.durationMins,
              windowRange: `${win.startFormatted} - ${win.endFormatted}`,
            });

            slotCursor += 30; // 30-minute increments
          }
        }
      });

      return {
        slots: candidateSlots,
        freeWindows,
        dayLectures: daysLectures,
        blockedReason:
          candidateSlots.length === 0
            ? `Provider has lectures and commitments on this day that cannot fit a ${durationMinutes}-minute session.`
            : null,
      };
    },
    [data]
  );

  return {
    ...data,
    toggleDay,
    updateDayHours,
    addLectureBlock,
    removeLectureBlock,
    addBlockedDate,
    removeBlockedDate,
    updateExamFreeze,
    setBufferMinutes,
    setCommuteBufferMinutes,
    computeAvailableSlots,
  };
}

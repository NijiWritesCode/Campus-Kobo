import { Calendar as CalendarIcon, Clock, GraduationCap, AlertCircle, School } from 'lucide-react';
import { cn } from '@/lib/cn';

function generateNextDays(count = 7) {
  const days = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const isoDate = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = d.getDate();

    let label = `${dayName}, ${monthName} ${dayNum}`;
    let badge = null;
    if (i === 0) badge = 'Today';
    if (i === 1) badge = 'Tomorrow';

    days.push({
      isoDate,
      dayName,
      monthName,
      dayNum,
      displayDate: label,
      badge,
    });
  }

  return days;
}

const DEFAULT_FALLBACK_SLOTS = [
  { time: '09:00 AM', tag: '🌅 Morning Window' },
  { time: '10:30 AM', tag: '🌅 Morning Window' },
  { time: '12:00 PM', tag: '☕ Lecture Gap' },
  { time: '01:30 PM', tag: '☕ Lecture Gap' },
  { time: '03:00 PM', tag: '☀️ Afternoon Window' },
  { time: '04:30 PM', tag: '☀️ Afternoon Window' },
  { time: '06:00 PM', tag: '🌙 Evening (Post-Classes)' },
];

export default function DateTimePicker({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  availableSlots = null,
  blockedReason = null,
  durationMinutes = 60,
  className = '',
}) {
  const availableDays = generateNextDays(7);

  // Normalize slots
  let slotsToRender = DEFAULT_FALLBACK_SLOTS;
  if (Array.isArray(availableSlots)) {
    slotsToRender = availableSlots.map((s) =>
      typeof s === 'string' ? { time: s, tag: '☀️ Available Slot' } : s
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Date Selection */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
          <CalendarIcon className="w-4 h-4 text-emerald-700" />
          <span>Select Date</span>
        </label>

        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none snap-x">
          {availableDays.map((day) => {
            const isSelected = selectedDate === day.isoDate;
            return (
              <button
                key={day.isoDate}
                type="button"
                onClick={() => onSelectDate(day.isoDate, day.displayDate)}
                className={cn(
                  'shrink-0 w-20 py-2.5 px-2 rounded-xl border flex flex-col items-center justify-center transition-all text-center snap-start focus:outline-none',
                  isSelected
                    ? 'bg-emerald-50 border-emerald-700 text-emerald-950 font-bold shadow-2xs'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                )}
              >
                <span className="text-[10px] uppercase font-semibold text-neutral-500">
                  {day.badge || day.dayName}
                </span>
                <span className="text-base font-extrabold font-display leading-tight">
                  {day.dayNum}
                </span>
                <span className="text-[10px] text-neutral-500">
                  {day.monthName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slot Selection */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
            <Clock className="w-4 h-4 text-purple-700" />
            <span>Available Free Slots ({durationMinutes} mins needed)</span>
          </label>

          <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold flex items-center gap-1">
            <School className="w-3 h-3 text-emerald-700" />
            <span>Filtered around lecture timetable</span>
          </span>
        </div>

        {/* If date is blocked due to exam or full lecture clash */}
        {blockedReason ? (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
            <div className="flex items-center gap-2 font-bold font-display text-amber-950">
              <GraduationCap className="w-4 h-4 text-amber-700 shrink-0" />
              <span>Academic Commitment On This Date</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              {blockedReason}
            </p>
            <p className="text-[10px] text-neutral-500 pt-0.5">
              Please choose another day above to see open free windows.
            </p>
          </div>
        ) : slotsToRender.length === 0 ? (
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1 text-center">
            <AlertCircle className="w-5 h-5 text-neutral-400 mx-auto" />
            <span className="font-bold text-neutral-800 block">No free window fits this {durationMinutes}m appointment</span>
            <p className="text-[11px] text-neutral-500">
              The provider's class schedule leaves no gap long enough for this service. Try picking another date.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {slotsToRender.map((slotObj) => {
              const slotTime = typeof slotObj === 'string' ? slotObj : slotObj.time;
              const slotTag = typeof slotObj === 'object' ? slotObj.tag : 'Free Slot';
              const isSelected = selectedTime === slotTime;

              return (
                <button
                  key={slotTime}
                  type="button"
                  onClick={() => onSelectTime(slotTime)}
                  className={cn(
                    'p-2.5 rounded-xl border text-left transition-all focus:outline-none shadow-2xs flex flex-col justify-between space-y-1',
                    isSelected
                      ? 'bg-purple-50 border-purple-800 text-purple-950 font-bold ring-1 ring-purple-800'
                      : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-display">
                      {slotTime}
                    </span>
                    <Clock className={cn('w-3 h-3', isSelected ? 'text-purple-700' : 'text-neutral-400')} />
                  </div>
                  <span className="text-[10px] text-neutral-500 truncate block">
                    {slotTag}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

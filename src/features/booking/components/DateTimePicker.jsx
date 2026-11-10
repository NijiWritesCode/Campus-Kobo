import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/cn';

const TIME_SLOTS = [
  '09:00 AM',
  '10:30 AM',
  '12:00 PM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
];

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

export default function DateTimePicker({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  className = '',
}) {
  const availableDays = generateNextDays(7);

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
        <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
          <Clock className="w-4 h-4 text-purple-700" />
          <span>Available Time Slot</span>
        </label>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {TIME_SLOTS.map((slot) => {
            const isSelected = selectedTime === slot;
            return (
              <button
                key={slot}
                type="button"
                onClick={() => onSelectTime(slot)}
                className={cn(
                  'py-2 px-3 rounded-lg border text-xs font-semibold transition-all text-center focus:outline-none shadow-2xs',
                  isSelected
                    ? 'bg-purple-50 border-purple-800 text-purple-950 font-bold'
                    : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                )}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

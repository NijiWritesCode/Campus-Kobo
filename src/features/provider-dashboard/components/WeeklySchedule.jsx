import { Clock } from 'lucide-react';
import Card from '@/components/ui/Card';
import { cn } from '@/lib/cn';

const TIME_OPTIONS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
  '18:00', '19:00', '20:00', '21:00',
];

export default function WeeklySchedule({
  schedule = [],
  onToggleDay,
  onUpdateHours,
}) {
  return (
    <div className="space-y-3">
      {schedule.map((dayItem) => {
        return (
          <Card
            key={dayItem.day}
            variant="default"
            padding="sm"
            className={cn(
              'border rounded-xl transition-all',
              dayItem.enabled
                ? 'bg-white border-neutral-200 shadow-2xs'
                : 'bg-neutral-50/60 border-neutral-200/60 opacity-75'
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-1">
              {/* Day Toggle & Label */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id={`toggle-${dayItem.day}`}
                  checked={dayItem.enabled}
                  onChange={() => onToggleDay(dayItem.day)}
                  className="w-4 h-4 rounded border-neutral-300 accent-emerald-700 cursor-pointer"
                />
                <div>
                  <label
                    htmlFor={`toggle-${dayItem.day}`}
                    className="text-xs font-bold text-neutral-900 cursor-pointer font-display block"
                  >
                    {dayItem.day}
                  </label>
                  {dayItem.note && (
                    <span className="text-[10px] text-neutral-400 block font-medium">
                      {dayItem.note}
                    </span>
                  )}
                </div>
              </div>

              {/* Hours Selector */}
              {dayItem.enabled ? (
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-lg border border-neutral-200">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <select
                      value={dayItem.start}
                      onChange={(e) => onUpdateHours(dayItem.day, 'start', e.target.value)}
                      className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none"
                    >
                      {TIME_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  <span className="text-neutral-400 text-xs font-semibold">to</span>

                  <div className="flex items-center gap-1 bg-neutral-50 px-2 py-1 rounded-lg border border-neutral-200">
                    <Clock className="w-3 h-3 text-neutral-400" />
                    <select
                      value={dayItem.end}
                      onChange={(e) => onUpdateHours(dayItem.day, 'end', e.target.value)}
                      className="bg-transparent text-xs font-semibold text-neutral-800 focus:outline-none"
                    >
                      {TIME_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-neutral-400 font-semibold italic">
                  Unavailable (Off)
                </span>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}

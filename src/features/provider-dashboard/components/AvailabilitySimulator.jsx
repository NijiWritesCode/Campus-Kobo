import { useState } from 'react';
import { Eye, Clock, AlertCircle } from 'lucide-react';

const DURATION_PRESETS = [
  { label: '30m (Lineup / Trim)', mins: 30 },
  { label: '60m (Skin Fade / Facial)', mins: 60 },
  { label: '120m (Acrylic Nails / Lashes)', mins: 120 },
  { label: '240m (Knotless Braids)', mins: 240 },
];

export default function AvailabilitySimulator({
  computeAvailableSlots,
  _weeklySchedule = [],
}) {
  const [testDayOffset, setTestDayOffset] = useState(0);
  const [testDuration, setTestDuration] = useState(60);

  const [daysList] = useState(() => {
    return [0, 1, 2, 3, 4, 5].map((offset) => {
      const d = new Date();
      d.setDate(d.getDate() + offset);
      return {
        offset,
        dateIso: d.toISOString().split('T')[0],
        dayName: d.toLocaleDateString('en-US', { weekday: 'long' }),
        shortName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      };
    });
  });

  const currentDay = daysList[testDayOffset] || daysList[0];
  const dateIso = currentDay.dateIso;
  const dayName = currentDay.dayName;

  const result = computeAvailableSlots({
    dateIso,
    durationMinutes: testDuration,
    existingBookings: [],
  });

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900 text-white space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-900/60 text-purple-300 flex items-center justify-center border border-purple-700/60">
            <Eye className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold font-display text-white">
              Live Student Slot Fitting Simulator
            </h4>
            <p className="text-[11px] text-neutral-400">
              See how the engine automatically filters out class overlaps
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
          Math Engine Active
        </span>
      </div>

      {/* Simulator Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
        {/* Test Day */}
        <div className="space-y-1">
          <span className="text-neutral-400 block font-semibold text-[11px]">
            Test Day of the Week:
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {daysList.map((day) => (
              <button
                key={day.offset}
                type="button"
                onClick={() => setTestDayOffset(day.offset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                  testDayOffset === day.offset
                    ? 'bg-purple-600 border-purple-500 text-white'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {day.shortName}
              </button>
            ))}
          </div>
        </div>

        {/* Test Duration */}
        <div className="space-y-1">
          <span className="text-neutral-400 block font-semibold text-[11px]">
            Simulated Service Duration:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DURATION_PRESETS.map((p) => (
              <button
                key={p.mins}
                type="button"
                onClick={() => setTestDuration(p.mins)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors ${
                  testDuration === p.mins
                    ? 'bg-emerald-600 border-emerald-500 text-white'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Math Output */}
      <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 text-xs">
        <div className="flex items-center justify-between text-[11px] pb-2 border-b border-neutral-800">
          <span className="text-neutral-400">
            Evaluating <strong className="text-white">{dayName} ({dateIso})</strong> for a{' '}
            <strong className="text-emerald-400">{testDuration} min</strong> session:
          </span>
          <span className="text-purple-400 font-bold">
            {result.slots.length} Bookable Slot{result.slots.length === 1 ? '' : 's'} Generated
          </span>
        </div>

        {/* Free Windows Breakdown */}
        {result.freeWindows?.length > 0 && (
          <div className="space-y-1">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-bold font-display">
              Calculated Free Windows (Class Gaps):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {result.freeWindows.map((win, idx) => {
                const canFit = win.durationMins >= testDuration + 15;
                return (
                  <span
                    key={idx}
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold flex items-center gap-1 border ${
                      canFit
                        ? 'bg-emerald-950/70 border-emerald-700 text-emerald-300'
                        : 'bg-neutral-900 border-neutral-700 text-neutral-500'
                    }`}
                  >
                    <span>{win.startFormatted} – {win.endFormatted} ({win.durationMins}m)</span>
                    <span>{canFit ? '✅ Fits' : '❌ Too short'}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* Resulting Available Slots */}
        <div className="space-y-1">
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-bold font-display">
            Client-Facing Available Time Slots:
          </span>

          {result.slots.length === 0 ? (
            <div className="p-3 rounded-lg bg-neutral-900 text-amber-300 border border-amber-900/50 flex items-center gap-2 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{result.blockedReason || 'No windows large enough for this duration.'}</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {result.slots.map((s, idx) => (
                <div
                  key={idx}
                  className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-700 text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>{s.time}</span>
                  <span className="text-[9px] text-neutral-400 font-normal">({s.tag.split(' ')[0]})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

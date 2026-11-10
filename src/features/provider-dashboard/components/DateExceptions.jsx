import { useState } from 'react';
import { Calendar, Trash2, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DateExceptions({
  blockedDates = [],
  onAddBlockedDate,
  onRemoveBlockedDate,
}) {
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!date) return;
    onAddBlockedDate(date, reason.trim() || 'Exam or lecture conflict');
    setDate('');
    setReason('');
  };

  return (
    <div className="space-y-4">
      {/* Add Date Exception Form */}
      <form onSubmit={handleAdd} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 space-y-3">
        <h4 className="text-xs font-bold text-neutral-800 font-display">
          Block Specific Dates (Exams, Timetables, Travel)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div>
            <label htmlFor="block-date" className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Select Date
            </label>
            <input
              id="block-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 focus:outline-none focus:border-purple-800"
              required
            />
          </div>

          <div>
            <label htmlFor="block-reason" className="text-[11px] font-semibold text-neutral-600 block mb-1">
              Reason / Academic Activity
            </label>
            <input
              id="block-reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g. GST 102 Exam, Faculty Sports"
              className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 focus:outline-none focus:border-purple-800"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Block This Date
          </Button>
        </div>
      </form>

      {/* Blocked Dates List */}
      <div className="space-y-2">
        {blockedDates.length === 0 ? (
          <p className="text-xs text-neutral-500 italic p-3 text-center bg-white rounded-xl border border-neutral-200">
            No dates currently blocked. All enabled weekly slots are open for student bookings.
          </p>
        ) : (
          blockedDates.map((b) => (
            <div
              key={b.date}
              className="p-3 rounded-xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200 shrink-0">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-neutral-900 font-display block">
                    {new Date(b.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-[11px] text-neutral-500">
                    {b.reason}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onRemoveBlockedDate(b.date)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                title="Unblock date"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

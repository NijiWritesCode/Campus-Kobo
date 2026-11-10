import { GraduationCap } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function ExamFreezeManager({
  examFreeze,
  onUpdateExamFreeze,
}) {
  const isActive = Boolean(examFreeze?.isActive);

  return (
    <div className="space-y-4">
      {/* Main Toggle Card */}
      <Card
        variant="default"
        padding="md"
        className={`border rounded-xl transition-all ${
          isActive
            ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
            : 'bg-white border-neutral-200'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                isActive
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-neutral-100 text-neutral-600 border-neutral-200'
              }`}
            >
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-neutral-900 font-display">
                Academic & Exam Freeze Mode
              </h4>
              <p className="text-[11px] text-neutral-600 leading-relaxed max-w-md">
                Automatically pauses new client bookings during continuous assessment (C.A.) or semester exam weeks so you can focus entirely on studies.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => onUpdateExamFreeze({ isActive: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
          </label>
        </div>

        {/* Date Range & Settings if Active */}
        {isActive && (
          <div className="pt-4 mt-3 border-t border-amber-200/80 space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="freeze-start" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Freeze Start Date
                </label>
                <input
                  id="freeze-start"
                  type="date"
                  value={examFreeze.startDate}
                  onChange={(e) => onUpdateExamFreeze({ startDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-amber-600 shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="freeze-end" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Freeze End Date (Resume Date)
                </label>
                <input
                  id="freeze-end"
                  type="date"
                  value={examFreeze.endDate}
                  onChange={(e) => onUpdateExamFreeze({ endDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-amber-600 shadow-2xs"
                />
              </div>
            </div>

            <div>
              <label htmlFor="freeze-reason" className="text-[11px] font-semibold text-neutral-700 block mb-1">
                Academic Event Description
              </label>
              <input
                id="freeze-reason"
                type="text"
                value={examFreeze.reason}
                onChange={(e) => onUpdateExamFreeze({ reason: e.target.value })}
                placeholder="e.g. 1st Semester Exams & Revision"
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-amber-600 shadow-2xs"
              />
            </div>

            {/* Weekend Exception Toggle */}
            <label className="flex items-center gap-2 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(examFreeze.allowWeekends)}
                onChange={(e) => onUpdateExamFreeze({ allowWeekends: e.target.checked })}
                className="w-4 h-4 rounded border-neutral-300 accent-amber-600 cursor-pointer"
              />
              <span className="text-[11px] font-semibold text-neutral-700">
                Allow Saturday & Sunday appointments during this exam period
              </span>
            </label>

            {/* Live Client Preview Banner */}
            <div className="p-3 rounded-lg bg-white border border-amber-300 space-y-1">
              <span className="text-[10px] uppercase font-bold text-neutral-400 font-display block">
                Preview: How Students See Your Profile
              </span>
              <div className="flex items-center gap-2 text-amber-900 text-xs font-semibold">
                <GraduationCap className="w-4 h-4 text-amber-700 shrink-0" />
                <span>
                  🎓 In Exams Mode ({examFreeze.reason}) — Calendar reopens on{' '}
                  {new Date(examFreeze.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

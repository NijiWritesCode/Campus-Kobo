import { Check, Clock, AlertCircle } from 'lucide-react';
import { BOOKING_STATUSES } from '@/lib/constants';
import { cn } from '@/lib/cn';

const STEPS = [
  { key: 'REQUESTED', label: 'Requested' },
  { key: 'ACCEPTED', label: 'Accepted' },
  { key: 'CONFIRMED', label: 'Payment Escrowed' },
  { key: 'IN_PROGRESS', label: 'In Progress' },
  { key: 'COMPLETED', label: 'Completed' },
];

function getActiveStepIndex(status) {
  switch (status) {
    case BOOKING_STATUSES.REQUESTED:
      return 0;
    case BOOKING_STATUSES.ACCEPTED:
    case BOOKING_STATUSES.AWAITING_PAYMENT:
      return 1;
    case BOOKING_STATUSES.CONFIRMED:
      return 2;
    case BOOKING_STATUSES.IN_PROGRESS:
      return 3;
    case BOOKING_STATUSES.COMPLETED:
      return 4;
    default:
      return -1;
  }
}

export default function BookingTimeline({ status, className = '' }) {
  const isTerminalFailure = [
    BOOKING_STATUSES.DECLINED,
    BOOKING_STATUSES.CANCELLED,
    BOOKING_STATUSES.EXPIRED,
    BOOKING_STATUSES.DISPUTED,
  ].includes(status);

  const activeIndex = getActiveStepIndex(status);

  return (
    <div className={cn('p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3', className)}>
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-display">
          Booking Lifecycle
        </h4>
        {isTerminalFailure && (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <AlertCircle className="w-3 h-3" />
            <span>{status}</span>
          </span>
        )}
      </div>

      {/* Stepper bar */}
      <div className="relative flex items-center justify-between pt-1">
        {/* Track Line */}
        <div className="absolute top-3.5 left-4 right-4 h-0.5 bg-neutral-200 -z-0" />

        {STEPS.map((step, idx) => {
          const isDone = activeIndex > idx;
          const isCurrent = activeIndex === idx;

          let circleStyle = 'bg-white border-2 border-neutral-300 text-neutral-400';
          if (isDone) {
            circleStyle = 'bg-emerald-700 border-2 border-emerald-700 text-white';
          } else if (isCurrent) {
            circleStyle = 'bg-purple-800 border-2 border-purple-800 text-white shadow-2xs';
          }

          return (
            <div key={step.key} className="flex flex-col items-center relative z-10 w-16 text-center">
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center transition-all',
                  circleStyle
                )}
              >
                {isDone ? (
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                ) : isCurrent ? (
                  <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
                ) : (
                  <span className="text-[10px] font-bold">{idx + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  'text-[10px] mt-1 leading-tight line-clamp-2',
                  isCurrent
                    ? 'font-bold text-purple-900'
                    : isDone
                    ? 'font-semibold text-emerald-800'
                    : 'text-neutral-400'
                )}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

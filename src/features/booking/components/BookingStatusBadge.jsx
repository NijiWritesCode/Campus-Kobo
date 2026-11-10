import {
  Clock,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  XCircle,
  AlertCircle,
  AlertTriangle,
  PlayCircle,
  CreditCard,
} from 'lucide-react';
import { BOOKING_STATUSES, BOOKING_STATUS_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/cn';

const STATUS_ICONS = {
  [BOOKING_STATUSES.REQUESTED]: Clock,
  [BOOKING_STATUSES.ACCEPTED]: CheckCircle2,
  [BOOKING_STATUSES.CONFIRMED]: ShieldCheck,
  [BOOKING_STATUSES.IN_PROGRESS]: PlayCircle,
  [BOOKING_STATUSES.COMPLETED]: Sparkles,
  [BOOKING_STATUSES.CANCELLED]: XCircle,
  [BOOKING_STATUSES.DECLINED]: AlertCircle,
  [BOOKING_STATUSES.DISPUTED]: AlertTriangle,
  [BOOKING_STATUSES.AWAITING_PAYMENT]: CreditCard,
  [BOOKING_STATUSES.EXPIRED]: Clock,
};

export default function BookingStatusBadge({ status, size = 'sm', className = '' }) {
  const config = BOOKING_STATUS_CONFIG[status] || {
    label: status,
    bg: 'bg-neutral-100',
    text: 'text-neutral-700',
    border: 'border-neutral-200',
  };

  const Icon = STATUS_ICONS[status] || Clock;

  const sizeClasses = {
    xs: 'text-[10px] px-1.5 py-0.5 gap-1',
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-sm px-3 py-1.5 gap-2',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-bold rounded-lg border shadow-2xs select-none',
        config.bg,
        config.text,
        config.border,
        sizeClasses[size] || sizeClasses.sm,
        className
      )}
    >
      <Icon className={cn('shrink-0', iconSizes[size] || iconSizes.sm)} />
      <span>{config.label}</span>
    </span>
  );
}

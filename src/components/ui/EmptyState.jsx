import { cn } from '@/lib/cn';

export default function EmptyState({
  icon = null,
  title,
  description = null,
  action = null,
  className = '',
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-neutral-300 bg-white/50 max-w-md mx-auto',
        className
      )}
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-500 mb-4 shadow-2xs">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-neutral-900 font-display">
        {title}
      </h3>
      {description && (
        <p className="mt-1.5 text-xs text-neutral-500 max-w-xs leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

import { cn } from '@/lib/cn';

export default function Badge({
  children,
  variant = 'neutral',
  size = 'md',
  dot = false,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'bg-primary-50/90 text-primary-800 border-primary-200/90',
    secondary: 'bg-secondary-50/90 text-secondary-800 border-secondary-200/90',
    purple: 'bg-purple-50/90 text-purple-800 border-purple-200/90',
    emerald: 'bg-emerald-50/90 text-emerald-800 border-emerald-200/90',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    error: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
    dark: 'bg-neutral-900 text-white border-neutral-800',
  };

  const dotColors = {
    primary: 'bg-primary-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]',
    secondary: 'bg-secondary-500 shadow-[0_0_6px_rgba(124,58,237,0.6)]',
    purple: 'bg-purple-500 shadow-[0_0_6px_rgba(124,58,237,0.6)]',
    emerald: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]',
    success: 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]',
    warning: 'bg-amber-500 shadow-[0_0_6px_rgba(245,158,11,0.6)]',
    error: 'bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]',
    info: 'bg-sky-500 shadow-[0_0_6px_rgba(14,165,233,0.6)]',
    neutral: 'bg-neutral-400',
    dark: 'bg-emerald-400',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 rounded-full gap-1 font-medium',
    md: 'text-xs px-2.5 py-0.5 rounded-full gap-1.5 font-semibold',
    lg: 'text-xs sm:text-sm px-3.5 py-1 rounded-full gap-2 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border tracking-normal select-none shrink-0 shadow-2xs',
        variants[variant] || variants.neutral,
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant] || 'bg-neutral-400')}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}

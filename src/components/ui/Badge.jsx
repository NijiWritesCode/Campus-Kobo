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
    primary: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    secondary: 'bg-purple-50 text-purple-900 border-purple-200',
    purple: 'bg-purple-50 text-purple-900 border-purple-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    error: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-sky-50 text-sky-800 border-sky-200',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
    dark: 'bg-neutral-900 text-white border-neutral-800',
  };

  const dotColors = {
    primary: 'bg-emerald-600',
    secondary: 'bg-purple-700',
    purple: 'bg-purple-700',
    emerald: 'bg-emerald-600',
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    error: 'bg-rose-500',
    info: 'bg-sky-500',
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

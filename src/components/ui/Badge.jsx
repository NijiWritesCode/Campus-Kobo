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
    primary: 'bg-primary-50 text-primary-700 border-primary-200/80',
    secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200/80',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/80',
    error: 'bg-red-50 text-red-700 border-red-200/80',
    info: 'bg-blue-50 text-blue-700 border-blue-200/80',
    neutral: 'bg-neutral-100 text-neutral-700 border-neutral-200',
  };

  const dotColors = {
    primary: 'bg-primary-500',
    secondary: 'bg-secondary-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    neutral: 'bg-neutral-400',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 rounded-lg gap-1.5 font-semibold',
    lg: 'text-sm px-3 py-1.5 rounded-xl gap-2 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center border tracking-wide uppercase font-sans shrink-0',
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

import { cn } from '@/lib/cn';

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-white border border-neutral-200 shadow-2xs',
    elevated: 'bg-white border border-neutral-200 shadow-xs hover:shadow-sm transition-shadow',
    outlined: 'bg-transparent border border-neutral-200',
    interactive:
      'bg-white border border-neutral-200 shadow-2xs hover:border-emerald-600/50 hover:shadow-xs transition-all cursor-pointer',
    subtle: 'bg-neutral-50 border border-neutral-200',
    glass: 'bg-white border border-neutral-200 shadow-2xs',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-5 sm:p-6',
  };

  return (
    <div
      className={cn(
        'rounded-xl transition-colors',
        variants[variant] || variants.default,
        paddings[padding] || paddings.md,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

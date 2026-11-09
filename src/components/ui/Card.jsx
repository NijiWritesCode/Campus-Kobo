import { cn } from '@/lib/cn';

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-white border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]',
    elevated: 'bg-white border border-neutral-200/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.08)] transition-shadow duration-200',
    outlined: 'bg-transparent border border-neutral-200/80',
    interactive:
      'bg-white border border-neutral-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-primary-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer',
    subtle: 'bg-neutral-50/70 border border-neutral-200/50',
    glass: 'glass-panel',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-7',
  };

  return (
    <div
      className={cn(
        'rounded-3xl transition-colors',
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

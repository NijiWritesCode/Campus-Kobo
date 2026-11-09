import { cn } from '@/lib/cn';

export default function Card({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) {
  const variants = {
    default: 'bg-white border border-neutral-200/80 shadow-2xs',
    elevated: 'bg-white border border-neutral-100 shadow-sm hover:shadow-md transition-shadow',
    outlined: 'bg-transparent border border-neutral-200',
    interactive:
      'bg-white border border-neutral-200/90 shadow-2xs hover:border-primary-300 hover:shadow-xs active:scale-[0.99] transition-all cursor-pointer',
    subtle: 'bg-neutral-50/80 border border-neutral-200/60',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'rounded-2xl transition-colors',
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

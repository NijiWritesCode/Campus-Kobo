import { cn } from '@/lib/cn';

export default function Skeleton({
  variant = 'text',
  className = '',
  ...props
}) {
  const variants = {
    text: 'h-4 w-full rounded-md',
    circular: 'rounded-full aspect-square',
    rectangular: 'w-full rounded-xl',
    card: 'h-36 w-full rounded-2xl',
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-pulse bg-neutral-200/80',
        variants[variant] || variants.text,
        className
      )}
      {...props}
    />
  );
}

import { cn } from '@/lib/cn';

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]',
        sizes[size] || sizes.md,
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

import { cn } from '@/lib/cn';

/**
 * React Bits inspired Aurora Background:
 * Adds a soft, glowing, multi-color ambient gradient behind hero headers and cards.
 */
export default function AuroraBackground({
  children,
  className = '',
  showRadialGradient = true,
}) {
  return (
    <div className={cn('relative flex flex-col items-center justify-center overflow-hidden', className)}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            'filter blur-[80px] opacity-40 absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] sm:w-[900px] sm:h-[500px] rounded-full',
            'bg-gradient-to-tr from-primary-400/40 via-amber-300/30 to-secondary-400/30'
          )}
        />
        {showRadialGradient && (
          <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        )}
      </div>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

import { cn } from '@/lib/cn';

/**
 * React Bits inspired Animated Gradient Pill:
 * Shimmering border glow + gradient text for announcements & trust badges.
 */
export default function AnimatedGradientText({
  children,
  className = '',
  shimmerColor = '#7c3aed',
}) {
  return (
    <div
      className={cn(
        'group relative mx-auto inline-flex items-center justify-center rounded-full px-4 py-1.5 text-xs font-semibold shadow-xs transition-all duration-300',
        'bg-white/80 hover:bg-white backdrop-blur-md border border-neutral-200/90 hover:border-purple-300',
        className
      )}
    >
      <span
        className="inline-block bg-gradient-to-r from-purple-600 via-emerald-600 to-purple-600 bg-[length:200%_auto] bg-clip-text text-transparent animate-shimmer"
        style={{
          '--shimmer-color': shimmerColor,
        }}
      >
        {children}
      </span>
    </div>
  );
}

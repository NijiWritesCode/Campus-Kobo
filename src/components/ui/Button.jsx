import { cn } from '@/lib/cn';
import Spinner from './Spinner';

/**
 * Reusable Button component with multiple variants, loading states, and accessible feedback.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  type = 'button',
  className = '',
  ...props
}) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const variants = {
    primary:
      'bg-primary-500 hover:bg-primary-600 text-white shadow-xs focus-visible:ring-primary-500 shadow-primary-500/20 active:bg-primary-700',
    secondary:
      'bg-secondary-500 hover:bg-secondary-600 text-white shadow-xs focus-visible:ring-secondary-500 shadow-secondary-500/20 active:bg-secondary-700',
    outline:
      'border-2 border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-800 focus-visible:ring-neutral-400',
    ghost:
      'bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 focus-visible:ring-neutral-300',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-xs focus-visible:ring-red-500 shadow-red-500/20 active:bg-red-800',
    subtle:
      'bg-primary-50 hover:bg-primary-100 text-primary-700 focus-visible:ring-primary-400 border border-primary-200/60',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-6 py-3.5 rounded-2xl gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        baseStyles,
        variants[variant] || variants.primary,
        sizes[size] || sizes.md,
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      {loading && (
        <Spinner
          size={size === 'sm' ? 'sm' : 'md'}
          className={cn(
            variant === 'outline' || variant === 'ghost'
              ? 'text-primary-500'
              : 'text-white'
          )}
        />
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
}

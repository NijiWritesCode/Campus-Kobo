import { cn } from '@/lib/cn';
import Spinner from './Spinner';

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
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    primary:
      'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white focus-visible:ring-emerald-700 font-semibold shadow-xs',
    secondary:
      'bg-purple-800 hover:bg-purple-900 active:bg-purple-950 text-white focus-visible:ring-purple-800 font-semibold shadow-xs',
    purple:
      'bg-purple-800 hover:bg-purple-900 active:bg-purple-950 text-white focus-visible:ring-purple-800 font-semibold shadow-xs',
    emerald:
      'bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white focus-visible:ring-emerald-700 font-semibold shadow-xs',
    outline:
      'border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-50 text-neutral-900 focus-visible:ring-neutral-400 font-semibold shadow-xs',
    ghost:
      'bg-transparent hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 focus-visible:ring-neutral-300 font-medium',
    danger:
      'bg-red-600 hover:bg-red-700 active:bg-red-800 text-white focus-visible:ring-red-600 font-semibold shadow-xs',
    subtle:
      'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-medium border border-neutral-200',
    dark:
      'bg-neutral-900 hover:bg-neutral-800 text-white focus-visible:ring-neutral-700 font-semibold shadow-xs',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
    md: 'h-10 px-4 text-xs sm:text-sm rounded-xl gap-2',
    lg: 'h-12 px-6 text-sm sm:text-base rounded-2xl gap-2.5',
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
              ? 'text-primary-600'
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

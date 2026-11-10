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
      'bg-primary-600 hover:bg-primary-500 text-white shadow-[0_2px_10px_rgba(5,150,105,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] focus-visible:ring-primary-500 active:bg-primary-700 font-semibold',
    secondary:
      'bg-secondary-600 hover:bg-secondary-500 text-white shadow-[0_2px_10px_rgba(124,58,237,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] focus-visible:ring-secondary-500 active:bg-secondary-700 font-semibold',
    purple:
      'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_2px_10px_rgba(124,58,237,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] focus-visible:ring-purple-500 active:bg-purple-700 font-semibold',
    emerald:
      'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_2px_10px_rgba(5,150,105,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] focus-visible:ring-emerald-500 active:bg-emerald-700 font-semibold',
    outline:
      'border border-neutral-200 hover:border-neutral-300 bg-white hover:bg-neutral-50/80 text-neutral-800 shadow-2xs focus-visible:ring-neutral-400 font-medium',
    ghost:
      'bg-transparent hover:bg-neutral-100/90 text-neutral-600 hover:text-neutral-900 focus-visible:ring-neutral-300 font-medium',
    danger:
      'bg-red-600 hover:bg-red-500 text-white shadow-[0_2px_10px_rgba(220,38,38,0.25),inset_0_1px_0_0_rgba(255,255,255,0.2)] focus-visible:ring-red-500 active:bg-red-700 font-semibold',
    subtle:
      'bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-medium border border-neutral-200/60',
    dark:
      'bg-neutral-950 hover:bg-neutral-900 text-white shadow-[0_2px_10px_rgba(9,9,11,0.25),inset_0_1px_0_0_rgba(255,255,255,0.15)] focus-visible:ring-neutral-700 font-semibold',
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

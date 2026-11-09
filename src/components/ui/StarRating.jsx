import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function StarRating({
  value = 0,
  onChange = null,
  readonly = true,
  size = 'md',
  showValue = false,
  reviewCount = null,
  className = '',
}) {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm font-semibold',
    lg: 'text-base font-bold',
    xl: 'text-lg font-bold',
  };

  const activeRating = hoverValue || value;

  return (
    <div className={cn('inline-flex items-center gap-1.5 shrink-0', className)}>
      <div className="flex items-center gap-0.5" role={readonly ? 'img' : 'radiogroup'} aria-label={`Rating: ${value} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= activeRating;
          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => onChange?.(star)}
              onMouseEnter={() => !readonly && setHoverValue(star)}
              onMouseLeave={() => !readonly && setHoverValue(0)}
              className={cn(
                'focus:outline-none transition-colors',
                readonly ? 'cursor-default pointer-events-none' : 'cursor-pointer hover:scale-110 active:scale-95'
              )}
              aria-label={readonly ? undefined : `Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                className={cn(
                  sizes[size] || sizes.md,
                  filled
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-neutral-200 text-neutral-200'
                )}
              />
            </button>
          );
        })}
      </div>

      {showValue && (
        <span className={cn('text-neutral-900', textSizes[size] || textSizes.md)}>
          {Number(value).toFixed(1)}
        </span>
      )}

      {reviewCount !== null && (
        <span className="text-xs text-neutral-500 font-medium">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}

import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function Avatar({
  src = null,
  name = 'User',
  size = 'md',
  verified = false,
  className = '',
}) {
  const [hasError, setHasError] = useState(false);

  // Compute initials (e.g. "Adaeze Okafor" -> "AO")
  const initials = (name || 'U')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  const sizes = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm font-semibold',
    lg: 'w-14 h-14 text-base font-bold',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const badgeSizes = {
    xs: 'w-2.5 h-2.5 p-0.5',
    sm: 'w-3 h-3 p-0.5',
    md: 'w-4 h-4 p-0.5',
    lg: 'w-5 h-5 p-1',
    xl: 'w-6 h-6 p-1',
  };

  return (
    <div className={cn('relative inline-block shrink-0', className)}>
      <div
        className={cn(
          'rounded-full overflow-hidden flex items-center justify-center bg-gradient-to-tr from-primary-600 to-primary-400 text-white select-none shadow-2xs border border-white',
          sizes[size] || sizes.md
        )}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={name}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      {verified && (
        <span
          title="Verified Student Provider"
          className={cn(
            'absolute bottom-0 right-0 bg-secondary-500 text-white rounded-full flex items-center justify-center border-2 border-white shadow-xs',
            badgeSizes[size] || badgeSizes.md
          )}
        >
          <Check className="w-full h-full stroke-[3]" />
        </span>
      )}
    </div>
  );
}

import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export default function Logo({
  size = 'md',
  to = '/app',
  showTagline = false,
  className = '',
}) {
  const iconSizes = {
    sm: 'w-7 h-7 text-xs rounded-lg',
    md: 'w-9 h-9 text-sm rounded-xl',
    lg: 'w-12 h-12 text-lg rounded-2xl',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  const content = (
    <div className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      <div
        className={cn(
          'bg-gradient-to-tr from-primary-600 to-primary-400 text-white font-extrabold flex items-center justify-center shadow-xs shrink-0 tracking-tight',
          iconSizes[size] || iconSizes.md
        )}
      >
        CK
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            'font-bold tracking-tight text-neutral-900 font-display leading-tight',
            textSizes[size] || textSizes.md
          )}
        >
          Campus <span className="text-primary-600">Kobo</span>
        </span>
        {showTagline && (
          <span className="text-[10px] text-neutral-500 font-medium tracking-wide">
            Student Marketplace
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}

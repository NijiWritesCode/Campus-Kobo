import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function PageHeader({
  title,
  subtitle = null,
  backTo = null,
  action = null,
  className = '',
}) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (typeof backTo === 'string') {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={cn('flex items-start justify-between gap-4 mb-6 pt-1', className)}>
      <div className="flex items-start gap-3">
        {backTo !== null && (
          <button
            type="button"
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-xs sm:text-sm text-neutral-500 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

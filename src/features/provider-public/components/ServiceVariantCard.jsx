import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ServiceVariantCard({ variant }) {
  const formatDuration = (mins) => {
    if (!mins) return '';
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (hours > 0 && remainingMins > 0) return `${hours}h ${remainingMins}m`;
    if (hours > 0) return `${hours} hr${hours > 1 ? 's' : ''}`;
    return `${mins} mins`;
  };

  return (
    <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-200/90 bg-white hover:border-primary-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-xs sm:text-sm font-bold text-neutral-900 font-display">
            {variant.name}
          </h4>
        </div>
        {variant.description && (
          <p className="text-xs text-neutral-500 leading-relaxed max-w-lg">
            {variant.description}
          </p>
        )}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400 pt-0.5">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <span>Approx. {formatDuration(variant.durationMinutes)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        <div className="text-right">
          <span className="text-xs text-neutral-400 block sm:hidden">Price</span>
          <span className="text-sm sm:text-base font-extrabold text-neutral-900 font-display">
            {formatCurrency(variant.priceKobo)}
          </span>
        </div>

        <Link to={`/app/book/${variant.id}`}>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            Book
          </Button>
        </Link>
      </div>
    </div>
  );
}

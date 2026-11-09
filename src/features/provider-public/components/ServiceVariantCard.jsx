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
    <div className="p-4 sm:p-5 rounded-2xl border border-neutral-200/90 bg-white hover:border-primary-400/60 hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-bold text-neutral-900 font-display">
            {variant.name}
          </h4>
        </div>
        {variant.description && (
          <p className="text-xs text-neutral-500 leading-relaxed max-w-lg font-normal">
            {variant.description}
          </p>
        )}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400 pt-0.5">
          <Clock className="w-3.5 h-3.5 text-neutral-400" />
          <span>Approx. {formatDuration(variant.durationMinutes)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-3.5 pt-2.5 sm:pt-0 border-t sm:border-t-0 border-neutral-100">
        <div className="text-right">
          <span className="text-[10px] text-neutral-400 block sm:hidden">Price</span>
          <span className="text-base sm:text-lg font-black text-neutral-900 font-display">
            {formatCurrency(variant.priceKobo)}
          </span>
        </div>

        <Link to={`/app/book/${variant.id}`}>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            className="shadow-sm shadow-primary-500/20"
          >
            Book
          </Button>
        </Link>
      </div>
    </div>
  );
}

import { ShieldCheck, Info } from 'lucide-react';
import { formatCurrency } from '@/lib/formatCurrency';
import { cn } from '@/lib/cn';

export default function PriceBreakdown({
  servicePriceKobo,
  platformFeeKobo,
  totalPriceKobo,
  showTrustCallout = true,
  className = '',
}) {
  const feeKobo = platformFeeKobo ?? Math.round(servicePriceKobo * 0.1);
  const totalKobo = totalPriceKobo ?? (servicePriceKobo + feeKobo);

  return (
    <div className={cn('space-y-3.5', className)}>
      <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-2.5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-display">
          Price Breakdown
        </h4>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between text-neutral-700">
            <span>Service Rate</span>
            <span className="font-semibold text-neutral-900 font-display">
              {formatCurrency(servicePriceKobo)}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-700">
            <span className="inline-flex items-center gap-1">
              <span>Campus Escrow & Safety (10%)</span>
              <span title="Covers dispute protection, 6-digit PIN release escrow, and student identity verification">
                <Info className="w-3.5 h-3.5 text-neutral-400" />
              </span>
            </span>
            <span className="font-semibold text-neutral-900 font-display">
              {formatCurrency(feeKobo)}
            </span>
          </div>

          <div className="pt-2.5 border-t border-neutral-200 flex items-center justify-between">
            <span className="font-bold text-neutral-900 font-display">
              Total Amount
            </span>
            <span className="text-lg font-black text-emerald-800 font-display">
              {formatCurrency(totalKobo)}
            </span>
          </div>
        </div>
      </div>

      {showTrustCallout && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-bold block text-emerald-950 font-display">
              Escrow Protection Guarantee
            </span>
            <p className="text-emerald-800 text-[11px]">
              Your funds are held securely by Campus Kobo. Payment is only released to the provider after you verify their work and hand over your confidential 6-digit PIN.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

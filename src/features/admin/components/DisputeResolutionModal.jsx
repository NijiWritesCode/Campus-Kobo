import { useState } from 'react';
import { ShieldCheck, RotateCcw, CheckCircle2, Split } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { formatCurrency } from '@/lib/formatCurrency';

export default function DisputeResolutionModal({
  isOpen,
  onClose,
  dispute,
  onResolve,
}) {
  const [resolutionType, setResolutionType] = useState('REFUND_CLIENT');
  const [arbitratorNotes, setArbitratorNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!dispute) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!arbitratorNotes.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onResolve(dispute.id, resolutionType, arbitratorNotes);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  const halfAmountKobo = Math.round((dispute.amountKobo || 0) / 2);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Arbitrate & Settle Escrow Dispute"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Dispute Summary Box */}
        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold font-display">Escrow Held:</span>
            <span className="text-sm font-black text-purple-950 font-display">
              {formatCurrency(dispute.amountKobo)}
            </span>
          </div>
          <p className="text-[11px] text-purple-800">
            Booking #{dispute.bookingReference} • {dispute.serviceTitle}
          </p>
        </div>

        {/* Resolution Options */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-800 block font-display">
            Arbitration Verdict
          </label>

          <div className="space-y-2">
            {/* Option 1: 100% Refund Client */}
            <label
              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                resolutionType === 'REFUND_CLIENT'
                  ? 'bg-rose-50/70 border-rose-400 text-rose-950'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <input
                type="radio"
                name="resolution"
                value="REFUND_CLIENT"
                checked={resolutionType === 'REFUND_CLIENT'}
                onChange={(e) => setResolutionType(e.target.value)}
                className="mt-0.5 text-rose-600 focus:ring-rose-500"
              />
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold font-display">
                  <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                  <span>100% Refund to Client ({formatCurrency(dispute.amountKobo)})</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Provider failed to deliver, arrived severely late, or caused severe dissatisfaction. Escrow returned to client wallet.
                </p>
              </div>
            </label>

            {/* Option 2: 100% Release to Provider */}
            <label
              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                resolutionType === 'RELEASE_PROVIDER'
                  ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <input
                type="radio"
                name="resolution"
                value="RELEASE_PROVIDER"
                checked={resolutionType === 'RELEASE_PROVIDER'}
                onChange={(e) => setResolutionType(e.target.value)}
                className="mt-0.5 text-emerald-600 focus:ring-emerald-500"
              />
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold font-display">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Release to Provider ({formatCurrency(dispute.amountKobo)})</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Provider completed work satisfactorily. Client withheld release PIN without valid reason. Funds disbursed to provider.
                </p>
              </div>
            </label>

            {/* Option 3: 50/50 Split */}
            <label
              className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                resolutionType === 'SPLIT_50_50'
                  ? 'bg-purple-50/70 border-purple-400 text-purple-950'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              <input
                type="radio"
                name="resolution"
                value="SPLIT_50_50"
                checked={resolutionType === 'SPLIT_50_50'}
                onChange={(e) => setResolutionType(e.target.value)}
                className="mt-0.5 text-purple-600 focus:ring-purple-500"
              />
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold font-display">
                  <Split className="w-3.5 h-3.5 text-purple-600" />
                  <span>50/50 Split ({formatCurrency(halfAmountKobo)} each)</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Partial service completion or mutual agreement to abort halfway due to academic/power disruption.
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Arbitrator Justification Notes */}
        <div className="space-y-1">
          <label htmlFor="arbitrator-notes" className="text-xs font-bold text-neutral-800 block font-display">
            Official Arbitration Statement (Recorded in Public Audit Log)
          </label>
          <textarea
            id="arbitrator-notes"
            rows={3}
            value={arbitratorNotes}
            onChange={(e) => setArbitratorNotes(e.target.value)}
            placeholder="State factual reason for verdict, evidence reviewed, and communication notes..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
            required
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            loading={isSubmitting}
            icon={<ShieldCheck className="w-4 h-4" />}
          >
            Enforce Escrow Verdict
          </Button>
        </div>
      </form>
    </Modal>
  );
}

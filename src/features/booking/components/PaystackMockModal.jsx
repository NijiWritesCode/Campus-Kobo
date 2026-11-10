import { useState } from 'react';
import { CreditCard, Building2, ShieldCheck, Lock, AlertCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/formatCurrency';

export default function PaystackMockModal({
  isOpen,
  onClose,
  booking,
  onPaymentSuccess,
}) {
  const [tab, setTab] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!booking) return null;

  const handleSimulateSuccess = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess({
        method: tab === 'card' ? 'Paystack Card (•••• 4242)' : 'Bank Transfer (Wema Virtual)',
        reference: `PAY-CKB-${Math.floor(100000 + Math.random() * 900000)}`,
      });
      onClose();
    }, 1200);
  };

  const handleSimulateDecline = () => {
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      setError('Transaction declined: Insufficient test funds or bank timeout. Please retry.');
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? () => {} : onClose}
      title="Secure Campus Payment"
      size="md"
    >
      <div className="space-y-4">
        {/* Recipient & Total Pill */}
        <div className="p-3.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-medium">
              Escrow Recipient
            </span>
            <span className="text-xs font-bold font-display">
              Campus Kobo Escrow • UNILAG
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 block font-medium">
              Amount Due
            </span>
            <span className="text-base font-black text-emerald-400 font-display">
              {formatCurrency(booking.totalPriceKobo)}
            </span>
          </div>
        </div>

        {/* Tab switch: Card vs Bank Transfer */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-neutral-100 rounded-lg">
          <button
            type="button"
            onClick={() => { setTab('card'); setError(null); }}
            className={`py-2 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
              tab === 'card'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-purple-700" />
            <span>Card</span>
          </button>
          <button
            type="button"
            onClick={() => { setTab('bank'); setError(null); }}
            className={`py-2 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
              tab === 'bank'
                ? 'bg-white text-neutral-900 shadow-2xs'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-700" />
            <span>Bank Transfer</span>
          </button>
        </div>

        {/* Card Tab Content */}
        {tab === 'card' && (
          <div className="space-y-3 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
            <div className="flex items-center justify-between text-neutral-600">
              <span className="font-semibold text-neutral-800">Simulated Test Card</span>
              <span className="font-mono text-[11px] bg-neutral-200 px-1.5 py-0.5 rounded text-neutral-800">
                Visa •••• 4242
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 leading-relaxed">
              In test mode: click below to simulate an instantaneous successful 3D-Secure payment tokenized via Paystack.
            </p>
          </div>
        )}

        {/* Bank Transfer Tab Content */}
        {tab === 'bank' && (
          <div className="space-y-2 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Virtual Bank:</span>
              <span className="font-bold text-neutral-900">Wema Bank</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Account Number:</span>
              <span className="font-mono font-black text-sm text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                0192 837 465
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Account Name:</span>
              <span className="font-semibold text-neutral-800">Campus Kobo / Escrow</span>
            </div>
            <p className="text-[10px] text-neutral-400 pt-1">
              Transfer exact amount to verify instantly without bank alerts.
            </p>
          </div>
        )}

        {/* Error notification if triggered */}
        {error && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Escrow Guarantee Pill */}
        <div className="flex items-center gap-2 text-[11px] text-neutral-600 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Payment is held in conditional escrow until PIN confirmation.</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleSimulateSuccess}
            disabled={loading}
            icon={loading ? <Spinner size="sm" /> : <Lock className="w-4 h-4" />}
          >
            {loading ? 'Processing Payment...' : `Authorize & Escrow ${formatCurrency(booking.totalPriceKobo)}`}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            fullWidth
            onClick={handleSimulateDecline}
            disabled={loading}
            className="text-neutral-500 hover:text-neutral-800 text-[11px]"
          >
            Test Failure / Decline Simulation
          </Button>
        </div>
      </div>
    </Modal>
  );
}

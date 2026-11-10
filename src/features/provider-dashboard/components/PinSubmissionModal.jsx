import { useState } from 'react';
import { KeyRound, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/formatCurrency';

export default function PinSubmissionModal({
  isOpen,
  onClose,
  booking,
  onVerifyPin,
}) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successResult, setSuccessResult] = useState(null);

  if (!booking) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin.trim().length !== 6) {
      setError('Please enter the full 6-digit release PIN provided by the client.');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const result = onVerifyPin(booking.id, pin.trim());
      setLoading(false);

      if (result.success) {
        setSuccessResult(result);
      } else {
        setError(result.error || 'PIN does not match.');
      }
    }, 800);
  };

  const handleClose = () => {
    setPin('');
    setError(null);
    setSuccessResult(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? () => {} : handleClose}
      title="Verify 6-Digit Completion PIN"
      size="md"
    >
      {successResult ? (
        <div className="py-4 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-300">
            <CheckCircle2 className="w-8 h-8 text-emerald-700" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              PIN Verified & Payout Released!
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Your service is marked complete. The client’s escrowed payment of{' '}
              <strong className="text-emerald-900">
                {formatCurrency(successResult.netPayoutKobo)}
              </strong>{' '}
              has been transferred into your available provider balance.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="md" fullWidth onClick={handleClose}>
              Done & Return to Dashboard
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Snapshot */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-neutral-900 block font-display">
                {booking.serviceTitle}
              </span>
              <span className="text-neutral-500">
                Client: {booking.clientName} • Ref: {booking.bookingReference}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-neutral-400 block font-medium">Your Payout</span>
              <span className="font-black text-sm text-emerald-800 font-display">
                {formatCurrency(booking.servicePriceKobo)}
              </span>
            </div>
          </div>

          {/* Prompt explainer */}
          <p className="text-xs text-neutral-600 leading-relaxed">
            Ask your student client for their confidential <strong>6-digit release PIN</strong>. Once verified, escrowed funds are released to your wallet immediately.
          </p>

          {/* 6-Digit Input */}
          <div className="space-y-1.5 text-center">
            <label htmlFor="pin-input" className="text-xs font-bold text-neutral-800 block font-display">
              Enter 6-Digit Code
            </label>
            <input
              id="pin-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              autoFocus
              value={pin}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                setPin(val);
                setError(null);
              }}
              placeholder="••••••"
              className="w-48 mx-auto px-4 py-3 rounded-xl border-2 border-purple-800/60 bg-white text-center text-2xl font-black font-display tracking-[0.4em] text-neutral-900 placeholder:text-neutral-300 focus:outline-none focus:border-purple-800 shadow-2xs"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Trust Guarantee */}
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Campus Kobo Instant Settlement: 100% secure peer disbursement.</span>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              type="submit"
              disabled={loading || pin.length !== 6}
              icon={loading ? <Spinner size="sm" /> : <KeyRound className="w-4 h-4" />}
            >
              {loading ? 'Verifying PIN...' : 'Verify PIN & Release Payout'}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

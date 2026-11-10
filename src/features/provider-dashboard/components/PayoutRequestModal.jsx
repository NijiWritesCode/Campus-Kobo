import { useState } from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { formatCurrency } from '@/lib/formatCurrency';

const NIGERIAN_BANKS = [
  'Access Bank',
  'GTBank (Guaranty Trust Bank)',
  'Zenith Bank',
  'First Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Kuda Microfinance Bank',
  'Moniepoint MFB',
  'OPay',
  'Stanbic IBTC Bank',
  'Fidelity Bank',
];

export default function PayoutRequestModal({
  isOpen,
  onClose,
  availableBalanceKobo,
  bankDetails,
  onRequestPayout,
  onSaveBankDetails,
}) {
  const [amountNaira, setAmountNaira] = useState('');
  const [bankName, setBankName] = useState(bankDetails?.bankName || NIGERIAN_BANKS[0]);
  const [accountNumber, setAccountNumber] = useState(bankDetails?.accountNumber || '');
  const [accountName, setAccountName] = useState(bankDetails?.accountName || 'Adaeze Okafor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const availableNaira = availableBalanceKobo / 100;

  const handleMax = () => {
    setAmountNaira(String(availableNaira));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amountVal = Number(amountNaira);

    if (!amountVal || amountVal <= 0) {
      setError('Please enter a valid payout amount.');
      return;
    }

    if (amountVal > availableNaira) {
      setError(`Amount cannot exceed your available balance of ${formatCurrency(availableBalanceKobo)}.`);
      return;
    }

    if (accountNumber.trim().length !== 10) {
      setError('Please enter a valid 10-digit NUBAN account number.');
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      const details = { bankName, accountNumber: accountNumber.trim(), accountName: accountName.trim() };
      onSaveBankDetails(details);
      const res = onRequestPayout({
        amountKobo: Math.round(amountVal * 100),
        bankDetails: details,
      });

      setLoading(false);
      if (res.success) {
        setSuccess(true);
      } else {
        setError(res.error || 'Failed to process payout.');
      }
    }, 1000);
  };

  const handleClose = () => {
    setError(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? () => {} : handleClose}
      title="Withdraw Earnings to Bank"
      size="md"
    >
      {success ? (
        <div className="py-4 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-300">
            <CheckCircle2 className="w-8 h-8 text-emerald-700" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900 font-display">
              Payout Initiated!
            </h3>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              Your payout of <strong>₦{Number(amountNaira).toLocaleString()}</strong> has been dispatched to your {bankName} account ({accountNumber}). Funds typically land within 5–15 minutes via NIBSS.
            </p>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="md" fullWidth onClick={handleClose}>
              Back to Earnings
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Balance card */}
          <div className="p-3.5 rounded-xl bg-neutral-900 text-white flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-medium">
                Available Wallet Balance
              </span>
              <span className="text-lg font-black text-emerald-400 font-display">
                {formatCurrency(availableBalanceKobo)}
              </span>
            </div>
            <button
              type="button"
              onClick={handleMax}
              className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-xs font-bold text-white transition-colors"
            >
              Withdraw All
            </button>
          </div>

          {/* Amount field */}
          <div className="space-y-1">
            <label htmlFor="payout-amount" className="text-xs font-bold text-neutral-800 block font-display">
              Withdrawal Amount (₦)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-400">
                ₦
              </span>
              <input
                id="payout-amount"
                type="number"
                min="500"
                max={availableNaira}
                step="100"
                value={amountNaira}
                onChange={(e) => {
                  setAmountNaira(e.target.value);
                  setError(null);
                }}
                placeholder="e.g. 10000"
                className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm font-bold text-neutral-900 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 shadow-2xs"
                required
              />
            </div>
            <span className="text-[10px] text-neutral-400">Minimum withdrawal: ₦500. No transfer fee.</span>
          </div>

          {/* Bank Selection */}
          <div className="space-y-1">
            <label htmlFor="bank-select" className="text-xs font-bold text-neutral-800 block font-display">
              Select Bank
            </label>
            <select
              id="bank-select"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-emerald-700 shadow-2xs"
            >
              {NIGERIAN_BANKS.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Account Number */}
          <div className="space-y-1">
            <label htmlFor="account-num" className="text-xs font-bold text-neutral-800 block font-display">
              10-Digit Account Number
            </label>
            <input
              id="account-num"
              type="text"
              inputMode="numeric"
              maxLength={10}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="0123456789"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white font-mono text-neutral-900 focus:outline-none focus:border-emerald-700 shadow-2xs"
              required
            />
          </div>

          {/* Account Name */}
          <div className="space-y-1">
            <label htmlFor="account-name" className="text-xs font-bold text-neutral-800 block font-display">
              Account Holder Name
            </label>
            <input
              id="account-name"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Must match your verified matric student name"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-emerald-700 shadow-2xs"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-2 text-xs text-rose-800">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit CTA */}
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              type="submit"
              disabled={loading || availableBalanceKobo <= 0}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>Processing Transfer...</span>
                </span>
              ) : (
                'Confirm & Disburse Payout'
              )}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}

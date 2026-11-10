import { useState } from 'react';
import {
  Wallet,
  Building2,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import PayoutRequestModal from '../components/PayoutRequestModal';
import { useProviderEarnings } from '../hooks/useProviderEarnings';
import { formatCurrency } from '@/lib/formatCurrency';

export default function EarningsPage() {
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);

  const {
    availableBalanceKobo,
    pendingEscrowBalanceKobo,
    totalEarnedKobo,
    bankDetails,
    transactions,
    requestPayout,
    saveBankDetails,
  } = useProviderEarnings();

  const handleRequestPayout = (args) => {
    const res = requestPayout(args);
    if (res.success) {
      toast.success('Payout request submitted successfully!');
    }
    return res;
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
            Earnings & Payouts
          </h1>
          <p className="text-xs text-neutral-500">
            Track student escrow settlements, wallet balance, and bank transfers
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setPayoutModalOpen(true)}
          disabled={availableBalanceKobo <= 0}
          icon={<ArrowUpRight className="w-3.5 h-3.5" />}
        >
          Withdraw to Bank
        </Button>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Available Wallet Balance */}
        <Card
          variant="default"
          padding="md"
          className="bg-white border border-neutral-200 rounded-xl shadow-2xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-display">
              Available For Withdrawal
            </span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-display tracking-tight">
              {formatCurrency(availableBalanceKobo)}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Instant payout to your linked bank account
            </p>
          </div>
        </Card>

        {/* Pending Escrow */}
        <Card
          variant="default"
          padding="md"
          className="bg-white border border-neutral-200 rounded-xl shadow-2xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-display">
              Locked in Escrow
            </span>
            <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200">
              <Clock className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-purple-950 font-display tracking-tight">
              {formatCurrency(pendingEscrowBalanceKobo)}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Releases immediately upon client PIN entry
            </p>
          </div>
        </Card>

        {/* Lifetime Earnings */}
        <Card
          variant="default"
          padding="md"
          className="bg-white border border-neutral-200 rounded-xl shadow-2xs space-y-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-display">
              Lifetime Earned
            </span>
            <div className="w-7 h-7 rounded-lg bg-neutral-100 text-neutral-700 flex items-center justify-center border border-neutral-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-neutral-900 font-display tracking-tight">
              {formatCurrency(totalEarnedKobo)}
            </div>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Total volume across all completed jobs
            </p>
          </div>
        </Card>
      </div>

      {/* Linked Bank Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-neutral-100 text-neutral-700 flex items-center justify-center border border-neutral-200 shrink-0">
            <Building2 className="w-5 h-5 text-neutral-800" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-bold font-display">
              Linked Settlement Bank Account
            </span>
            <span className="font-bold text-sm text-neutral-900 font-display">
              {bankDetails.bankName} • {bankDetails.accountNumber}
            </span>
            <p className="text-neutral-500 text-[11px]">
              Beneficiary: {bankDetails.accountName}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPayoutModalOpen(true)}
        >
          Update Bank Details
        </Button>
      </div>

      {/* Transactions History */}
      <section aria-labelledby="tx-heading" className="space-y-3">
        <h2 id="tx-heading" className="text-base sm:text-lg font-bold text-neutral-900 font-display">
          Transaction History
        </h2>

        <div className="p-1 rounded-2xl bg-white border border-neutral-200 shadow-2xs overflow-hidden">
          <div className="divide-y divide-neutral-100 text-xs">
            {transactions.map((tx) => {
              const isPayout = tx.type === 'BOOKING_PAYOUT';
              return (
                <div
                  key={tx.id}
                  className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-neutral-50/60 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                        isPayout
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      {isPayout ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <span className="font-bold text-neutral-900 block truncate font-display">
                        {tx.description}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {new Date(tx.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={`text-sm font-black font-display ${
                        isPayout ? 'text-emerald-800' : 'text-neutral-900'
                      }`}
                    >
                      {isPayout ? '+' : ''}
                      {formatCurrency(tx.amountKobo)}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 block mt-0.5 font-bold text-center">
                      Settled
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Payout Withdrawal Modal */}
      <PayoutRequestModal
        isOpen={payoutModalOpen}
        onClose={() => setPayoutModalOpen(false)}
        availableBalanceKobo={availableBalanceKobo}
        bankDetails={bankDetails}
        onRequestPayout={handleRequestPayout}
        onSaveBankDetails={saveBankDetails}
      />
    </div>
  );
}

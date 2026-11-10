import { useState } from 'react';
import { CreditCard, ShieldCheck, ArrowDownLeft, RotateCcw } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import KPICard from '../components/KPICard';
import { mockBookings } from '@/mocks/data/bookings';
import { formatCurrency } from '@/lib/formatCurrency';

export default function PaymentManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  // Transform bookings into payment transaction records
  const transactions = mockBookings.map((b, idx) => {
    const fee = b.platformFeeKobo || Math.round(b.servicePriceKobo * 0.1);
    const total = b.totalAmountKobo || b.servicePriceKobo + fee;
    const isRefunded = b.status === 'CANCELLED';

    return {
      id: `txn-${b.id}`,
      gatewayReference: `pstk_mock_${b.bookingReference}_${idx + 101}`,
      bookingReference: b.bookingReference,
      clientName: b.clientName,
      providerName: b.providerName,
      serviceTitle: b.serviceTitle,
      grossAmountKobo: total,
      platformFeeKobo: fee,
      netEscrowKobo: b.servicePriceKobo,
      status: isRefunded ? 'REFUNDED' : 'SUCCESS',
      createdAt: b.createdAt || '2026-11-09T14:00:00Z',
    };
  });

  const totalGrossKobo = transactions.reduce((acc, t) => acc + t.grossAmountKobo, 0);
  const totalFeesKobo = transactions.reduce((acc, t) => acc + t.platformFeeKobo, 0);
  const totalRefundedKobo = transactions
    .filter((t) => t.status === 'REFUNDED')
    .reduce((acc, t) => acc + t.grossAmountKobo, 0);

  const filtered = transactions.filter(
    (t) =>
      !searchQuery ||
      t.gatewayReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bookingReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.providerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Gateway Reference',
      render: (row) => (
        <div className="space-y-0.5">
          <span className="font-mono font-bold text-xs text-neutral-900 block">
            {row.gatewayReference}
          </span>
          <span className="text-[11px] text-neutral-500 font-mono">
            Booking #{row.bookingReference}
          </span>
        </div>
      ),
    },
    {
      header: 'Client & Provider',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-semibold text-neutral-900 block">{row.clientName}</span>
          <span className="text-[11px] text-neutral-500">{row.providerName}</span>
        </div>
      ),
    },
    {
      header: 'Gross Charged',
      render: (row) => (
        <span className="font-bold text-neutral-900 font-display">
          {formatCurrency(row.grossAmountKobo)}
        </span>
      ),
    },
    {
      header: '10% Platform Fee',
      render: (row) => (
        <span className="font-bold text-emerald-800 font-display">
          +{formatCurrency(row.platformFeeKobo)}
        </span>
      ),
    },
    {
      header: 'Provider Escrow',
      render: (row) => (
        <span className="font-bold text-purple-950 font-display">
          {formatCurrency(row.netEscrowKobo)}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            row.status === 'SUCCESS'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {row.status === 'SUCCESS' ? (
            <ShieldCheck className="w-3 h-3 text-emerald-700" />
          ) : (
            <RotateCcw className="w-3 h-3 text-rose-700" />
          )}
          <span>{row.status}</span>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Payment Records & Gateway Ledger"
        subtitle="All client checkout transactions, Paystack mock references, platform revenue, and refunds"
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KPICard
          title="Total Gross Processed"
          value={formatCurrency(totalGrossKobo)}
          subtitle="Processed via Paystack Mock"
          icon={CreditCard}
          colorScheme="emerald"
        />
        <KPICard
          title="Campus Safety Revenue (10%)"
          value={formatCurrency(totalFeesKobo)}
          subtitle="Platform commission earned"
          icon={ArrowDownLeft}
          colorScheme="purple"
        />
        <KPICard
          title="Total Refunded Volume"
          value={formatCurrency(totalRefundedKobo)}
          subtitle="Cancelled / arbitrated refunds"
          icon={RotateCcw}
          colorScheme="neutral"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by Paystack reference, booking ref, or student..."
          className="w-full sm:w-80"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No payment records match your query"
        emptySubtext="Try adjusting the search query."
      />
    </div>
  );
}

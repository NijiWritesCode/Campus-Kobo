import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, XCircle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import KPICard from '../components/KPICard';
import { useAdminPayouts } from '../hooks/useAdminPayouts';
import { formatCurrency } from '@/lib/formatCurrency';

export default function PayoutManagement() {
  const {
    payouts,
    approvePayout,
    failPayout,
    pendingCount,
    completedCount,
  } = useAdminPayouts();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'ALL', label: `All (${payouts.length})` },
    { id: 'PENDING_APPROVAL', label: `Pending (${pendingCount})` },
    { id: 'COMPLETED', label: `Completed (${completedCount})` },
    { id: 'FAILED', label: 'Failed' },
  ];

  const totalPendingKobo = payouts
    .filter((p) => p.status === 'PENDING_APPROVAL' || p.status === 'PROCESSING')
    .reduce((acc, p) => acc + p.amountKobo, 0);

  const totalDisbursedKobo = payouts
    .filter((p) => p.status === 'COMPLETED')
    .reduce((acc, p) => acc + p.amountKobo, 0);

  const filtered = payouts.filter((p) => {
    const matchesTab = activeTab === 'ALL' || p.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      p.providerBusinessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.bankName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.accountNumber?.includes(searchQuery) ||
      p.reference?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      header: 'Provider',
      render: (row) => (
        <div className="space-y-0.5">
          <strong className="text-neutral-900 font-display block text-xs">
            {row.providerBusinessName}
          </strong>
          <span className="text-[11px] text-neutral-500">Student: {row.studentName}</span>
        </div>
      ),
    },
    {
      header: 'Bank & Account',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-semibold text-neutral-900 block">{row.bankName}</span>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-neutral-600">
            <span>{row.accountNumber}</span>
            <span>•</span>
            <span className="font-sans font-medium uppercase text-[10px] text-neutral-400">
              {row.accountName}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Amount',
      render: (row) => (
        <span className="font-black text-sm text-emerald-800 font-display">
          {formatCurrency(row.amountKobo)}
        </span>
      ),
    },
    {
      header: 'Reference',
      render: (row) => (
        <span className="font-mono text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
          {row.reference}
        </span>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <div className="space-y-0.5">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              row.status === 'COMPLETED'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : row.status === 'PENDING_APPROVAL'
                ? 'bg-purple-50 text-purple-800 border-purple-200'
                : row.status === 'PROCESSING'
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {row.status === 'COMPLETED' ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            ) : row.status === 'FAILED' ? (
              <XCircle className="w-3 h-3 text-rose-700" />
            ) : null}
            <span>{row.status}</span>
          </span>
          {row.failureReason && (
            <span className="text-[10px] text-rose-600 block line-clamp-1 max-w-[180px]">
              {row.failureReason}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => {
        if (row.status === 'COMPLETED') return null;
        return (
          <div className="flex items-center justify-end gap-1.5">
            <Button
              variant="primary"
              size="sm"
              onClick={() => approvePayout(row.id)}
              icon={<CheckCircle2 className="w-3.5 h-3.5" />}
            >
              Transfer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const reason = window.prompt('Reason for transfer decline / failure:');
                if (reason) failPayout(row.id, reason);
              }}
              className="text-rose-700 border-rose-300 hover:bg-rose-50"
              title="Decline transfer"
            >
              <XCircle className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Provider Payout Processing"
        subtitle="Authorize provider earnings withdrawals and NIP bank transfers for UNILAG student merchants"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <KPICard
          title="Awaiting Transfer / Processing"
          value={formatCurrency(totalPendingKobo)}
          subtitle={`${pendingCount} requests in queue`}
          icon={ArrowUpRight}
          colorScheme="purple"
        />
        <KPICard
          title="Total Disbursed to Date"
          value={formatCurrency(totalDisbursedKobo)}
          subtitle="Successfully transferred to student accounts"
          icon={CheckCircle2}
          colorScheme="emerald"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by provider, bank, or account no..."
          className="w-full sm:w-72"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No payout requests found"
        emptySubtext="All provider withdrawal requests have been processed."
      />
    </div>
  );
}

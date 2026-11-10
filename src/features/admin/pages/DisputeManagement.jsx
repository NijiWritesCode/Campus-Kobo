import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import DisputeResolutionModal from '../components/DisputeResolutionModal';
import { useDisputes } from '../hooks/useDisputes';
import { formatCurrency } from '@/lib/formatCurrency';

export default function DisputeManagement() {
  const { disputes, resolveDispute, openCount, resolvedCount } = useDisputes();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDispute, setSelectedDispute] = useState(null);

  const tabs = [
    { id: 'ALL', label: `All Disputes (${disputes.length})` },
    { id: 'OPEN', label: `Open Queue (${openCount})` },
    { id: 'RESOLVED', label: `Resolved (${resolvedCount})` },
  ];

  const filtered = disputes.filter((d) => {
    const matchesTab = activeTab === 'ALL' || d.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      d.bookingReference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.providerBusinessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.clientStatement?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      header: 'Dispute & Ref',
      render: (row) => (
        <div className="space-y-0.5">
          <Link
            to={`/admin/disputes/${row.id}`}
            className="font-bold text-neutral-900 hover:text-purple-700 font-display block"
          >
            #{row.bookingReference}
          </Link>
          <span className="text-[11px] text-neutral-500 font-mono">
            Case ID: {row.id}
          </span>
        </div>
      ),
    },
    {
      header: 'Priority',
      render: (row) => (
        <span
          className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${
            row.priority === 'URGENT'
              ? 'bg-rose-100 text-rose-800 border-rose-200'
              : row.priority === 'HIGH'
              ? 'bg-amber-100 text-amber-800 border-amber-200'
              : 'bg-neutral-100 text-neutral-800 border-neutral-200'
          }`}
        >
          {row.priority}
        </span>
      ),
    },
    {
      header: 'Parties',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <div>
            <span className="text-neutral-400 text-[10px]">Client: </span>
            <strong className="text-neutral-900 font-display">{row.clientName}</strong>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px]">Provider: </span>
            <span className="text-neutral-700 font-semibold">{row.providerBusinessName}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Locked Escrow',
      render: (row) => (
        <span className="font-black text-sm text-purple-950 font-display">
          {formatCurrency(row.amountKobo)}
        </span>
      ),
    },
    {
      header: 'Status & Resolution',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              row.status === 'RESOLVED'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            {row.status === 'RESOLVED' ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            ) : (
              <AlertTriangle className="w-3 h-3 text-rose-700" />
            )}
            <span>{row.status}</span>
          </span>
          {row.resolution && (
            <span className="text-[10px] text-neutral-500 block font-mono">
              {row.resolution?.replace(/_/g, ' ')}
            </span>
          )}
        </div>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link to={`/admin/disputes/${row.id}`}>
            <Button variant="outline" size="sm">
              Inspect
            </Button>
          </Link>
          {row.status !== 'RESOLVED' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setSelectedDispute(row)}
              icon={<Scale className="w-3.5 h-3.5" />}
            >
              Arbitrate
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Disputes & Escrow Arbitration"
        subtitle="Mediate student disputes, review photo evidence, and enforce escrow settlements"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by booking ref, client, or provider..."
          className="w-full sm:w-72"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No disputes found"
        emptySubtext="Escrow operations are functioning smoothly with zero active claims."
      />

      {/* Arbitration Modal */}
      {selectedDispute && (
        <DisputeResolutionModal
          isOpen={Boolean(selectedDispute)}
          onClose={() => setSelectedDispute(null)}
          dispute={selectedDispute}
          onResolve={resolveDispute}
        />
      )}
    </div>
  );
}

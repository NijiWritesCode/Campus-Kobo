import { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import { useAdminAuditLogs } from '../hooks/useAdminAuditLogs';

export default function AuditLog() {
  const { logs } = useAdminAuditLogs();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = logs.filter(
    (l) =>
      !searchQuery ||
      l.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.actorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.targetId?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Action Type',
      render: (row) => {
        const isCritical = row.severity === 'CRITICAL';
        const isWarning = row.severity === 'WARNING';
        return (
          <div className="space-y-0.5">
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                isCritical
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : isWarning
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
            >
              {isCritical ? (
                <ShieldAlert className="w-3 h-3 text-rose-700" />
              ) : isWarning ? (
                <AlertTriangle className="w-3 h-3 text-amber-700" />
              ) : (
                <CheckCircle2 className="w-3 h-3 text-emerald-700" />
              )}
              <span>{row.action?.replace(/_/g, ' ')}</span>
            </span>
            <span className="text-[10px] text-neutral-400 font-mono block">
              ID: {row.id}
            </span>
          </div>
        );
      },
    },
    {
      header: 'Action Details & Target',
      render: (row) => (
        <div className="space-y-1 text-xs max-w-md">
          <p className="text-neutral-900 font-medium leading-relaxed">
            {row.description}
          </p>
          <div className="flex items-center gap-2 text-[10px] text-neutral-500 font-mono">
            <span>Target: {row.targetResource}</span>
            <span>•</span>
            <span className="text-purple-900 font-bold">#{row.targetId}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Admin Actor',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-bold text-neutral-900 font-display block">
            {row.actorName}
          </span>
          <span className="text-[11px] text-neutral-500 font-mono">{row.actorEmail}</span>
        </div>
      ),
    },
    {
      header: 'Audit Metadata',
      align: 'right',
      render: (row) => (
        <div className="space-y-0.5 text-xs text-right">
          <span className="text-neutral-700 font-medium block">
            {new Date(row.timestamp).toLocaleDateString()}{' '}
            {new Date(row.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            IP: {row.ipAddress}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Administrative Audit Trail"
        subtitle="Immutable security logs of all verifications, arbitrations, payouts, and account actions"
      />

      <div className="flex items-center justify-between gap-4">
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by action, description, or target ID..."
          className="w-full sm:w-80"
        />
        <span className="text-xs text-neutral-500">
          Showing <strong className="text-neutral-900">{filtered.length}</strong> logged event{filtered.length === 1 ? '' : 's'}
        </span>
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No audit logs matched"
        emptySubtext="Try adjusting your search criteria."
      />
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, Check, X, ShieldCheck } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import DocumentViewer from '../components/DocumentViewer';
import { useVerifications } from '../hooks/useVerifications';

export default function VerificationQueue() {
  const {
    verifications,
    approveVerification,
    rejectVerification,
    pendingCount,
    approvedCount,
    rejectedCount,
  } = useVerifications();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectDoc, setInspectDoc] = useState(null);

  const tabs = [
    { id: 'ALL', label: `All (${verifications.length})` },
    { id: 'PENDING', label: `Pending Review (${pendingCount})` },
    { id: 'APPROVED', label: `Approved (${approvedCount})` },
    { id: 'REJECTED', label: `Rejected (${rejectedCount})` },
  ];

  // Filtering
  const filtered = verifications.filter((v) => {
    const matchesTab = activeTab === 'ALL' || v.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      v.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.matricNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.faculty?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      header: 'Student & Level',
      render: (row) => (
        <div className="space-y-0.5">
          <Link
            to={`/admin/verifications/${row.id}`}
            className="font-bold text-neutral-900 hover:text-purple-700 font-display block"
          >
            {row.studentName}
          </Link>
          <span className="text-[11px] text-neutral-500">
            {row.level} • {row.intendedCategory || 'General Provider'}
          </span>
        </div>
      ),
    },
    {
      header: 'Matric Number',
      render: (row) => (
        <span className="font-mono font-bold text-xs text-purple-950 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
          {row.matricNumber}
        </span>
      ),
    },
    {
      header: 'Faculty / Dept',
      render: (row) => (
        <div className="space-y-0.5 text-[11px]">
          <span className="font-medium text-neutral-800 block">{row.department}</span>
          <span className="text-neutral-400">{row.faculty}</span>
        </div>
      ),
    },
    {
      header: 'Document Evidence',
      render: (row) => (
        <button
          type="button"
          onClick={() => setInspectDoc(row)}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold transition-colors border border-neutral-200"
        >
          <Eye className="w-3.5 h-3.5 text-neutral-600" />
          <span>{row.documentType?.replace('_', ' ')}</span>
        </button>
      ),
    },
    {
      header: 'Status',
      render: (row) => (
        <span
          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
            row.status === 'APPROVED'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : row.status === 'PENDING'
              ? 'bg-amber-50 text-amber-800 border-amber-200'
              : 'bg-rose-50 text-rose-800 border-rose-200'
          }`}
        >
          {row.status === 'APPROVED' && <ShieldCheck className="w-3 h-3 text-emerald-700" />}
          <span>{row.status}</span>
        </span>
      ),
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          <Link to={`/admin/verifications/${row.id}`}>
            <Button variant="outline" size="sm">
              Inspect
            </Button>
          </Link>
          {row.status === 'PENDING' && (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => approveVerification(row.id)}
                title="Approve student"
              >
                <Check className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const reason = window.prompt('Reason for rejection:');
                  if (reason) rejectVerification(row.id, reason);
                }}
                className="text-rose-700 hover:bg-rose-50 border-rose-200"
                title="Reject submission"
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Student Verifications"
        subtitle="Review matriculation credentials and student ID documents to authorize campus service providers"
      />

      {/* Tabs and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          className="overflow-x-auto scrollbar-none"
        />

        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by student, matric, or department..."
          className="w-full sm:w-72"
        />
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No verifications match your criteria"
        emptySubtext="Try switching tabs or searching for another matric number."
      />

      {/* Quick Document Viewer Modal */}
      {inspectDoc && (
        <DocumentViewer
          isOpen={Boolean(inspectDoc)}
          onClose={() => setInspectDoc(null)}
          title={`Document Evidence: ${inspectDoc.studentName}`}
          imageUrl={inspectDoc.documentUrl}
          documentType={inspectDoc.documentType}
          studentName={inspectDoc.studentName}
          matricNumber={inspectDoc.matricNumber}
        />
      )}
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, Ban, CheckCircle, ExternalLink } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Tabs from '@/components/ui/Tabs';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import { useAdminProviders } from '../hooks/useAdminProviders';

export default function ProviderManagement() {
  const {
    providers,
    toggleProviderStatus,
    toggleVerifiedBadge,
    activeCount,
    suspendedCount,
  } = useAdminProviders();

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'ALL', label: `All (${providers.length})` },
    { id: 'ACTIVE', label: `Active (${activeCount})` },
    { id: 'SUSPENDED', label: `Suspended (${suspendedCount})` },
  ];

  const filtered = providers.filter((p) => {
    const matchesTab = activeTab === 'ALL' || (p.status || 'ACTIVE') === activeTab;
    const matchesSearch =
      !searchQuery ||
      p.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.categoryId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.serviceArea?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      header: 'Provider / Business',
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar size="sm" src={row.avatar} name={row.businessName} />
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-neutral-900 font-display">
                {row.businessName}
              </span>
              {row.verified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" title="Verified Student" />
              )}
            </div>
            <span className="text-[11px] text-neutral-500">
              Student: {row.studentName}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Craft & Campus Area',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-semibold text-purple-900 capitalize block">
            {row.categoryId}
          </span>
          <span className="text-[11px] text-neutral-500">{row.serviceArea}</span>
        </div>
      ),
    },
    {
      header: 'Rating & Orders',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <div className="flex items-center gap-1 text-neutral-800 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>{row.rating}</span>
            <span className="text-[11px] text-neutral-400 font-normal">
              ({row.reviewCount || 0})
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">
            {row.completedBookings || 0} completed
          </span>
        </div>
      ),
    },
    {
      header: 'Badge',
      render: (row) => (
        <button
          type="button"
          onClick={() => toggleVerifiedBadge(row.id)}
          className={`text-[10px] font-bold px-2 py-0.5 rounded border transition-colors ${
            row.verified
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
              : 'bg-neutral-100 text-neutral-500 border-neutral-200 hover:bg-neutral-200'
          }`}
          title="Click to toggle verified badge"
        >
          {row.verified ? 'Verified' : 'Unverified'}
        </button>
      ),
    },
    {
      header: 'Status',
      render: (row) => {
        const isSuspended = row.status === 'SUSPENDED';
        return (
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              isSuspended
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => {
        const isSuspended = row.status === 'SUSPENDED';
        return (
          <div className="flex items-center justify-end gap-1.5">
            <Link to={`/app/providers/${row.slug}`} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                Storefront
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const confirmed = window.confirm(
                  isSuspended
                    ? `Reactivate provider ${row.businessName}?`
                    : `Suspend provider ${row.businessName}? This will hide all their services.`
                );
                if (confirmed) toggleProviderStatus(row.id);
              }}
              className={
                isSuspended
                  ? 'text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                  : 'text-rose-700 border-rose-300 hover:bg-rose-50'
              }
            >
              {isSuspended ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <Ban className="w-3.5 h-3.5" />
              )}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Student Provider Accounts"
        subtitle="Manage student business storefronts, quality ratings, badges, and account suspensions"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by business, student or area..."
          className="w-full sm:w-72"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No providers match your search"
        emptySubtext="Try switching tabs or resetting the search query."
      />
    </div>
  );
}

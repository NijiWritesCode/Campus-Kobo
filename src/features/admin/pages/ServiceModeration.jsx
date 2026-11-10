import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Trash2, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import { mockServices } from '@/mocks/data/services';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ServiceModeration() {
  const [services, setServices] = useState(mockServices);
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'ALL', label: `All Listings (${services.length})` },
    { id: 'ACTIVE', label: 'Active Listings' },
    { id: 'FLAGGED', label: 'Flagged / Violations' },
  ];

  const handleToggleFlag = (id) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = s.status === 'ACTIVE' ? 'FLAGGED' : 'ACTIVE';
          toast.success(`Service status set to ${next}`);
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const handleRemove = (id) => {
    const confirmed = window.confirm('Are you sure you want to take down this service listing?');
    if (!confirmed) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
    toast.error('Service listing removed from student discovery.');
  };

  const filtered = services.filter((s) => {
    const matchesTab = activeTab === 'ALL' || (s.status || 'ACTIVE') === activeTab;
    const matchesSearch =
      !searchQuery ||
      s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.provider?.businessName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.categoryId?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      header: 'Service Listing',
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.photos?.[0]}
            alt={row.title}
            className="w-10 h-10 rounded-lg object-cover bg-neutral-100 border border-neutral-200 shrink-0"
          />
          <div className="space-y-0.5">
            <span className="font-bold text-neutral-900 font-display block">
              {row.title}
            </span>
            <span className="text-[11px] text-neutral-500">
              Provider: <strong className="text-neutral-700">{row.provider?.businessName}</strong>
            </span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      render: (row) => (
        <span className="text-xs font-semibold text-purple-900 capitalize bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
          {row.categoryId}
        </span>
      ),
    },
    {
      header: 'Variants & Rates',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-bold text-neutral-900 font-display">
            From {formatCurrency(row.variants?.[0]?.priceKobo || 0)}
          </span>
          <span className="text-[11px] text-neutral-500 block">
            {row.variants?.length || 0} tier{row.variants?.length === 1 ? '' : 's'} configured
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => {
        const isFlagged = row.status === 'FLAGGED';
        return (
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
              isFlagged
                ? 'bg-rose-50 text-rose-800 border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
          >
            {row.status || 'ACTIVE'}
          </span>
        );
      },
    },
    {
      header: 'Actions',
      align: 'right',
      render: (row) => {
        const isFlagged = row.status === 'FLAGGED';
        return (
          <div className="flex items-center justify-end gap-1.5">
            <Link to={`/app/providers/${row.provider?.slug}`} target="_blank" rel="noreferrer">
              <Button variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                View
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleToggleFlag(row.id)}
              className={
                isFlagged
                  ? 'text-emerald-700 border-emerald-300 hover:bg-emerald-50'
                  : 'text-amber-700 border-amber-300 hover:bg-amber-50'
              }
              title={isFlagged ? 'Clear flag' : 'Flag for review'}
            >
              {isFlagged ? (
                <CheckCircle className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemove(row.id)}
              className="text-rose-700 border-rose-200 hover:bg-rose-50"
              title="Remove listing"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Service Moderation"
        subtitle="Review campus service catalog listings, photo guidelines, and pricing accuracy"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search listings by title or provider..."
          className="w-full sm:w-72"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No service listings found"
        emptySubtext="Try switching tabs or resetting the search filter."
      />
    </div>
  );
}

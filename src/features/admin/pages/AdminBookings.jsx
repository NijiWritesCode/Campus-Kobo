import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Tabs from '@/components/ui/Tabs';
import BookingStatusBadge from '@/features/booking/components/BookingStatusBadge';
import DataTable from '../components/DataTable';
import AdminSearchBar from '../components/AdminSearchBar';
import { mockBookings } from '@/mocks/data/bookings';
import { formatCurrency } from '@/lib/formatCurrency';

export default function AdminBookings() {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'ALL', label: `All (${mockBookings.length})` },
    { id: 'CONFIRMED', label: 'Confirmed' },
    { id: 'IN_PROGRESS', label: 'In Progress' },
    { id: 'COMPLETED', label: 'Completed' },
    { id: 'DISPUTED', label: 'Disputed' },
    { id: 'CANCELLED', label: 'Cancelled' },
  ];

  const filtered = mockBookings.filter((b) => {
    const matchesTab = activeTab === 'ALL' || b.status === activeTab;
    const matchesSearch =
      !searchQuery ||
      b.bookingReference?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.providerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.serviceTitle?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const columns = [
    {
      header: 'Booking Ref & Service',
      render: (row) => (
        <div className="space-y-0.5">
          <Link
            to={`/admin/bookings/${row.id}`}
            className="font-bold text-neutral-900 hover:text-purple-700 font-display block"
          >
            #{row.bookingReference}
          </Link>
          <span className="text-[11px] text-neutral-500">
            {row.serviceTitle} • {row.variantName}
          </span>
        </div>
      ),
    },
    {
      header: 'Client & Provider',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <div>
            <span className="text-neutral-400 text-[10px] block">Client:</span>
            <strong className="text-neutral-900 font-display">{row.clientName}</strong>
          </div>
          <div>
            <span className="text-neutral-400 text-[10px] block">Provider:</span>
            <span className="text-neutral-600 font-semibold">{row.providerName}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Schedule & Location',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-semibold text-neutral-900 block">
            {row.displayDate || row.date}
          </span>
          <span className="text-[11px] text-purple-900 font-bold block">
            {row.timeSlot}
          </span>
          <span className="text-[10px] text-neutral-400 truncate max-w-[140px] block">
            {row.locationDetails || row.locationTitle}
          </span>
        </div>
      ),
    },
    {
      header: 'Escrow Amount',
      render: (row) => (
        <div className="space-y-0.5 text-xs">
          <span className="font-black text-neutral-900 font-display block">
            {formatCurrency(row.servicePriceKobo)}
          </span>
          <span className="text-[10px] text-emerald-700 font-medium block">
            + {formatCurrency(row.platformFeeKobo || Math.round(row.servicePriceKobo * 0.1))} fee
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      render: (row) => <BookingStatusBadge status={row.status} size="sm" />,
    },
    {
      header: 'Action',
      align: 'right',
      render: (row) => (
        <Link to={`/admin/bookings/${row.id}`}>
          <Button variant="outline" size="sm">
            Inspect
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Campus Bookings Ledger"
        subtitle="Live audit trail of all student service appointments and escrow transactions across campus"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <AdminSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by ref, client, or provider..."
          className="w-full sm:w-72"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        emptyMessage="No bookings found"
        emptySubtext="Try switching tabs or resetting your search term."
      />
    </div>
  );
}

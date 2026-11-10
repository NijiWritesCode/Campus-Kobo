import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShieldCheck,
  Users,
  CalendarCheck,
  AlertTriangle,
  ArrowUpRight,
  UserCheck,
  CreditCard,
  ChevronRight,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import KPICard from '../components/KPICard';
import { useAdminStats } from '../hooks/useAdminStats';
import { formatCurrency } from '@/lib/formatCurrency';

export default function AdminOverview() {
  const {
    totalGmvKobo,
    platformFeeKobo,
    activeEscrowKobo,
    totalBookingsCount,
    activeProvidersCount,
    pendingVerificationsCount,
    openDisputesCount,
    recentVerifications,
    recentDisputes,
    recentPayouts,
  } = useAdminStats();

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Campus Command Center"
          subtitle="Real-time operational metrics, student verifications & escrow safety for UNILAG"
        />

        <div className="flex items-center gap-2">
          <Link to="/admin/verifications">
            <Button
              variant="outline"
              size="sm"
              icon={<UserCheck className="w-4 h-4 text-purple-700" />}
            >
              Verify Students ({pendingVerificationsCount})
            </Button>
          </Link>
          <Link to="/admin/disputes">
            <Button
              variant="primary"
              size="sm"
              icon={<AlertTriangle className="w-4 h-4 text-white" />}
            >
              Arbitrate Disputes ({openDisputesCount})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Marketplace GMV"
          value={formatCurrency(totalGmvKobo)}
          subtitle="Total transaction volume"
          icon={TrendingUp}
          trend="+18.4% this week"
          trendDirection="up"
          colorScheme="emerald"
        />
        <KPICard
          title="Escrow Pool Held"
          value={formatCurrency(activeEscrowKobo)}
          subtitle="Secured until PIN release"
          icon={ShieldCheck}
          trend="100% Guaranteed"
          trendDirection="up"
          colorScheme="purple"
        />
        <KPICard
          title="Verified Providers"
          value={activeProvidersCount}
          subtitle="Active student businesses"
          icon={Users}
          colorScheme="neutral"
        />
        <KPICard
          title="Platform Revenue (10%)"
          value={formatCurrency(platformFeeKobo)}
          subtitle="Safety & dispute fund"
          icon={CreditCard}
          trend="+12% MoM"
          trendDirection="up"
          colorScheme="emerald"
        />
      </div>

      {/* Second KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-display">
              Total Campus Bookings
            </span>
            <div className="text-xl font-black text-neutral-900 font-display">
              {totalBookingsCount} Appointments
            </div>
          </div>
          <CalendarCheck className="w-6 h-6 text-neutral-400" />
        </div>

        <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider font-display">
              Pending ID Verifications
            </span>
            <div className="text-xl font-black text-purple-950 font-display">
              {pendingVerificationsCount} Submissions
            </div>
          </div>
          <Link to="/admin/verifications" className="text-xs font-bold text-purple-700 hover:underline">
            Review Queue →
          </Link>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 shadow-2xs flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider font-display">
              Active Disputes
            </span>
            <div className="text-xl font-black text-amber-950 font-display">
              {openDisputesCount} Open Cases
            </div>
          </div>
          <Link to="/admin/disputes" className="text-xs font-bold text-amber-700 hover:underline">
            Arbitrate Now →
          </Link>
        </div>
      </div>

      {/* Main Grid: Verifications & Disputes Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Submissions Queue Preview */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center border border-purple-200">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 font-display">
                Pending Student Verifications
              </h3>
            </div>
            <Link
              to="/admin/verifications"
              className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentVerifications.map((v) => (
              <div
                key={v.id}
                className="py-3 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 font-display">
                      {v.studentName}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                        v.status === 'PENDING'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : v.status === 'APPROVED'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Matric: <strong className="font-mono text-neutral-700">{v.matricNumber}</strong> • {v.faculty}
                  </p>
                </div>

                <Link to={`/admin/verifications/${v.id}`}>
                  <Button variant="outline" size="sm">
                    Inspect
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Disputes Queue Preview */}
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center border border-rose-200">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-neutral-900 font-display">
                Disputes Awaiting Arbitration
              </h3>
            </div>
            <Link
              to="/admin/disputes"
              className="text-xs font-bold text-purple-700 hover:text-purple-800 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentDisputes.map((d) => (
              <div
                key={d.id}
                className="py-3 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 font-display">
                      #{d.bookingReference}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                        d.priority === 'URGENT'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : d.priority === 'HIGH'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                      }`}
                    >
                      {d.priority} PRIORITY
                    </span>
                    <span className="font-black text-neutral-900 font-display">
                      {formatCurrency(d.amountKobo)}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-500 line-clamp-1">
                    {d.clientStatement}
                  </p>
                </div>

                <Link to={`/admin/disputes/${d.id}`}>
                  <Button variant="outline" size="sm">
                    Arbitrate
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payouts Processing Preview Strip */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-200">
              <ArrowUpRight className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display">
                Provider Bank Payout Requests
              </h3>
              <p className="text-xs text-neutral-500">
                Direct NIP transfers to Nigerian student bank accounts
              </p>
            </div>
          </div>
          <Link to="/admin/payouts">
            <Button variant="outline" size="sm">
              Manage Payouts
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {recentPayouts.map((p) => (
            <div
              key={p.id}
              className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-900 font-display">
                  {p.providerBusinessName}
                </span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                    p.status === 'COMPLETED'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : p.status === 'PENDING_APPROVAL'
                      ? 'bg-purple-50 text-purple-800 border-purple-200'
                      : p.status === 'PROCESSING'
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-rose-50 text-rose-800 border-rose-200'
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="text-base font-black text-emerald-800 font-display">
                {formatCurrency(p.amountKobo)}
              </div>
              <p className="text-[11px] text-neutral-500">
                {p.bankName} • <span className="font-mono">{p.accountNumber}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

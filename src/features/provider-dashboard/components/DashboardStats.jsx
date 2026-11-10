import { Clock, Calendar, CheckCircle2, Wallet } from 'lucide-react';
import Card from '@/components/ui/Card';
import { formatCurrency } from '@/lib/formatCurrency';

export default function DashboardStats({
  pendingCount = 0,
  upcomingCount = 0,
  completedCount = 0,
  availableBalanceKobo = 0,
  pendingEscrowKobo = 0,
}) {
  const stats = [
    {
      title: 'Pending Requests',
      value: pendingCount,
      subtitle: pendingCount === 1 ? '1 new request' : `${pendingCount} new requests`,
      icon: Clock,
      color: 'text-amber-700 bg-amber-50 border-amber-200',
    },
    {
      title: 'Upcoming Bookings',
      value: upcomingCount,
      subtitle: 'Confirmed & in-progress',
      icon: Calendar,
      color: 'text-purple-800 bg-purple-50 border-purple-200',
    },
    {
      title: 'Completed Jobs',
      value: completedCount,
      subtitle: 'Verified with release PIN',
      icon: CheckCircle2,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    },
    {
      title: 'Available Payout',
      value: formatCurrency(availableBalanceKobo),
      subtitle: `${formatCurrency(pendingEscrowKobo)} in escrow`,
      icon: Wallet,
      color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
      isCurrency: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((st) => {
        const Icon = st.icon;
        return (
          <Card
            key={st.title}
            variant="default"
            padding="md"
            className="border border-neutral-200 rounded-xl bg-white shadow-2xs space-y-2 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-display">
                {st.title}
              </span>
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center border shrink-0 ${st.color}`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
            </div>

            <div>
              <div
                className={`font-black font-display tracking-tight text-neutral-900 ${
                  st.isCurrency ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'
                }`}
              >
                {st.value}
              </div>
              <p className="text-[11px] text-neutral-500 mt-0.5 truncate">
                {st.subtitle}
              </p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

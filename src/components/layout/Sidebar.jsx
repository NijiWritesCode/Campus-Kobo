import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Store,
  Scissors,
  CalendarDays,
  CreditCard,
  AlertTriangle,
  ArrowUpRight,
  Shield,
  LogOut,
  X,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/lib/cn';

export default function Sidebar() {
  const { logout, user } = useAuthStore();
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  const navItems = [
    { label: 'Overview', to: '/admin', icon: LayoutDashboard, end: true },
    { label: 'Student Verifications', to: '/admin/verifications', icon: UserCheck, badge: 'New' },
    { label: 'Provider Accounts', to: '/admin/providers', icon: Store },
    { label: 'Service Moderation', to: '/admin/services', icon: Scissors },
    { label: 'Bookings', to: '/admin/bookings', icon: CalendarDays },
    { label: 'Payment Records', to: '/admin/payments', icon: CreditCard },
    { label: 'Disputes & Claims', to: '/admin/disputes', icon: AlertTriangle },
    { label: 'Payout Processing', to: '/admin/payouts', icon: ArrowUpRight },
    { label: 'Audit Log', to: '/admin/audit-log', icon: Shield },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          role="presentation"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-neutral-950/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-neutral-950 text-white flex flex-col justify-between p-5 transition-transform duration-200 lg:translate-x-0 lg:static lg:h-screen',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Logo size="md" to="/admin" showTagline={false} />
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-3 py-2 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
              Admin Portal
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Navigation Links */}
          <nav aria-label="Admin Navigation" className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all',
                      isActive
                        ? 'bg-purple-800 text-white font-bold shadow-2xs'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                    )
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-950/70 text-emerald-300 font-bold border border-emerald-800/60">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer User Info & Logout */}
        <div className="border-t border-neutral-800/80 pt-4 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">
                {user?.name || 'Administrator'}
              </div>
              <div className="text-[11px] text-neutral-400 truncate">
                {user?.email || 'admin@campuskobo.ng'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

import { Outlet, NavLink } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import VerificationGate from '@/components/common/VerificationGate';
import { cn } from '@/lib/cn';
import {
  Compass,
  Search,
  Calendar,
  User,
  LayoutDashboard,
  Scissors,
  CalendarCheck,
  Wallet,
} from 'lucide-react';

export default function AppShell({ variant = 'client' }) {
  const isProvider = variant === 'provider';

  const clientLinks = [
    { label: 'Explore', to: '/app', icon: Compass, end: true },
    { label: 'Search', to: '/app/search', icon: Search },
    { label: 'My Bookings', to: '/app/bookings', icon: Calendar },
    { label: 'My Account', to: '/app/profile', icon: User },
  ];

  const providerLinks = [
    { label: 'Dashboard', to: '/provider', icon: LayoutDashboard, end: true },
    { label: 'Services', to: '/provider/services', icon: Scissors },
    { label: 'Bookings', to: '/provider/bookings', icon: CalendarCheck },
    { label: 'Earnings', to: '/provider/earnings', icon: Wallet },
  ];

  const links = isProvider ? providerLinks : clientLinks;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      <Header variant={variant} />

      {/* Desktop secondary top navbar */}
      <nav aria-label="Secondary Navigation" className="hidden md:block bg-white border-b border-neutral-200">
        <div className="max-w-5xl mx-auto px-4 flex items-center gap-6 h-12">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 text-xs font-semibold py-3 border-b-2 transition-all',
                    isActive
                      ? 'border-primary-500 text-primary-600 font-bold'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  )
                }
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-6 pb-24 md:pb-12">
        <VerificationGate />
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav variant={variant} />
    </div>
  );
}

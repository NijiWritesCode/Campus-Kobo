import { NavLink } from 'react-router-dom';
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
import { cn } from '@/lib/cn';

export default function BottomNav({ variant = 'client' }) {
  const clientNavItems = [
    { label: 'Explore', to: '/app', icon: Compass, end: true },
    { label: 'Search', to: '/app/search', icon: Search },
    { label: 'Bookings', to: '/app/bookings', icon: Calendar },
    { label: 'Profile', to: '/app/profile', icon: User },
  ];

  const providerNavItems = [
    { label: 'Dashboard', to: '/provider', icon: LayoutDashboard, end: true },
    { label: 'Services', to: '/provider/services', icon: Scissors },
    { label: 'Orders', to: '/provider/bookings', icon: CalendarCheck },
    { label: 'Earnings', to: '/provider/earnings', icon: Wallet },
  ];

  const items = variant === 'provider' ? providerNavItems : clientNavItems;

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-neutral-200 h-16 px-2 md:hidden safe-area-pb"
    >
      <div className="grid grid-cols-4 h-full items-center">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center py-1 transition-colors select-none focus:outline-none',
                  isActive
                    ? 'text-emerald-700 font-bold'
                    : 'text-neutral-500 hover:text-neutral-900 font-medium'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'p-1 rounded-lg transition-transform',
                      isActive ? 'text-emerald-700 scale-105' : 'text-neutral-500'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] leading-tight mt-0.5">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

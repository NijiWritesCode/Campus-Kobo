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
    <nav aria-label="Main Navigation" className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-neutral-200/90 pb-safe md:hidden shadow-lg">
      <div className="grid grid-cols-4 h-16 max-w-md mx-auto px-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1 text-[11px] font-semibold transition-colors focus:outline-none',
                  isActive
                    ? 'text-primary-600'
                    : 'text-neutral-500 hover:text-neutral-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'p-1 rounded-xl transition-all',
                      isActive ? 'bg-primary-50 text-primary-600 scale-105' : ''
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span>{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

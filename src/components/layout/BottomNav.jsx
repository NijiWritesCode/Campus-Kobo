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
      aria-label="Main Navigation"
      className="fixed bottom-3 inset-x-0 z-40 px-4 md:hidden pointer-events-none"
    >
      <div className="max-w-xs mx-auto glass-panel-dark rounded-full p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.35)] pointer-events-auto">
        <div className="grid grid-cols-4 items-center">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center justify-center py-1.5 px-2 rounded-full transition-all duration-200 select-none focus:outline-none',
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={cn(
                        'relative p-1 rounded-full transition-all duration-200',
                        isActive
                          ? 'bg-primary-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.6)] scale-105'
                          : ''
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-medium tracking-tight mt-0.5">
                      {item.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

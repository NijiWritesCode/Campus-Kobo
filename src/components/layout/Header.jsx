import { Link, NavLink } from 'react-router-dom';
import {
  Bell,
  ArrowLeftRight,
  User,
  Compass,
  Search,
  Calendar,
  LayoutDashboard,
  Scissors,
  CalendarCheck,
  Wallet,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import Avatar from '@/components/ui/Avatar';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES } from '@/lib/constants';
import { cn } from '@/lib/cn';

export default function Header({ variant = 'client' }) {
  const { user, activeRole, setActiveRole } = useAuthStore();
  const isProviderRole = user?.roles?.includes(USER_ROLES.PROVIDER);
  const isProviderView = variant === 'provider';

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

  const links = isProviderView ? providerLinks : clientLinks;

  const toggleRole = () => {
    if (!isProviderRole) return;
    const nextRole =
      activeRole === USER_ROLES.PROVIDER ? USER_ROLES.CLIENT : USER_ROLES.PROVIDER;
    setActiveRole(nextRole);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <div className="shrink-0">
          <Logo size="md" to={isProviderView ? '/provider' : '/app'} />
        </div>

        {/* Center: Desktop Navigation Links (Unified Header) */}
        <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 shadow-2xs'
                      : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 border border-transparent'
                  )
                }
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Provider / Client Surface Switcher */}
          {isProviderRole && (
            <Link
              to={isProviderView ? '/app' : '/provider'}
              onClick={toggleRole}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-50 hover:bg-purple-100 text-purple-900 transition-colors border border-purple-200 shadow-2xs"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden sm:inline">
                {isProviderView ? 'Switch to Buying' : 'Switch to Selling'}
              </span>
              <span className="sm:hidden">
                {isProviderView ? 'Buy' : 'Sell'}
              </span>
            </Link>
          )}

          {/* Notifications */}
          <Link
            to="/app/notifications"
            className="relative p-2 rounded-lg text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-colors focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white" />
          </Link>

          {/* Profile Avatar */}
          <Link
            to={isProviderView ? '/provider/profile' : '/app/profile'}
            className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-purple-600/40 transition-all focus:outline-none"
            aria-label="My Account"
          >
            {user ? (
              <Avatar
                size="sm"
                name={user.name || 'Student'}
                verified={user.verificationStatus === 'APPROVED'}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 border border-neutral-200">
                <User className="w-4 h-4" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

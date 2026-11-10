import { Link } from 'react-router-dom';
import { Bell, ArrowLeftRight, User } from 'lucide-react';
import Logo from '@/components/common/Logo';
import Avatar from '@/components/ui/Avatar';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES } from '@/lib/constants';

export default function Header({ variant = 'client' }) {
  const { user, activeRole, setActiveRole } = useAuthStore();
  const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);

  const toggleRole = () => {
    if (!isProvider) return;
    const nextRole =
      activeRole === USER_ROLES.PROVIDER ? USER_ROLES.CLIENT : USER_ROLES.PROVIDER;
    setActiveRole(nextRole);
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Logo size="md" to={variant === 'provider' ? '/provider' : '/app'} />

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Provider / Client Surface Switcher (If user is approved provider) */}
          {isProvider && (
            <Link
              to={variant === 'provider' ? '/app' : '/provider'}
              onClick={toggleRole}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors border border-neutral-200"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden xs:inline">{variant === 'provider' ? 'Switch to Buying' : 'Switch to Selling'}</span>
              <span className="xs:hidden">{variant === 'provider' ? 'Buy' : 'Sell'}</span>
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

          {/* Profile Avatar / Menu */}
          <Link
            to={variant === 'provider' ? '/provider/profile' : '/app/profile'}
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

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  Building,
  ShieldCheck,
  ArrowLeftRight,
  LogOut,
  Bell,
  ChevronRight,
} from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import Card from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES } from '@/lib/constants';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, activeRole, setActiveRole, logout, updateUser } = useAuthStore();

  const isProvider = user?.roles?.includes(USER_ROLES.PROVIDER);

  const [name, setName] = useState(user?.name || 'Adaeze Okafor');
  const [phone, setPhone] = useState(user?.phone || '08034567890');
  const [hostel, setHostel] = useState('Moremi Hall, Block B');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name, phone });
    setIsEditing(false);
    toast.success('Profile details updated successfully');
  };

  const handleToggleRole = () => {
    if (!isProvider) {
      navigate('/register?role=provider');
      return;
    }
    const nextRole = activeRole === USER_ROLES.PROVIDER ? USER_ROLES.CLIENT : USER_ROLES.PROVIDER;
    setActiveRole(nextRole);
    navigate(nextRole === USER_ROLES.PROVIDER ? '/provider' : '/app');
  };

  const handleLogout = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <div className="space-y-6 pb-16 max-w-xl mx-auto">
      <PageHeader
        title="My Account"
        subtitle="Manage student verification, campus contacts, and security"
      />

      {/* Profile Header Card */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <div className="flex items-center gap-4">
          <Avatar
            size="xl"
            name={name}
            verified={user?.verificationStatus === 'APPROVED'}
            className="ring-2 ring-neutral-200"
          />

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 font-display truncate">
                {name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Verified Student</span>
              </span>
            </div>

            <p className="text-xs text-neutral-500 truncate">
              {user?.email || 'adaeze.okafor@live.unilag.edu.ng'}
            </p>

            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-md">
                UNILAG • Matric: 190408***
              </span>
            </div>
          </div>
        </div>

        {/* Surface Switcher Button */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-3">
          <div className="text-xs">
            <span className="font-semibold text-neutral-800 block">
              {isProvider ? 'Provider Mode Available' : 'Want to offer services on campus?'}
            </span>
            <span className="text-[11px] text-neutral-500">
              {isProvider
                ? 'Switch between client booking and provider dashboard'
                : 'List your hairstyling, barbering, or nail business'}
            </span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggleRole}
            icon={<ArrowLeftRight className="w-3.5 h-3.5 text-purple-700" />}
          >
            {isProvider ? 'Switch Surface' : 'Become Provider'}
          </Button>
        </div>
      </div>

      {/* Personal Info Form */}
      <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
            Personal Details
          </h3>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs font-semibold text-purple-800 hover:text-purple-950"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 shadow-2xs"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 shadow-2xs"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-neutral-600 block mb-1">
                Primary Hostel / Campus Hall
              </label>
              <input
                type="text"
                value={hostel}
                onChange={(e) => setHostel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:border-emerald-700 shadow-2xs"
                required
              />
            </div>

            <div className="pt-2">
              <Button variant="primary" size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>Name</span>
              </span>
              <span className="font-semibold text-neutral-900">{name}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>Phone</span>
              </span>
              <span className="font-semibold text-neutral-900">{phone}</span>
            </div>

            <div className="flex items-center justify-between py-1.5">
              <span className="text-neutral-500 flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-neutral-400" />
                <span>Hostel</span>
              </span>
              <span className="font-semibold text-neutral-900">{hostel}</span>
            </div>
          </div>
        )}
      </div>

      {/* Escrow & Security Trust Card */}
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2 text-xs text-emerald-950">
        <div className="flex items-center gap-2 font-bold font-display text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Student Trust & Safety</span>
        </div>
        <p className="text-[11px] text-emerald-800 leading-relaxed">
          All bookings on Campus Kobo are protected with conditional 6-digit PIN release escrow. Your money is only disbursed after you inspect and approve your service.
        </p>
      </div>

      {/* Quick Links & Sign Out */}
      <div className="space-y-2">
        <Link to="/app/notifications" className="block">
          <Card variant="interactive" padding="sm" className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-xs font-semibold text-neutral-800">
              <Bell className="w-4 h-4 text-purple-700" />
              <span>Notifications & Alerts</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </Card>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full p-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors focus:outline-none shadow-2xs"
        >
          <LogOut className="w-4 h-4 text-rose-700" />
          <span>Sign Out from Campus Kobo</span>
        </button>
      </div>
    </div>
  );
}

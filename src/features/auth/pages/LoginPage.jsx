import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, Shield, Store, User } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '@/components/common/Logo';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Divider from '@/components/ui/Divider';
import { loginSchema } from '@/lib/validators';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES, VERIFICATION_STATUSES } from '@/lib/constants';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = location.state?.from?.pathname || '/app';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);

      // Default mock login
      const mockUser = {
        id: 'usr-student-01',
        name: 'Adaeze Okafor',
        email: data.identifier,
        phone: '08034567890',
        campusId: 'unilag',
        campusName: 'University of Lagos (Akoka)',
        roles: [USER_ROLES.CLIENT, USER_ROLES.PROVIDER],
        verificationStatus: VERIFICATION_STATUSES.APPROVED,
        providerProfile: {
          slug: 'beauty-by-ada',
          businessName: 'Beauty by Ada',
          category: 'Hairstyling',
        },
      };

      setAuth(mockUser, 'mock-jwt-token-xyz-123');
      toast.success(`Welcome back, ${mockUser.name}!`);
      navigate(from, { replace: true });
    }, 500);
  };

  const handleDemoLogin = (roleType) => {
    let mockUser;
    let target = '/app';

    if (roleType === 'provider') {
      mockUser = {
        id: 'usr-provider-01',
        name: 'Adaeze Okafor',
        email: 'adaeze@live.unilag.edu.ng',
        phone: '08034567890',
        campusId: 'unilag',
        roles: [USER_ROLES.CLIENT, USER_ROLES.PROVIDER],
        verificationStatus: VERIFICATION_STATUSES.APPROVED,
        providerProfile: {
          slug: 'beauty-by-ada',
          businessName: 'Beauty by Ada',
        },
      };
      target = '/provider';
    } else if (roleType === 'admin') {
      mockUser = {
        id: 'usr-admin-01',
        name: 'Campus Admin (UNILAG)',
        email: 'admin@campuskobo.ng',
        phone: '08099990000',
        campusId: 'unilag',
        roles: [USER_ROLES.ADMIN],
        verificationStatus: VERIFICATION_STATUSES.APPROVED,
      };
      target = '/admin';
    } else {
      mockUser = {
        id: 'usr-client-01',
        name: 'Tobi Adeleke',
        email: 'tobi@live.unilag.edu.ng',
        phone: '08077778888',
        campusId: 'unilag',
        roles: [USER_ROLES.CLIENT],
        verificationStatus: VERIFICATION_STATUSES.APPROVED,
      };
      target = '/app';
    }

    setAuth(mockUser, 'mock-jwt-token-xyz-123');
    toast.success(`Logged in as ${mockUser.name}`);
    navigate(target, { replace: true });
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-8 px-4 sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-2">
        <Logo size="lg" to="/" />
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
          Welcome back
        </h1>
        <p className="text-xs text-neutral-500">
          Sign in to manage your campus bookings and service listings
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="default" padding="lg" className="border border-neutral-200 shadow-xs">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Student Email or Phone Number"
              type="text"
              required
              autoComplete="username"
              placeholder="e.g. your.name@live.unilag.edu.ng"
              icon={<Mail className="w-4 h-4" />}
              error={errors.identifier?.message}
              {...register('identifier')}
            />

            <div className="space-y-1.5">
              <Input
                label="Password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                icon={<Lock className="w-4 h-4" />}
                error={errors.password?.message}
                {...register('password')}
              />
              <div className="flex justify-end">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast('Password reset code will be sent to your student email.', { icon: '📧' });
                  }}
                  className="text-xs text-primary-600 hover:text-primary-700 font-semibold"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              className="shadow-md shadow-emerald-600/25"
            >
              Sign In to Campus Kobo
            </Button>
          </form>

          <Divider label="OR QUICK DEMO LOGIN" />

          {/* Quick Demo Pre-fills with rich interactive cards */}
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => handleDemoLogin('provider')}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-purple-200/80 hover:border-purple-400 bg-purple-50/40 hover:bg-white text-xs font-semibold text-neutral-800 transition-all cursor-pointer group shadow-2xs hover:shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Store className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-neutral-900 group-hover:text-purple-600 font-display">Adaeze (Verified Provider)</div>
                  <div className="text-[10px] text-neutral-500 font-normal">Hairstylist with bookings & services</div>
                </div>
              </div>
              <span className="text-[11px] bg-purple-100 text-purple-700 px-2.5 py-1 rounded-lg font-bold group-hover:bg-purple-600 group-hover:text-white transition-colors">Try</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('client')}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-emerald-200/80 hover:border-emerald-400 bg-emerald-50/40 hover:bg-white text-xs font-semibold text-neutral-800 transition-all cursor-pointer group shadow-2xs hover:shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-neutral-900 group-hover:text-emerald-700 font-display">Tobi (Student Client)</div>
                  <div className="text-[10px] text-neutral-500 font-normal">Browsing, booking & PIN sharing</div>
                </div>
              </div>
              <span className="text-[11px] bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-lg font-bold group-hover:bg-emerald-600 group-hover:text-white transition-colors">Try</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-neutral-800 bg-neutral-900 text-white text-xs font-semibold transition-all cursor-pointer group shadow-sm hover:shadow-md active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-neutral-800 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-white font-display">Campus Staff Admin</div>
                  <div className="text-[10px] text-neutral-400 font-normal">Verifications & dispute moderation</div>
                </div>
              </div>
              <span className="text-[11px] bg-neutral-800 text-neutral-300 px-2.5 py-1 rounded-lg font-bold group-hover:bg-emerald-500 group-hover:text-neutral-950 transition-colors">Portal</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-neutral-500">
            Don't have an account yet?{' '}
            <Link to="/register" className="font-bold text-purple-800 hover:text-purple-950">
              Create an account
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}

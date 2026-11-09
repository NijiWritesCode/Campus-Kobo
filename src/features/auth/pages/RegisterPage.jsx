import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, Lock, Building, Sparkles } from 'lucide-react';
import Logo from '@/components/common/Logo';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import AuroraBackground from '@/components/react-bits/AuroraBackground';
import { registerSchema } from '@/lib/validators';
import { USER_ROLES } from '@/lib/constants';

const CAMPUS_OPTIONS = [
  { value: 'unilag', label: 'University of Lagos (UNILAG) — Akoka' },
  { value: 'ui', label: 'University of Ibadan (UI) — Agbowo' },
  { value: 'oau', label: 'Obafemi Awolowo University (OAU) — Ile-Ife' },
  { value: 'covenant', label: 'Covenant University — Ota' },
  { value: 'uniben', label: 'University of Benin (UNIBEN) — Ugbowo' },
];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'provider' ? USER_ROLES.PROVIDER : USER_ROLES.CLIENT;
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      campusId: 'unilag',
      acceptTerms: true,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API registration call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/verify-otp', {
        state: {
          email: data.email,
          phone: data.phone,
          registrationData: {
            ...data,
            roles: selectedRole === USER_ROLES.PROVIDER
              ? [USER_ROLES.CLIENT, USER_ROLES.PROVIDER]
              : [USER_ROLES.CLIENT],
          },
        },
      });
    }, 600);
  };

  const handleQuickFill = () => {
    setValue('name', 'Adaeze Okafor');
    setValue('email', 'adaeze.okafor@live.unilag.edu.ng');
    setValue('phone', '08034567890');
    setValue('password', 'CampusPass123!');
    setValue('campusId', 'unilag');
    setValue('acceptTerms', true);
  };

  return (
    <AuroraBackground className="min-h-screen py-10 px-4 sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Logo size="lg" to="/" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 font-display">
          Create student account
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 font-normal">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-primary-600 hover:text-primary-700">
            Sign in here
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" padding="lg" className="border border-neutral-200/90 shadow-lg">
          {/* Surface Intent Switcher with Segmented Control */}
          <div className="mb-6 p-1 bg-neutral-100 rounded-2xl grid grid-cols-2 gap-1 text-center border border-neutral-200/80">
            <button
              type="button"
              onClick={() => setSelectedRole(USER_ROLES.CLIENT)}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedRole === USER_ROLES.CLIENT
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              I want to Book
            </button>
            <button
              type="button"
              onClick={() => setSelectedRole(USER_ROLES.PROVIDER)}
              className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                selectedRole === USER_ROLES.PROVIDER
                  ? 'bg-primary-500 text-white shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              I want to Provide
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <Input
              label="Full Name"
              required
              autoComplete="name"
              placeholder="e.g. Adaeze Okafor"
              icon={<User className="w-4 h-4" />}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="University Email"
              type="email"
              required
              autoComplete="username"
              placeholder="e.g. adaeze@live.unilag.edu.ng"
              icon={<Mail className="w-4 h-4" />}
              hint="Use your university student email"
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Mobile / WhatsApp Number"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="080 1234 5678"
              icon={<Phone className="w-4 h-4" />}
              error={errors.phone?.message}
              {...register('phone')}
            />

            <Select
              label="Campus Community"
              required
              options={CAMPUS_OPTIONS}
              icon={<Building className="w-4 h-4" />}
              error={errors.campusId?.message}
              {...register('campusId')}
            />

            <Input
              label="Create Password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="At least 8 characters (1 uppercase, 1 number)"
              icon={<Lock className="w-4 h-4" />}
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-start gap-2.5 pt-1">
              <input
                type="checkbox"
                id="acceptTerms"
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                {...register('acceptTerms')}
              />
              <label htmlFor="acceptTerms" className="text-xs text-neutral-600 leading-tight cursor-pointer">
                I am at least 18 years old and agree to the{' '}
                <a href="#" className="font-semibold text-primary-600 underline">
                  Terms of Service
                </a>{' '}
                and Campus Safety Rules.
              </label>
            </div>
            {errors.acceptTerms && (
              <p className="text-xs text-red-600">{errors.acceptTerms.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isSubmitting}
              className="mt-2 shadow-md shadow-primary-500/25"
            >
              Continue to Verification
            </Button>
          </form>

          {/* Demo helper */}
          <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400 font-medium">Demo Testing?</span>
            <button
              type="button"
              onClick={handleQuickFill}
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary-600 hover:text-primary-700 bg-primary-50/80 hover:bg-primary-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Fill sample student data</span>
            </button>
          </div>
        </Card>
      </div>
    </AuroraBackground>
  );
}

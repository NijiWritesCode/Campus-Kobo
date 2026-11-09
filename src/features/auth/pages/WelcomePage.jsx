import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  CreditCard,
  KeyRound,
  ArrowRight,
  Scissors,
  CheckCircle2,
  Users,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { INITIAL_SERVICE_CATEGORIES } from '@/lib/constants';

const CURRENT_YEAR = 2026;

export default function WelcomePage() {
  const steps = [
    {
      step: '01',
      title: 'Find Campus Talent',
      description: 'Explore hairstylists, nail techs, barbers, and makeup artists verified right in your student hostels.',
      icon: <Scissors className="w-5 h-5 text-primary-500" />,
    },
    {
      step: '02',
      title: 'Book & Pay Protected',
      description: 'Lock in your fixed-price slot. Funds are protected and held until service is completed to your satisfaction.',
      icon: <CreditCard className="w-5 h-5 text-primary-500" />,
    },
    {
      step: '03',
      title: 'Share Completion PIN',
      description: 'Once your hair, nails, or cut looks great, give your provider the 6-digit completion PIN to release payment.',
      icon: <KeyRound className="w-5 h-5 text-primary-500" />,
    },
  ];

  const highlights = [
    'Strict student-only verification',
    'Conditional PIN payout protection',
    'Zero cash arguments & transparent prices',
    'Built for your university community',
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="max-w-5xl w-full mx-auto px-4 py-4 flex items-center justify-between border-b border-neutral-200/60 bg-white/60 backdrop-blur-md sticky top-0 z-20">
        <Logo size="md" to="/" showTagline={true} />
        <div className="flex items-center gap-2">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" size="sm">
              Join Campus
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl w-full mx-auto px-4 py-10 sm:py-16 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-5">
          <Badge variant="primary" size="md" dot>
            Exclusive Student Service Network
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display leading-[1.15]">
            Book verified student talent on your{' '}
            <span className="text-primary-600 bg-primary-50 px-2 rounded-xl">
              campus
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-lg mx-auto leading-relaxed">
            From knotless braids and gel sets to fresh fades and glam makeup.
            Discovered in hostels, booked with fixed prices, and protected with completion PINs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <Link to="/register" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Find & Book Services
              </Button>
            </Link>
            <Link to="/register?role=provider" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" fullWidth>
                Become a Student Provider
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-semibold text-neutral-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-secondary-600" />
              <span>100% Student Verified</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span>Safe PIN Settlement</span>
            </div>
          </div>
        </div>

        {/* Popular Categories */}
        <section aria-labelledby="cat-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="cat-heading" className="text-lg font-bold text-neutral-900 font-display">
                Popular Campus Services
              </h2>
              <p className="text-xs text-neutral-500">
                Fixed-price bookings with fellow students
              </p>
            </div>
            <Link to="/register" className="text-xs font-bold text-primary-600 hover:text-primary-700">
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {INITIAL_SERVICE_CATEGORIES.map((cat) => (
              <Link key={cat.id} to="/register">
                <Card variant="interactive" padding="md" className="h-full flex flex-col justify-between group">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Scissors className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-neutral-900 group-hover:text-primary-600 transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                      {cat.description}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* How It Works (3 Steps) */}
        <section aria-labelledby="hiw-heading" className="space-y-6 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-2xs">
          <div className="text-center max-w-md mx-auto space-y-1">
            <Badge variant="secondary" size="sm">
              Simple & Safe
            </Badge>
            <h2 id="hiw-heading" className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
              How Campus Kobo Works
            </h2>
            <p className="text-xs text-neutral-500">
              Never worry about no-shows or paying before seeing results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {steps.map((st) => (
              <div key={st.step} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200/60 relative space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center">
                    {st.icon}
                  </div>
                  <span className="text-xs font-black text-neutral-300 font-display">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-neutral-900">{st.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Signals & Campus Boundary */}
        <section className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-md text-center md:text-left">
            <Badge variant="primary" size="sm">
              Campus Security
            </Badge>
            <h2 className="text-2xl font-bold font-display tracking-tight text-white">
              Trust & Safety built for University life
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Every provider and client must submit official matriculation evidence.
              Exact residential addresses are never displayed publicly.
            </p>
            <ul className="space-y-2 pt-2 text-xs text-neutral-200 text-left">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-auto text-center p-6 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-4">
            <Users className="w-10 h-10 text-primary-400 mx-auto" />
            <div>
              <div className="text-2xl font-black text-white font-display">
                Pilot Phase
              </div>
              <p className="text-xs text-neutral-400 mt-1">
                Open to University Students (18+)
              </p>
            </div>
            <Link to="/register" className="block">
              <Button variant="primary" size="md" fullWidth>
                Join Your Campus Cohort
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" to="/" />
          <p>Campus Kobo &copy; {CURRENT_YEAR}. Campus Skills Marketplace MVP.</p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-neutral-900">Sign In</Link>
            <Link to="/register" className="hover:text-neutral-900">Create Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

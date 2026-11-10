import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  KeyRound,
  ArrowRight,
  Scissors,
  Users,
  Star,
  Check,
} from 'lucide-react';
import Logo from '@/components/common/Logo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { INITIAL_SERVICE_CATEGORIES } from '@/lib/constants';

const CURRENT_YEAR = 2026;

export default function WelcomePage() {
  const steps = [
    {
      step: '01',
      title: 'Find Campus Talent',
      description: 'Explore hairstylists, nail techs, barbers, and makeup artists verified right in your student hostels.',
      icon: <Scissors className="w-5 h-5 text-purple-800" />,
    },
    {
      step: '02',
      title: 'Book & Pay Protected',
      description: 'Lock in your fixed-price slot. Funds are protected and held in escrow until your service is completed.',
      icon: <CreditCard className="w-5 h-5 text-emerald-700" />,
    },
    {
      step: '03',
      title: 'Share Completion PIN',
      description: 'Once your hair, nails, or cut looks great, give your provider the 6-digit completion PIN to release payment.',
      icon: <KeyRound className="w-5 h-5 text-neutral-800" />,
    },
  ];

  const highlights = [
    'Strict student-only verification with university matric ID',
    'Conditional 6-digit PIN payout escrow protection',
    'Zero cash arguments & transparent upfront prices',
    'Safe hostel and on-campus meeting locations',
  ];

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-between selection:bg-emerald-700 selection:text-white">
      {/* Top Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
        <div className="max-w-5xl w-full mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl w-full mx-auto px-4 py-8 sm:py-14 space-y-12 sm:space-y-16">
        {/* Mobile-First Hero */}
        <section className="text-center max-w-2xl mx-auto space-y-5">
          <Badge variant="secondary" size="md" dot>
            Exclusive Student Service Network • UNILAG Pilot
          </Badge>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 font-display leading-[1.15]">
            Book verified student talent on campus
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed">
            From knotless braids and gel sets to fresh tapers and glam makeup.
            Discovered in hostels, booked with fixed prices, and protected with completion PINs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
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
              <Button variant="secondary" size="lg" fullWidth>
                Become a Student Provider
              </Button>
            </Link>
          </div>

          {/* Micro Trust Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-emerald-200 text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Student Verified</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-purple-200 text-purple-900 shadow-2xs">
              <KeyRound className="w-4 h-4 text-purple-700" />
              <span>Safe PIN Settlement</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-md border border-neutral-200 text-neutral-700 shadow-2xs">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Zero Cash Drama</span>
            </div>
          </div>
        </section>

        {/* Popular Categories Grid */}
        <section aria-labelledby="cat-heading" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="cat-heading" className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
                Popular Campus Services
              </h2>
              <p className="text-xs text-neutral-500">
                Fixed-price bookings with verified university peers
              </p>
            </div>
            <Link to="/register" className="text-xs font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1">
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {INITIAL_SERVICE_CATEGORIES.map((cat, idx) => {
              const isPurple = idx % 2 === 0;
              return (
                <Link key={cat.id} to="/register">
                  <div className="h-full p-4 rounded-xl bg-white border border-neutral-200 hover:border-neutral-300 flex flex-col justify-between shadow-2xs transition-colors group">
                    <div>
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 ${
                          isPurple
                            ? 'bg-purple-50 text-purple-900 border border-purple-200'
                            : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        <Scissors className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-sm text-neutral-900 group-hover:text-purple-900 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-400 group-hover:text-neutral-700">
                      <span>Book on campus</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-neutral-700" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How It Works (3 Steps) */}
        <section aria-labelledby="hiw-heading" className="space-y-4 bg-white rounded-xl p-5 sm:p-8 border border-neutral-200 shadow-2xs">
          <div className="text-center max-w-md mx-auto space-y-1">
            <Badge variant="secondary" size="sm" dot>
              Simple & Safe
            </Badge>
            <h2 id="hiw-heading" className="text-xl sm:text-2xl font-bold text-neutral-900 font-display">
              How Campus Kobo Works
            </h2>
            <p className="text-xs text-neutral-500">
              Never worry about no-shows or paying before seeing results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-2">
            {steps.map((st) => (
              <div key={st.step} className="p-4 sm:p-5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-2xs flex items-center justify-center border border-neutral-200">
                    {st.icon}
                  </div>
                  <span className="text-xs font-black text-neutral-400 font-display">
                    {st.step}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-neutral-900 font-display">{st.title}</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust Signals & Security */}
        <section className="rounded-xl bg-neutral-900 text-white p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-md text-center md:text-left">
            <Badge variant="primary" size="sm" dot>
              Campus Security
            </Badge>
            <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white">
              Trust & Safety built for University life
            </h2>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Every provider and client must submit official matriculation evidence.
              Exact residential addresses are never displayed publicly.
            </p>
            <ul className="space-y-2 pt-1 text-xs text-neutral-200 text-left">
              {highlights.map((h) => (
                <li key={h} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-auto text-center p-5 rounded-lg bg-neutral-800 border border-neutral-700 space-y-3">
            <Users className="w-8 h-8 text-emerald-400 mx-auto" />
            <div>
              <div className="text-xl font-black text-white font-display">
                UNILAG Pilot
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
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
      <footer className="border-t border-neutral-200 bg-white py-6 text-center text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Logo size="sm" to="/" />
          <p>Campus Kobo &copy; {CURRENT_YEAR}. Campus Skills Marketplace MVP.</p>
          <div className="flex gap-4 font-medium">
            <Link to="/login" className="hover:text-neutral-900">Sign In</Link>
            <Link to="/register" className="hover:text-neutral-900">Create Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
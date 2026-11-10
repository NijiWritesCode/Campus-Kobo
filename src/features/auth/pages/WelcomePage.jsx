import { Link } from 'react-router-dom';
import {
  Sparkles,
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
import SpotlightCard from '@/components/react-bits/SpotlightCard';
import AnimatedGradientText from '@/components/react-bits/AnimatedGradientText';
import AuroraBackground from '@/components/react-bits/AuroraBackground';
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
    'Strict student-only verification with matric ID',
    'Conditional 6-digit PIN payout escrow protection',
    'Zero cash arguments & transparent upfront prices',
    'Safe on-campus meeting locations and hostels',
  ];

  return (
    <div className="min-h-screen bg-neutral-50/70 flex flex-col justify-between selection:bg-primary-500 selection:text-white">
      {/* Top Bar with Glassmorphism */}
      <header className="glass-panel sticky top-0 z-30 border-b border-neutral-200/80">
        <div className="max-w-5xl w-full mx-auto px-4 h-16 flex items-center justify-between">
          <Logo size="md" to="/" showTagline={true} />
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="primary" size="sm" className="shadow-sm shadow-primary-500/25">
                Join Campus
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Aurora Ambient Glow */}
      <AuroraBackground className="pt-8 pb-12 sm:pt-14 sm:pb-20">
        <main className="max-w-5xl w-full mx-auto px-4 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <Link to="/register">
              <AnimatedGradientText className="cursor-pointer hover:scale-[1.02] transition-transform">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  <span>Exclusive Student Service Network • UNILAG Pilot</span>
                  <ArrowRight className="w-3 h-3 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </AnimatedGradientText>
            </Link>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-neutral-900 font-display leading-[1.12]">
              Book verified student talent on your{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-teal-600 to-emerald-600">
                campus
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2.5 text-emerald-500/40"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <path d="M0 15 Q 50 0, 100 15" stroke="currentColor" strokeWidth="6" fill="none" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-600 max-w-xl mx-auto leading-relaxed font-normal">
              From knotless braids and gel sets to fresh fades and glam makeup.
              Discovered in hostels, booked with fixed prices, and protected with completion PINs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link to="/register" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  className="shadow-lg shadow-emerald-600/25 hover:shadow-emerald-600/35"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Find & Book Services
                </Button>
              </Link>
              <Link to="/register?role=provider" className="w-full sm:w-auto">
                <Button
                  variant="secondary"
                  size="lg"
                  fullWidth
                  className="shadow-lg shadow-purple-600/25 hover:shadow-purple-600/35"
                >
                  Become a Student Provider
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3 text-xs font-semibold text-neutral-600">
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Student Verified</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-purple-200/80 shadow-2xs text-purple-800">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>Safe PIN Settlement</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-neutral-200/80 shadow-2xs text-neutral-700">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Zero Cash Drama</span>
              </div>
            </div>
          </div>

          {/* Popular Categories with Spotlight Interaction */}
          <section aria-labelledby="cat-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="cat-heading" className="text-xl font-bold text-neutral-900 font-display">
                  Popular Campus Services
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Fixed-price bookings with verified university peers
                </p>
              </div>
              <Link to="/register" className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {INITIAL_SERVICE_CATEGORIES.map((cat, idx) => {
                const isPurple = idx % 2 === 0;
                return (
                  <Link key={cat.id} to="/register">
                    <SpotlightCard className="h-full p-5 flex flex-col justify-between group hover:-translate-y-0.5 transition-all">
                      <div>
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-105 transition-all duration-200 shadow-2xs ${
                            isPurple
                              ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                              : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                          }`}
                        >
                          <Scissors className="w-5 h-5" />
                        </div>
                        <h3
                          className={`font-bold text-sm text-neutral-900 transition-colors font-display ${
                            isPurple ? 'group-hover:text-purple-600' : 'group-hover:text-emerald-600'
                          }`}
                        >
                          {cat.name}
                        </h3>
                        <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div
                        className={`pt-3 mt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-neutral-400 ${
                          isPurple ? 'group-hover:text-purple-600' : 'group-hover:text-emerald-600'
                        }`}
                      >
                        <span>Book on campus</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </SpotlightCard>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* How It Works (3 Steps) with Spotlight Cards */}
          <section aria-labelledby="hiw-heading" className="space-y-6 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-neutral-200/80 shadow-xs">
            <div className="text-center max-w-md mx-auto space-y-1.5">
              <Badge variant="secondary" size="sm" dot>
                Simple & Safe
              </Badge>
              <h2 id="hiw-heading" className="text-2xl sm:text-3xl font-bold text-neutral-900 font-display">
                How Campus Kobo Works
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                Never worry about no-shows or paying before seeing results.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              {steps.map((st, idx) => {
                const isPurple = idx === 1;
                return (
                  <SpotlightCard key={st.step} className="p-6 space-y-3 bg-neutral-50/60">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center border border-neutral-200/80">
                        {st.icon}
                      </div>
                      <span className={`text-xs font-black font-display ${isPurple ? 'text-purple-400' : 'text-emerald-400'}`}>
                        {st.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-neutral-900 font-display">{st.title}</h3>
                    <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                      {st.description}
                    </p>
                  </SpotlightCard>
                );
              })}
            </div>
          </section>

          {/* Trust Signals & Campus Boundary */}
          <section className="rounded-3xl bg-neutral-900 text-white p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden border border-neutral-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-md text-center md:text-left relative z-10">
              <Badge variant="secondary" size="sm" dot>
                Campus Security
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
                Trust & Safety built for University life
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                Every provider and client must submit official matriculation evidence.
                Exact residential addresses are never displayed publicly.
              </p>
              <ul className="space-y-2 pt-2 text-xs text-neutral-200 text-left">
                {highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-auto text-center p-6 sm:p-8 rounded-3xl bg-neutral-800/90 border border-purple-800/60 space-y-4 relative z-10 shadow-lg">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-emerald-500/20 text-purple-400 flex items-center justify-center mx-auto border border-purple-500/30">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-black text-white font-display">
                  UNILAG Pilot
                </div>
                <p className="text-xs text-neutral-400 mt-1">
                  Open to University Students (18+)
                </p>
              </div>
              <Link to="/register" className="block">
                <Button variant="primary" size="md" fullWidth className="shadow-md shadow-emerald-500/30">
                  Join Your Campus Cohort
                </Button>
              </Link>
            </div>
          </section>
        </main>
      </AuroraBackground>

      {/* Footer */}
      <footer className="border-t border-neutral-200/80 bg-white py-8 text-center text-xs text-neutral-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo size="sm" to="/" />
          <p>Campus Kobo &copy; {CURRENT_YEAR}. Campus Skills Marketplace MVP.</p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-neutral-900 font-medium">Sign In</Link>
            <Link to="/register" className="hover:text-neutral-900 font-medium">Create Account</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

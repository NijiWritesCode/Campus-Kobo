import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';
import VerificationGate from '@/components/common/VerificationGate';

export default function AppShell({ variant = 'client' }) {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900">
      {/* Unified Single Header for both Mobile and Desktop */}
      <Header variant={variant} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-5 sm:py-6 pb-24 md:pb-12">
        <VerificationGate />
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation (Hidden on Desktop) */}
      <BottomNav variant={variant} />
    </div>
  );
}

import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import { useUIStore } from '@/stores/uiStore';
import Logo from '@/components/common/Logo';

export default function AdminShell() {
  const { toggleSidebar } = useUIStore();

  return (
    <div className="min-h-screen flex bg-neutral-100 text-neutral-900">
      {/* Desktop & Mobile Responsive Sidebar */}
      <Sidebar />

      {/* Main Admin Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {/* Top Header for Mobile Menu Toggle */}
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-neutral-200 px-4 h-14 flex items-center justify-between">
          <button
            type="button"
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-xl text-neutral-700 hover:bg-neutral-100"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Logo size="sm" to="/admin" />
          <div className="w-8" />
        </header>

        {/* Admin Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

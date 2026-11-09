import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <main className="min-h-screen flex flex-col justify-between p-6 sm:p-12 max-w-4xl mx-auto">
        <header className="flex items-center justify-between border-b border-neutral-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              CK
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900 font-display">
                Campus <span className="text-primary-600">Kobo</span>
              </h1>
              <p className="text-xs text-neutral-500 font-medium">Campus Skills Marketplace</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Phase 1 Setup Active
          </span>
        </header>

        <section className="my-12 space-y-6">
          <div className="inline-block px-3 py-1 bg-primary-50 border border-primary-200 text-primary-700 rounded-lg text-xs font-semibold uppercase tracking-wider">
            Phase 1: Project Setup & Installation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">
            Foundation Ready for Campus Kobo
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl leading-relaxed">
            The mobile-first PWA frontend environment has been scaffolded and configured.
            Tailwind CSS v4 with custom campus palette, Zustand stores, React Router,
            TanStack Query, and PWA manifest are initialized and verified.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Stack Core</div>
              <div className="mt-1 font-semibold text-neutral-900">React 19 + JSX</div>
              <p className="mt-1 text-xs text-neutral-500">Fast modern build powered by Vite 8</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Styling</div>
              <div className="mt-1 font-semibold text-neutral-900">Tailwind CSS v4 @theme</div>
              <p className="mt-1 text-xs text-neutral-500">Warm orange & trust emerald palette</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">State & Data</div>
              <div className="mt-1 font-semibold text-neutral-900">Zustand + TanStack Query</div>
              <p className="mt-1 text-xs text-neutral-500">Lightweight auth & server state caching</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Currency</div>
              <div className="mt-1 font-semibold text-neutral-900">Nigerian Naira (₦)</div>
              <p className="mt-1 text-xs text-neutral-500">Integer kobo precision & auto-formatting</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Validation</div>
              <div className="mt-1 font-semibold text-neutral-900">Zod + React Hook Form</div>
              <p className="mt-1 text-xs text-neutral-500">Type-safe schemas for bookings & auth</p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-xs">
              <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Next Step</div>
              <div className="mt-1 font-semibold text-primary-600">Phase 2: Design System & Auth</div>
              <p className="mt-1 text-xs text-neutral-500">UI primitives, layout shells, auth pages</p>
            </div>
          </div>
        </section>

        <footer className="border-t border-neutral-200 pt-6 text-xs text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Campus Kobo MVP &copy; {new Date().getFullYear()}</span>
          <span>Verified Student Marketplace</span>
        </footer>
      </main>
    ),
  },
]);

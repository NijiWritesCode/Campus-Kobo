import { createBrowserRouter, Navigate } from 'react-router-dom';

// Layouts
import AppShell from '@/components/layout/AppShell';
import AdminShell from '@/components/layout/AdminShell';
import ProtectedRoute from '@/components/common/ProtectedRoute';

// Auth Pages (eagerly loaded)
import WelcomePage from '@/features/auth/pages/WelcomePage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import LoginPage from '@/features/auth/pages/LoginPage';
import OTPVerifyPage from '@/features/auth/pages/OTPVerifyPage';
import StudentVerificationPage from '@/features/verification/pages/StudentVerificationPage';

// Discovery & Public Provider Pages (Phase 3)
import HomePage from '@/features/discovery/pages/HomePage';
import SearchPage from '@/features/discovery/pages/SearchPage';
import CategoryPage from '@/features/discovery/pages/CategoryPage';
import ProviderProfilePage from '@/features/provider-public/pages/ProviderProfilePage';
import DesignSystemShowcase from '@/features/discovery/components/DesignSystemShowcase';

export const router = createBrowserRouter([
  // Public Landing & Authentication routes
  { path: '/', element: <WelcomePage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/verify-otp', element: <OTPVerifyPage /> },

  // Client Application Surface (Protected)
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <AppShell variant="client" />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage /> },
      { path: 'categories/:categoryId', element: <CategoryPage /> },
      { path: 'providers/:slug', element: <ProviderProfilePage /> },
      { path: 'verification', element: <StudentVerificationPage /> },
      { path: 'showcase', element: <DesignSystemShowcase /> },
      {
        path: 'book/:variantId',
        element: (
          <div className="py-12 text-center space-y-3 max-w-md mx-auto">
            <h2 className="text-xl font-bold font-display text-neutral-900">Booking Engine Ready</h2>
            <p className="text-xs text-neutral-500">
              Booking requests, date/time calendar scheduling, and checkout will be wired in Phase 4.
            </p>
            <a href="/app" className="inline-block py-2 px-4 rounded-xl bg-primary-500 text-white text-xs font-bold">
              Back to Browse
            </a>
          </div>
        ),
      },
      {
        path: 'bookings',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">My Bookings</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 4: Booking & Checkout Engine</p>
          </div>
        ),
      },
      {
        path: 'profile',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">My Profile & Account</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 4</p>
          </div>
        ),
      },
      {
        path: 'notifications',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">Notifications</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 4</p>
          </div>
        ),
      },
    ],
  },

  // Provider Application Surface (Protected - Provider Role)
  {
    path: '/provider',
    element: (
      <ProtectedRoute role="PROVIDER">
        <AppShell variant="provider" />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">Provider Dashboard</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 5: Provider Dashboard & Services</p>
          </div>
        ),
      },
      {
        path: 'services',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">Service Management</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 5</p>
          </div>
        ),
      },
      {
        path: 'bookings',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">Provider Bookings & PIN Input</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 5</p>
          </div>
        ),
      },
      {
        path: 'earnings',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display">Provider Earnings & Payouts</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 5</p>
          </div>
        ),
      },
    ],
  },

  // Admin Application Surface (Protected - Admin Role)
  {
    path: '/admin',
    element: (
      <ProtectedRoute role="ADMIN">
        <AdminShell />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display text-neutral-900">Admin Portal Overview</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 6: Admin Dashboard & Dispute Resolution</p>
          </div>
        ),
      },
      {
        path: 'verifications',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display text-neutral-900">Student Verifications Queue</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 6</p>
          </div>
        ),
      },
      {
        path: 'disputes',
        element: (
          <div className="py-8 text-center space-y-2">
            <h2 className="text-xl font-bold font-display text-neutral-900">Disputes & Claims</h2>
            <p className="text-xs text-neutral-500">Coming in Phase 6</p>
          </div>
        ),
      },
    ],
  },

  // Catch-all redirect to welcome landing
  { path: '*', element: <Navigate to="/" replace /> },
]);

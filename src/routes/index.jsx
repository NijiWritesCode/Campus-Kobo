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

// Booking & Checkout Flow Pages (Phase 4)
import BookingPage from '@/features/booking/pages/BookingPage';
import CheckoutPage from '@/features/booking/pages/CheckoutPage';
import MyBookingsPage from '@/features/booking/pages/MyBookingsPage';
import BookingDetailPage from '@/features/booking/pages/BookingDetailPage';
import CompletionPinPage from '@/features/booking/pages/CompletionPinPage';
import ProfilePage from '@/features/client-profile/pages/ProfilePage';
import NotificationsPage from '@/features/notifications/pages/NotificationsPage';

// Provider Dashboard Surface Pages (Phase 5)
import ProviderDashboard from '@/features/provider-dashboard/pages/ProviderDashboard';
import ProviderProfileManagement from '@/features/provider-dashboard/pages/ProviderProfileManagement';
import ServiceManagement from '@/features/provider-dashboard/pages/ServiceManagement';
import CreateService from '@/features/provider-dashboard/pages/CreateService';
import EditService from '@/features/provider-dashboard/pages/EditService';
import AvailabilityManagement from '@/features/provider-dashboard/pages/AvailabilityManagement';
import ProviderBookings from '@/features/provider-dashboard/pages/ProviderBookings';
import ProviderBookingDetail from '@/features/provider-dashboard/pages/ProviderBookingDetail';
import EarningsPage from '@/features/provider-dashboard/pages/EarningsPage';

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

      // Phase 4: Booking & Checkout Engine
      { path: 'book/:variantId', element: <BookingPage /> },
      { path: 'checkout/:bookingId', element: <CheckoutPage /> },
      { path: 'bookings', element: <MyBookingsPage /> },
      { path: 'bookings/:bookingId', element: <BookingDetailPage /> },
      { path: 'bookings/:bookingId/pin', element: <CompletionPinPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'notifications', element: <NotificationsPage /> },
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
      { index: true, element: <ProviderDashboard /> },
      { path: 'profile', element: <ProviderProfileManagement /> },
      { path: 'services', element: <ServiceManagement /> },
      { path: 'services/new', element: <CreateService /> },
      { path: 'services/:serviceId/edit', element: <EditService /> },
      { path: 'availability', element: <AvailabilityManagement /> },
      { path: 'bookings', element: <ProviderBookings /> },
      { path: 'bookings/:bookingId', element: <ProviderBookingDetail /> },
      { path: 'earnings', element: <EarningsPage /> },
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

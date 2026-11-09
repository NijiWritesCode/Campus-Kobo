import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES } from '@/lib/constants';

/**
 * Route protection guard for authenticated students, providers, and admins.
 */
export default function ProtectedRoute({ children, role = null }) {
  const location = useLocation();
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role check if route requires a specific role
  if (role) {
    const userRoles = user?.roles || [];

    if (role === USER_ROLES.PROVIDER && !userRoles.includes(USER_ROLES.PROVIDER)) {
      // If student is not an approved provider, redirect to verification or app
      return <Navigate to="/app/verification" replace />;
    }

    if (role === USER_ROLES.ADMIN && !userRoles.includes(USER_ROLES.ADMIN)) {
      return <Navigate to="/app" replace />;
    }
  }

  return children;
}

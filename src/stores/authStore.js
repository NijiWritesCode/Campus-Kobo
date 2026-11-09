import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { USER_ROLES, VERIFICATION_STATUSES } from '@/lib/constants';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      activeRole: USER_ROLES.CLIENT, // Current active surface role (CLIENT or PROVIDER)

      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: Boolean(user && token),
          activeRole: user?.roles?.includes(USER_ROLES.PROVIDER)
            ? USER_ROLES.PROVIDER
            : USER_ROLES.CLIENT,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          activeRole: USER_ROLES.CLIENT,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      setActiveRole: (role) => set({ activeRole: role }),

      // Quick helper getters
      isVerified: () =>
        get().user?.verificationStatus === VERIFICATION_STATUSES.APPROVED,
      isPendingVerification: () =>
        get().user?.verificationStatus === VERIFICATION_STATUSES.PENDING,
      isProvider: () =>
        Boolean(get().user?.roles?.includes(USER_ROLES.PROVIDER)),
      isAdmin: () =>
        Boolean(get().user?.roles?.includes(USER_ROLES.ADMIN)),
    }),
    {
      name: 'campus-kobo-auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        activeRole: state.activeRole,
      }),
    }
  )
);

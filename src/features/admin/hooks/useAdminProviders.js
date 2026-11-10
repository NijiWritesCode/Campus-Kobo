import { useState } from 'react';
import toast from 'react-hot-toast';
import { mockProviders } from '@/mocks/data/providers';

const STORAGE_KEY = 'campus-kobo-admin-providers';

function loadStoredProviders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw
      ? JSON.parse(raw)
      : mockProviders.map((p) => ({
          ...p,
          status: p.status || 'ACTIVE',
        }));
  } catch {
    return mockProviders.map((p) => ({ ...p, status: 'ACTIVE' }));
  }
}

export function useAdminProviders() {
  const [providers, setProviders] = useState(loadStoredProviders);

  const saveProviders = (updated) => {
    setProviders(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save providers to localStorage', e);
    }
  };

  const getProvider = (id) => providers.find((p) => p.id === id);

  const toggleProviderStatus = (id, reason = '') => {
    const updated = providers.map((p) => {
      if (p.id === id) {
        const nextStatus = p.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
        return {
          ...p,
          status: nextStatus,
          suspensionReason: nextStatus === 'SUSPENDED' ? reason || 'Administrative action' : null,
        };
      }
      return p;
    });

    saveProviders(updated);
    const target = updated.find((p) => p.id === id);
    if (target.status === 'SUSPENDED') {
      toast.error(`Provider account for ${target.businessName} suspended.`);
    } else {
      toast.success(`Provider account for ${target.businessName} reactivated.`);
    }
    return { success: true };
  };

  const toggleVerifiedBadge = (id) => {
    const updated = providers.map((p) => {
      if (p.id === id) {
        return { ...p, verified: !p.verified };
      }
      return p;
    });
    saveProviders(updated);
    toast.success('Verification badge status updated.');
    return { success: true };
  };

  const activeCount = providers.filter((p) => p.status === 'ACTIVE').length;
  const suspendedCount = providers.filter((p) => p.status === 'SUSPENDED').length;

  return {
    providers,
    getProvider,
    toggleProviderStatus,
    toggleVerifiedBadge,
    activeCount,
    suspendedCount,
  };
}

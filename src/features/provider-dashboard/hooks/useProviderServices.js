import { useState, useEffect, useCallback } from 'react';
import { mockServices } from '@/mocks/data/services';

const STORAGE_KEY = 'campus_kobo_provider_services';

function loadStoredServices() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (err) {
    console.warn('Failed to load provider services from localStorage:', err);
  }
  // Filter initial mock services for prov-001 (Beauty by Ada)
  return mockServices.filter((s) => s.providerId === 'prov-001').map((s) => ({
    ...s,
    isActive: true,
  }));
}

export function useProviderServices() {
  const [services, setServices] = useState(loadStoredServices);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch (err) {
      console.error('Failed to sync provider services to localStorage:', err);
    }
  }, [services]);

  const getService = useCallback(
    (id) => services.find((s) => s.id === id) || null,
    [services]
  );

  const addService = useCallback(({ title, description, categoryId, photos = [], variants = [] }) => {
    const newService = {
      id: `svc-${Date.now()}`,
      providerId: 'prov-001',
      categoryId,
      title,
      description,
      photos: photos.length > 0 ? photos : ['https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800'],
      isActive: true,
      variants: variants.map((v, i) => ({
        id: `var-${Date.now()}-${i}`,
        name: v.name,
        priceKobo: Number(v.priceKobo),
        durationMinutes: Number(v.durationMinutes) || 60,
        description: v.description || '',
      })),
      createdAt: new Date().toISOString(),
    };

    setServices((prev) => [newService, ...prev]);
    return newService;
  }, []);

  const updateService = useCallback((serviceId, updates) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        return {
          ...s,
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  }, []);

  const deleteService = useCallback((serviceId) => {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  }, []);

  const toggleServiceStatus = useCallback((serviceId) => {
    setServices((prev) =>
      prev.map((s) => {
        if (s.id !== serviceId) return s;
        return { ...s, isActive: !s.isActive };
      })
    );
  }, []);

  return {
    services,
    getService,
    addService,
    updateService,
    deleteService,
    toggleServiceStatus,
  };
}

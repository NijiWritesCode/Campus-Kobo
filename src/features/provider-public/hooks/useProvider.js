import { useMemo } from 'react';
import { mockProviders } from '@/mocks/data/providers';
import { mockServices } from '@/mocks/data/services';
import { mockReviews } from '@/mocks/data/reviews';

export function useProvider(slug) {
  const provider = useMemo(() => {
    return mockProviders.find((p) => p.slug === slug || p.id === slug) || null;
  }, [slug]);

  const services = useMemo(() => {
    if (!provider) return [];
    return mockServices.filter((s) => s.providerId === provider.id);
  }, [provider]);

  const reviews = useMemo(() => {
    if (!provider) return [];
    return mockReviews.filter((r) => r.providerId === provider.id);
  }, [provider]);

  const ratingSummary = useMemo(() => {
    if (!reviews.length) {
      return { average: provider?.rating || 5.0, count: provider?.reviewCount || 0, breakdown: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const rounded = Math.round(r.rating);
      if (counts[rounded] !== undefined) counts[rounded] += 1;
    });
    return {
      average: provider?.rating || 5.0,
      count: reviews.length,
      breakdown: {
        5: Math.round((counts[5] / reviews.length) * 100),
        4: Math.round((counts[4] / reviews.length) * 100),
        3: Math.round((counts[3] / reviews.length) * 100),
        2: Math.round((counts[2] / reviews.length) * 100),
        1: Math.round((counts[1] / reviews.length) * 100),
      },
    };
  }, [provider, reviews]);

  return {
    provider,
    services,
    reviews,
    ratingSummary,
    isLoading: false,
    notFound: !provider,
  };
}

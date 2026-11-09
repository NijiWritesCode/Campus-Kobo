import { useState, useMemo } from 'react';
import { mockProviders } from '@/mocks/data/providers';
import { mockServices } from '@/mocks/data/services';

export function useSearch(initialParams = {}) {
  const [query, setQuery] = useState(initialParams.query || '');
  const [categoryId, setCategoryId] = useState(initialParams.categoryId || 'all');
  const [maxPriceKobo, setMaxPriceKobo] = useState(initialParams.maxPriceKobo || 1000000); // ₦10,000 max default
  const [minRating, setMinRating] = useState(initialParams.minRating || 0);
  const [sortBy, setSortBy] = useState(initialParams.sortBy || 'recommended');

  const filteredProviders = useMemo(() => {
    return mockProviders
      .filter((prov) => {
        // 1. Category Filter
        if (categoryId && categoryId !== 'all' && prov.categoryId !== categoryId) {
          return false;
        }

        // 2. Rating Filter
        if (minRating > 0 && prov.rating < minRating) {
          return false;
        }

        // 3. Price Filter
        if (prov.startingPriceKobo > maxPriceKobo) {
          return false;
        }

        // 4. Keyword Query
        if (query.trim()) {
          const q = query.toLowerCase().trim();
          const matchBio = prov.bio.toLowerCase().includes(q);
          const matchName = prov.businessName.toLowerCase().includes(q) || prov.studentName.toLowerCase().includes(q);
          const matchArea = prov.serviceArea.toLowerCase().includes(q);

          // Check if provider has services matching the keyword
          const provServices = mockServices.filter((s) => s.providerId === prov.id);
          const matchService = provServices.some(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.description.toLowerCase().includes(q) ||
              s.variants.some((v) => v.name.toLowerCase().includes(q))
          );

          if (!matchBio && !matchName && !matchArea && !matchService) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') {
          return a.startingPriceKobo - b.startingPriceKobo;
        }
        if (sortBy === 'price-desc') {
          return b.startingPriceKobo - a.startingPriceKobo;
        }
        if (sortBy === 'rating-desc') {
          return b.rating - a.rating;
        }
        if (sortBy === 'popularity') {
          return b.completedBookings - a.completedBookings;
        }
        // Recommended (Default): composite of rating & completed bookings
        const scoreA = a.rating * 10 + a.completedBookings;
        const scoreB = b.rating * 10 + b.completedBookings;
        return scoreB - scoreA;
      });
  }, [query, categoryId, maxPriceKobo, minRating, sortBy]);

  const activeFiltersCount =
    (categoryId !== 'all' && categoryId ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (maxPriceKobo < 1000000 ? 1 : 0);

  const resetFilters = () => {
    setQuery('');
    setCategoryId('all');
    setMaxPriceKobo(1000000);
    setMinRating(0);
    setSortBy('recommended');
  };

  return {
    query,
    setQuery,
    categoryId,
    setCategoryId,
    maxPriceKobo,
    setMaxPriceKobo,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    filteredProviders,
    totalCount: filteredProviders.length,
    activeFiltersCount,
    resetFilters,
  };
}

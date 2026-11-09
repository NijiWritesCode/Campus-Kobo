import { useMemo } from 'react';
import { mockCategories } from '@/mocks/data/categories';

export function useCategories() {
  const categories = useMemo(() => mockCategories, []);

  const getCategoryBySlug = (slug) => {
    return categories.find((cat) => cat.slug === slug || cat.id === slug) || null;
  };

  return {
    categories,
    getCategoryBySlug,
    totalCategories: categories.length,
  };
}

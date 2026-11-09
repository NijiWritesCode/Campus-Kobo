import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search as SearchIcon, X } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SortSelect from '../components/SortSelect';
import ProviderCard from '../components/ProviderCard';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import Modal from '@/components/ui/Modal';
import { useSearch } from '../hooks/useSearch';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'all';

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const {
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
    totalCount,
    activeFiltersCount,
    resetFilters,
  } = useSearch({ query: initialQ, categoryId: initialCat });

  // Sync state to URL params cleanly
  useEffect(() => {
    const params = {};
    if (query) params.q = query;
    if (categoryId && categoryId !== 'all') params.category = categoryId;
    setSearchParams(params, { replace: true });
  }, [query, categoryId, setSearchParams]);

  return (
    <div className="space-y-6 pb-8">
      {/* Search Header */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
          Search Campus Providers
        </h1>
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search braids, acrylics, tapers, student name, hostels..."
              autoFocus={!initialQ}
            />
          </div>
          {/* Mobile Filter Toggle */}
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden relative p-3 rounded-2xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 shadow-2xs focus:outline-none"
            aria-label="Filter results"
          >
            <SlidersHorizontal className="w-5 h-5" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Grid: Filters on Left (desktop), Results on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filter Panel */}
        <div className="hidden lg:block lg:col-span-1 sticky top-20">
          <FilterPanel
            selectedCategory={categoryId}
            onSelectCategory={setCategoryId}
            maxPriceKobo={maxPriceKobo}
            onChangeMaxPrice={setMaxPriceKobo}
            minRating={minRating}
            onChangeMinRating={setMinRating}
            onReset={resetFilters}
            activeCount={activeFiltersCount}
          />
        </div>

        {/* Results Area */}
        <div className="lg:col-span-3 space-y-4">
          {/* Results Bar & Sort Control */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-neutral-200/80">
            <div className="text-xs font-semibold text-neutral-600">
              Showing <span className="text-neutral-900 font-bold">{totalCount}</span> verified student provider{totalCount === 1 ? '' : 's'}
              {query && (
                <span> for <strong className="text-primary-600 font-bold">"{query}"</strong></span>
              )}
            </div>

            <SortSelect value={sortBy} onChange={setSortBy} />
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-neutral-400 font-medium">Active filters:</span>
              {categoryId !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 text-primary-700 text-xs font-bold border border-primary-200">
                  <span>Category: {categoryId}</span>
                  <button type="button" onClick={() => setCategoryId('all')} className="hover:text-primary-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {minRating > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200">
                  <span>Rating: {minRating}★+</span>
                  <button type="button" onClick={() => setMinRating(0)} className="hover:text-amber-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {maxPriceKobo < 1000000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 text-xs font-bold border border-neutral-200">
                  <span>Under ₦{(maxPriceKobo / 100).toLocaleString()}</span>
                  <button type="button" onClick={() => setMaxPriceKobo(1000000)} className="hover:text-neutral-900">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-primary-600 hover:text-primary-700 font-bold underline ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Providers Grid */}
          {totalCount > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
              {filteredProviders.map((prov, index) => (
                <ProviderCard key={prov.id} provider={prov} isLCP={index === 0} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<SearchIcon className="w-6 h-6" />}
              title="No providers found"
              description="Try adjusting your keywords, price range, or category filter to find matching student talent."
              action={
                <Button variant="primary" size="sm" onClick={resetFilters}>
                  Reset All Filters
                </Button>
              }
            />
          )}
        </div>
      </div>

      {/* Mobile Filter Modal (Using Native <dialog> Modal) */}
      <Modal
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        title="Filter Services"
        description="Filter campus providers by category, budget, and ratings"
      >
        <FilterPanel
          selectedCategory={categoryId}
          onSelectCategory={(cat) => {
            setCategoryId(cat);
          }}
          maxPriceKobo={maxPriceKobo}
          onChangeMaxPrice={setMaxPriceKobo}
          minRating={minRating}
          onChangeMinRating={setMinRating}
          onReset={() => {
            resetFilters();
            setMobileFilterOpen(false);
          }}
          activeCount={activeFiltersCount}
        />
        <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-end">
          <Button
            variant="primary"
            size="md"
            fullWidth
            onClick={() => setMobileFilterOpen(false)}
          >
            Show {totalCount} Result{totalCount === 1 ? '' : 's'}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Image as ImageIcon, MessageSquare, Info } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Tabs from '@/components/ui/Tabs';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import ProviderHeader from '../components/ProviderHeader';
import ServiceList from '../components/ServiceList';
import PortfolioGallery from '../components/PortfolioGallery';
import ReviewList from '../components/ReviewList';
import AvailabilityIndicator from '../components/AvailabilityIndicator';
import { useProvider } from '../hooks/useProvider';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ProviderProfilePage() {
  const { slug } = useParams();
  const { provider, services, reviews, ratingSummary, notFound } = useProvider(slug);
  const [activeTab, setActiveTab] = useState('services');

  if (notFound || !provider) {
    return (
      <div className="py-12">
        <EmptyState
          title="Provider Profile Not Found"
          description="The student provider you are looking for does not exist or their listing has been suspended."
          action={
            <Link to="/app">
              <Button variant="primary" size="sm">
                Return to Campus Discovery
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const tabs = [
    { id: 'services', label: 'Services & Prices', icon: <Calendar className="w-3.5 h-3.5" />, badge: services.length },
    { id: 'portfolio', label: 'Portfolio Gallery', icon: <ImageIcon className="w-3.5 h-3.5" />, badge: provider.portfolioPhotos?.length || 0 },
    { id: 'reviews', label: 'Verified Reviews', icon: <MessageSquare className="w-3.5 h-3.5" />, badge: reviews.length },
    { id: 'about', label: 'Hours & Location', icon: <Info className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6 pb-20">
      <PageHeader
        title={provider.businessName}
        subtitle={`${provider.studentName} • ${provider.campus}`}
        backTo="/app"
      />

      {/* Main Header Banner */}
      <ProviderHeader provider={provider} />

      {/* Profile Section Tabs */}
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* Tab Panels */}
      <div className="pt-1">
        {activeTab === 'services' && (
          <ServiceList services={services} />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioGallery photos={provider.portfolioPhotos || []} />
        )}

        {activeTab === 'reviews' && (
          <ReviewList reviews={reviews} ratingSummary={ratingSummary} />
        )}

        {activeTab === 'about' && (
          <AvailabilityIndicator provider={provider} />
        )}
      </div>

      {/* Floating Bottom Quick-Booking Bar on Mobile */}
      <div className="fixed bottom-16 inset-x-0 z-20 md:hidden bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] text-neutral-400 block font-medium">Starting from</span>
          <span className="text-base font-extrabold text-neutral-900 font-display">
            {formatCurrency(provider.startingPriceKobo)}
          </span>
        </div>

        {services[0]?.variants?.[0]?.id ? (
          <Link to={`/app/book/${services[0].variants[0].id}`}>
            <Button variant="primary" size="sm">
              Book Appointment
            </Button>
          </Link>
        ) : (
          <Button variant="primary" size="sm" onClick={() => setActiveTab('services')}>
            View Services
          </Button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import DateTimePicker from '../components/DateTimePicker';
import LocationSelector from '../components/LocationSelector';
import PriceBreakdown from '../components/PriceBreakdown';
import { mockServices } from '@/mocks/data/services';
import { mockProviders } from '@/mocks/data/providers';
import { useBookings } from '../hooks/useBookings';
import { useAuthStore } from '@/stores/authStore';
import { formatCurrency } from '@/lib/formatCurrency';

function getInitialBookingDates() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const iso = tomorrow.toISOString().split('T')[0];
  const display = `Tomorrow, ${tomorrow.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  return { iso, display };
}

export default function BookingPage() {
  const { variantId } = useParams();
  const navigate = useNavigate();
  const { createBooking } = useBookings();
  const { user } = useAuthStore();

  // Find corresponding service & variant
  let matchedService = null;
  let matchedVariant = null;

  for (const svc of mockServices) {
    const v = svc.variants?.find((varItem) => varItem.id === variantId);
    if (v) {
      matchedService = svc;
      matchedVariant = v;
      break;
    }
  }

  const matchedProvider = matchedService
    ? mockProviders.find((p) => p.id === matchedService.providerId)
    : null;

  // Booking Form State initialized lazily
  const [initialDates] = useState(getInitialBookingDates);
  const [selectedDate, setSelectedDate] = useState(initialDates.iso);
  const [displayDate, setDisplayDate] = useState(initialDates.display);
  const [selectedTime, setSelectedTime] = useState('12:00 PM');
  const [locationType, setLocationType] = useState('PROVIDER_HOSTEL');
  const [locationTitle, setLocationTitle] = useState("Provider's Space");
  const [locationDetails, setLocationDetails] = useState(
    matchedProvider?.serviceArea || 'Moremi Hall, Room 214'
  );
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!matchedService || !matchedVariant || !matchedProvider) {
    return (
      <div className="py-12">
        <EmptyState
          title="Service variant not found"
          description="The service or variant you selected is no longer available or was removed."
          action={
            <Link to="/app">
              <Button variant="primary" size="sm">
                Browse Campus Services
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handleDateSelect = (iso, display) => {
    setSelectedDate(iso);
    setDisplayDate(display);
  };

  const handleLocationTypeSelect = (type, title) => {
    setLocationType(type);
    setLocationTitle(title);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      toast.error('Please pick an appointment date and time');
      return;
    }

    if (!locationDetails?.trim()) {
      toast.error('Please specify the hostel or meeting location');
      return;
    }

    setIsSubmitting(true);

    try {
      const newBooking = createBooking({
        service: matchedService,
        variant: matchedVariant,
        provider: matchedProvider,
        client: user,
        date: selectedDate,
        displayDate,
        timeSlot: selectedTime,
        locationType,
        locationTitle,
        locationDetails: locationDetails.trim(),
        specialNotes: specialNotes.trim(),
      });

      toast.success('Appointment scheduled! Proceeding to checkout...');
      navigate(`/app/checkout/${newBooking.id}`);
    } catch (err) {
      console.error(err);
      toast.error('Could not create booking request. Please retry.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-2xl mx-auto">
      <PageHeader
        title="Schedule Appointment"
        subtitle={`${matchedProvider.businessName} • UNILAG`}
        backTo={`/app/providers/${matchedProvider.slug}`}
      />

      {/* Selected Service Recap Card */}
      <div className="p-4 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 font-display">
              Selected Service
            </span>
            <h2 className="text-base font-bold text-neutral-900 font-display">
              {matchedService.title}
            </h2>
            <div className="flex items-center gap-2 text-xs text-neutral-600">
              <span className="font-semibold text-purple-900">{matchedVariant.name}</span>
              <span>•</span>
              <span className="flex items-center gap-1 text-neutral-500">
                <Clock className="w-3.5 h-3.5" />
                {matchedVariant.durationMinutes} mins
              </span>
            </div>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[10px] text-neutral-400 block font-medium">Rate</span>
            <span className="text-lg font-black text-neutral-900 font-display">
              {formatCurrency(matchedVariant.priceKobo)}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Date & Time Slot */}
        <section className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="border-b border-neutral-100 pb-2.5">
            <h3 className="text-sm font-bold text-neutral-900 font-display">
              1. Choose Date & Time
            </h3>
            <p className="text-xs text-neutral-500">
              Select an available time slot convenient for your lecture schedule
            </p>
          </div>

          <DateTimePicker
            selectedDate={selectedDate}
            onSelectDate={handleDateSelect}
            selectedTime={selectedTime}
            onSelectTime={setSelectedTime}
          />
        </section>

        {/* Step 2: Campus Location */}
        <section className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="border-b border-neutral-100 pb-2.5">
            <h3 className="text-sm font-bold text-neutral-900 font-display">
              2. Meeting Location on Campus
            </h3>
            <p className="text-xs text-neutral-500">
              Meet safely in hostels or designated university public spaces
            </p>
          </div>

          <LocationSelector
            locationType={locationType}
            onSelectType={handleLocationTypeSelect}
            locationDetails={locationDetails}
            onChangeDetails={setLocationDetails}
            providerBaseArea={matchedProvider.serviceArea}
          />
        </section>

        {/* Step 3: Special Instructions / Hair Prep */}
        <section className="p-4 sm:p-5 rounded-xl bg-white border border-neutral-200 shadow-2xs space-y-3">
          <div className="border-b border-neutral-100 pb-2.5">
            <h3 className="text-sm font-bold text-neutral-900 font-display">
              3. Special Instructions (Optional)
            </h3>
            <p className="text-xs text-neutral-500">
              Specify hair length, preferred parting, nail length, skin sensitivities, etc.
            </p>
          </div>

          <textarea
            rows={3}
            value={specialNotes}
            onChange={(e) => setSpecialNotes(e.target.value)}
            placeholder="e.g. Bringing 3 packs of Expression pre-stretched hair; skin fade with low taper..."
            className="w-full p-3 text-xs rounded-xl border border-neutral-300 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 shadow-2xs"
          />
        </section>

        {/* Financial Breakdown & Trust Callout */}
        <PriceBreakdown
          servicePriceKobo={matchedVariant.priceKobo}
          showTrustCallout={true}
        />

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            type="submit"
            disabled={isSubmitting}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {isSubmitting ? 'Scheduling Request...' : 'Proceed to Checkout & Escrow'}
          </Button>
        </div>
      </form>
    </div>
  );
}

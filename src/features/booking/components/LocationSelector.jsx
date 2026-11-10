import { Home, Building2, MapPin } from 'lucide-react';
import { cn } from '@/lib/cn';

const LOCATION_OPTIONS = [
  {
    type: 'PROVIDER_HOSTEL',
    title: "Provider's Space",
    subtitle: 'Service carried out in the provider’s hostel or work space',
    icon: Building2,
    placeholder: 'e.g. Moremi Hall, Room 214',
  },
  {
    type: 'CLIENT_ROOM',
    title: 'My Hostel Room',
    subtitle: 'Provider travels to your room (you must be in a campus hostel)',
    icon: Home,
    placeholder: 'Enter your hostel name & room number (e.g. New Hall, Block A, Room 104)',
  },
  {
    type: 'CAMPUS_LANDMARK',
    title: 'Campus Landmark / Public Spot',
    subtitle: 'Meet at a campus landmark or common hall area',
    icon: MapPin,
    placeholder: 'e.g. New Hall Quad, Amphitheatre bench, Faculty of Arts foyer',
  },
];

export default function LocationSelector({
  locationType,
  onSelectType,
  locationDetails,
  onChangeDetails,
  providerBaseArea = 'UNILAG Campus',
  className = '',
}) {
  const selectedOption =
    LOCATION_OPTIONS.find((opt) => opt.type === locationType) || LOCATION_OPTIONS[0];

  return (
    <div className={cn('space-y-3', className)}>
      <label className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
        <MapPin className="w-4 h-4 text-emerald-700" />
        <span>Campus Meeting Location</span>
      </label>

      {/* Option Cards */}
      <div className="grid grid-cols-1 gap-2.5">
        {LOCATION_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = locationType === opt.type;

          return (
            <button
              key={opt.type}
              type="button"
              onClick={() => {
                onSelectType(opt.type, opt.title);
                if (opt.type === 'PROVIDER_HOSTEL' && !locationDetails) {
                  onChangeDetails(providerBaseArea);
                }
              }}
              className={cn(
                'p-3 rounded-xl border text-left flex items-start gap-3 transition-all focus:outline-none shadow-2xs',
                isSelected
                  ? 'bg-emerald-50 border-emerald-700 text-neutral-900'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
              )}
            >
              <div
                className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border mt-0.5',
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                )}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="min-w-0 flex-1 space-y-0.5">
                <span className="text-xs font-bold font-display block text-neutral-900">
                  {opt.title}
                </span>
                <p className="text-[11px] text-neutral-500 leading-tight">
                  {opt.type === 'PROVIDER_HOSTEL'
                    ? `Provider base: ${providerBaseArea}`
                    : opt.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Specific Details Input */}
      <div className="pt-1">
        <label
          htmlFor="location-details-input"
          className="text-[11px] font-semibold text-neutral-600 block mb-1"
        >
          Specific Meeting Details & Room Number
        </label>
        <input
          id="location-details-input"
          type="text"
          value={locationDetails}
          onChange={(e) => onChangeDetails(e.target.value)}
          placeholder={selectedOption.placeholder}
          className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 transition-colors shadow-2xs"
        />
        <p className="text-[10px] text-neutral-400 mt-1">
          Exact address is only disclosed between you and the verified student provider.
        </p>
      </div>
    </div>
  );
}

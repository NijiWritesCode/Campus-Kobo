import { Calendar, MapPin } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function AvailabilityIndicator({ provider }) {
  const schedule = [
    { day: 'Monday – Friday', hours: '10:00 AM – 7:00 PM', status: 'Available' },
    { day: 'Saturday', hours: '9:00 AM – 8:00 PM', status: 'Peak Hours' },
    { day: 'Sunday', hours: '2:00 PM – 6:00 PM', status: 'Afternoon Only' },
  ];

  return (
    <Card variant="elevated" padding="md" className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-neutral-100">
        <Calendar className="w-4 h-4 text-primary-500" />
        <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
          Weekly Working Hours & Location Policy
        </h3>
      </div>

      <div className="space-y-2 text-xs">
        {schedule.map((item) => (
          <div key={item.day} className="flex items-center justify-between py-1.5 border-b border-neutral-50 last:border-none">
            <span className="font-semibold text-neutral-800">{item.day}</span>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500 font-mono text-[11px]">{item.hours}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Campus Meeting Policy */}
      <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1.5 text-xs text-neutral-600">
        <div className="flex items-center gap-1.5 font-bold text-neutral-800">
          <MapPin className="w-3.5 h-3.5 text-primary-500" />
          <span>Where appointments happen:</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Provider accommodates clients at <strong className="text-neutral-900">{provider.serviceArea}</strong> or can come to your hostel common room upon booking approval. Exact room numbers are only revealed after confirmed appointment.
        </p>
      </div>
    </Card>
  );
}

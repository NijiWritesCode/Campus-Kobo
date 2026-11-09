import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import ServiceVariantCard from './ServiceVariantCard';
import { Scissors } from 'lucide-react';

export default function ServiceList({ services = [] }) {
  if (!services.length) {
    return (
      <EmptyState
        icon={<Scissors className="w-6 h-6" />}
        title="No services published yet"
        description="This provider is updating their service menu. Check back shortly."
      />
    );
  }

  return (
    <div className="space-y-6">
      {services.map((svc) => (
        <Card key={svc.id} variant="elevated" padding="md" className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-neutral-900 font-display">
                {svc.title}
              </h3>
              <p className="text-xs text-neutral-600 max-w-xl leading-relaxed">
                {svc.description}
              </p>
            </div>
            <span className="text-[11px] font-semibold text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full shrink-0">
              {svc.variants?.length || 0} variant{svc.variants?.length === 1 ? '' : 's'}
            </span>
          </div>

          {/* Variants List */}
          <div className="space-y-2.5">
            {svc.variants?.map((v) => (
              <ServiceVariantCard key={v.id} variant={v} />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

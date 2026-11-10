import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Power, Scissors } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import { useProviderServices } from '../hooks/useProviderServices';
import { formatCurrency } from '@/lib/formatCurrency';

export default function ServiceManagement() {
  const {
    services,
    deleteService,
    toggleServiceStatus,
  } = useProviderServices();

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteService(id);
      toast.success('Service deleted.');
    }
  };

  const handleToggle = (id) => {
    toggleServiceStatus(id);
    toast.success('Service availability status updated.');
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 font-display">
            Service Menu Management
          </h1>
          <p className="text-xs text-neutral-500">
            Publish, edit, and toggle services you provide across UNILAG hostels
          </p>
        </div>

        <Link to="/provider/services/new">
          <Button variant="primary" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
            Add New Service
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="py-12">
          <EmptyState
            icon={<Scissors className="w-8 h-8 text-neutral-400" />}
            title="No services published"
            description="Add your first campus service to start receiving bookings from students."
            action={
              <Link to="/provider/services/new">
                <Button variant="primary" size="sm">
                  Create Your First Service
                </Button>
              </Link>
            }
          />
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((svc) => (
            <Card
              key={svc.id}
              variant="default"
              padding="md"
              className={`border rounded-xl transition-all ${
                svc.isActive
                  ? 'bg-white border-neutral-200 shadow-2xs'
                  : 'bg-neutral-50 border-neutral-200/60 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                {/* Service Details */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-neutral-900 font-display truncate">
                      {svc.title}
                    </h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        svc.isActive
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-neutral-200 text-neutral-600 border-neutral-300'
                      }`}
                    >
                      {svc.isActive ? 'Active (Bookable)' : 'Paused (Hidden)'}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {svc.description}
                  </p>

                  {/* Variants Summary */}
                  <div className="pt-2 flex flex-wrap gap-2 text-xs">
                    {svc.variants?.map((v) => (
                      <span
                        key={v.id}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200 text-[11px]"
                      >
                        <span className="font-semibold text-neutral-900">{v.name}:</span>
                        <strong className="text-purple-900 font-display">{formatCurrency(v.priceKobo)}</strong>
                        <span className="text-neutral-400">({v.durationMinutes}m)</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Control Actions */}
                <div className="flex items-center gap-2 sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(svc.id)}
                    className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      svc.isActive
                        ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                        : 'border-emerald-300 bg-emerald-50 text-emerald-800'
                    }`}
                    title={svc.isActive ? 'Pause service' : 'Activate service'}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{svc.isActive ? 'Pause' : 'Activate'}</span>
                  </button>

                  <Link to={`/provider/services/${svc.id}/edit`}>
                    <Button variant="outline" size="sm" icon={<Edit2 className="w-3.5 h-3.5" />}>
                      Edit
                    </Button>
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(svc.id, svc.title)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                    title="Delete service"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

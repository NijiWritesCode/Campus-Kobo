import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import ServiceForm from '../components/ServiceForm';
import { useProviderServices } from '../hooks/useProviderServices';

export default function EditService() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { getService, updateService } = useProviderServices();

  const service = getService(serviceId);

  if (!service) {
    return (
      <div className="py-12">
        <EmptyState
          title="Service not found"
          description="We couldn't locate this service in your menu."
          action={
            <Link to="/provider/services">
              <Button variant="primary" size="sm">
                Back to Services
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handleUpdate = (updatedData) => {
    updateService(service.id, updatedData);
    toast.success('Service updated successfully!');
    navigate('/provider/services');
  };

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title={`Edit "${service.title}"`}
        subtitle="Update service variants, durations, and pricing"
        backTo="/provider/services"
      />

      <ServiceForm
        initialData={service}
        onSubmit={handleUpdate}
        onCancel={() => navigate('/provider/services')}
      />
    </div>
  );
}

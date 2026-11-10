import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import ServiceForm from '../components/ServiceForm';
import { useProviderServices } from '../hooks/useProviderServices';

export default function CreateService() {
  const navigate = useNavigate();
  const { addService } = useProviderServices();

  const handleCreate = (data) => {
    addService(data);
    toast.success('New service created and published to campus discovery!');
    navigate('/provider/services');
  };

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title="Add New Service"
        subtitle="List a new craft, pricing tiers, and prep guidelines"
        backTo="/provider/services"
      />

      <ServiceForm
        onSubmit={handleCreate}
        onCancel={() => navigate('/provider/services')}
      />
    </div>
  );
}

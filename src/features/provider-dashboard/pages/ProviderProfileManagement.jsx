import { useState } from 'react';
import { Trash2, Plus, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';

const INITIAL_PORTFOLIO = [
  { id: 'pf-1', url: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800', title: 'Small Waist-Length Knotless' },
  { id: 'pf-2', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800', title: 'Boho French Curls' },
  { id: 'pf-3', url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=800', title: 'Clean Parted Stitch Braids' },
  { id: 'pf-4', url: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800', title: 'Twist Locs Install' },
];

export default function ProviderProfileManagement() {
  const { user, updateUser } = useAuthStore();

  const [businessName, setBusinessName] = useState('Beauty by Ada');
  const [studentName, setStudentName] = useState(user?.name || 'Adaeze Okafor');
  const [serviceArea, setServiceArea] = useState('Moremi Hall & New Hall Axis');
  const [bio, setBio] = useState(
    'Computer Science student (Year 3) & certified braider with 4+ years craft. Known for ultra-neat, pain-free knotless braids and clean parted stitch lines. Hair prep included.'
  );
  const [portfolio, setPortfolio] = useState(INITIAL_PORTFOLIO);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    updateUser({ name: studentName });
    toast.success('Provider profile updated successfully!');
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    setPortfolio((prev) => [
      ...prev,
      {
        id: `pf-${Date.now()}`,
        url: newPhotoUrl.trim(),
        title: newPhotoTitle.trim() || 'Work Sample',
      },
    ]);
    setNewPhotoUrl('');
    setNewPhotoTitle('');
    toast.success('Photo added to your public portfolio.');
  };

  const handleRemovePhoto = (id) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
    toast.success('Photo removed.');
  };

  return (
    <div className="space-y-6 pb-16 max-w-2xl mx-auto">
      <PageHeader
        title="Provider Profile & Portfolio"
        subtitle="Manage what prospective student clients see on campus"
        backTo="/provider"
      />

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
          <h3 className="text-sm font-bold text-neutral-900 font-display">
            Business Details
          </h3>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Verified Student Provider</span>
          </span>
        </div>

        <div>
          <label htmlFor="biz-name" className="text-xs font-semibold text-neutral-700 block mb-1">
            Brand / Business Name
          </label>
          <input
            id="biz-name"
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="student-name" className="text-xs font-semibold text-neutral-700 block mb-1">
              Verified Student Name
            </label>
            <input
              id="student-name"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
              required
            />
          </div>

          <div>
            <label htmlFor="service-area" className="text-xs font-semibold text-neutral-700 block mb-1">
              Campus Operating Hostels
            </label>
            <input
              id="service-area"
              type="text"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              placeholder="e.g. Moremi Hall & New Hall Axis"
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="biz-bio" className="text-xs font-semibold text-neutral-700 block mb-1">
            Provider Bio & Qualifications
          </label>
          <textarea
            id="biz-bio"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
            required
          />
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" size="sm" type="submit">
            Save Profile
          </Button>
        </div>
      </form>

      {/* Portfolio Gallery Management */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-neutral-900 font-display">
            Portfolio Work Samples ({portfolio.length})
          </h3>
          <p className="text-xs text-neutral-500">
            Showcase your best braids, tapers, nails, or lashes to UNILAG students
          </p>
        </div>

        {/* Existing Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {portfolio.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100"
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(item.id)}
                  className="p-2 rounded-full bg-white text-rose-700 hover:bg-rose-50 transition-colors shadow-2xs"
                  title="Remove photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="absolute bottom-1 inset-x-1 text-[10px] text-white font-semibold truncate bg-neutral-950/60 px-1 rounded text-center">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {/* Add photo form */}
        <form onSubmit={handleAddPhoto} className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
          <span className="font-bold text-neutral-800 font-display block">
            Add New Photo to Portfolio
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="url"
              value={newPhotoUrl}
              onChange={(e) => setNewPhotoUrl(e.target.value)}
              placeholder="Photo URL (https://...)"
              className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs focus:outline-none focus:border-purple-800"
              required
            />
            <input
              type="text"
              value={newPhotoTitle}
              onChange={(e) => setNewPhotoTitle(e.target.value)}
              placeholder="Caption (e.g. Boho Curls)"
              className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white text-xs focus:outline-none focus:border-purple-800"
            />
          </div>
          <div className="flex justify-end pt-1">
            <Button variant="secondary" size="sm" type="submit" icon={<Plus className="w-3.5 h-3.5" />}>
              Add Photo
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

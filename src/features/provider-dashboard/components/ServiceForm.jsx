import { useState } from 'react';
import Button from '@/components/ui/Button';
import VariantForm from './VariantForm';
import { INITIAL_SERVICE_CATEGORIES } from '@/lib/constants';

const SAMPLE_PHOTO_PRESETS = [
  { label: 'Knotless Braids', url: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?auto=format&fit=crop&q=80&w=800' },
  { label: 'French Curls', url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800' },
  { label: 'Fade Cut', url: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800' },
  { label: 'Gel Acrylics', url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=800' },
  { label: 'Lash Extension', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800' },
];

export default function ServiceForm({
  initialData = null,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || 'hairstyling');
  const [description, setDescription] = useState(initialData?.description || '');
  const [photoUrl, setPhotoUrl] = useState(
    initialData?.photos?.[0] || SAMPLE_PHOTO_PRESETS[0].url
  );

  const [variants, setVariants] = useState(
    initialData?.variants?.length > 0
      ? initialData.variants.map((v) => ({
          ...v,
          priceNaira: String(v.priceKobo / 100),
        }))
      : [
          {
            id: 'temp-1',
            name: 'Standard Option',
            priceKobo: 500000,
            priceNaira: '5000',
            durationMinutes: 60,
            description: '',
          },
        ]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title: title.trim(),
      categoryId,
      description: description.trim(),
      photos: [photoUrl],
      variants: variants.map((v) => ({
        ...v,
        priceKobo: Number(v.priceKobo) || Math.round(Number(v.priceNaira) * 100),
      })),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-neutral-900 font-display">
          Service Information
        </h3>

        {/* Title */}
        <div>
          <label htmlFor="service-title" className="text-xs font-semibold text-neutral-700 block mb-1">
            Service Title
          </label>
          <input
            id="service-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Knotless Braids, Low Taper Fade, Gel Acrylics"
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="service-category" className="text-xs font-semibold text-neutral-700 block mb-1">
            Category
          </label>
          <select
            id="service-category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
          >
            {INITIAL_SERVICE_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="service-desc" className="text-xs font-semibold text-neutral-700 block mb-1">
            Description & Prep Instructions
          </label>
          <textarea
            id="service-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your craft, hair wash requirements, extensions, equipment..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
            required
          />
        </div>

        {/* Cover Photo */}
        <div className="space-y-1.5">
          <label htmlFor="photo-url" className="text-xs font-semibold text-neutral-700 block">
            Cover Photo URL
          </label>
          <input
            id="photo-url"
            type="url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="https://..."
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
          />

          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
            <span className="text-neutral-400 font-medium">Quick Presets:</span>
            {SAMPLE_PHOTO_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPhotoUrl(p.url)}
                className="px-2 py-0.5 rounded-md bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Variants Builder */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
        <VariantForm variants={variants} onChangeVariants={setVariants} />
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="ghost" size="md" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : initialData ? 'Update Service' : 'Publish Service'}
        </Button>
      </div>
    </form>
  );
}

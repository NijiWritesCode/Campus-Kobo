import { Trash2, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function VariantForm({ variants = [], onChangeVariants }) {
  const handleAdd = () => {
    const newVariant = {
      id: `temp-${Date.now()}`,
      name: '',
      priceKobo: 500000, // ₦5,000 default
      priceNaira: '5000',
      durationMinutes: 60,
      description: '',
    };
    onChangeVariants([...variants, newVariant]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = variants.map((v, i) => {
      if (i !== index) return v;
      if (field === 'priceNaira') {
        const nairaVal = Number(value) || 0;
        return {
          ...v,
          priceNaira: value,
          priceKobo: Math.round(nairaVal * 100),
        };
      }
      return { ...v, [field]: value };
    });
    onChangeVariants(updated);
  };

  const handleRemove = (index) => {
    if (variants.length <= 1) return;
    onChangeVariants(variants.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-neutral-800 font-display">
            Service Variants & Rates (At least 1 required)
          </h4>
          <p className="text-[11px] text-neutral-500">
            Define different sizes, lengths, or styling options
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAdd}
          icon={<Plus className="w-3.5 h-3.5" />}
        >
          Add Variant
        </Button>
      </div>

      <div className="space-y-3">
        {variants.map((v, idx) => (
          <div
            key={v.id || idx}
            className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider font-display">
                Variant #{idx + 1}
              </span>
              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1 rounded text-neutral-400 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                  title="Remove variant"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Variant Name
                </label>
                <input
                  type="text"
                  value={v.name}
                  onChange={(e) => handleUpdate(idx, 'name', e.target.value)}
                  placeholder="e.g. Medium (Mid-Back Length) or Low Taper Fade"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Price (₦)
                </label>
                <input
                  type="number"
                  min="500"
                  step="100"
                  value={v.priceNaira !== undefined ? v.priceNaira : v.priceKobo / 100}
                  onChange={(e) => handleUpdate(idx, 'priceNaira', e.target.value)}
                  placeholder="5000"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs font-bold text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Duration (Minutes)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="15"
                    step="15"
                    value={v.durationMinutes}
                    onChange={(e) => handleUpdate(idx, 'durationMinutes', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
                    required
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-neutral-400 font-semibold">
                    mins
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
                  Description / Inclusions (Optional)
                </label>
                <input
                  type="text"
                  value={v.description}
                  onChange={(e) => handleUpdate(idx, 'description', e.target.value)}
                  placeholder="e.g. Wash & prep included, extensions provided"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

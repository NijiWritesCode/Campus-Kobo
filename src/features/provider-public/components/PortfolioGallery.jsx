import { useState } from 'react';
import { ZoomIn, Image as ImageIcon } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import EmptyState from '@/components/ui/EmptyState';

export default function PortfolioGallery({ photos = [] }) {
  const [activePhoto, setActivePhoto] = useState(null);

  if (!photos.length) {
    return (
      <EmptyState
        icon={<ImageIcon className="w-6 h-6" />}
        title="No portfolio photos yet"
        description="This student provider hasn't uploaded previous work snapshots yet."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActivePhoto(photo)}
            className="group relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer text-left"
          >
            <img
              src={photo.url}
              alt={photo.title || 'Portfolio work snapshot'}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/40 transition-colors flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            {photo.title && (
              <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-neutral-950/80 to-transparent text-[11px] font-semibold text-white truncate">
                {photo.title}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Accessible Lightbox Modal */}
      <Modal
        isOpen={Boolean(activePhoto)}
        onClose={() => setActivePhoto(null)}
        title={activePhoto?.title || 'Portfolio Snapshot'}
        size="lg"
      >
        {activePhoto && (
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200 max-h-[65vh] flex items-center justify-center">
              <img
                src={activePhoto.url}
                alt={activePhoto.title || 'Expanded work snapshot'}
                className="w-full h-auto max-h-[65vh] object-contain"
              />
            </div>
            {activePhoto.title && (
              <p className="text-xs text-neutral-600 text-center font-medium">
                {activePhoto.title}
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

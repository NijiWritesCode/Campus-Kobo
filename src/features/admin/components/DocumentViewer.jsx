import { useState } from 'react';
import { ExternalLink, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function DocumentViewer({
  isOpen,
  onClose,
  title = 'Student Credential Document',
  imageUrl,
  documentType,
  studentName,
  matricNumber,
}) {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom((z) => Math.min(2.5, z + 0.25));
  const handleZoomOut = () => setZoom((z) => Math.max(0.75, z - 0.25));
  const handleRotate = () => setRotation((r) => (r + 90) % 360);

  const resetTransform = () => {
    setZoom(1);
    setRotation(0);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        resetTransform();
        onClose();
      }}
      title={title}
      size="lg"
    >
      <div className="space-y-4">
        {/* Document Metadata Bar */}
        <div className="p-3 rounded-xl bg-neutral-100 border border-neutral-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div>
            <span className="text-neutral-500 font-medium">Student: </span>
            <strong className="text-neutral-900 font-display">{studentName}</strong>
            <span className="text-neutral-400 mx-1.5">•</span>
            <span className="text-neutral-500 font-medium">Matric: </span>
            <strong className="font-mono text-purple-900">{matricNumber}</strong>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-neutral-200 text-neutral-800">
            {documentType?.replace('_', ' ') || 'ID DOCUMENT'}
          </span>
        </div>

        {/* Interactive Viewer Toolbar */}
        <div className="flex items-center justify-between bg-neutral-900 text-white px-3 py-1.5 rounded-lg text-xs">
          <span className="text-[11px] text-neutral-400">
            Zoom: {Math.round(zoom * 100)}% • Rotation: {rotation}°
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleRotate}
              className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
              title="Rotate"
            >
              <RotateCw className="w-4 h-4" />
            </button>
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
              title="Open full resolution in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Viewport */}
        <div className="h-96 rounded-xl bg-neutral-950 flex items-center justify-center overflow-hidden border border-neutral-800 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Student Document"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing"
            />
          ) : (
            <span className="text-neutral-500 text-xs">No image preview available</span>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close Viewer
          </Button>
        </div>
      </div>
    </Modal>
  );
}

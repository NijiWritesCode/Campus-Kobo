import { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Accessible Modal using the native <dialog> element.
 * Complies with modern web guidance:
 * - Native showModal() for top-layer rendering, backdrop, and Esc handling
 * - closedby="any" with coordinate-based light dismiss fallback
 * - aria-labelledby pointing to dialog heading
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  description = null,
  children,
  size = 'md',
  showCloseButton = true,
  className = '',
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  // Handle native cancel (Esc key) and close events
  const handleCancel = (e) => {
    e.preventDefault();
    onClose?.();
  };

  // Light dismiss fallback for browsers lacking closedby support
  const handlePointerDown = (e) => {
    const dialog = dialogRef.current;
    if (!dialog || e.target !== dialog) return;

    const rect = dialog.getBoundingClientRect();
    const isInside =
      rect.top <= e.clientY &&
      e.clientY <= rect.bottom &&
      rect.left <= e.clientX &&
      e.clientX <= rect.right;

    if (!isInside) {
      onClose?.();
    }
  };

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-3xl',
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handlePointerDown}
      {...{ closedby: 'any' }}
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descId : undefined}
      className={cn(
        'w-full m-auto rounded-2xl bg-white p-0 shadow-2xl border border-neutral-200/80',
        'backdrop:bg-neutral-950/50 backdrop:backdrop-blur-xs',
        sizes[size] || sizes.md,
        className
      )}
    >
      <div className="p-6">
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-neutral-100">
            <div>
              {title && (
                <h3 id={titleId} className="text-lg font-bold text-neutral-900 font-display">
                  {title}
                </h3>
              )}
              {description && (
                <p id={descId} className="mt-1 text-xs text-neutral-500">
                  {description}
                </p>
              )}
            </div>
            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        <div className="mt-4">{children}</div>
      </div>
    </dialog>
  );
}

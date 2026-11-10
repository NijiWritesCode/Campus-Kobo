import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import toast from 'react-hot-toast';

const CANCEL_REASONS = [
  'Exam / test / lecture timetable clash',
  'Provider requested to reschedule or cannot make it',
  'Emergency or ill',
  'Booked incorrect date or service variant',
  'Other personal reason',
];

export default function CancelBookingModal({
  isOpen,
  onClose,
  booking,
  onConfirmCancel,
}) {
  const [reason, setReason] = useState(CANCEL_REASONS[0]);
  const [otherText, setOtherText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const handleCancel = () => {
    setIsSubmitting(true);
    const finalReason = reason === 'Other personal reason' ? otherText || 'Other reason' : reason;

    setTimeout(() => {
      onConfirmCancel(booking.id, finalReason);
      setIsSubmitting(false);
      toast.success('Booking cancelled.');
      onClose();
    }, 500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Booking Request" size="md">
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-900">
          <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block">Are you sure you want to cancel?</span>
            <p className="text-rose-800 text-[11px]">
              {booking.isEscrowFunded
                ? 'Your payment is currently held in escrow and will be refunded in accordance with Campus Kobo student cancellation policies.'
                : 'This will notify the provider and release their booked slot.'}
            </p>
          </div>
        </div>

        {/* Reason Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-800 block">
            Reason for cancellation
          </label>
          <div className="space-y-1.5">
            {CANCEL_REASONS.map((r) => (
              <label
                key={r}
                className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs text-neutral-800 cursor-pointer"
              >
                <input
                  type="radio"
                  name="cancelReason"
                  value={r}
                  checked={reason === r}
                  onChange={() => setReason(r)}
                  className="accent-purple-700"
                />
                <span>{r}</span>
              </label>
            ))}
          </div>

          {reason === 'Other personal reason' && (
            <input
              type="text"
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
              placeholder="Please provide details..."
              className="w-full mt-2 p-2.5 text-xs rounded-lg border border-neutral-300 focus:outline-none focus:border-rose-500"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            Keep Booking
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cancelling...' : 'Confirm Cancellation'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

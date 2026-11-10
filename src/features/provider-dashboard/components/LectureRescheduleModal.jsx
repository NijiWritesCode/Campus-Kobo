import { useState } from 'react';
import { School, Check } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

export default function LectureRescheduleModal({
  isOpen,
  onClose,
  booking,
  onProposeSlot,
}) {
  const [selectedProposal, setSelectedProposal] = useState('Today at 04:30 PM (Evening Gap)');
  const [clashReason, setClashReason] = useState('Lecturer shifted CSC 301 to 2:00 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const alternateSlots = [
    { label: 'Today at 04:30 PM', tag: '🌙 Evening Gap (After Classes)', time: '04:30 PM', date: booking.date },
    { label: 'Tomorrow at 10:00 AM', tag: '🌅 Morning Free Window', time: '10:00 AM', date: 'Tomorrow' },
    { label: 'Tomorrow at 03:30 PM', tag: '☕ Post-Tutorial Window', time: '03:30 PM', date: 'Tomorrow' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onProposeSlot(booking.id, {
        reason: clashReason,
        proposedSlot: selectedProposal,
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Lecture Shift / Propose Free Slot"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Context Banner */}
        <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold font-display text-purple-950">
            <School className="w-4 h-4 text-purple-700 shrink-0" />
            <span>Class Timetable Conflict</span>
          </div>
          <p className="text-[11px] text-purple-800 leading-relaxed">
            If a lecturer shifted class or called an impromptu tutorial, propose an alternative slot from your verified free windows without canceling the booking or escrow payment.
          </p>
        </div>

        {/* Reason for clash */}
        <div className="space-y-1">
          <label htmlFor="clash-reason" className="text-xs font-semibold text-neutral-800 block">
            Academic Conflict Reason
          </label>
          <input
            id="clash-reason"
            type="text"
            value={clashReason}
            onChange={(e) => setClashReason(e.target.value)}
            placeholder="e.g. Lecturer shifted CSC 301 to 2:00 PM"
            className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-purple-800 shadow-2xs"
            required
          />
        </div>

        {/* Proposed Alternate Free Windows */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-800 block">
            Choose Available Free Window to Propose
          </label>
          <div className="space-y-2">
            {alternateSlots.map((slot) => {
              const isSelected = selectedProposal === `${slot.label} (${slot.tag})`;
              return (
                <button
                  key={slot.label}
                  type="button"
                  onClick={() => setSelectedProposal(`${slot.label} (${slot.tag})`)}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-purple-50 border-purple-800 text-purple-950 font-bold shadow-2xs'
                      : 'bg-white border-neutral-200 text-neutral-800 hover:bg-neutral-50'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold font-display block">
                      {slot.label}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-normal">
                      {slot.tag}
                    </span>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-purple-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-100">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
            {isSubmitting ? 'Sending Proposal...' : 'Send Reschedule Proposal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

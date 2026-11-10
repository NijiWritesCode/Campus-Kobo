import { useState } from 'react';
import { Star } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import toast from 'react-hot-toast';
import { cn } from '@/lib/cn';

const COMPLIMENT_TAGS = [
  'Super Fast',
  'Gentle on Scalp',
  'Sharp Lineup',
  'Neat Partings',
  'Zero Pain',
  'Respectful',
  '100% On-Time',
  'Great Vibe',
];

export default function ReviewModal({ isOpen, onClose, booking, onSubmitReview }) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error('Please choose a star rating');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmitReview(booking.id, {
        rating,
        comment: comment.trim(),
        tags: selectedTags,
      });
      setIsSubmitting(false);
      toast.success('Thank you for rating your peer!');
      onClose();
    }, 600);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Review Student Service" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Provider Brief */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200">
          <Avatar size="md" src={booking.providerAvatar} name={booking.providerName} />
          <div className="min-w-0">
            <h4 className="text-xs font-bold text-neutral-900 font-display">
              {booking.businessName}
            </h4>
            <p className="text-[11px] text-neutral-500">
              {booking.serviceTitle} • {booking.variantName}
            </p>
          </div>
        </div>

        {/* 5-Star Picker */}
        <div className="text-center space-y-1.5 py-1">
          <span className="text-xs font-semibold text-neutral-600 block">
            How was your experience?
          </span>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => {
              const active = (hoverRating || rating) >= star;
              return (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                  aria-label={`${star} star`}
                >
                  <Star
                    className={cn(
                      'w-7 h-7 transition-colors',
                      active
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300'
                    )}
                  />
                </button>
              );
            })}
          </div>
          <span className="text-[11px] font-bold text-neutral-700 block">
            {rating === 5 && 'Outstanding ⭐⭐⭐⭐⭐'}
            {rating === 4 && 'Very Good ⭐⭐⭐⭐'}
            {rating === 3 && 'Average ⭐⭐⭐'}
            {rating === 2 && 'Below Expectation ⭐⭐'}
            {rating === 1 && 'Unsatisfactory ⭐'}
          </span>
        </div>

        {/* Compliment Tags */}
        <div className="space-y-1.5">
          <span className="text-xs font-semibold text-neutral-700 block">
            What went well? (Optional)
          </span>
          <div className="flex flex-wrap gap-1.5">
            {COMPLIMENT_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors focus:outline-none',
                    isSelected
                      ? 'bg-purple-800 text-white border-purple-800 shadow-2xs'
                      : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300'
                  )}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div className="space-y-1.5">
          <label htmlFor="review-comment" className="text-xs font-semibold text-neutral-700 block">
            Detailed Comment
          </label>
          <textarea
            id="review-comment"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share details about punctuality, skill, atmosphere, and longevity..."
            className="w-full p-3 text-xs rounded-xl border border-neutral-300 bg-white placeholder:text-neutral-400 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button variant="primary" size="md" fullWidth type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Post Verified Review'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

/**
 * Campus Skills Marketplace (Campus Kobo) Constants
 * Aligned with the MVP Product & Technical Blueprint.
 */

export const BOOKING_STATUSES = {
  REQUESTED: 'REQUESTED',
  ACCEPTED: 'ACCEPTED',
  DECLINED: 'DECLINED',
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  CONFIRMED: 'CONFIRMED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  EXPIRED: 'EXPIRED',
  DISPUTED: 'DISPUTED',
};

export const BOOKING_STATUS_CONFIG = {
  REQUESTED: {
    label: 'Awaiting Provider',
    description: 'Booking request sent to provider',
    variant: 'warning',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  ACCEPTED: {
    label: 'Accepted — Pay Now',
    description: 'Provider accepted; client payment required',
    variant: 'info',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  DECLINED: {
    label: 'Declined',
    description: 'Provider could not take this request',
    variant: 'error',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
  AWAITING_PAYMENT: {
    label: 'Payment Pending',
    description: 'Waiting for payment confirmation',
    variant: 'warning',
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  CONFIRMED: {
    label: 'Confirmed',
    description: 'Payment verified; appointment booked',
    variant: 'success',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  IN_PROGRESS: {
    label: 'In Progress',
    description: 'Service delivery is ongoing',
    variant: 'info',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
  },
  COMPLETED: {
    label: 'Completed',
    description: 'PIN verified and service delivered',
    variant: 'success',
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
  CANCELLED: {
    label: 'Cancelled',
    description: 'Booking was cancelled',
    variant: 'neutral',
    bg: 'bg-neutral-100',
    text: 'text-neutral-600',
    border: 'border-neutral-200',
  },
  EXPIRED: {
    label: 'Expired',
    description: 'Request or payment window expired',
    variant: 'neutral',
    bg: 'bg-neutral-100',
    text: 'text-neutral-600',
    border: 'border-neutral-200',
  },
  DISPUTED: {
    label: 'Under Dispute',
    description: 'Dispute opened; under admin review',
    variant: 'error',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
  },
};

export const PAYMENT_STATUSES = {
  INITIALIZED: 'INITIALIZED',
  PENDING: 'PENDING',
  SUCCESSFUL: 'SUCCESSFUL',
  FAILED: 'FAILED',
  REFUND_PENDING: 'REFUND_PENDING',
  REFUNDED: 'REFUNDED',
  SETTLED: 'SETTLED',
  CHARGEBACK: 'CHARGEBACK',
};

export const PAYOUT_STATUSES = {
  NOT_ELIGIBLE: 'NOT_ELIGIBLE',
  ELIGIBLE: 'ELIGIBLE',
  REQUESTED: 'REQUESTED',
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  FAILED: 'FAILED',
  RETURNED: 'RETURNED',
};

export const USER_ROLES = {
  CLIENT: 'CLIENT',
  PROVIDER: 'PROVIDER',
  ADMIN: 'ADMIN',
};

export const VERIFICATION_STATUSES = {
  UNVERIFIED: 'UNVERIFIED',
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
};

export const INITIAL_SERVICE_CATEGORIES = [
  { id: 'hairstyling', name: 'Hairstyling', slug: 'hairstyling', icon: 'Sparkles', description: 'Braids, locs, weaves, wigs & styling' },
  { id: 'nails', name: 'Nails', slug: 'nails', icon: 'Hand', description: 'Acrylics, gel polish, press-ons & manicure' },
  { id: 'lashes-brows', name: 'Lashes & Brows', slug: 'lashes-brows', icon: 'Eye', description: 'Extensions, tinting, lamination & threading' },
  { id: 'makeup', name: 'Makeup', slug: 'makeup', icon: 'Palette', description: 'Glam, soft glams, photo shoots & event looks' },
  { id: 'barbering', name: 'Barbering', slug: 'barbering', icon: 'Scissors', description: 'Fades, tapers, beard grooming & lineup' },
  { id: 'skincare', name: 'Skincare & Massage', slug: 'skincare', icon: 'Heart', description: 'Facials, gentle waxing & relaxation' },
];

export const PLATFORM_COMMISSION_PERCENT = 10; // 10% illustrative commission

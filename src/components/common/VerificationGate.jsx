import { Link } from 'react-router-dom';
import { ShieldAlert, Clock, XCircle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { VERIFICATION_STATUSES } from '@/lib/constants';

/**
 * Notice banner or blocking card alerting students to complete verification.
 */
export default function VerificationGate({ children = null, blocking = false }) {
  const { user } = useAuthStore();
  const status = user?.verificationStatus || VERIFICATION_STATUSES.UNVERIFIED;

  if (status === VERIFICATION_STATUSES.APPROVED) {
    return children;
  }

  const configs = {
    UNVERIFIED: {
      icon: <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />,
      bg: 'bg-amber-50 border-amber-200',
      title: 'Student Verification Required',
      message: 'To protect students and enable bookings, verify your university enrollment.',
      actionText: 'Get Verified',
      to: '/app/verification',
    },
    PENDING: {
      icon: <Clock className="w-5 h-5 text-blue-600 shrink-0" />,
      bg: 'bg-blue-50 border-blue-200',
      title: 'Verification In Review',
      message: 'Your student proof is being reviewed by campus admins (usually within 12h).',
      actionText: 'Check Status',
      to: '/app/verification',
    },
    REJECTED: {
      icon: <XCircle className="w-5 h-5 text-red-600 shrink-0" />,
      bg: 'bg-red-50 border-red-200',
      title: 'Verification Rejected',
      message: user?.rejectionReason || 'Your document could not be validated. Please resubmit your proof.',
      actionText: 'Resubmit Evidence',
      to: '/app/verification',
    },
  };

  const config = configs[status] || configs.UNVERIFIED;

  if (blocking) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-3xl border border-neutral-200 shadow-sm text-center space-y-4 my-8">
        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-neutral-900 font-display">{config.title}</h2>
          <p className="text-xs text-neutral-600 leading-relaxed">{config.message}</p>
        </div>
        <Link
          to={config.to}
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm transition-all"
        >
          <span>{config.actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <aside aria-label="Verification status" className={`p-4 rounded-2xl border ${config.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs mb-4`}>
      <div className="flex items-start gap-3">
        {config.icon}
        <div>
          <h3 className="text-xs font-bold text-neutral-900">{config.title}</h3>
          <p className="text-xs text-neutral-600 mt-0.5">{config.message}</p>
        </div>
      </div>
      <Link
        to={config.to}
        className="text-xs font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 shrink-0 bg-white/80 px-3 py-1.5 rounded-lg border border-neutral-200/60 shadow-2xs"
      >
        <span>{config.actionText}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </aside>
  );
}

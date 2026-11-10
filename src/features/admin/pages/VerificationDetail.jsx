import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  XCircle,
  Eye,
  Mail,
  Phone,
  GraduationCap,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import EmptyState from '@/components/ui/EmptyState';
import DocumentViewer from '../components/DocumentViewer';
import { useVerifications } from '../hooks/useVerifications';

export default function VerificationDetail() {
  const { id } = useParams();
  const { getVerification, approveVerification, rejectVerification } = useVerifications();

  const [viewerUrl, setViewerUrl] = useState(null);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const item = getVerification(id);

  if (!item) {
    return (
      <div className="py-12">
        <EmptyState
          title="Verification record not found"
          description="We couldn't locate this student verification submission."
          action={
            <Link to="/admin/verifications">
              <Button variant="primary" size="sm">
                Return to Queue
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const handleApprove = () => {
    approveVerification(item.id);
  };

  const handleReject = (e) => {
    e.preventDefault();
    if (!rejectionReason.trim()) return;
    rejectVerification(item.id, rejectionReason.trim());
    setRejectModalOpen(false);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <PageHeader
        title={`Verification #${item.matricNumber}`}
        subtitle={`${item.studentName} • ${item.faculty}`}
        backTo="/admin/verifications"
      />

      {/* Action Header Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-display">
            Current Status
          </span>
          <div className="pt-1 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border ${
                item.status === 'APPROVED'
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : item.status === 'PENDING'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {item.status === 'APPROVED' && <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />}
              <span>{item.status}</span>
            </span>
            <span className="text-xs text-neutral-500">
              Submitted: {new Date(item.submittedAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {item.status === 'PENDING' && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="md"
              onClick={() => setRejectModalOpen(true)}
              className="text-rose-700 border-rose-300 hover:bg-rose-50"
              icon={<XCircle className="w-4 h-4 text-rose-600" />}
            >
              Reject Submission
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleApprove}
              icon={<CheckCircle2 className="w-4 h-4 text-white" />}
            >
              Approve & Grant Provider Status
            </Button>
          </div>
        )}

        {item.status === 'APPROVED' && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Verified Student Provider on UNILAG Campus</span>
          </div>
        )}
      </div>

      {/* Grid: Student Info & Document Preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student Profile Card */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
            Student Academic Profile
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500">Full Name</span>
              <strong className="text-neutral-900 font-display">{item.studentName}</strong>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500">Matriculation Number</span>
              <strong className="font-mono text-purple-900 text-sm bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                {item.matricNumber}
              </strong>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500">Academic Level</span>
              <strong className="text-neutral-900">{item.level}</strong>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                <span>Faculty & Dept</span>
              </span>
              <span className="text-neutral-900 font-semibold text-right">
                {item.department}, {item.faculty}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>University Email</span>
              </span>
              <span className="font-mono text-neutral-900">{item.email}</span>
            </div>

            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>WhatsApp / Phone</span>
              </span>
              <span className="font-mono text-neutral-900">{item.phone}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-500 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-purple-700" />
                <span>Intended Service Craft</span>
              </span>
              <span className="font-bold text-purple-900">{item.intendedCategory || 'General'}</span>
            </div>
          </div>

          {item.notes && (
            <div className="pt-2 border-t border-neutral-100 space-y-1">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Verification Notes / Audit Log:
              </span>
              <p className="text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200 italic">
                "{item.notes}"
              </p>
            </div>
          )}
        </div>

        {/* Uploaded Documents Showcase */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-display">
              Submitted Document Evidence
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
              {item.documentType}
            </span>
          </div>

          <div className="space-y-3">
            {/* Front Document */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-800">Front Document / ID Slip</span>
                <button
                  type="button"
                  onClick={() => setViewerUrl(item.documentUrl)}
                  className="text-purple-700 hover:text-purple-800 font-bold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Screen</span>
                </button>
              </div>

              <div
                role="button"
                tabIndex={0}
                onClick={() => setViewerUrl(item.documentUrl)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setViewerUrl(item.documentUrl);
                }}
                className="h-48 rounded-xl bg-neutral-900 overflow-hidden relative cursor-pointer group border border-neutral-200"
              >
                <img
                  src={item.documentUrl}
                  alt="Front Document"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>Click to zoom & inspect</span>
                </div>
              </div>
            </div>

            {/* Back Document (if present) */}
            {item.documentBackUrl && (
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-800">Back of ID Card</span>
                  <button
                    type="button"
                    onClick={() => setViewerUrl(item.documentBackUrl)}
                    className="text-purple-700 hover:text-purple-800 font-bold flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Full Screen</span>
                  </button>
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setViewerUrl(item.documentBackUrl)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setViewerUrl(item.documentBackUrl);
                  }}
                  className="h-40 rounded-xl bg-neutral-900 overflow-hidden relative cursor-pointer group border border-neutral-200"
                >
                  <img
                    src={item.documentBackUrl}
                    alt="Back Document"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-neutral-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5">
                    <Eye className="w-4 h-4" />
                    <span>Click to zoom</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Zoom Modal */}
      {viewerUrl && (
        <DocumentViewer
          isOpen={Boolean(viewerUrl)}
          onClose={() => setViewerUrl(null)}
          title={`Document Evidence: ${item.studentName}`}
          imageUrl={viewerUrl}
          documentType={item.documentType}
          studentName={item.studentName}
          matricNumber={item.matricNumber}
        />
      )}

      {/* Rejection Modal */}
      {rejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-5 space-y-4 shadow-xl border border-neutral-200">
            <h3 className="text-base font-bold font-display text-neutral-900">
              Reject Student Verification
            </h3>
            <p className="text-xs text-neutral-500">
              Provide an official reason for rejection. An email and WhatsApp notification will be sent to {item.studentName}.
            </p>
            <form onSubmit={handleReject} className="space-y-4">
              <textarea
                rows={3}
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Document image is blurry or expired session sticker. Please re-upload with clear daylight photo."
                className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-rose-600 shadow-2xs"
                required
              />
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  className="bg-rose-700 hover:bg-rose-800 text-white"
                >
                  Confirm Rejection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Scale,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  Image as ImageIcon,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Button from '@/components/ui/Button';
import Avatar from '@/components/ui/Avatar';
import EmptyState from '@/components/ui/EmptyState';
import DisputeResolutionModal from '../components/DisputeResolutionModal';
import { useDisputes } from '../hooks/useDisputes';
import { formatCurrency } from '@/lib/formatCurrency';

export default function DisputeDetail() {
  const { id } = useParams();
  const { getDispute, resolveDispute } = useDisputes();
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);

  const dispute = getDispute(id);

  if (!dispute) {
    return (
      <div className="py-12">
        <EmptyState
          title="Dispute record not found"
          description="We couldn't locate this arbitration case."
          action={
            <Link to="/admin/disputes">
              <Button variant="primary" size="sm">
                Return to Disputes
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isResolved = dispute.status === 'RESOLVED';

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      <PageHeader
        title={`Dispute Case #${dispute.bookingReference}`}
        subtitle={`${dispute.serviceTitle} • Locked Escrow: ${formatCurrency(dispute.amountKobo)}`}
        backTo="/admin/disputes"
      />

      {/* Status & Verdict CTA Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block font-display">
            Arbitration Status
          </span>
          <div className="pt-1 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg border ${
                isResolved
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border-rose-200'
              }`}
            >
              {isResolved ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-700" />
              )}
              <span>{isResolved ? 'RESOLVED & SETTLED' : 'OPEN FOR ARBITRATION'}</span>
            </span>

            <span className="text-xs text-neutral-500 font-mono">
              Priority: {dispute.priority}
            </span>
          </div>
        </div>

        {!isResolved ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setResolutionModalOpen(true)}
            icon={<Scale className="w-4 h-4 text-white" />}
          >
            Enter Arbitration Verdict
          </Button>
        ) : (
          <div className="text-right">
            <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider block">
              Enforced Verdict
            </span>
            <span className="text-xs font-bold text-emerald-800">
              {dispute.resolution?.replace(/_/g, ' ')}
            </span>
          </div>
        )}
      </div>

      {/* Two Column Grid: Client Claim vs Provider Defense */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client Side */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <Avatar size="md" src={dispute.clientAvatar} name={dispute.clientName} />
              <div>
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                  Client Claim
                </span>
                <strong className="text-sm font-bold text-neutral-900 font-display">
                  {dispute.clientName}
                </strong>
              </div>
            </div>
            <span className="text-xs font-mono text-neutral-500">{dispute.clientPhone}</span>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
              <span>Client's Stated Reason</span>
            </span>
            <p className="text-xs text-neutral-700 bg-neutral-50 p-3 rounded-xl border border-neutral-200 leading-relaxed italic">
              "{dispute.clientStatement}"
            </p>
          </div>

          {dispute.evidencePhotos?.length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
                <ImageIcon className="w-3.5 h-3.5 text-neutral-500" />
                <span>Uploaded Photo Evidence ({dispute.evidencePhotos.length})</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                {dispute.evidencePhotos.map((img, i) => (
                  <a
                    key={i}
                    href={img}
                    target="_blank"
                    rel="noreferrer"
                    className="h-28 rounded-xl overflow-hidden border border-neutral-200 block group"
                  >
                    <img
                      src={img}
                      alt="Dispute evidence"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Provider Side */}
        <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">
                Provider Defense
              </span>
              <strong className="text-sm font-bold text-purple-950 font-display">
                {dispute.providerBusinessName}
              </strong>
              <span className="text-xs text-neutral-500 block">Student: {dispute.providerName}</span>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-neutral-800 flex items-center gap-1.5 font-display">
              <MessageSquare className="w-3.5 h-3.5 text-neutral-500" />
              <span>Provider's Explanation</span>
            </span>
            <p className="text-xs text-neutral-700 bg-purple-50/50 p-3 rounded-xl border border-purple-200 leading-relaxed italic">
              "{dispute.providerStatement || 'No written response submitted yet.'}"
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Service:</span>
              <strong className="text-neutral-900 font-display">{dispute.serviceTitle}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Tier / Scope:</span>
              <span className="text-neutral-700">{dispute.variantName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Location:</span>
              <span className="text-neutral-700">{dispute.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Official Settlement Record (if resolved) */}
      {isResolved && (
        <div className="p-5 rounded-2xl bg-neutral-950 text-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h4 className="text-sm font-bold font-display text-white">
                Official Settlement & Audit Findings
              </h4>
            </div>
            <span className="text-[10px] font-mono text-neutral-400">
              Resolved: {new Date(dispute.resolvedAt).toLocaleString()}
            </span>
          </div>

          <div className="text-xs text-neutral-300 bg-neutral-900 p-3 rounded-xl border border-neutral-800 space-y-1">
            <strong className="text-emerald-400 block font-display">
              Arbitrator's Ruling: {dispute.resolution?.replace(/_/g, ' ')}
            </strong>
            <p className="italic text-neutral-400">"{dispute.arbitratorNotes}"</p>
          </div>
        </div>
      )}

      {/* Resolution Modal */}
      <DisputeResolutionModal
        isOpen={resolutionModalOpen}
        onClose={() => setResolutionModalOpen(false)}
        dispute={dispute}
        onResolve={resolveDispute}
      />
    </div>
  );
}

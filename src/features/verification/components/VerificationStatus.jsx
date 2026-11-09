import { CheckCircle2, Clock, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { VERIFICATION_STATUSES } from '@/lib/constants';

export default function VerificationStatus({ status, user, onResubmit }) {
  if (status === VERIFICATION_STATUSES.APPROVED) {
    return (
      <Card variant="elevated" padding="lg" className="text-center space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <Badge variant="success" size="md">
            Verified Student Status Active
          </Badge>
          <h2 className="text-xl font-bold text-neutral-900 font-display">
            You are officially verified!
          </h2>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
            Your university student identity has been approved. You now have full access to discover, book, and publish student services on campus.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
          <Link to="/app">
            <Button variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Start Exploring Services
            </Button>
          </Link>
          {user?.roles?.includes('PROVIDER') ? (
            <Link to="/provider">
              <Button variant="outline" size="md">
                Go to Provider Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/provider/services/new">
              <Button variant="outline" size="md">
                Offer a Skill / Service
              </Button>
            </Link>
          )}
        </div>
      </Card>
    );
  }

  if (status === VERIFICATION_STATUSES.PENDING) {
    return (
      <Card variant="elevated" padding="lg" className="text-center space-y-4 max-w-lg mx-auto">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
          <Clock className="w-10 h-10 animate-spin-slow" />
        </div>
        <div className="space-y-1">
          <Badge variant="info" size="md">
            Under Admin Review
          </Badge>
          <h2 className="text-xl font-bold text-neutral-900 font-display">
            Verification Pending Review
          </h2>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
            We have received your student credentials. Campus administrators usually review student evidence within 12 hours. You will receive an email once approved.
          </p>
        </div>

        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 text-left text-xs text-neutral-600 space-y-1">
          <div className="font-semibold text-neutral-800">Submitted details:</div>
          <div>• Campus: <span className="font-medium text-neutral-900">University of Lagos</span></div>
          <div>• Matric Number: <span className="font-mono font-medium text-neutral-900">•••• •••• {user?.matricNumber?.slice(-4) || '4291'}</span></div>
          <div>• Proof: <span className="font-medium text-neutral-900">Student ID Uploaded</span></div>
        </div>

        <Link to="/app" className="block pt-2">
          <Button variant="ghost" size="sm">
            Browse Campus Listings While Waiting
          </Button>
        </Link>
      </Card>
    );
  }

  if (status === VERIFICATION_STATUSES.REJECTED) {
    return (
      <Card variant="elevated" padding="lg" className="text-center space-y-4 max-w-lg mx-auto border-red-200">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-red-50 text-red-600 flex items-center justify-center border border-red-200">
          <XCircle className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <Badge variant="error" size="md">
            Verification Rejected
          </Badge>
          <h2 className="text-xl font-bold text-neutral-900 font-display">
            Application Needs Attention
          </h2>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
            Your previous submission could not be verified by our administrative team.
          </p>
        </div>

        <div className="p-3 bg-red-50/60 rounded-xl border border-red-200 text-left text-xs text-red-900">
          <span className="font-bold">Reason provided: </span>
          <span>{user?.rejectionReason || 'The uploaded student ID photo was blurry or obscured. Please ensure your name and matric number are clearly legible.'}</span>
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          fullWidth
          icon={<RotateCcw className="w-4 h-4" />}
          onClick={onResubmit}
        >
          Resubmit Clear Evidence
        </Button>
      </Card>
    );
  }

  return null;
}

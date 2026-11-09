import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Upload, FileText, CheckCircle2, ShieldCheck, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import PageHeader from '@/components/layout/PageHeader';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import VerificationStatus from '../components/VerificationStatus';
import { studentVerificationSchema } from '@/lib/validators';
import { useAuthStore } from '@/stores/authStore';
import { VERIFICATION_STATUSES } from '@/lib/constants';

export default function StudentVerificationPage() {
  const { user, updateUser } = useAuthStore();
  const currentStatus = user?.verificationStatus || VERIFICATION_STATUSES.UNVERIFIED;

  const [overrideForm, setOverrideForm] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(studentVerificationSchema),
    defaultValues: {
      matricNumber: user?.matricNumber || '',
      documentUrl: '',
      consent: false,
    },
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const fakeUrl = URL.createObjectURL(file);
      setFilePreview(fakeUrl);
      setValue('documentUrl', fakeUrl, { shouldValidate: true });
    }
  };

  const handleClearFile = () => {
    setFilePreview(null);
    setFileName('');
    setValue('documentUrl', '', { shouldValidate: true });
  };

  const handleSampleDoc = () => {
    const mockDoc = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800';
    setFilePreview(mockDoc);
    setFileName('student_id_card_2026.jpg');
    setValue('documentUrl', mockDoc, { shouldValidate: true });
    setValue('matricNumber', '210805149');
    setValue('consent', true, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      updateUser({
        verificationStatus: VERIFICATION_STATUSES.PENDING,
        matricNumber: data.matricNumber,
        documentKey: data.documentUrl,
        submittedAt: new Date().toISOString(),
      });
      setOverrideForm(false);
      toast.success('Student verification submitted! Admin review in progress.');
    }, 600);
  };

  // If already approved, pending, or rejected and user hasn't clicked "resubmit"
  if (currentStatus !== VERIFICATION_STATUSES.UNVERIFIED && !overrideForm) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Student Verification"
          subtitle="Your official campus marketplace accreditation"
          backTo="/app"
        />
        <VerificationStatus
          status={currentStatus}
          user={user}
          onResubmit={() => setOverrideForm(true)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <PageHeader
        title="Student Verification"
        subtitle="Upload your student evidence to activate booking and provider permissions"
        backTo="/app"
      />

      {/* Privacy Guarantee Banner */}
      <div className="p-4 rounded-2xl bg-neutral-900 text-white flex items-start gap-3 shadow-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <div className="font-bold text-white">Privacy-by-Design Guarantee</div>
          <p className="text-neutral-300 leading-relaxed">
            Your matriculation number and verification documents are stored in secure private storage. They will <strong>never</strong> be displayed on your public profile or shared with clients.
          </p>
        </div>
      </div>

      <Card variant="elevated" padding="lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <Input
            label="Matriculation / Student ID Number"
            required
            placeholder="e.g. 210805149 or ENG/2021/042"
            icon={<FileText className="w-4 h-4" />}
            hint="Enter your official university matric/ID number as shown on your card"
            error={errors.matricNumber?.message}
            {...register('matricNumber')}
          />

          {/* Document Upload Area */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-neutral-700 tracking-wide">
              Student ID Card or Admission Proof <span className="text-primary-600">*</span>
            </label>

            {!filePreview ? (
              <label
                htmlFor="student-doc"
                className="flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl border-2 border-dashed border-neutral-300 hover:border-primary-400 bg-neutral-50/50 hover:bg-primary-50/30 transition-all cursor-pointer group text-center space-y-2"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-neutral-500 group-hover:text-primary-600 group-hover:scale-105 transition-all">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-primary-600 hover:underline">
                    Tap to upload photo
                  </span>
                  <span className="text-xs text-neutral-500"> or drag file here</span>
                </div>
                <p className="text-[11px] text-neutral-400">
                  Accepts JPG, PNG, or PDF up to 5MB
                </p>
                <input
                  id="student-doc"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            ) : (
              <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-neutral-900 truncate max-w-xs">
                      {fileName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearFile}
                    className="p-1 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50"
                    aria-label="Remove uploaded proof"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden max-h-48 border border-neutral-200 bg-neutral-900/10">
                  <img
                    src={filePreview}
                    alt="Uploaded student evidence preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {errors.documentUrl && (
              <p className="text-xs text-red-600 font-medium pt-1">
                {errors.documentUrl.message}
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="pt-2">
            <div className="flex items-start gap-2.5">
              <input
                type="checkbox"
                id="consentCheck"
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                {...register('consent')}
              />
              <label htmlFor="consentCheck" className="text-xs text-neutral-700 leading-snug cursor-pointer">
                I hereby confirm that I am a currently enrolled university student, and I consent to my matriculation evidence being audited solely for verification purposes.
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-red-600 font-medium pt-1">
                {errors.consent.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isSubmitting}
            className="mt-4"
          >
            Submit Evidence for Admin Review
          </Button>

          {/* Testing Sample Button */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-[11px] text-neutral-400">Testing locally?</span>
            <button
              type="button"
              onClick={handleSampleDoc}
              className="text-[11px] font-bold text-primary-600 hover:text-primary-700 bg-primary-50 px-2 py-1 rounded-md cursor-pointer"
            >
              Use demo student ID
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { KeyRound, Copy, Check, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/cn';

export default function PinDisplay({ pin, bookingReference, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!pin) return;
    navigator.clipboard.writeText(pin);
    setCopied(true);
    toast.success('6-Digit PIN copied to clipboard');
    setTimeout(() => setCopied(false), 2500);
  };

  const digits = String(pin || '000000').split('');

  return (
    <div className={cn('p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center border border-purple-200">
            <KeyRound className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900 font-display">
              Completion Release PIN
            </h3>
            <p className="text-[11px] text-neutral-500">
              Ref: {bookingReference}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>

      {/* 6 Digits Display */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 py-3 px-2 bg-neutral-50 rounded-xl border border-neutral-200">
        {digits.map((digit, index) => (
          <div
            key={index}
            className="w-10 h-13 sm:w-12 sm:h-14 rounded-lg bg-white border-2 border-purple-800/40 text-purple-950 flex items-center justify-center font-display text-xl sm:text-2xl font-black shadow-2xs select-none"
          >
            {digit}
          </div>
        ))}
      </div>

      {/* Safety Notice */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900">
        <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed text-[11px]">
          <span className="font-bold text-amber-950 block font-display">
            Do NOT share this code prematurely
          </span>
          <p className="text-amber-800">
            Once you disclose this PIN to the provider, funds are instantly transferred from escrow to their account. Never send this PIN before seeing your hair, nails, or cut completed.
          </p>
        </div>
      </div>
    </div>
  );
}

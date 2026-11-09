import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from '@/components/common/Logo';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES, VERIFICATION_STATUSES } from '@/lib/constants';

export default function OTPVerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const email = location.state?.email || 'your university email';
  const registrationData = location.state?.registrationData;

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef([]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Resend countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    const char = value.slice(-1); // only take latest character
    if (char && !/^\d$/.test(char)) return; // numbers only

    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

    // If entered a digit, jump to next input
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto submit if all 6 digits filled
    if (char && index === 5 && newDigits.every((d) => d !== '')) {
      submitOTP(newDigits.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const arr = pasted.split('');
      setDigits(arr);
      inputRefs.current[5]?.focus();
      submitOTP(pasted);
    }
  };

  const submitOTP = (_otpCode) => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);

      const newUser = {
        id: `usr-${Date.now()}`,
        name: registrationData?.name || 'Verified Student',
        email: registrationData?.email || email,
        phone: registrationData?.phone || '08012345678',
        campusId: registrationData?.campusId || 'unilag',
        roles: registrationData?.roles || [USER_ROLES.CLIENT],
        verificationStatus: VERIFICATION_STATUSES.UNVERIFIED,
      };

      setAuth(newUser, 'mock-jwt-token-registered');
      toast.success('Email verified successfully! Please submit student verification.');
      navigate('/app/verification', { replace: true });
    }, 800);
  };

  const handleResend = () => {
    if (timer > 0) return;
    setTimer(60);
    toast.success('A new 6-digit code has been sent to your student email.');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center py-10 px-4 sm:px-6">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Logo size="lg" to="/" />
        <div className="w-12 h-12 mx-auto rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-neutral-900 font-display">
          Enter verification code
        </h1>
        <p className="text-xs text-neutral-500 max-w-xs mx-auto">
          We sent a 6-digit confirmation code to{' '}
          <strong className="text-neutral-800 font-semibold">{email}</strong>
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <Card variant="elevated" padding="lg">
          <div className="space-y-6">
            {/* 6 Digit Input Group */}
            <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  autoComplete="one-time-code"
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  aria-label={`Digit ${i + 1}`}
                  className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border border-neutral-300 bg-white text-neutral-900 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all select-all shadow-2xs"
                />
              ))}
            </div>

            <Button
              type="button"
              variant="primary"
              size="lg"
              fullWidth
              loading={isVerifying}
              disabled={digits.some((d) => d === '')}
              onClick={() => submitOTP(digits.join(''))}
            >
              Verify Code & Continue
            </Button>

            <div className="text-center space-y-3 pt-2">
              <div className="text-xs text-neutral-500">
                Didn't get the code?{' '}
                {timer > 0 ? (
                  <span className="font-semibold text-neutral-700">
                    Resend in {timer}s
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                )}
              </div>

              <div className="border-t border-neutral-100 pt-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-800"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Use different email</span>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

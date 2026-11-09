import { forwardRef, useState, useId } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * Accessible Input component adhering to modern web guidance:
 * - Proper label/id connection
 * - Non-color visual indicators for errors
 * - Password reveal toggle with accessible label
 * - Ref forwarding for react-hook-form
 */
const Input = forwardRef(function Input(
  {
    label,
    id: propId,
    name,
    type = 'text',
    error = null,
    hint = null,
    icon = null,
    required = false,
    disabled = false,
    className = '',
    inputClassName = '',
    autoComplete,
    inputMode,
    enterKeyHint,
    spellCheck,
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = propId || name || generatedId;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const effectiveType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-xs font-semibold text-neutral-700 tracking-wide"
          >
            {label}
            {required && <span className="text-primary-600 ml-1" aria-hidden="true">*</span>}
          </label>
        </div>
      )}

      <div className="relative rounded-xl shadow-2xs">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            {icon}
          </div>
        )}

        <input
          ref={ref}
          id={id}
          name={name}
          type={effectiveType}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          enterKeyHint={enterKeyHint}
          spellCheck={spellCheck}
          aria-invalid={Boolean(error)}
          aria-errormessage={error ? errorId : undefined}
          aria-describedby={hint ? hintId : undefined}
          className={cn(
            'block w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition-colors placeholder:text-neutral-400',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed',
            icon ? 'pl-10' : '',
            isPassword ? 'pr-11' : '',
            error
              ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-500/20'
              : 'border-neutral-300 hover:border-neutral-400',
            inputClassName
          )}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-700 focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>

      {hint && !error && (
        <p id={hintId} className="text-xs text-neutral-500">
          {hint}
        </p>
      )}

      {error && (
        <div
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 font-medium pt-0.5 animate-fadeIn"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

export default Input;

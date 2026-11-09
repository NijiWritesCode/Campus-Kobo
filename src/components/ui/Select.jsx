import { forwardRef, useId } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

const Select = forwardRef(function Select(
  {
    label,
    id: propId,
    name,
    options = [],
    error = null,
    hint = null,
    required = false,
    disabled = false,
    placeholder = 'Select an option',
    className = '',
    selectClassName = '',
    ...props
  },
  ref
) {
  const generatedId = useId();
  const id = propId || name || generatedId;
  const errorId = `${id}-error`;

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-neutral-700 tracking-wide"
        >
          {label}
          {required && <span className="text-primary-600 ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative rounded-xl shadow-2xs">
        <select
          ref={ref}
          id={id}
          name={name}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-errormessage={error ? errorId : undefined}
          className={cn(
            'block w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-10 text-sm text-neutral-900 transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
            'disabled:bg-neutral-100 disabled:text-neutral-500 disabled:cursor-not-allowed cursor-pointer',
            error
              ? 'border-red-400 bg-red-50/20 text-red-900 focus:border-red-500 focus:ring-red-500/20'
              : 'border-neutral-300 hover:border-neutral-400',
            selectClassName
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-neutral-400">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {hint && !error && (
        <p className="text-xs text-neutral-500">{hint}</p>
      )}

      {error && (
        <div
          id={errorId}
          role="alert"
          className="flex items-center gap-1.5 text-xs text-red-600 font-medium pt-0.5"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
});

export default Select;

import { cn } from '@/lib/cn';

export default function Divider({ label = null, className = '' }) {
  if (!label) {
    return <hr className={cn('border-neutral-200 my-4', className)} />;
  }

  return (
    <div className={cn('relative my-5 flex items-center justify-center', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-neutral-200" />
      </div>
      <div className="relative bg-white px-3 text-xs uppercase tracking-wider text-neutral-400 font-medium select-none">
        {label}
      </div>
    </div>
  );
}

import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export default function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendDirection = 'up',
  colorScheme = 'purple',
  badge,
}) {
  const iconBgClasses = {
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    neutral: 'bg-neutral-100 text-neutral-800 border-neutral-200',
  };

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs space-y-3 transition-shadow hover:shadow-xs">
      <div className="flex items-start justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 font-display">
          {title}
        </span>
        {Icon && (
          <div
            className={cn(
              'w-8 h-8 rounded-xl flex items-center justify-center border shrink-0',
              iconBgClasses[colorScheme] || iconBgClasses.purple
            )}
          >
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline justify-between gap-2">
        <div className="text-xl sm:text-2xl font-black text-neutral-900 font-display tracking-tight">
          {value}
        </div>
        {badge && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-800 border border-purple-200">
            {badge}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 pt-1 border-t border-neutral-100">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-bold',
                trendDirection === 'up' ? 'text-emerald-700' : 'text-rose-700'
              )}
            >
              {trendDirection === 'up' ? (
                <ArrowUpRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowDownRight className="w-3.5 h-3.5" />
              )}
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
}

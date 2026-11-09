import { cn } from '@/lib/cn';

export default function Tabs({
  tabs = [],
  activeTab,
  onChange,
  className = '',
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex items-center gap-1 p-1 bg-neutral-100/90 border border-neutral-200/60 rounded-2xl overflow-x-auto scrollbar-none shadow-2xs max-w-full',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-xl transition-all duration-200 shrink-0 cursor-pointer select-none',
              isActive
                ? 'bg-white text-neutral-900 shadow-xs font-semibold'
                : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200/50'
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.2 rounded-full text-[10px] font-bold tabular-nums',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-neutral-200 text-neutral-500'
                )}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

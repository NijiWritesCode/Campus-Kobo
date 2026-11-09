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
        'flex items-center gap-1.5 p-1 bg-neutral-100 rounded-xl overflow-x-auto scrollbar-none',
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
              'flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-all shrink-0 cursor-pointer',
              isActive
                ? 'bg-white text-neutral-900 shadow-2xs font-bold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={cn(
                  'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'bg-neutral-200 text-neutral-600'
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

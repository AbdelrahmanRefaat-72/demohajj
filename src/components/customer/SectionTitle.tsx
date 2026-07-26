import React from 'react';

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'center' | 'start';
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  badge,
  align = 'center',
  className = '',
}) => {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-start items-start';

  return (
    <div className={`flex flex-col ${alignClass} mb-8 ${className}`}>
      {badge && (
        <span className="inline-block px-3 py-1 mb-2 text-[11px] font-bold tracking-wider text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 border border-amber-300/40 dark:border-amber-700/40 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
};

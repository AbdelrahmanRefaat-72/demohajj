import React from 'react';

export interface BadgeProps {
  variant?: 'emerald' | 'gold' | 'slate' | 'red' | 'amber' | 'blue';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'emerald',
  size = 'md',
  children,
  className = '',
  icon,
}) => {
  const variantStyles = {
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200/60 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/40',
    gold: 'bg-amber-100 text-amber-900 border-amber-200/60 dark:bg-amber-950/80 dark:text-amber-300 dark:border-amber-700/40',
    slate: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    red: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950/80 dark:text-red-300 dark:border-red-800/40',
    amber: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/80 dark:text-yellow-300 dark:border-yellow-800/40',
    blue: 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-950/80 dark:text-sky-300 dark:border-sky-800/40',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};

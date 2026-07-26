import React from 'react';
import { Card } from '../common/Card';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  variant?: 'emerald' | 'gold' | 'blue' | 'slate';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  trend,
  variant = 'emerald',
}) => {
  const iconBg = {
    emerald: 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300',
    gold: 'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300',
    blue: 'bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300',
    slate: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  };

  return (
    <Card hoverEffect className="p-5 flex items-center justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{title}</span>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{value}</h3>
        {trend && (
          <span className="inline-block text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
            {trend}
          </span>
        )}
      </div>

      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconBg[variant]}`}>
        {icon}
      </div>
    </Card>
  );
};

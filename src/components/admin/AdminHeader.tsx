import React from 'react';
import { ThemeSwitch } from '../common/ThemeSwitch';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { useAppStore } from '../../store/useAppStore';
import { Shield } from 'lucide-react';

export const AdminHeader: React.FC<{ title: string }> = ({ title }) => {
  const adminEmail = useAppStore((state) => state.adminEmail);

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-black text-slate-900 dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <LanguageSwitch />
        <ThemeSwitch />

        <div className="flex items-center gap-2 pl-4 rtl:pl-0 rtl:pr-4 border-s rtl:border-s-0 rtl:border-r border-slate-200 dark:border-slate-700">
          <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
            <Shield className="w-4 h-4" />
          </div>
          <div className="hidden sm:block text-xs">
            <span className="block font-bold text-slate-900 dark:text-white">مشرف النظام</span>
            <span className="block text-[10px] text-slate-500 dark:text-slate-400">{adminEmail || 'admin@alsafa.com'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

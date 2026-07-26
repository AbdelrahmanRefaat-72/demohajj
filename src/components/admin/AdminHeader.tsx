import React from 'react';
import { ThemeSwitch } from '../common/ThemeSwitch';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { useAppStore } from '../../store/useAppStore';
import { Shield, Menu } from 'lucide-react';

export interface AdminHeaderProps {
  title: string;
  onMenuToggle?: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ title, onMenuToggle }) => {
  const adminEmail = useAppStore((state) => state.adminEmail);

  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-xl bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors"
          aria-label="Open Sidebar Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-base sm:text-lg font-black text-white truncate max-w-[180px] sm:max-w-none">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitch />
        <ThemeSwitch />

        <div className="flex items-center gap-2 pl-2 sm:pl-4 rtl:pl-0 rtl:pr-2 sm:rtl:pr-4 border-s rtl:border-s-0 rtl:border-r border-slate-800">
          <div className="w-8 h-8 rounded-full bg-emerald-950 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-600/30">
            <Shield className="w-4 h-4" />
          </div>
          <div className="hidden lg:block text-xs">
            <span className="block font-bold text-white">مشرف النظام</span>
            <span className="block text-[10px] text-slate-400 font-mono">{adminEmail || 'admin@alsafa.com'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

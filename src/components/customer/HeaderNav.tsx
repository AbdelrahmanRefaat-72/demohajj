import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeSwitch } from '../common/ThemeSwitch';
import { LanguageSwitch } from '../common/LanguageSwitch';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

export const HeaderNav: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 px-4 py-3 flex items-center justify-between transition-colors">
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-amber-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
          ص
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
            {t('appName')}
          </span>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold tracking-wide">
            VIP HAJJ & UMRAH
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <LanguageSwitch />
        <ThemeSwitch />
        <Link
          to="/admin"
          className="p-2 text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors md:hidden"
          title="لوحة التحكم"
        >
          <ShieldCheck className="w-5 h-5" />
        </Link>
      </div>
    </header>
  );
};

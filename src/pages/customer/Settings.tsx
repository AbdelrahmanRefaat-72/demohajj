import React from 'react';
import { SectionTitle } from '../../components/customer/SectionTitle';
import { Card } from '../../components/common/Card';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';
import i18n from '../../locales/i18n';
import { Moon, Sun, Globe, Monitor, Smartphone, Info, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Settings: React.FC = () => {
  const { t } = useTranslation();
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const desktopViewMode = useAppStore((state) => state.desktopViewMode);
  const setDesktopViewMode = useAppStore((state) => state.setDesktopViewMode);

  const handleLangChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <div className="px-4 py-6 space-y-6 max-w-xl mx-auto">
      <SectionTitle
        title={t('settings.title')}
      />

      {/* Theme Options */}
      <Card hoverEffect={false} className="p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-500" />
          <span>{t('settings.theme')}</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setTheme('light')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              theme === 'light'
                ? 'bg-amber-100 dark:bg-amber-950 border-amber-500 text-amber-900 dark:text-amber-300 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>{t('settings.light')}</span>
          </button>

          <button
            onClick={() => setTheme('dark')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              theme === 'dark'
                ? 'bg-emerald-950 border-emerald-500 text-emerald-300 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>{t('settings.dark')}</span>
          </button>
        </div>
      </Card>

      {/* Language Options */}
      <Card hoverEffect={false} className="p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>{t('settings.language')}</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleLangChange('ar')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              language === 'ar'
                ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>العربية (RTL)</span>
          </button>

          <button
            onClick={() => handleLangChange('en')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-emerald-700 text-white border-emerald-600 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <span>English (LTR)</span>
          </button>
        </div>
      </Card>

      {/* Desktop Mode Toggle */}
      <Card hoverEffect={false} className="p-5 space-y-3 hidden sm:block">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Monitor className="w-4 h-4 text-sky-500" />
          <span>{t('settings.desktopMode')}</span>
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setDesktopViewMode('phone')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              desktopViewMode === 'phone'
                ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{t('settings.phoneFrame')}</span>
          </button>

          <button
            onClick={() => setDesktopViewMode('fullscreen')}
            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              desktopViewMode === 'fullscreen'
                ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>{t('settings.fullScreen')}</span>
          </button>
        </div>
      </Card>

      {/* About Application */}
      <Card hoverEffect={false} className="p-5 space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-amber-500" />
          <span>{t('settings.about')}</span>
        </h3>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">اسم التطبيق:</span>
            <span className="font-bold text-slate-900 dark:text-white">{t('appName')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">الإصدار:</span>
            <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">1.0.0 (Client Demo)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 font-medium">المطور:</span>
            <span className="font-bold text-slate-900 dark:text-white">Al Safa Tech Agency</span>
          </div>
        </div>

        <Link
          to="/admin"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md hover:from-amber-600 hover:to-amber-700 transition-all mt-4"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>الانتقال إلى لوحة تحكم الإدارة</span>
        </Link>
      </Card>
    </div>
  );
};

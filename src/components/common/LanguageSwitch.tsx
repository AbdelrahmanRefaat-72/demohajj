import React from 'react';
import { Globe } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import i18n from '../../locales/i18n';

export const LanguageSwitch: React.FC = () => {
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const toggleLanguage = () => {
    const nextLang = language === 'ar' ? 'en' : 'ar';
    setLanguage(nextLang);
    i18n.changeLanguage(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-semibold shadow-sm cursor-pointer"
      title="تغيير اللغة / Switch Language"
      aria-label="Toggle language"
    >
      <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
      <span>{language === 'ar' ? 'English' : 'العربية'}</span>
    </button>
  );
};

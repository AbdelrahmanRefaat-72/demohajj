import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Smartphone, Monitor, ShieldCheck, Moon, Sun, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import i18n from '../../locales/i18n';

export const PhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const desktopViewMode = useAppStore((state) => state.desktopViewMode);
  const setDesktopViewMode = useAppStore((state) => state.setDesktopViewMode);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const language = useAppStore((state) => state.language);
  const setLanguage = useAppStore((state) => state.setLanguage);

  const toggleLanguage = () => {
    const next = language === 'ar' ? 'en' : 'ar';
    setLanguage(next);
    i18n.changeLanguage(next);
  };

  // If in fullscreen mode or rendering on small screens, render standard container
  return (
    <div className="min-h-screen bg-warm-100 dark:bg-dark-bg text-slate-900 dark:text-slate-100 flex flex-col">
      {/* Desktop Presentation Bar - Only visible on desktop (md and above) */}
      <header className="hidden md:flex items-center justify-between px-6 py-3 bg-slate-900 text-slate-200 border-b border-slate-800 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-amber-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
            ص
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wide text-white">
              {language === 'ar' ? 'الصَفا للحَج والعُمْرَة' : 'Al Safa Hajj & Umrah'}
            </h1>
            <p className="text-[11px] text-amber-400 font-medium">
              {language === 'ar' ? 'عرض التقديم التفاعلي لعملاء الوكالة' : 'Client Interactive Presentation Demo'}
            </p>
          </div>
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setDesktopViewMode('phone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              desktopViewMode === 'phone'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'إطار الهاتف' : 'Smartphone Frame'}</span>
          </button>

          <button
            onClick={() => setDesktopViewMode('fullscreen')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              desktopViewMode === 'fullscreen'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'عرض الشاشة الكاملة' : 'Full Screen'}</span>
          </button>
        </div>

        {/* Admin Dashboard Quick Link & Toggles */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700"
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800 rounded-lg border border-slate-700"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-300" />}
          </button>

          <Link
            to="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      {desktopViewMode === 'phone' ? (
        <div className="flex-1 hidden md:flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/40 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Smartphone Frame Outer Shell */}
          <div className="relative w-[395px] h-[812px] bg-slate-900 rounded-[50px] p-3 shadow-[0_0_60px_rgba(0,0,0,0.8),0_0_100px_rgba(5,150,105,0.2)] border-4 border-slate-700/60 ring-1 ring-white/10 flex flex-col overflow-hidden">
            {/* Dynamic Island / Camera Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/40 animate-pulse" />
            </div>

            {/* Inner Mobile Viewport */}
            <div className="w-full h-full bg-warm-100 dark:bg-dark-bg rounded-[40px] overflow-hidden flex flex-col relative pt-7 border border-black/40">
              {/* Phone Status Bar Mockup */}
              <div className="absolute top-1 left-0 right-0 px-6 flex items-center justify-between text-[11px] font-semibold text-slate-800 dark:text-slate-200 z-30 pointer-events-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>5G</span>
                </div>
              </div>

              {/* Scrollable Screen Content */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none">
                {children}
              </div>

              {/* Home Indicator Bar */}
              <div className="w-full py-1.5 bg-warm-100 dark:bg-dark-bg flex justify-center z-30">
                <div className="w-32 h-1 bg-slate-400 dark:bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Standard Full View (For Mobile Screens or when user toggles Fullscreen Desktop) */}
      <div className={`${desktopViewMode === 'phone' ? 'flex-1 block md:hidden' : 'flex-1 block'}`}>
        {children}
      </div>
    </div>
  );
};

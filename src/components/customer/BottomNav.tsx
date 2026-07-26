import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Compass, PhoneCall, Settings } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const BottomNav: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/trips', label: t('nav.trips'), icon: Compass },
    { path: '/contact', label: t('nav.contact'), icon: PhoneCall },
    { path: '/settings', label: t('nav.settings'), icon: Settings },
  ];

  return (
    <nav className="sticky bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-3 py-2 flex items-center justify-around shadow-lg">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path);

        return (
          <NavLink
            key={item.path}
            to={item.path}
            className="relative flex flex-col items-center justify-center flex-1 py-1 text-xs font-medium transition-colors"
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl -z-10 border border-emerald-500/20"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}

            <Icon
              className={`w-5 h-5 transition-transform ${
                isActive
                  ? 'text-emerald-700 dark:text-emerald-400 scale-110'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            />
            <span
              className={`mt-1 text-[11px] font-semibold ${
                isActive
                  ? 'text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {item.label}
            </span>
          </NavLink>
        );
      })}
    </nav>
  );
};

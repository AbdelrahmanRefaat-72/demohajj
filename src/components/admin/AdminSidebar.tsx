import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Compass, BookOpenCheck, ExternalLink, LogOut, ShieldCheck, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen = false, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logoutAdmin = useAppStore((state) => state.logoutAdmin);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const handleLogout = () => {
    logoutAdmin();
    if (onClose) onClose();
    navigate('/admin/login');
  };

  const navLinks = [
    { path: '/admin/dashboard', label: t('admin.title'), icon: LayoutDashboard },
    { path: '/admin/trips', label: t('admin.manageTrips'), icon: Compass },
    { path: '/admin/bookings', label: t('admin.viewBookings'), icon: BookOpenCheck },
  ];

  const SidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300 border-e border-slate-800">
      {/* Sidebar Header / Logo */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0">
            ص
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white leading-tight">{t('appName')}</h2>
            <span className="text-[10px] text-amber-400 font-semibold tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {t('admin.title')}
            </span>
          </div>
        </div>

        {/* Close button on mobile */}
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (onClose) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Sidebar Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <NavLink
          to="/"
          onClick={() => {
            if (onClose) onClose();
          }}
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/80 text-amber-400 hover:bg-slate-800 transition-colors border border-amber-500/20"
        >
          <span>{t('admin.backToSite')}</span>
          <ExternalLink className="w-4 h-4" />
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* DESKTOP SIDEBAR: Standard flex item, hidden on mobile */}
      <aside className="hidden md:block w-64 shrink-0 min-h-screen">
        {SidebarContent}
      </aside>

      {/* MOBILE SIDEBAR: Animated Drawer overlay, ONLY on mobile screens (< md) */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Mobile Sidebar Box */}
            <motion.aside
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className={`relative z-10 w-72 h-full shadow-2xl ${
                isRtl ? 'mr-0 ml-auto' : 'ml-0 mr-auto'
              }`}
            >
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

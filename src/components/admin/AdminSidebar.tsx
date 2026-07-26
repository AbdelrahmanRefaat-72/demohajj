import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Compass, BookOpenCheck, ExternalLink, LogOut, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../store/useAppStore';

export const AdminSidebar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const logoutAdmin = useAppStore((state) => state.logoutAdmin);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const navLinks = [
    { path: '/admin/dashboard', label: t('admin.title'), icon: LayoutDashboard },
    { path: '/admin/trips', label: t('admin.manageTrips'), icon: Compass },
    { path: '/admin/bookings', label: t('admin.viewBookings'), icon: BookOpenCheck },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-e border-slate-800 text-slate-300 flex flex-col min-h-screen shrink-0">
      {/* Sidebar Header / Logo */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg">
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

      {/* Nav Menu */}
      <nav className="flex-1 p-4 space-y-1.5">
        {navLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
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
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-800/80 text-amber-400 hover:bg-slate-800 transition-colors border border-amber-500/20"
        >
          <span>{t('admin.backToSite')}</span>
          <ExternalLink className="w-4 h-4" />
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
};

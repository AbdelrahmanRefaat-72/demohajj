import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { StatCard } from '../../components/admin/StatCard';
import { Table, Column } from '../../components/common/Table';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { formatPrice } from '../../utils/formatters';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Compass, BookOpenCheck, Globe, Moon, Plus, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Booking, Trip } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { t } = useTranslation();
  const trips = useAppStore((state) => state.trips);
  const bookings = useAppStore((state) => state.bookings);
  const theme = useAppStore((state) => state.theme);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const recentBookings = bookings.slice(0, 5);
  const recentTrips = trips.slice(0, 4);

  const bookingColumns: Column<Booking>[] = [
    { key: 'id', header: 'رقم الحجز', render: (b) => <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{b.id}</span> },
    { key: 'fullName', header: 'اسم العميل', render: (b) => <span className="font-bold">{b.fullName}</span> },
    { key: 'tripNameAr', header: 'اسم الرحلة', render: (b) => <span className="truncate max-w-[200px] block">{isRtl ? b.tripNameAr : b.tripNameEn}</span> },
    { key: 'travelersCount', header: 'المسافرين', render: (b) => <span>{b.travelersCount} أشخاص</span> },
    {
      key: 'status',
      header: 'الحالة',
      render: (b) => (
        <Badge
          variant={b.status === 'approved' ? 'emerald' : b.status === 'rejected' ? 'red' : 'amber'}
          size="sm"
        >
          {b.status === 'approved' ? t('admin.statusApproved') : b.status === 'rejected' ? t('admin.statusRejected') : t('admin.statusPending')}
        </Badge>
      ),
    },
  ];

  const tripColumns: Column<Trip>[] = [
    {
      key: 'coverImage',
      header: 'الصورة',
      render: (tr) => (
        <img src={tr.coverImage} alt={tr.titleAr} className="w-10 h-10 rounded-xl object-cover" />
      ),
    },
    { key: 'titleAr', header: 'عنوان الرحلة', render: (tr) => <span className="font-bold">{isRtl ? tr.titleAr : tr.titleEn}</span> },
    { key: 'price', header: 'السعر', render: (tr) => <span className="font-extrabold text-amber-600 dark:text-amber-400">{formatPrice(tr.price, tr.currency, language)}</span> },
    { key: 'availableSeats', header: 'المقاعد المتاحة', render: (tr) => <span>{tr.availableSeats} / {tr.totalSeats}</span> },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('admin.totalTrips')}
          value={trips.length}
          icon={<Compass className="w-6 h-6" />}
          variant="emerald"
        />
        <StatCard
          title={t('admin.totalBookings')}
          value={bookings.length}
          icon={<BookOpenCheck className="w-6 h-6" />}
          variant="gold"
        />
        <StatCard
          title={t('admin.activeLanguages')}
          value="2 (العربية / English)"
          icon={<Globe className="w-6 h-6" />}
          variant="blue"
        />
        <StatCard
          title={t('admin.currentTheme')}
          value={theme === 'dark' ? t('settings.dark') : t('settings.light')}
          icon={<Moon className="w-6 h-6" />}
          variant="slate"
        />
      </div>

      {/* Quick Actions Panel */}
      <Card hoverEffect={false} className="p-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          {t('admin.quickActions')}
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <Link to="/admin/trips/new">
            <Button variant="gold" size="sm" leftIcon={<Plus className="w-4 h-4" />}>
              {t('admin.addTrip')}
            </Button>
          </Link>
          <Link to="/admin/bookings">
            <Button variant="primary" size="sm" leftIcon={<BookOpenCheck className="w-4 h-4" />}>
              {t('admin.viewBookings')}
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="sm" rightIcon={<ExternalLink className="w-4 h-4" />}>
              {t('admin.backToSite')}
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Bookings & Trips Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bookings Table (Takes 2 cols) */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('admin.recentBookings')}
            </h3>
            <Link to="/admin/bookings" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
              عرض الكل
            </Link>
          </div>
          <Table columns={bookingColumns} data={recentBookings} keyExtractor={(b) => b.id} />
        </div>

        {/* Recent Trips Table (Takes 1 col) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {t('admin.recentTrips')}
            </h3>
            <Link to="/admin/trips" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline">
              إدارة الرحلات
            </Link>
          </div>
          <Table columns={tripColumns} data={recentTrips} keyExtractor={(tr) => tr.id} />
        </div>
      </div>
    </div>
  );
};

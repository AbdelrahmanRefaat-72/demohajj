import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Table, Column } from '../../components/common/Table';
import { Search } from '../../components/common/Search';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Dialog } from '../../components/common/Dialog';
import { formatPrice, formatDate } from '../../utils/formatters';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar, Hotel } from 'lucide-react';
import { Trip } from '../../types';

export const AdminTrips: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const trips = useAppStore((state) => state.trips);
  const deleteTrip = useAppStore((state) => state.deleteTrip);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);

  const filteredTrips = useMemo(() => {
    if (!searchQuery.trim()) return trips;
    const q = searchQuery.toLowerCase();
    return trips.filter((tItem) => {
      const title = (isRtl ? tItem.titleAr : tItem.titleEn).toLowerCase();
      const hotel = (isRtl ? tItem.hotelNameAr : tItem.hotelNameEn).toLowerCase();
      return title.includes(q) || hotel.includes(q);
    });
  }, [trips, searchQuery, isRtl]);

  const handleDeleteConfirm = () => {
    if (deletingTripId) {
      deleteTrip(deletingTripId);
      setDeletingTripId(null);
    }
  };

  const columns: Column<Trip>[] = [
    {
      key: 'coverImage',
      header: 'الصورة',
      render: (tr) => (
        <img src={tr.coverImage} alt={tr.titleAr} className="w-12 h-12 rounded-xl object-cover shadow-sm" />
      ),
    },
    {
      key: 'titleAr',
      header: 'اسم الرحلة',
      render: (tr) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{isRtl ? tr.titleAr : tr.titleEn}</span>
          <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
            <Hotel className="w-3 h-3 text-emerald-500" />
            {isRtl ? tr.hotelNameAr : tr.hotelNameEn}
          </span>
        </div>
      ),
    },
    {
      key: 'price',
      header: 'السعر',
      render: (tr) => (
        <span className="font-extrabold text-amber-600 dark:text-amber-400">
          {formatPrice(tr.price, tr.currency, language)}
        </span>
      ),
    },
    {
      key: 'startDate',
      header: 'تاريخ البداية',
      render: (tr) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          {formatDate(tr.startDate, language)}
        </span>
      ),
    },
    {
      key: 'durationDays',
      header: 'المدة',
      render: (tr) => <span>{tr.durationDays} أيام</span>,
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (tr) => (
        <Badge variant={tr.status === 'published' ? 'emerald' : 'slate'} size="sm">
          {tr.status === 'published' ? t('admin.statusPublished') : t('admin.statusDraft')}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (tr) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/admin/trips/${tr.id}/edit`)}
            className="text-emerald-600 dark:text-emerald-400"
            title={t('admin.edit')}
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeletingTripId(tr.id)}
            className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
            title={t('admin.delete')}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 dark:text-white">
            {t('admin.manageTrips')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            إدارة جميع باقات الحج والعمرة وإضافة أو تعديل تفاصيل الرحلات
          </p>
        </div>

        <Link to="/admin/trips/new">
          <Button variant="gold" size="md" leftIcon={<Plus className="w-4 h-4" />}>
            {t('admin.addTrip')}
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('admin.searchTrips')}
        />
      </div>

      {/* Trips Table */}
      <Table columns={columns} data={filteredTrips} keyExtractor={(tr) => tr.id} />

      {/* Delete Confirmation Dialog */}
      <Dialog
        isOpen={Boolean(deletingTripId)}
        onClose={() => setDeletingTripId(null)}
        onConfirm={handleDeleteConfirm}
        title={t('admin.deleteConfirmTitle')}
        message={t('admin.deleteConfirmText')}
      />
    </div>
  );
};

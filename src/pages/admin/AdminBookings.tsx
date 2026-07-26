import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Table, Column } from '../../components/common/Table';
import { Search } from '../../components/common/Search';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Drawer } from '../../components/common/Drawer';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, XCircle, Eye, Phone, Mail, Flag, Users, BedDouble, Calendar } from 'lucide-react';
import { Booking, BookingStatus } from '../../types';

export const AdminBookings: React.FC = () => {
  const { t } = useTranslation();
  const bookings = useAppStore((state) => state.bookings);
  const updateBookingStatus = useAppStore((state) => state.updateBookingStatus);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | BookingStatus>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          b.id.toLowerCase().includes(q) ||
          b.fullName.toLowerCase().includes(q) ||
          b.phone.includes(q)
        );
      }
      return true;
    });
  }, [bookings, searchQuery, statusFilter]);

  const columns: Column<Booking>[] = [
    {
      key: 'id',
      header: 'رقم الحجز',
      render: (b) => <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{b.id}</span>,
    },
    {
      key: 'fullName',
      header: 'اسم العميل',
      render: (b) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{b.fullName}</span>
          <span className="text-[11px] text-slate-400 font-mono">{b.phone}</span>
        </div>
      ),
    },
    {
      key: 'tripNameAr',
      header: 'الرحلة المطلوبة',
      render: (b) => (
        <span className="truncate max-w-[220px] block text-xs font-semibold">
          {isRtl ? b.tripNameAr : b.tripNameEn}
        </span>
      ),
    },
    {
      key: 'travelersCount',
      header: 'المسافرين',
      render: (b) => <span>{b.travelersCount} أشخاص</span>,
    },
    {
      key: 'status',
      header: 'الحالة',
      render: (b) => (
        <Badge
          variant={b.status === 'approved' ? 'emerald' : b.status === 'rejected' ? 'red' : 'amber'}
          size="sm"
        >
          {b.status === 'approved'
            ? t('admin.statusApproved')
            : b.status === 'rejected'
            ? t('admin.statusRejected')
            : t('admin.statusPending')}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'الإجراءات',
      render: (b) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedBooking(b)}
            className="text-amber-600 dark:text-amber-400"
            title="عرض التفاصيل"
          >
            <Eye className="w-4 h-4" />
          </Button>

          {b.status !== 'approved' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateBookingStatus(b.id, 'approved')}
              className="text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
              title={t('admin.approve')}
            >
              <CheckCircle2 className="w-4 h-4" />
            </Button>
          )}

          {b.status !== 'rejected' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateBookingStatus(b.id, 'rejected')}
              className="text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
              title={t('admin.reject')}
            >
              <XCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-black text-slate-900 dark:text-white">
          {t('admin.viewBookings')}
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          متابعة طلبات حجوزات العملاء والموافقة عليها أو إلغائها
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="max-w-md w-full">
          <Search
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={t('admin.searchBookings')}
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'pending', label: t('admin.statusPending') },
            { id: 'approved', label: t('admin.statusApproved') },
            { id: 'rejected', label: t('admin.statusRejected') },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id as 'all' | BookingStatus)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === st.id
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Table columns={columns} data={filteredBookings} keyExtractor={(b) => b.id} />

      {/* Side Drawer Details */}
      <Drawer
        isOpen={Boolean(selectedBooking)}
        onClose={() => setSelectedBooking(null)}
        title={t('admin.drawerTitle')}
      >
        {selectedBooking && (
          <div className="space-y-6 text-xs">
            {/* Header info */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                  #{selectedBooking.id}
                </span>
                <Badge
                  variant={
                    selectedBooking.status === 'approved'
                      ? 'emerald'
                      : selectedBooking.status === 'rejected'
                      ? 'red'
                      : 'amber'
                  }
                >
                  {selectedBooking.status === 'approved'
                    ? t('admin.statusApproved')
                    : selectedBooking.status === 'rejected'
                    ? t('admin.statusRejected')
                    : t('admin.statusPending')}
                </Badge>
              </div>
              <span className="text-[10px] text-slate-400 flex items-center gap-1 pt-1">
                <Calendar className="w-3 h-3" />
                تاريخ الطلب: {selectedBooking.createdAt}
              </span>
            </div>

            {/* Customer Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white border-b pb-1">
                بيانات العميل
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-500">الاسم:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedBooking.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-500">الجوال:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedBooking.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-500">البريد:</span>
                  <span className="font-mono">{selectedBooking.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flag className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-500">الجنسية:</span>
                  <span>{selectedBooking.nationality}</span>
                </div>
              </div>
            </div>

            {/* Trip Info */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 dark:text-white border-b pb-1">
                تفاصيل الرحلة
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">اسم الرحلة:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {isRtl ? selectedBooking.tripNameAr : selectedBooking.tripNameEn}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-500">عدد المسافرين:</span>
                  <span className="font-bold">{selectedBooking.travelersCount} أشخاص</span>
                </div>
                <div className="flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-500">نوع الغرفة:</span>
                  <span className="font-bold">{selectedBooking.roomType}</span>
                </div>
                {selectedBooking.notes && (
                  <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl mt-2">
                    <span className="text-slate-400 block font-semibold mb-0.5">ملاحظات العميل:</span>
                    <p className="text-slate-700 dark:text-slate-300">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
              {selectedBooking.status !== 'approved' && (
                <Button
                  variant="gold"
                  size="sm"
                  onClick={() => {
                    updateBookingStatus(selectedBooking.id, 'approved');
                    setSelectedBooking((prev) => prev ? { ...prev, status: 'approved' } : null);
                  }}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {t('admin.approve')}
                </Button>
              )}

              {selectedBooking.status !== 'rejected' && (
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    updateBookingStatus(selectedBooking.id, 'rejected');
                    setSelectedBooking((prev) => prev ? { ...prev, status: 'rejected' } : null);
                  }}
                  leftIcon={<XCircle className="w-4 h-4" />}
                >
                  {t('admin.reject')}
                </Button>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

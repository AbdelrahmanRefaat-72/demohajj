import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppStore } from '../../store/useAppStore';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowLeft, Save, X } from 'lucide-react';
import { TripType, TripStatus } from '../../types';

interface TripFormInputs {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: TripType;
  price: number;
  currency: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  hotelNameAr: string;
  hotelNameEn: string;
  hotelStars: number;
  airlineAr: string;
  airlineEn: string;
  availableSeats: number;
  totalSeats: number;
  coverImage: string;
  status: TripStatus;
}

export const AdminTripForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const trips = useAppStore((state) => state.trips);
  const addTrip = useAppStore((state) => state.addTrip);
  const updateTrip = useAppStore((state) => state.updateTrip);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const isEdit = Boolean(id);
  const existingTrip = trips.find((tr) => tr.id === id);

  const { register, handleSubmit, reset } = useForm<TripFormInputs>({
    defaultValues: {
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: '',
      type: 'umrah',
      price: 3500,
      currency: 'SAR',
      startDate: '2026-09-01',
      endDate: '2026-09-08',
      durationDays: 7,
      hotelNameAr: 'فندق مكة الفاخر (5 نجوم)',
      hotelNameEn: 'Makkah Luxury Hotel (5 Stars)',
      hotelStars: 5,
      airlineAr: 'الخطوط السعودية',
      airlineEn: 'Saudia Airlines',
      availableSeats: 20,
      totalSeats: 40,
      coverImage: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=80',
      status: 'published',
    },
  });

  useEffect(() => {
    if (isEdit && existingTrip) {
      reset({
        titleAr: existingTrip.titleAr,
        titleEn: existingTrip.titleEn,
        descriptionAr: existingTrip.descriptionAr,
        descriptionEn: existingTrip.descriptionEn,
        type: existingTrip.type,
        price: existingTrip.price,
        currency: existingTrip.currency,
        startDate: existingTrip.startDate,
        endDate: existingTrip.endDate,
        durationDays: existingTrip.durationDays,
        hotelNameAr: existingTrip.hotelNameAr,
        hotelNameEn: existingTrip.hotelNameEn,
        hotelStars: existingTrip.hotelStars,
        airlineAr: existingTrip.airlineAr,
        airlineEn: existingTrip.airlineEn,
        availableSeats: existingTrip.availableSeats,
        totalSeats: existingTrip.totalSeats,
        coverImage: existingTrip.coverImage,
        status: existingTrip.status,
      });
    }
  }, [isEdit, existingTrip, reset]);

  const onSubmit = (data: TripFormInputs) => {
    const tripPayload = {
      ...data,
      price: Number(data.price),
      durationDays: Number(data.durationDays),
      availableSeats: Number(data.availableSeats),
      totalSeats: Number(data.totalSeats),
      hotelStars: Number(data.hotelStars),
      servicesAr: ['تأشيرة العمرة', 'فندق 5 نجوم', 'مواصلات VIP', 'إرشاد ديني'],
      servicesEn: ['Umrah Visa', '5-Star Hotel', 'VIP Bus', 'Religious Guide'],
      galleryImages: [data.coverImage],
    };

    if (isEdit && id) {
      updateTrip(id, tripPayload);
    } else {
      addTrip(tripPayload);
    }
    navigate('/admin/trips');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate('/admin/trips')}
            className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-amber-500 mb-1"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>العودة لجدول الرحلات</span>
          </button>
          <h2 className="text-xl font-black text-slate-900 dark:text-white">
            {isEdit ? 'تعديل بيانات الرحلة' : t('admin.addTrip')}
          </h2>
        </div>
      </div>

      <Card hoverEffect={false} className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="اسم الرحلة (بالعربية)"
              placeholder="مثال: رحلة العمرة الفاخرة"
              {...register('titleAr', { required: true })}
            />
            <Input
              label="Trip Title (English)"
              placeholder="e.g. Luxury Umrah Package"
              {...register('titleEn', { required: true })}
            />
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Textarea
              label="الوصف (بالعربية)"
              placeholder="اكتب وصفاً تفصيلياً للرحلة..."
              {...register('descriptionAr')}
            />
            <Textarea
              label="Description (English)"
              placeholder="Detailed trip description..."
              {...register('descriptionEn')}
            />
          </div>

          {/* Type, Status & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="نوع الرحلة"
              options={[
                { value: 'umrah', label: t('featured.umrah') },
                { value: 'hajj', label: t('featured.hajj') },
              ]}
              {...register('type')}
            />

            <Input
              type="number"
              label="السعر (بالريال السعودي)"
              placeholder="4800"
              {...register('price', { required: true })}
            />

            <Select
              label="حالة النشر"
              options={[
                { value: 'published', label: t('admin.statusPublished') },
                { value: 'draft', label: t('admin.statusDraft') },
              ]}
              {...register('status')}
            />
          </div>

          {/* Dates & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              type="date"
              label="تاريخ البداية"
              {...register('startDate')}
            />
            <Input
              type="date"
              label="تاريخ النهاية"
              {...register('endDate')}
            />
            <Input
              type="number"
              label="المدة (بالأيام)"
              {...register('durationDays')}
            />
          </div>

          {/* Hotel & Airline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="اسم الفندق (عربي)"
              placeholder="فيرمونت برج الساعة"
              {...register('hotelNameAr')}
            />
            <Input
              label="اسم شركة الطيران"
              placeholder="الخطوط السعودية"
              {...register('airlineAr')}
            />
          </div>

          {/* Seats & Cover Image */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="number"
              label="المقاعد المتاحة"
              {...register('availableSeats')}
            />
            <Input
              label="رابط صورة الغلاف (URL)"
              placeholder="https://images.unsplash.com/..."
              {...register('coverImage')}
            />
          </div>

          {/* Submit & Cancel Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate('/admin/trips')}
              leftIcon={<X className="w-4 h-4" />}
            >
              {t('admin.cancel')}
            </Button>
            <Button
              type="submit"
              variant="gold"
              className="font-bold shadow-glow-gold"
              leftIcon={<Save className="w-4 h-4" />}
            >
              {t('admin.save')}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

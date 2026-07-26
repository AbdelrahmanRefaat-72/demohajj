import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAppStore } from '../../store/useAppStore';
import { SectionTitle } from '../../components/customer/SectionTitle';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { formatPrice } from '../../utils/formatters';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, User, Phone, Mail, Flag, Users, BedDouble, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { RoomType } from '../../types';

// Zod Schema for validation
const bookingSchema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يحتوي على 3 حروف على الأقل'),
  phone: z.string().min(8, 'رقم الجوال غير صحيح'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  nationality: z.string().min(2, 'يرجى تحديد الجنسية'),
  tripId: z.string().min(1, 'يرجى اختيار الرحلة'),
  travelersCount: z.coerce.number().min(1, 'عدد المسافرين يجب أن يكون 1 على الأقل').max(10, 'الحد الأقصى 10 مسافرين'),
  roomType: z.enum(['single', 'double', 'triple', 'quad']),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const Booking: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const trips = useAppStore((state) => state.trips);
  const addBooking = useAppStore((state) => state.addBooking);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const defaultTrip = trips.find((t) => t.id === id) || trips[0];
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [submittedBookingId, setSubmittedBookingId] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      nationality: isRtl ? 'سعودي' : 'Saudi Arabia',
      tripId: defaultTrip?.id || '',
      travelersCount: 2,
      roomType: 'double',
    },
  });

  const formData = watch();
  const selectedTrip = trips.find((t) => t.id === formData.tripId) || defaultTrip;

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger(['fullName', 'phone', 'email', 'nationality']);
      if (isValid) setCurrentStep(2);
    } else if (currentStep === 2) {
      const isValid = await trigger(['tripId', 'travelersCount', 'roomType']);
      if (isValid) setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1 && currentStep <= 3) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const onSubmit = (data: BookingFormData) => {
    const newId = addBooking({
      tripId: data.tripId,
      tripNameAr: selectedTrip.titleAr,
      tripNameEn: selectedTrip.titleEn,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      nationality: data.nationality,
      travelersCount: data.travelersCount,
      roomType: data.roomType as RoomType,
    });
    setSubmittedBookingId(newId);
    setCurrentStep(4); // Success Screen
  };

  const roomTypeLabels: Record<string, string> = {
    single: t('booking.single'),
    double: t('booking.double'),
    triple: t('booking.triple'),
    quad: t('booking.quad'),
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto space-y-6">
      <SectionTitle
        title={t('booking.title')}
        subtitle={selectedTrip ? (isRtl ? selectedTrip.titleAr : selectedTrip.titleEn) : ''}
      />

      {/* Progress Bar (Steps 1 to 3) */}
      {currentStep <= 3 && (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: t('booking.step1') },
              { step: 2, label: t('booking.step2') },
              { step: 3, label: t('booking.step3') },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    currentStep === item.step
                      ? 'bg-emerald-600 text-white shadow-md ring-4 ring-emerald-500/20'
                      : currentStep > item.step
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                  }`}
                >
                  {currentStep > item.step ? <CheckCircle2 className="w-5 h-5" /> : item.step}
                </div>
                <span
                  className={`text-[11px] font-bold mt-1.5 ${
                    currentStep >= item.step
                      ? 'text-slate-900 dark:text-white'
                      : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Steps */}
      <Card hoverEffect={false} className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* STEP 1: Personal Info */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                className="space-y-4"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('booking.step1')}</span>
                </h3>

                <Input
                  label={t('booking.fullName')}
                  leftIcon={<User className="w-4 h-4" />}
                  placeholder="مثال: عبدالرحمن محمد العتيبي"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />

                <Input
                  label={t('booking.phone')}
                  leftIcon={<Phone className="w-4 h-4" />}
                  placeholder="+966 50 000 0000"
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Input
                  label={t('booking.email')}
                  leftIcon={<Mail className="w-4 h-4" />}
                  placeholder="name@example.com"
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label={t('booking.nationality')}
                  leftIcon={<Flag className="w-4 h-4" />}
                  placeholder="مثال: سعودي / إماراتي"
                  error={errors.nationality?.message}
                  {...register('nationality')}
                />
              </motion.div>
            )}

            {/* STEP 2: Trip Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                className="space-y-4"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BedDouble className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('booking.step2')}</span>
                </h3>

                {/* Trip Select */}
                <Select
                  label={t('booking.selectTrip')}
                  options={trips.map((tItem) => ({
                    value: tItem.id,
                    label: isRtl ? tItem.titleAr : tItem.titleEn,
                  }))}
                  error={errors.tripId?.message}
                  {...register('tripId')}
                />

                {/* Travelers Count */}
                <Input
                  type="number"
                  label={t('booking.travelersCount')}
                  leftIcon={<Users className="w-4 h-4" />}
                  min={1}
                  max={10}
                  error={errors.travelersCount?.message}
                  {...register('travelersCount')}
                />

                {/* Room Type */}
                <Select
                  label={t('booking.roomType')}
                  options={[
                    { value: 'single', label: t('booking.single') },
                    { value: 'double', label: t('booking.double') },
                    { value: 'triple', label: t('booking.triple') },
                    { value: 'quad', label: t('booking.quad') },
                  ]}
                  error={errors.roomType?.message}
                  {...register('roomType')}
                />
              </motion.div>
            )}

            {/* STEP 3: Review & Confirm */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRtl ? -20 : 20 }}
                className="space-y-4"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('booking.step3')}</span>
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 space-y-3 border border-slate-200/60 dark:border-slate-700 text-xs">
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500">{t('booking.selectTrip')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {isRtl ? selectedTrip.titleAr : selectedTrip.titleEn}
                    </span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500">{t('booking.fullName')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{formData.fullName}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500">{t('booking.phone')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{formData.phone}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500">{t('booking.travelersCount')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{formData.travelersCount}</span>
                  </div>

                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                    <span className="text-slate-500">{t('booking.roomType')}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{roomTypeLabels[formData.roomType]}</span>
                  </div>

                  <div className="flex justify-between pt-1 text-sm font-black text-amber-600 dark:text-amber-400">
                    <span>{t('tripDetails.price')}</span>
                    <span>
                      {formatPrice(selectedTrip.price * (formData.travelersCount || 1), selectedTrip.currency, language)}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Success Screen */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-8 text-center space-y-5"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-glow-emerald">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {t('booking.successTitle')}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
                    {t('booking.successMessage')}
                  </p>
                  <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold rounded-full mt-2">
                    رقم الطلب: #{submittedBookingId}
                  </span>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link to="/" className="w-full sm:w-auto">
                    <Button variant="primary" className="w-full sm:w-auto">
                      {t('booking.returnHome')}
                    </Button>
                  </Link>
                  <Link to="/trips" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                      {t('booking.browseMore')}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form Control Buttons */}
          {currentStep <= 3 && (
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              {currentStep > 1 ? (
                <Button variant="secondary" type="button" onClick={prevStep}>
                  {t('booking.back')}
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <Button
                  variant="gold"
                  type="button"
                  onClick={nextStep}
                  rightIcon={isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                >
                  {t('booking.next')}
                </Button>
              ) : (
                <Button
                  variant="gold"
                  type="submit"
                  className="font-bold shadow-glow-gold"
                  rightIcon={<Sparkles className="w-4 h-4" />}
                >
                  {t('booking.submit')}
                </Button>
              )}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { formatPrice, formatDate } from '../../utils/formatters';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  Hotel,
  Plane,
  Star,
  CheckCircle2,
  HelpCircle,
  Clock,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

export const TripDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const trips = useAppStore((state) => state.trips);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const trip = trips.find((t) => t.id === id) || trips[0];
  const [selectedImage, setSelectedImage] = useState(trip?.coverImage || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'services' | 'faq'>('overview');

  if (!trip) {
    return <div className="p-8 text-center text-slate-500">Trip not found</div>;
  }

  const title = isRtl ? trip.titleAr : trip.titleEn;
  const description = isRtl ? trip.descriptionAr : trip.descriptionEn;
  const hotelName = isRtl ? trip.hotelNameAr : trip.hotelNameEn;
  const airline = isRtl ? trip.airlineAr : trip.airlineEn;
  const services = isRtl ? trip.servicesAr : trip.servicesEn;
  const gallery = trip.galleryImages?.length ? trip.galleryImages : [trip.coverImage];

  return (
    <div className="pb-24">
      {/* Back Button Header */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <span>{t('booking.back')}</span>
        </button>

        <Badge variant={trip.type === 'hajj' ? 'gold' : 'emerald'} size="md">
          {trip.type === 'hajj' ? t('featured.hajj') : t('featured.umrah')}
        </Badge>
      </div>

      {/* Hero Image & Gallery */}
      <div className="px-4 space-y-3">
        <div className="relative h-64 sm:h-80 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-lg">
          <img
            src={selectedImage || trip.coverImage}
            alt={title}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute bottom-3 right-3 rtl:right-3 ltr:left-3 ltr:right-auto">
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-white bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>{trip.availableSeats} {t('featured.seatsLeft')}</span>
            </span>
          </div>
        </div>

        {/* Thumbnail Selector */}
        {gallery.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {gallery.map((imgUrl, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(imgUrl)}
                className={`w-16 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                  selectedImage === imgUrl ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70'
                }`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Title & Key Specs */}
      <div className="px-4 mt-5 space-y-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
            {title}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {formatDate(trip.startDate, language)} - {formatDate(trip.endDate, language)}
          </p>
        </div>

        {/* Quick Spec Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
            <Calendar className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-400 font-medium">{t('tripDetails.duration')}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{trip.durationDays} {t('tripDetails.days')}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
            <Hotel className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] text-slate-400 font-medium">{t('tripDetails.hotel')}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">{hotelName}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
            <Plane className="w-5 h-5 text-sky-500 shrink-0" />
            <div className="truncate">
              <span className="block text-[10px] text-slate-400 font-medium">{t('tripDetails.airline')}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block">{airline}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 flex items-center gap-2.5">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 shrink-0" />
            <div>
              <span className="block text-[10px] text-slate-400 font-medium">{t('stats.customerRating')}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{trip.hotelStars} Stars</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 pt-2">
          {[
            { id: 'overview', label: t('tripDetails.overview') },
            { id: 'itinerary', label: t('tripDetails.itinerary') },
            { id: 'services', label: t('tripDetails.services') },
            { id: 'faq', label: t('tripDetails.faq') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'itinerary' | 'services' | 'faq')}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all relative shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="pt-2">
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {description}
              </p>
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                <span className="font-bold block">ملاحظة هامة:</span>
                <span>جميع الوجبات والخدمات الإرشادية والانتقالات بحافلات VIP مكيفة ومغطاة بالكامل طوال مدة الرحلة.</span>
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div className="space-y-3">
              {trip.itinerary && trip.itinerary.length > 0 ? (
                trip.itinerary.map((item) => (
                  <Card key={item.day} hoverEffect={false} className="p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
                      {item.day}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {isRtl ? item.titleAr : item.titleEn}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {isRtl ? item.descAr : item.descEn}
                      </p>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="space-y-2">
                  {[1, 2, 3].map((dayNum) => (
                    <Card key={dayNum} hoverEffect={false} className="p-4 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-black text-xs shrink-0">
                        {dayNum}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {isRtl ? `اليوم ${dayNum}: العبادة والمزارات` : `Day ${dayNum}: Rituals & Ziyarat`}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          {isRtl ? 'برنامج عبادة مكثف مع جولات تفقدية للمشاهد الإسلامية الخالدة.' : 'Intensive spiritual schedule with scholar guided visits.'}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{service}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'faq' && (
            <div className="space-y-3">
              {(trip.faqs || [
                { qAr: 'هل التكلفة تشمل التأشيرة والإقامة؟', qEn: 'Does the price include visa and hotel?', aAr: 'نعم التكلفة شاملة التأشيرة الإلكترونية والإقامة والتنقلات والطيران.', aEn: 'Yes, full package includes e-visa, 5-star hotel, transfers and flights.' },
                { qAr: 'ما هي سياسة الإلغاء؟', qEn: 'What is the cancellation policy?', aAr: 'يمكن الإلغاء واسترجاع المبلغ كاملاً حتى 14 يوماً قبل موعد المغادرة.', aEn: 'Free cancellation up to 14 days prior to departure.' }
              ]).map((faq, i) => (
                <Card key={i} hoverEffect={false} className="p-4 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-amber-600 dark:text-amber-400">
                    <HelpCircle className="w-4 h-4 shrink-0" />
                    <span>{isRtl ? faq.qAr : faq.qEn}</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pr-6 rtl:pr-6 ltr:pl-6 ltr:pr-0">
                    {isRtl ? faq.aAr : faq.aEn}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Booking Bar at Bottom */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center justify-between shadow-2xl">
        <div>
          <span className="block text-[10px] text-slate-400 font-semibold">{t('tripDetails.price')}</span>
          <span className="text-lg font-black text-amber-600 dark:text-amber-400">
            {formatPrice(trip.price, trip.currency, language)}
          </span>
        </div>

        <Link to={`/booking/${trip.id}`}>
          <Button
            variant="gold"
            size="lg"
            className="font-bold shadow-glow-gold"
            rightIcon={isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          >
            {t('nav.bookNow')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

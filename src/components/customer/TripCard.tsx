import React from 'react';
import { Trip } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatPrice } from '../../utils/formatters';
import { Calendar, Users, Hotel, Plane, ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';

export interface TripCardProps {
  trip: Trip;
}

export const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const title = isRtl ? trip.titleAr : trip.titleEn;
  const hotelName = isRtl ? trip.hotelNameAr : trip.hotelNameEn;
  const airline = isRtl ? trip.airlineAr : trip.airlineEn;

  return (
    <Card hoverEffect variant="default" className="flex flex-col h-full group border border-slate-200/80 dark:border-slate-800/80 shadow-luxury dark:shadow-dark-luxury rounded-2xl overflow-hidden bg-white dark:bg-slate-900">
      {/* Cover Image Container */}
      <div className="relative h-44 w-full overflow-hidden bg-slate-950">
        <img
          src={trip.coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

        {/* Trip Type Badge */}
        <div className="absolute top-2.5 right-2.5 rtl:right-2.5 ltr:left-2.5 ltr:right-auto z-10">
          <Badge variant={trip.type === 'hajj' ? 'gold' : 'emerald'} size="sm" className="shadow-md font-bold">
            {trip.type === 'hajj' ? t('featured.hajj') : t('featured.umrah')}
          </Badge>
        </div>

        {/* Seats Badge */}
        <div className="absolute bottom-2.5 left-2.5 rtl:left-2.5 ltr:right-2.5 ltr:left-auto z-10">
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20">
            <Users className="w-3 h-3 text-amber-400" />
            <span>{trip.availableSeats} {t('featured.seatsLeft')}</span>
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {title}
          </h3>

          {/* Quick Specs Grid */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="font-semibold">{trip.durationDays} {t('tripDetails.days')}</span>
            </div>

            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 justify-between">
              <span className="text-[10px] text-slate-400">الفندق</span>
              <div className="flex items-center gap-0.5 font-bold text-amber-500">
                <span>{trip.hotelStars}</span>
                <Star className="w-3 h-3 fill-amber-400" />
              </div>
            </div>

            <div className="col-span-2 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 truncate">
              <Hotel className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate font-medium">{hotelName}</span>
            </div>

            <div className="col-span-2 flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 truncate">
              <Plane className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span className="truncate font-medium">{airline}</span>
            </div>
          </div>
        </div>

        {/* Footer: Price & Details Button */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
          <div>
            <span className="block text-[9px] text-slate-400 font-semibold">{t('tripDetails.from')}</span>
            <span className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400">
              {formatPrice(trip.price, trip.currency, language)}
            </span>
          </div>

          <Link to={`/trips/${trip.id}`}>
            <Button
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5 font-bold shadow-md"
              rightIcon={isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('featured.viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

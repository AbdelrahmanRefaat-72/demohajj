import React, { useState, useMemo } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { TripCard } from '../../components/customer/TripCard';
import { SectionTitle } from '../../components/customer/SectionTitle';
import { Search } from '../../components/common/Search';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Trips: React.FC = () => {
  const { t } = useTranslation();
  const trips = useAppStore((state) => state.trips);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'hajj' | 'umrah'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'duration'>('default');

  const filteredTrips = useMemo(() => {
    return trips
      .filter((trip) => trip.status === 'published')
      .filter((trip) => {
        if (selectedType !== 'all' && trip.type !== selectedType) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const title = (isRtl ? trip.titleAr : trip.titleEn).toLowerCase();
          const hotel = (isRtl ? trip.hotelNameAr : trip.hotelNameEn).toLowerCase();
          return title.includes(q) || hotel.includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'duration') return b.durationDays - a.durationDays;
        return 0;
      });
  }, [trips, selectedType, searchQuery, sortBy, isRtl]);

  return (
    <div className="px-4 py-6 space-y-6">
      <SectionTitle
        title={t('tripsPage.title')}
        subtitle={t('tripsPage.subtitle')}
      />

      {/* Filter & Search Bar */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <Search
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t('tripsPage.searchPlaceholder')}
        />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Trip Type Pills */}
          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: t('tripsPage.filterAll') },
              { id: 'hajj', label: t('tripsPage.filterHajj') },
              { id: 'umrah', label: t('tripsPage.filterUmrah') },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id as 'all' | 'hajj' | 'umrah')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedType === type.id
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="w-full sm:w-48">
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'price-asc' | 'price-desc' | 'duration')}
              options={[
                { value: 'default', label: t('tripsPage.sortDefault') },
                { value: 'price-asc', label: t('tripsPage.sortPriceLow') },
                { value: 'price-desc', label: t('tripsPage.sortPriceHigh') },
                { value: 'duration', label: t('tripsPage.sortDuration') },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Trips Grid */}
      {filteredTrips.length === 0 ? (
        <EmptyState title={t('tripsPage.noResults')} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

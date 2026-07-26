import React from 'react';
import { HeroSection } from '../../components/customer/HeroSection';
import { SectionTitle } from '../../components/customer/SectionTitle';
import { TripCard } from '../../components/customer/TripCard';
import { TestimonialCard } from '../../components/customer/TestimonialCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useAppStore } from '../../store/useAppStore';
import { TESTIMONIALS, COMPANY_INFO } from '../../data/mockData';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Award,
  Users,
  Compass,
  Star,
  ShieldCheck,
  Hotel,
  HeartHandshake,
  Bus,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const trips = useAppStore((state) => state.trips);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const featuredTrips = trips.filter((trip) => trip.isFeatured).slice(0, 4);

  const stats = [
    { title: t('stats.yearsExperience'), value: '15+', icon: Award, color: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
    { title: t('stats.pilgrimsServed'), value: '25,000+', icon: Users, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
    { title: t('stats.availableTrips'), value: `${trips.length}`, icon: Compass, color: 'text-sky-500 bg-sky-500/10 border-sky-500/20' },
    { title: t('stats.customerRating'), value: '4.9 ★', icon: Star, color: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20' },
  ];

  const whyChooseUs = [
    { title: t('whyUs.trusted'), desc: t('whyUs.trustedDesc'), icon: ShieldCheck },
    { title: t('whyUs.hotels'), desc: t('whyUs.hotelsDesc'), icon: Hotel },
    { title: t('whyUs.support'), desc: t('whyUs.supportDesc'), icon: HeartHandshake },
    { title: t('whyUs.transport'), desc: t('whyUs.transportDesc'), icon: Bus },
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Statistics Cards Grid (Ultra Sleek Mobile Layout) */}
      <section className="px-3">
        <div className="grid grid-cols-2 gap-2.5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card hoverEffect={false} className="p-3 text-center flex flex-col items-center justify-center border border-slate-200/60 dark:border-slate-800">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-1.5 ${stat.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                    {stat.title}
                  </span>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="px-3">
        <SectionTitle
          title={t('whyUs.title')}
          subtitle={t('whyUs.subtitle')}
          badge={t('appName')}
          className="mb-4"
        />

        <div className="grid grid-cols-1 gap-2.5">
          {whyChooseUs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card hoverEffect={false} className="p-3.5 flex items-center gap-3.5 border border-slate-200/80 dark:border-slate-800">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-700 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Trips Section */}
      <section className="px-3">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider block">باقات العمرة والحج</span>
            <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
              {t('featured.title')}
            </h2>
          </div>
          <Link to="/trips">
            <Button
              variant="ghost"
              size="sm"
              className="text-amber-600 dark:text-amber-400 font-bold text-xs px-2 py-1"
              rightIcon={isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('tripsPage.filterAll')}
            </Button>
          </Link>
        </div>

        {/* Trips Grid for Mobile */}
        <div className="grid grid-cols-1 gap-3.5">
          {featuredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="px-3">
        <div className="p-4 bg-slate-900/40 dark:bg-slate-900/80 rounded-2xl border border-slate-800 space-y-4">
          <SectionTitle
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
            className="mb-2"
          />

          <div className="grid grid-cols-1 gap-3">
            {TESTIMONIALS.map((tItem) => (
              <TestimonialCard key={tItem.id} testimonial={tItem} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <footer className="px-4 pt-6 pb-2 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-amber-500 text-white flex items-center justify-center font-bold text-sm">
              ص
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
              {t('appName')}
            </h4>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {isRtl ? COMPANY_INFO.sloganAr : COMPANY_INFO.sloganEn}
          </p>

          {/* Contact Details */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 dark:text-white text-xs mb-2">
              {t('footer.contactInfo')}
            </h5>
            <a href={COMPANY_INFO.socials.whatsappKsa} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono">🇸🇦 {COMPANY_INFO.phoneKsa}</span>
            </a>
            <a href={COMPANY_INFO.socials.whatsappEg} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono">🇪🇬 {COMPANY_INFO.phoneEg}</span>
            </a>
            <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 hover:text-amber-500 transition-colors">
              <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="font-mono">{COMPANY_INFO.email}</span>
            </a>
            <div className="flex items-start gap-2 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <span>{isRtl ? COMPANY_INFO.addressAr : COMPANY_INFO.addressEn}</span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800/80 text-center text-[10px] text-slate-500">
          {t('footer.rights')}
        </div>
      </footer>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Star } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  return (
    <div className="relative min-h-[440px] flex items-center justify-center overflow-hidden rounded-b-[32px] shadow-2xl border-b border-amber-500/20">
      {/* High Quality Kaaba Photo */}
      <img
        src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1600&q=80"
        alt="الكعبة المشرفة - المسجد الحرام"
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
      />

      {/* Dark Luxury Gradient Overlays for High Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/60" />
      <div className="absolute inset-0 bg-emerald-950/30 mix-blend-overlay" />

      {/* Decorative Gold Elements */}
      <div className="absolute top-4 right-4 text-amber-400/40 animate-pulse pointer-events-none">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-6 left-4 text-amber-400/30 pointer-events-none">
        <Star className="w-8 h-8" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 px-5 py-8 text-center max-w-lg flex flex-col items-center">
        {/* Company Logo Icon */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 p-0.5 shadow-glow-gold mb-3"
        >
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <span className="text-2xl font-black text-amber-400 font-cairo">ص</span>
          </div>
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-tight"
        >
          {t('appName')}
        </motion.h1>

        {/* Slogan */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-2 text-xs sm:text-sm text-amber-300/90 font-medium max-w-xs sm:max-w-sm leading-relaxed"
        >
          "{t('appSlogan')}"
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-6 flex items-center justify-center gap-2.5 w-full"
        >
          <Link to="/booking" className="flex-1 max-w-[160px]">
            <Button
              variant="gold"
              size="md"
              className="w-full font-bold shadow-glow-gold text-xs"
              rightIcon={isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('nav.bookNow')}
            </Button>
          </Link>

          <Link to="/trips" className="flex-1 max-w-[160px]">
            <Button
              variant="outline"
              size="md"
              className="w-full border-slate-300/40 text-white hover:bg-white/10 backdrop-blur-sm text-xs"
            >
              {t('nav.exploreTrips')}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

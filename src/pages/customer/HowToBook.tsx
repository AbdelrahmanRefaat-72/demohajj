import React from 'react';
import { SectionTitle } from '../../components/customer/SectionTitle';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Compass, Edit3, ClipboardCheck, FileCheck, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';

export const HowToBook: React.FC = () => {
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const steps = [
    { num: 1, title: t('howToBook.step1Title'), desc: t('howToBook.step1Desc'), icon: Compass, color: 'text-amber-500 bg-amber-100 dark:bg-amber-950/80' },
    { num: 2, title: t('howToBook.step2Title'), desc: t('howToBook.step2Desc'), icon: Edit3, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80' },
    { num: 3, title: t('howToBook.step3Title'), desc: t('howToBook.step3Desc'), icon: ClipboardCheck, color: 'text-sky-500 bg-sky-100 dark:bg-sky-950/80' },
    { num: 4, title: t('howToBook.step4Title'), desc: t('howToBook.step4Desc'), icon: FileCheck, color: 'text-purple-500 bg-purple-100 dark:bg-purple-950/80' },
    { num: 5, title: t('howToBook.step5Title'), desc: t('howToBook.step5Desc'), icon: CheckCircle2, color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-950/80' },
  ];

  return (
    <div className="px-4 py-6 space-y-8 max-w-xl mx-auto">
      <SectionTitle
        title={t('howToBook.title')}
        subtitle={t('howToBook.subtitle')}
      />

      {/* Vertical Timeline */}
      <div className="relative pl-6 rtl:pl-0 rtl:pr-6 space-y-6">
        {/* Timeline Vertical Line */}
        <div className="absolute top-4 bottom-4 left-6 rtl:left-auto rtl:right-6 w-0.5 bg-gradient-to-b from-amber-500 via-emerald-600 to-amber-500/20" />

        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Timeline Icon Badge */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-md ${step.color}`}>
                <Icon className="w-6 h-6" />
              </div>

              {/* Step Content Card */}
              <Card hoverEffect className="p-5 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                    الخطوة {step.num} / Step {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="pt-4 text-center">
        <Link to="/trips">
          <Button
            variant="gold"
            size="lg"
            className="font-bold shadow-glow-gold"
            rightIcon={isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
          >
            {t('nav.exploreTrips')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

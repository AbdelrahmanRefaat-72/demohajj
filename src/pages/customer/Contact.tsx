import React, { useState } from 'react';
import { SectionTitle } from '../../components/customer/SectionTitle';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Textarea } from '../../components/common/Textarea';
import { Button } from '../../components/common/Button';
import { COMPANY_INFO } from '../../data/mockData';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';
import { Phone, MessageCircle, Mail, MapPin, Send, Map } from 'lucide-react';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const showToast = useAppStore((state) => state.showToast);
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast(isRtl ? 'يرجى تعبئة جميع الحقول' : 'Please fill all fields', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(t('contact.sentToast'), 'success');
      setName('');
      setPhone('');
      setMessage('');
    }, 600);
  };

  const contactCards = [
    { title: 'السعودية (اتصال / واتساب)', val: COMPANY_INFO.phoneKsa, icon: Phone, color: 'text-amber-500 bg-amber-100 dark:bg-amber-950/80', link: COMPANY_INFO.socials.whatsappKsa, flag: '🇸🇦' },
    { title: 'مصر (اتصال / واتساب)', val: COMPANY_INFO.phoneEg, icon: MessageCircle, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/80', link: COMPANY_INFO.socials.whatsappEg, flag: '🇪🇬' },
    { title: t('contact.email'), val: COMPANY_INFO.email, icon: Mail, color: 'text-sky-500 bg-sky-100 dark:bg-sky-950/80', link: `mailto:${COMPANY_INFO.email}`, flag: '✉️' },
    { title: t('contact.office'), val: isRtl ? COMPANY_INFO.addressAr : COMPANY_INFO.addressEn, icon: MapPin, color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-950/80', link: '#', flag: '🕋' },
  ];

  return (
    <div className="px-4 py-6 space-y-6 max-w-xl mx-auto">
      <SectionTitle
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
      />

      {/* 4 Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {contactCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <a key={idx} href={card.link} target={card.link.startsWith('http') ? '_blank' : '_self'} rel="noreferrer">
              <Card hoverEffect className="p-3.5 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="truncate flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">{card.title}</span>
                    <span className="text-xs">{card.flag}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate block font-mono">
                    {card.val}
                  </span>
                </div>
              </Card>
            </a>
          );
        })}
      </div>

      {/* Google Maps Placeholder */}
      <Card hoverEffect={false} className="overflow-hidden">
        <div className="relative h-44 bg-slate-900 flex flex-col items-center justify-center text-center p-5 space-y-2">
          <div className="w-11 h-11 rounded-full bg-emerald-600/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-glow-gold">
            <Map className="w-5 h-5 animate-pulse" />
          </div>
          <h4 className="text-sm font-bold text-white">مكة المكرمة - برج الصفا التجاري</h4>
          <p className="text-xs text-slate-400">طريق الملك فهد، مقابل ساحة المسجد الحرام</p>
          <span className="text-[10px] text-amber-400 font-mono bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
            codex.tech96@gmail.com
          </span>
        </div>
      </Card>

      {/* Contact Form */}
      <Card hoverEffect={false} className="p-5">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          {t('contact.formTitle')}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label={t('contact.name')}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ادخل اسمك الكامل"
          />

          <Input
            label={t('contact.phone')}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="رقم الجوال مع الرمز الدولي"
          />

          <Textarea
            label={t('contact.message')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="كيف يمكننا مساعدتك في رحلتك القادمة؟"
          />

          <Button
            variant="gold"
            type="submit"
            size="lg"
            isLoading={isSubmitting}
            className="w-full font-bold shadow-glow-gold"
            rightIcon={<Send className="w-4 h-4" />}
          >
            {t('contact.sendMessage')}
          </Button>
        </form>
      </Card>
    </div>
  );
};

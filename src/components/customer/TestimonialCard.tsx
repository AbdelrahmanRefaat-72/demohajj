import React from 'react';
import { Testimonial } from '../../types';
import { Card } from '../common/Card';
import { Star, Quote } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  const language = useAppStore((state) => state.language);
  const isRtl = language === 'ar';

  const role = isRtl ? testimonial.roleAr : testimonial.roleEn;
  const comment = isRtl ? testimonial.commentAr : testimonial.commentEn;

  return (
    <Card hoverEffect variant="gold" className="p-5 flex flex-col justify-between relative">
      <Quote className="absolute top-4 ltr:right-4 rtl:left-4 w-8 h-8 text-amber-500/10 pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Comment Text */}
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic mb-4">
          "{comment}"
        </p>
      </div>

      {/* User Avatar & Info */}
      <div className="flex items-center gap-3 pt-3 border-t border-amber-200/40 dark:border-slate-800">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-amber-400/60 shadow-sm"
        />
        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
          <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">{role}</span>
        </div>
      </div>
    </Card>
  );
};

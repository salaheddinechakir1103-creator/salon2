import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface TestimonialsSectionProps {
  currentLang?: Language;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ currentLang = 'fr' }) => {
  const t = TRANSLATIONS[currentLang].testimonials;

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-2 sm:mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight mb-2 sm:mb-3">
            {t.title}
          </h2>
          <div className="text-xs text-[#8C6A3C] italic tracking-wide">
            {t.demoNotice}
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {t.items.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#B89058]/20 flex flex-col justify-between hover:border-[#B89058]/50 transition-all duration-300 relative shadow-xs hover:shadow-md text-start"
            >
              <div>
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#B89058]/40 mb-4 sm:mb-6" />
                <p className="font-serif text-base sm:text-lg text-[#181416] font-light leading-relaxed mb-5 sm:mb-6 italic">
                  « {item.quote} »
                </p>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-[#B89058]/15">
                <div className="font-serif text-base text-[#181416] font-medium">
                  {item.name}
                </div>
                <div className="text-xs text-[#5A504B] mb-1.5 font-light">
                  {item.role} · {item.city}
                </div>
                <div className="text-[11px] text-[#8C6A3C] tracking-wide uppercase font-semibold">
                  {item.ritual}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

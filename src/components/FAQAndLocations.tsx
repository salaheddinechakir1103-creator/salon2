import React, { useState } from 'react';
import { ChevronDown, MapPin, Clock, Phone, Mail, Sparkles } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface FAQAndLocationsProps {
  currentLang?: Language;
}

export const FAQAndLocations: React.FC<FAQAndLocationsProps> = ({ currentLang = 'fr' }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const t = TRANSLATIONS[currentLang].sanctuaries;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="sanctuaires" className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Sanctuaries Showcase */}
        <div className="mb-16 sm:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-2 sm:mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
              <span>{t.kicker}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight mb-3">
              {t.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5A504B] font-light">
              {t.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {t.locations.map((sanctuary) => (
              <div
                key={sanctuary.id}
                className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#B89058]/20 hover:border-[#B89058]/60 transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md text-start"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-xl sm:text-2xl text-[#181416] font-normal">
                      {sanctuary.city}
                    </span>
                    <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#8C6A3C] bg-[#F2EAE0] px-2.5 py-1 rounded-sm font-semibold">
                      {sanctuary.neighborhood}
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#5A504B] mb-5 sm:mb-6">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-3.5 h-3.5 text-[#B89058] shrink-0 mt-0.5" />
                      <span>{sanctuary.address}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-3.5 h-3.5 text-[#B89058] shrink-0 mt-0.5" />
                      <span>{sanctuary.hours}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#B89058] shrink-0" />
                      <span className="font-mono">{sanctuary.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="w-3.5 h-3.5 text-[#B89058] shrink-0" />
                      <span>{sanctuary.email}</span>
                    </div>
                  </div>

                  {/* Sanctuary Features */}
                  <div className="pt-3.5 border-t border-[#B89058]/15 space-y-1.5 mb-5">
                    {sanctuary.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-[#5A504B]">
                        <Sparkles className="w-3 h-3 text-[#B89058]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#B89058]/15">
                  <span className="text-[10px] text-[#8C6A3C] italic block">
                    {sanctuary.note}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto pt-8 sm:pt-12 border-t border-[#B89058]/20">
          <div className="text-center mb-8 sm:mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-1 sm:mb-2">
              {t.faqKicker}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#181416] font-light">
              {t.faqTitle}
            </h3>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {t.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-[#FFFFFF] border border-[#B89058]/20 overflow-hidden transition-all duration-200 shadow-2xs text-start"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-start flex items-center justify-between gap-3 sm:gap-4 hover:bg-[#FAF7F2] transition-colors min-h-[48px]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-base sm:text-lg text-[#181416] font-normal">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 sm:w-5 sm:h-5 text-[#B89058] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#5A504B] font-light leading-relaxed border-t border-[#B89058]/10 pt-3 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

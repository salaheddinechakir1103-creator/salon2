import fixedImage0 from '../assets/images/luminous_salon_station_1792400241745.jpg';
import React from 'react';
import { Sparkles, ShieldCheck, HeartHandshake } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface AboutSectionProps {
  currentLang?: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ currentLang = 'fr' }) => {
  const t = TRANSLATIONS[currentLang].about;

  return (
    <section id="histoire" className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE3] to-[#FAF7F2] relative border-b border-[#B89058]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Visual Architecture */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#B89058]/35 shadow-lg">
              <img
                src={fixedImage0}
                alt="Architecture lumineuse de Maison Éclat Casablanca"
                referrerPolicy="no-referrer"
                className="w-full h-[280px] sm:h-[420px] lg:h-[520px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Floating Architectural Placard */}
              <div className="absolute bottom-3 start-3 end-3 sm:bottom-6 sm:start-6 sm:end-6 p-3.5 sm:p-5 bg-[#FAF7F2]/95 backdrop-blur-md rounded-xl border border-[#B89058]/40 shadow-md text-start">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-1">
                  {t.photoTag}
                </div>
                <div className="font-serif text-sm sm:text-lg text-[#181416] font-normal leading-snug">
                  {t.photoDesc}
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -start-3 w-full h-full border border-[#B89058]/30 rounded-2xl -z-10 pointer-events-none hidden sm:block" />
          </div>

          {/* Right Column: Narrative Storytelling & Brand Values */}
          <div className="lg:col-span-6 flex flex-col justify-center text-start">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-2 sm:mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
              <span>{t.kicker}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight mb-4 sm:mb-6 [text-wrap:balance]">
              {t.title}
            </h2>

            <div className="space-y-3 sm:space-y-4 text-xs sm:text-base text-[#5A504B] font-light leading-relaxed mb-6 sm:mb-8">
              <p>{t.desc1}</p>
              <p>{t.desc2}</p>
            </div>

            {/* Three Pillar Points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 pt-4 sm:pt-6 border-t border-[#B89058]/20">
              <div className="space-y-1.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FAF7F2] border border-[#B89058]/40 flex items-center justify-center text-[#8C6A3C] shadow-2xs">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89058]" />
                </div>
                <h4 className="font-serif text-base text-[#181416] font-medium">{t.p1Title}</h4>
                <p className="text-xs text-[#5A504B] font-light leading-normal">{t.p1Desc}</p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FAF7F2] border border-[#B89058]/40 flex items-center justify-center text-[#8C6A3C] shadow-2xs">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89058]" />
                </div>
                <h4 className="font-serif text-base text-[#181416] font-medium">{t.p2Title}</h4>
                <p className="text-xs text-[#5A504B] font-light leading-normal">{t.p2Desc}</p>
              </div>

              <div className="space-y-1.5">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#FAF7F2] border border-[#B89058]/40 flex items-center justify-center text-[#8C6A3C] shadow-2xs">
                  <HeartHandshake className="w-4 h-4 sm:w-5 sm:h-5 text-[#B89058]" />
                </div>
                <h4 className="font-serif text-base text-[#181416] font-medium">{t.p3Title}</h4>
                <p className="text-xs text-[#5A504B] font-light leading-normal">{t.p3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

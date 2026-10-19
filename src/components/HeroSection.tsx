import React from 'react';
import { SalonStationCanvas } from './Hero3D/SalonStationCanvas';
import { ArrowDownRight, Compass, Sparkles } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface HeroSectionProps {
  onOpenBooking: () => void;
  currentLang?: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  currentLang = 'fr',
}) => {
  const t = TRANSLATIONS[currentLang].hero;

  return (
    <section className="relative min-h-[85vh] pt-16 sm:pt-28 pb-8 sm:pb-14 flex flex-col justify-between bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2] border-b border-[#B89058]/20 overflow-hidden w-full">
      {/* Background warm sunbeam ambient glow */}
      <div className="absolute top-1/4 end-1/3 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-[#B89058]/10 rounded-full blur-[70px] sm:blur-[130px] pointer-events-none" />

      {/* Main Hero Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center flex-1">
        {/* Left Column: Brand & Editorial Pitch */}
        <div className="lg:col-span-5 flex flex-col justify-center text-start py-1 sm:py-4">
          {/* Subtle Metadata Kicker */}
          <div className="flex items-center gap-1.5 text-[9px] sm:text-xs tracking-[0.2em] uppercase text-[#8C6A3C] font-semibold mb-1.5 sm:mb-4">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B89058] shrink-0" />
            <span>{t.kicker}</span>
          </div>

          {/* High-contrast Display Headline */}
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#181416] font-light leading-[1.12] sm:leading-[1.1] tracking-tight mb-3 sm:mb-6 [text-wrap:balance]">
            {t.headlineStart}
            <span className="italic font-normal text-gold-gradient">{t.headlineHighlight}</span>
            {t.headlineEnd}
          </h1>

          {/* Subheading */}
          <p className="text-xs sm:text-base md:text-lg text-[#5A504B] font-light leading-relaxed mb-4 sm:mb-8 max-w-xl">
            {t.subheading}
          </p>

          {/* Action CTAs: Full width on mobile, inline on sm+ screens */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 mb-5 sm:mb-8 w-full sm:w-auto">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase rounded-sm transition-all duration-200 shadow-md min-h-[44px] w-full sm:w-auto"
            >
              <span>{t.ctaPrimary}</span>
              <ArrowDownRight className="w-4 h-4 text-[#FFFFFF] rtl:rotate-90 shrink-0" />
            </button>

            <a
              href="#rituels"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-5 py-3 sm:py-3.5 border border-[#B89058]/50 hover:border-[#8C6A3C] text-[#181416] hover:text-[#8C6A3C] text-xs font-medium tracking-wider uppercase rounded-sm transition-all duration-200 hover:bg-[#B89058]/10 min-h-[44px] w-full sm:w-auto"
            >
              <Compass className="w-4 h-4 text-[#B89058] shrink-0" />
              <span>{t.ctaSecondary}</span>
            </a>
          </div>

          {/* Trust Markers Strip */}
          <div className="pt-3.5 sm:pt-5 border-t border-[#B89058]/20 grid grid-cols-3 gap-1 sm:gap-4 text-xs text-[#5A504B] font-light">
            <div>
              <div className="font-serif text-sm sm:text-xl text-[#181416] font-normal leading-tight">{t.stat1Title}</div>
              <div className="text-[8.5px] sm:text-[11px] text-[#8C6A3C] leading-snug">{t.stat1Desc}</div>
            </div>
            <div className="border-s border-[#B89058]/25 ps-1.5 sm:ps-5">
              <div className="font-serif text-sm sm:text-xl text-[#181416] font-normal leading-tight">{t.stat2Title}</div>
              <div className="text-[8.5px] sm:text-[11px] text-[#8C6A3C] leading-snug">{t.stat2Desc}</div>
            </div>
            <div className="border-s border-[#B89058]/25 ps-1.5 sm:ps-5">
              <div className="font-serif text-sm sm:text-xl text-[#181416] font-normal leading-tight">{t.stat3Title}</div>
              <div className="text-[8.5px] sm:text-[11px] text-[#8C6A3C] leading-snug">{t.stat3Desc}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Realistic 3D Salon Station Experience */}
        <div className="lg:col-span-7 relative w-full flex items-center justify-center">
          <SalonStationCanvas onBookStation={onOpenBooking} currentLang={currentLang} />
        </div>
      </div>

      {/* Regional Strip */}
      <div className="relative z-10 w-full mt-5 sm:mt-8 py-2 sm:py-3.5 border-t border-[#B89058]/20 bg-[#FAF7F2]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4 text-xs text-[#5A504B] text-center sm:text-start">
          <div className="flex items-center gap-1.5">
            <span className="font-serif italic text-[#8C6A3C] font-medium text-[10px] sm:text-xs">{t.stripBrand}</span>
            <span className="text-[9.5px] sm:text-xs text-[#5A504B]">{t.stripDesc}</span>
          </div>
          <div className="text-[9px] sm:text-[11px] tracking-wider uppercase font-medium text-[#8C6A3C]">
            {t.cities}
          </div>
        </div>
      </div>
    </section>
  );
};

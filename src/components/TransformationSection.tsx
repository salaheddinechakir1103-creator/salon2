import fixedImage0 from '../assets/images/luminous_bridal_hair_1792400243018.jpg';
import fixedImage1 from '../assets/images/salon_transformation_gloss_1792365279344.jpg';
import React, { useState, useRef } from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface TransformationSectionProps {
  onBookGloss: () => void;
  currentLang?: Language;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({
  onBookGloss,
  currentLang = 'fr',
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef<boolean>(false);

  const t = TRANSLATIONS[currentLang].transformation;

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  return (
    <section id="transformation" className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative border-b border-[#B89058]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Story & Metrics */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-5 text-start">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
              <span>{t.kicker}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight [text-wrap:balance]">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-[#5A504B] font-light leading-relaxed">
              {t.desc}
            </p>

            <div className="space-y-2.5 sm:space-y-3.5 pt-3 border-t border-[#B89058]/20">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#5A504B]">{t.metric1Label}</span>
                <span className="font-mono text-[#8C6A3C] font-semibold">{t.metric1Value}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#5A504B]">{t.metric2Label}</span>
                <span className="font-mono text-[#8C6A3C] font-semibold">{t.metric2Value}</span>
              </div>
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-[#5A504B]">{t.metric3Label}</span>
                <span className="font-mono text-[#8C6A3C] font-semibold">{t.metric3Value}</span>
              </div>
            </div>

            <div className="pt-2 sm:pt-3">
              <button
                onClick={onBookGloss}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase rounded-sm transition-all shadow-md w-full sm:w-auto min-h-[44px]"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 text-[#FFFFFF] rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Before / After Dual Image Split Slider */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              dir="ltr"
              onMouseDown={() => (isDragging.current = true)}
              onMouseUp={() => (isDragging.current = false)}
              onMouseLeave={() => (isDragging.current = false)}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={() => (isDragging.current = false)}
              className="relative w-full h-[300px] sm:h-[420px] md:h-[480px] rounded-2xl overflow-hidden border border-[#B89058]/35 select-none shadow-lg cursor-ew-resize bg-[#F2EAE0] touch-pan-y"
            >
              {/* Image 1 (Full base) */}
              <img
                src={fixedImage0}
                alt="Coiffure en salon lumineux"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />

              {/* Image 2 (Clipped reveal pinned to left) */}
              <div
                className="absolute top-0 bottom-0 left-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={fixedImage1}
                  alt="Zoom macro brillance et glaçage gloss"
                  referrerPolicy="no-referrer"
                  className="absolute top-0 bottom-0 left-0 h-full object-cover object-left max-w-none"
                  style={{ width: containerRef.current?.clientWidth || '100%' }}
                  loading="lazy"
                />
              </div>

              {/* Slider Divider Bar */}
              <div
                className="absolute top-0 bottom-0 w-[2px] bg-[#FFFFFF] shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFFFF] border-2 border-[#B89058] flex items-center justify-center text-[#B89058] shadow-lg pointer-events-auto">
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute bottom-3 start-3 sm:bottom-4 sm:start-4 px-2.5 sm:px-3 py-1 bg-[#FFFFFF]/92 backdrop-blur-md rounded border border-[#B89058]/30 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#181416] font-medium pointer-events-none shadow-xs">
                {t.badgeLeft}
              </div>
              <div className="absolute bottom-3 end-3 sm:bottom-4 sm:end-4 px-2.5 sm:px-3 py-1 bg-[#FFFFFF]/92 backdrop-blur-md rounded border border-[#B89058]/30 text-[10px] sm:text-[11px] uppercase tracking-wider text-[#181416] font-medium pointer-events-none shadow-xs">
                {t.badgeRight}
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-[#5A504B] italic text-center">
              <span>{t.dragHint}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

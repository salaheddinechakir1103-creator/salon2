import React, { useState } from 'react';
import { Clock, ArrowRight, Sparkles } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface ServiceMenuSectionProps {
  onSelectServiceTitle: (title: string, category: string) => void;
  currentLang?: Language;
}

export const ServiceMenuSection: React.FC<ServiceMenuSectionProps> = ({
  onSelectServiceTitle,
  currentLang = 'fr',
}) => {
  const [selectedCat, setSelectedCat] = useState<'all' | 'coiffure' | 'visage' | 'onglerie' | 'hammam'>('all');
  const t = TRANSLATIONS[currentLang].pricing;

  const menuItems = selectedCat === 'all'
    ? t.items
    : t.items.filter((item) => item.category === selectedCat);

  return (
    <section id="tarifs" className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4ECE0] to-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Section Header */}
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

        {/* Category Navigation (Scrollable horizontally on mobile) */}
        <div className="flex items-center justify-center gap-1.5 p-1 bg-[#F2EAE0] rounded-lg border border-[#B89058]/25 mb-8 sm:mb-12 overflow-x-auto max-w-full">
          {[
            { id: 'all', label: t.filterAll },
            { id: 'coiffure', label: t.filterCoiffure },
            { id: 'visage', label: t.filterVisage },
            { id: 'onglerie', label: t.filterOnglerie },
            { id: 'hammam', label: t.filterHammam },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id as typeof selectedCat)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 min-h-[36px] ${
                selectedCat === cat.id
                  ? 'bg-[#B89058] text-[#FFFFFF] font-semibold shadow-xs'
                  : 'text-[#5A504B] hover:text-[#181416] bg-[#FFFFFF] border border-[#B89058]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="space-y-3.5 sm:space-y-4">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 md:p-7 rounded-2xl bg-[#FFFFFF] border border-[#B89058]/20 hover:border-[#B89058]/60 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 group hover:shadow-md shadow-xs text-start"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1.5">
                  <h3 className="font-serif text-lg sm:text-2xl text-[#181416] font-normal group-hover:text-[#8C6A3C] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-[#8C6A3C] bg-[#F2EAE0] px-2.5 py-0.5 rounded-full font-medium">
                    <Clock className="w-3 h-3 text-[#B89058]" />
                    <span>{item.duration}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-[#5A504B] font-light max-w-2xl leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Selection Button */}
              <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 shrink-0 border-t md:border-t-0 border-[#B89058]/15 pt-3 md:pt-0">
                <div className="text-start md:text-end">
                  <div className="font-mono text-lg sm:text-xl text-[#181416] tabular-nums font-semibold">
                    {item.priceMAD} MAD
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#8C6A3C]">
                    {t.approxEur} {item.priceEUR} €
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceTitle(item.title, item.category)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#FFFFFF] bg-[#B89058] hover:bg-[#8C6A3C] rounded-sm transition-all shadow-xs min-h-[40px]"
                >
                  <span>{t.choose}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FFFFFF] rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Note */}
        <div className="mt-8 text-center text-xs text-[#5A504B]/70 italic">
          {t.demoNote}
        </div>
      </div>
    </section>
  );
};

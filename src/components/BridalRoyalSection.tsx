import React from 'react';
import { Crown, Check, ArrowRight, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { TRANSLATIONS, Language } from '../data/translations';

interface BridalRoyalSectionProps {
  onBookBridal: () => void;
  currentLang?: Language;
}

export const BridalRoyalSection: React.FC<BridalRoyalSectionProps> = ({
  onBookBridal,
  currentLang = 'fr',
}) => {
  const t = TRANSLATIONS[currentLang].bridal;

  const handleWhatsAppBridal = () => {
    sounds.playBowlTone();
    const msg = encodeURIComponent(
      currentLang === 'ar'
        ? `السلام عليكم ميزون إكلا، أستعد لزفافي وأرغب في حجز استشارة خاصة بباقة العروس الملكية وحجز جناح الحمام وتصفيف الشعر. شكراً لإفادتي بالمواعيد المتاحة.`
        : `Bonjour Maison Éclat,\n\nJe prépare mon mariage et je souhaite solliciter un entretien privé pour le Forfait Mariée Impériale (essais coiffure, maquillage haute tenue et hammam privatisé).\n\nMerci de m'indiquer vos disponibilités.`
    );
    window.open(`https://api.whatsapp.com/send?phone=212600000000&text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="mariee" className="py-14 sm:py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F4EDE2] to-[#FAF7F2] relative border-b border-[#B89058]/20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Visual: Moroccan Royal Bride Editorial */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-[#B89058]/40 shadow-lg group">
              <img
                src="/src/assets/images/salon_bridal_couture_1792365278992.jpg"
                alt="Mariée marocaine haute couture chez Maison Éclat"
                referrerPolicy="no-referrer"
                className="w-full h-[320px] sm:h-[440px] lg:h-[540px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              {/* Floating caption placard */}
              <div className="absolute bottom-3 start-3 end-3 sm:bottom-6 sm:start-6 sm:end-6 p-4 sm:p-5 bg-[#FAF7F2]/95 backdrop-blur-md rounded-xl border border-[#B89058]/40 shadow-md text-start">
                <div className="flex items-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-1">
                  <Crown className="w-3.5 h-3.5 text-[#B89058] shrink-0" />
                  <span>{t.floatingTag}</span>
                </div>
                <div className="font-serif text-base sm:text-xl text-[#181416] font-normal leading-snug">
                  {t.floatingDesc}
                </div>
              </div>
            </div>
          </div>

          {/* Details & Inclusions */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-5 order-1 lg:order-2 text-start">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#B89058]" />
              <span>{t.kicker}</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight [text-wrap:balance]">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-[#5A504B] font-light leading-relaxed">
              {t.desc}
            </p>

            <div className="space-y-2 sm:space-y-2.5 pt-2">
              {t.features.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#5A504B]">
                  <Check className="w-4 h-4 text-[#B89058] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#B89058]/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onBookBridal}
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase rounded-sm transition-all shadow-md w-full sm:w-auto min-h-[44px]"
              >
                <span>{t.ctaQuote}</span>
                <ArrowRight className="w-4 h-4 text-[#FFFFFF] rtl:rotate-180" />
              </button>

              <button
                onClick={handleWhatsAppBridal}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 sm:py-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#181416] border border-[#25D366]/40 text-xs font-semibold tracking-wider uppercase rounded-sm transition-all w-full sm:w-auto min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{t.ctaWhatsapp}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

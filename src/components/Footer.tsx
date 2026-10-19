import React, { useState } from 'react';
import { ArrowRight, Check, MessageSquare, Instagram, Heart } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface FooterProps {
  currentLang?: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang = 'fr' }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const t = TRANSLATIONS[currentLang].footer;
  const nav = TRANSLATIONS[currentLang].nav;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#181416] border-t border-[#B89058]/30 text-[#EBE2D5] pt-14 sm:pt-20 pb-10 sm:pb-12 text-start">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-[#B89058]/20">
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <a
              href="#"
              className="inline-block font-serif text-2xl sm:text-3xl tracking-[0.2em] text-[#FAF7F2] uppercase"
            >
              MAISON ÉCLAT
            </a>
            <p className="text-xs sm:text-sm text-[#EBE2D5]/70 font-light leading-relaxed max-w-sm">
              {t.brandDesc}
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#262023] border border-[#B89058]/30 flex items-center justify-center text-[#EBE2D5] hover:text-[#FFFFFF] hover:border-[#B89058] transition-all min-h-[44px] min-w-[44px]"
                aria-label="Instagram de Maison Éclat (Demo)"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=212600000000"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-[#262023] border border-[#B89058]/30 flex items-center justify-center text-[#25D366] hover:border-[#25D366] transition-all min-h-[44px] min-w-[44px]"
                aria-label="WhatsApp Conciergerie (Demo)"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B89058] font-semibold mb-3 sm:mb-4">
              {t.exploreTitle}
            </div>
            <ul className="space-y-2 text-xs tracking-wider">
              <li>
                <a href="#rituels" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.rituals}
                </a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.transformation}
                </a>
              </li>
              <li>
                <a href="#mariee" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.bridal}
                </a>
              </li>
              <li>
                <a href="#diagnostic" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.diagnostic}
                </a>
              </li>
              <li>
                <a href="#galerie" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.gallery}
                </a>
              </li>
              <li>
                <a href="#tarifs" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.pricing}
                </a>
              </li>
              <li>
                <a href="#sanctuaires" className="hover:text-[#FFFFFF] transition-colors">
                  {nav.sanctuaries}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4 space-y-3 sm:space-y-4">
            <div className="text-xs uppercase tracking-[0.2em] text-[#B89058] font-semibold mb-1 sm:mb-2">
              {t.gazetteTitle}
            </div>
            <p className="text-xs text-[#EBE2D5]/70 font-light leading-relaxed">
              {t.gazetteDesc}
            </p>

            {isSubscribed ? (
              <div className="p-3.5 rounded-lg bg-[#262023] border border-[#B89058]/40 flex items-center gap-2.5 text-xs text-[#FAF7F2]">
                <Check className="w-4 h-4 text-[#B89058] shrink-0" />
                <span>{t.gazetteSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    placeholder={t.gazettePlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#262023] border border-[#B89058]/30 rounded-sm px-3.5 py-2.5 text-xs text-[#FAF7F2] placeholder:text-[#EBE2D5]/40 focus:outline-none focus:border-[#B89058] min-h-[44px]"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors min-h-[44px] flex items-center justify-center"
                    aria-label="Souscrire"
                  >
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </form>
            )}

            <div className="text-[10px] sm:text-[11px] text-[#B89058]/80 pt-1">
              {t.conciergeNote}
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#EBE2D5]/50 text-center md:text-start">
          <div>
            © {new Date().getFullYear()} MAISON ÉCLAT — {t.rights}
          </div>

          <div className="flex items-center gap-1.5 text-[#B89058]">
            <span>{t.conceptBadge}</span>
            <Heart className="w-3.5 h-3.5 text-[#B89058] inline" />
            <span>Casablanca · Marrakech · Rabat</span>
          </div>

          <div className="text-[10px] sm:text-[11px] text-[#EBE2D5]/40">
            {t.demoNote}
          </div>
        </div>
      </div>
    </footer>
  );
};

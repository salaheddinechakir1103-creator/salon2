import React, { useState, useEffect } from 'react';
import { Menu, X, Volume2, VolumeX, Phone, MapPin, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { TRANSLATIONS, Language } from '../data/translations';

interface HeaderProps {
  onOpenBooking: () => void;
  currentLang: Language;
  onToggleLang: () => void;
  onSetLang?: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  currentLang,
  onToggleLang,
  onSetLang,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const t = TRANSLATIONS[currentLang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleToggleSound = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    sounds.setMuted(newMuted);
    if (!newMuted) {
      sounds.playCrystalChime(880);
    }
  };

  const handleSwitchLanguage = (lang: Language) => {
    sounds.playCrystalChime(750);
    if (onSetLang) {
      onSetLang(lang);
    } else if (lang !== currentLang) {
      onToggleLang();
    }
  };

  const closeMenuAndScroll = (id: string) => {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      {/* Top Bar perfectly adapted for mobile devices and narrow frames */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full ${
          isScrolled
            ? 'bg-[#FAF7F2]/98 backdrop-blur-md border-b border-[#B89058]/20 py-2 sm:py-3 shadow-xs'
            : 'bg-[#FAF7F2]/80 backdrop-blur-xs py-2.5 sm:py-5'
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 md:px-12 flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-1.5 font-serif text-base sm:text-xl md:text-2xl lg:text-3xl tracking-[0.12em] sm:tracking-[0.18em] text-[#181416] uppercase whitespace-nowrap shrink-0 group"
          >
            <span>MAISON ÉCLAT</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89058] group-hover:scale-125 transition-transform" />
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-[12px] tracking-[0.16em] uppercase text-[#5A504B] font-medium">
            <a
              href="#rituels"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.rituals}
            </a>
            <a
              href="#transformation"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.transformation}
            </a>
            <a
              href="#mariee"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.bridal}
            </a>
            <a
              href="#diagnostic"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.diagnostic}
            </a>
            <a
              href="#galerie"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.gallery}
            </a>
            <a
              href="#tarifs"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.pricing}
            </a>
            <a
              href="#sanctuaires"
              className="hover:text-[#181416] transition-colors whitespace-nowrap shrink-0 relative py-1 hover:after:w-full after:w-0 after:h-[1px] after:bg-[#B89058] after:absolute after:bottom-0 after:start-0 after:transition-all"
            >
              {t.sanctuaries}
            </a>
          </nav>

          {/* Zone 3: Controls (Audio, Language, Reserver, Hamburger) - Robust responsive layout */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio Toggle (Hidden on narrow mobile, available in mobile menu) */}
            <button
              onClick={handleToggleSound}
              className="hidden sm:flex p-1.5 text-[#5A504B] hover:text-[#181416] bg-[#F2EAE0] hover:bg-[#EBE2D5] rounded-full transition-colors items-center justify-center min-w-[32px] min-h-[32px]"
              title={isMuted ? t.soundOff : t.soundOn}
              aria-label={isMuted ? t.soundOff : t.soundOn}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#8C6A3C]" /> : <Volume2 className="w-3.5 h-3.5 text-[#B89058]" />}
            </button>

            {/* Language Switcher Pill: Clean AR | FR toggle */}
            <div
              dir="ltr"
              className="flex items-center bg-[#F0E8DC] rounded-full p-0.5 border border-[#B89058]/35 shadow-2xs shrink-0"
            >
              <button
                type="button"
                onClick={() => handleSwitchLanguage('ar')}
                className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-full transition-all ${
                  currentLang === 'ar'
                    ? 'bg-[#B89058] text-[#FFFFFF] shadow-xs'
                    : 'text-[#6A5E57] hover:text-[#181416]'
                }`}
                aria-label="اللغة العربية"
              >
                عربي
              </button>
              <button
                type="button"
                onClick={() => handleSwitchLanguage('fr')}
                className={`px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold rounded-full transition-all ${
                  currentLang === 'fr'
                    ? 'bg-[#B89058] text-[#FFFFFF] shadow-xs'
                    : 'text-[#6A5E57] hover:text-[#181416]'
                }`}
                aria-label="Français"
              >
                FR
              </button>
            </div>

            {/* Primary Booking Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center px-2.5 sm:px-4 py-1.5 sm:py-2 text-[10.5px] sm:text-xs font-semibold tracking-wider uppercase text-[#FFFFFF] bg-[#B89058] hover:bg-[#8C6A3C] rounded-sm transition-all duration-200 shadow-2xs whitespace-nowrap shrink-0 min-h-[32px] sm:min-h-[36px] active:scale-95"
            >
              {t.book}
            </button>

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-[#181416] hover:bg-[#F2EAE0] rounded-md transition-colors min-w-[34px] min-h-[34px] flex items-center justify-center shrink-0 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-[#181416]" /> : <Menu className="w-5 h-5 text-[#181416]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation (Bilingual & fully responsive) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#FAF7F2]/98 backdrop-blur-2xl flex flex-col justify-between p-6 pt-16 pb-8 lg:hidden animate-fade-in text-[#181416] overflow-y-auto">
          {/* Header row in drawer */}
          <div className="flex items-center justify-between pb-4 border-b border-[#B89058]/20">
            <div className="font-serif text-lg tracking-[0.14em] text-[#181416] uppercase">
              MAISON ÉCLAT
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#181416] hover:bg-[#F2EAE0] rounded-full transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Fermer le menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links list */}
          <div className="flex flex-col gap-4 py-6 text-start">
            {[
              { id: 'rituels', label: t.rituals },
              { id: 'transformation', label: t.transformation },
              { id: 'mariee', label: t.bridal },
              { id: 'diagnostic', label: t.diagnostic },
              { id: 'galerie', label: t.gallery },
              { id: 'tarifs', label: t.pricing },
              { id: 'reservation', label: t.book },
              { id: 'sanctuaires', label: t.sanctuaries },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => closeMenuAndScroll(item.id)}
                className="font-serif text-xl sm:text-2xl text-[#181416] hover:text-[#B89058] transition-colors py-1.5 text-start flex items-center justify-between group border-b border-[#B89058]/10"
              >
                <span>{item.label}</span>
                <span className="text-xs text-[#B89058] opacity-0 group-hover:opacity-100 transition-opacity">
                  ✦
                </span>
              </button>
            ))}
          </div>

          {/* Bottom actions inside mobile drawer */}
          <div className="space-y-4 pt-4 border-t border-[#B89058]/20">
            {/* Audio Toggle button in mobile menu */}
            <div className="flex items-center justify-between py-1 text-xs text-[#5A504B]">
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
                <span>{isMuted ? t.soundOff : t.soundOn}</span>
              </span>
              <button
                onClick={handleToggleSound}
                className="p-2 bg-[#F2EAE0] hover:bg-[#EBE2D5] rounded-full text-[#181416] transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-[#8C6A3C]" /> : <Volume2 className="w-4 h-4 text-[#B89058]" />}
              </button>
            </div>

            {/* Quick Sanctuary Address */}
            <div className="flex items-center gap-2 text-xs text-[#8C6A3C]">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#B89058]" />
              <span>Casablanca · Marrakech · Rabat</span>
            </div>

            {/* Mobile Drawer Booking CTA */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase rounded-sm transition-all shadow-md flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>{t.book}</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SignatureServices } from './components/SignatureServices';
import { TransformationSection } from './components/TransformationSection';
import { BridalRoyalSection } from './components/BridalRoyalSection';
import { BeautyDiagnostic } from './components/BeautyDiagnostic';
import { AboutSection } from './components/AboutSection';
import { EditorialGallery } from './components/EditorialGallery';
import { ServiceMenuSection } from './components/ServiceMenuSection';
import { BookingSection } from './components/BookingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQAndLocations } from './components/FAQAndLocations';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { VIPConciergeWidget } from './components/VIPConciergeWidget';
import { ServiceItem } from './data/salonData';
import { Language } from './data/translations';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState<string>('');
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('maison_eclat_lang');
      if (saved === 'ar' || saved === 'fr') return saved;
    }
    return 'ar';
  });

  useEffect(() => {
    localStorage.setItem('maison_eclat_lang', currentLang);
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
  }, [currentLang]);

  const handleOpenBooking = () => {
    setIsModalOpen(true);
  };

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'fr' ? 'ar' : 'fr'));
  };

  const handleSetLang = (lang: Language) => {
    setCurrentLang(lang);
  };

  const handleSelectServiceFromCard = (service: ServiceItem) => {
    setSelectedServiceTitle(service.title);
    const bookingEl = document.getElementById('reservation');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSelectServiceTitle = (title: string) => {
    setSelectedServiceTitle(title);
    const bookingEl = document.getElementById('reservation');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsModalOpen(true);
    }
  };

  const handleDiagnosticBook = (ritualTitle: string) => {
    setSelectedServiceTitle(ritualTitle);
    const bookingEl = document.getElementById('reservation');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <div
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
      className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAF7F2] text-[#181416] font-sans antialiased selection:bg-[#B89058]/20 selection:text-[#181416] relative"
    >
      {/* Fixed Luxury Navigation Header */}
      <Header
        onOpenBooking={handleOpenBooking}
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onSetLang={handleSetLang}
      />

      <main className="w-full max-w-full overflow-x-hidden">
        {/* 1. Full-screen Cinematic Hero with 3D Salon Station Centerpiece */}
        <HeroSection
          onOpenBooking={handleOpenBooking}
          currentLang={currentLang}
        />

        {/* 2. Signature Services (Coiffure, Soins Visage, Onglerie, Hammam, Maquillage) */}
        <SignatureServices
          onSelectService={handleSelectServiceFromCard}
          currentLang={currentLang}
        />

        {/* 3. Interactive Before / After Hair Gloss & Balayage Transformation Slider */}
        <TransformationSection
          onBookGloss={() => handleSelectServiceTitle(currentLang === 'ar' ? 'بالياج الشمس وغلاساج اللمعان' : 'Balayage Solaire & Glaçage Gloss')}
          currentLang={currentLang}
        />

        {/* 4. Dedicated Moroccan Royal Bridal Ceremony Section */}
        <BridalRoyalSection
          onBookBridal={() => handleSelectServiceTitle(currentLang === 'ar' ? 'باقة مراسم العروس الملكية' : 'Forfait Cérémonie Mariée Impériale')}
          currentLang={currentLang}
        />

        {/* 5. Interactive 3-Step Beauty Diagnostic & Custom Prescription */}
        <div id="diagnostic">
          <BeautyDiagnostic
            onBookResult={handleDiagnosticBook}
            currentLang={currentLang}
          />
        </div>

        {/* 6. About the Salon: L'Esprit Maison Éclat */}
        <AboutSection currentLang={currentLang} />

        {/* 7. Portfolio / Editorial Gallery with Fullscreen Lightbox */}
        <EditorialGallery currentLang={currentLang} />

        {/* 8. Interactive Service Menu & Tarifs */}
        <ServiceMenuSection
          onSelectServiceTitle={handleSelectServiceTitle}
          currentLang={currentLang}
        />

        {/* 9. Functional Booking Experience & WhatsApp Concierge */}
        <BookingSection
          initialServiceTitle={selectedServiceTitle}
          onClearPreselection={() => setSelectedServiceTitle('')}
          currentLang={currentLang}
        />

        {/* 10. Journal des Invitées (Attributable Testimonials with Demo attribution) */}
        <TestimonialsSection currentLang={currentLang} />

        {/* 11. Sanctuaries (Casa, Marrakech, Rabat) & FAQ */}
        <FAQAndLocations currentLang={currentLang} />
      </main>

      {/* 12. Luxury Footer with Concept Disclaimer */}
      <Footer currentLang={currentLang} />

      {/* Quick Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialServiceTitle={selectedServiceTitle}
        currentLang={currentLang}
      />

      {/* VIP Moroccan Concierge Live Chat Widget */}
      <VIPConciergeWidget currentLang={currentLang} />
    </div>
  );
}

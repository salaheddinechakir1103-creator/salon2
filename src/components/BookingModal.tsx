import React, { useState } from 'react';
import { SALON_DATA } from '../data/salonData';
import { X, Calendar, Clock, MapPin, CheckCircle, MessageSquare, AlertCircle } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceTitle?: string;
  currentLang?: Language;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceTitle,
  currentLang = 'fr',
}) => {
  const t = TRANSLATIONS[currentLang].modal;

  const defaultSanctuary = currentLang === 'ar' ? 'الدار البيضاء — المثلث الذهبي' : 'Casablanca · Triangle d’Or';
  const [selectedSanctuary, setSelectedSanctuary] = useState(defaultSanctuary);
  const [selectedService, setSelectedService] = useState(
    initialServiceTitle || (currentLang === 'ar' ? 'تصفيف الشعر الراقي وخصلات الشمس' : 'Haute Coiffure & Balayage Solaire')
  );
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('14:30');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(t.errorRequired);
      return;
    }
    setErrorMessage('');

    const message = encodeURIComponent(
      currentLang === 'ar'
        ? `السلام عليكم ميزون إكلا، أود حجز موعد :\n` +
          `• الطقس : ${selectedService}\n` +
          `• الفرع : ${selectedSanctuary}\n` +
          `• التاريخ : ${date} عند الساعة ${timeSlot}\n` +
          `• الاسم : ${fullName}\n` +
          `• الهاتف : ${phone}\n\n` +
          `شكراً لتأكيد الموعد.`
        : `Bonjour Maison Éclat,\n\nJe souhaite réserver le rituel : ${selectedService}\n` +
          `Salon : ${selectedSanctuary}\n` +
          `Date : ${date} à ${timeSlot}\n` +
          `Invitée : ${fullName}\n` +
          `Téléphone : ${phone}\n\n` +
          `Merci pour votre confirmation.`
    );
    window.open(`https://api.whatsapp.com/send?phone=212600000000&text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(t.errorRequired);
      return;
    }
    setErrorMessage('');
    setBookingRef('ECLAT-' + Math.floor(100000 + Math.random() * 900000));
    setIsSuccess(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#B89058]/35 rounded-2xl p-5 sm:p-8 md:p-9 shadow-2xl my-6 text-start"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 end-4 p-2 text-[#5A504B] hover:text-[#181416] bg-[#FAF7F2] hover:bg-[#F2EAE0] rounded-full transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-label={t.btnClose}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-4 space-y-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F2] border border-[#B89058]/40 flex items-center justify-center mx-auto text-[#B89058]">
              <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold">
              {t.successTag}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-[#181416] font-light">
              {t.successGreeting} {fullName}
            </h3>
            <p className="text-xs text-[#5A504B] font-light">
              {t.successRef} <span className="font-mono text-[#8C6A3C] font-bold">{bookingRef}</span>
            </p>
            <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#B89058]/20 text-xs text-[#5A504B] text-start space-y-1">
              <div><strong>{t.labelSalon} :</strong> {selectedSanctuary}</div>
              <div><strong>{t.labelRitual} :</strong> {selectedService}</div>
              <div><strong>{t.labelDate} :</strong> {date} · {timeSlot}</div>
            </div>
            <div className="text-[11px] text-[#8C6A3C] italic">
              {t.demoNotice}
            </div>
            <button
              onClick={onClose}
              className="mt-3 px-6 py-2.5 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors shadow-xs min-h-[44px]"
            >
              {t.btnClose}
            </button>
          </div>
        ) : (
          <form className="space-y-4">
            <div>
              <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-0.5">
                {t.subtitle}
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#181416] font-light">
                {t.title}
              </h3>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Sanctuary */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] mb-1 flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#B89058]" />
                {t.labelSalon}
              </label>
              <select
                value={selectedSanctuary}
                onChange={(e) => setSelectedSanctuary(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] min-h-[44px]"
              >
                <option value={currentLang === 'ar' ? 'الدار البيضاء — المثلث الذهبي' : 'Casablanca · Triangle d’Or'}>
                  {currentLang === 'ar' ? 'الدار البيضاء — المثلث الذهبي' : 'Casablanca · Triangle d’Or'}
                </option>
                <option value={currentLang === 'ar' ? 'مراكش — الحي الشتوي' : 'Marrakech · L’Hivernage'}>
                  {currentLang === 'ar' ? 'مراكش — الحي الشتوي' : 'Marrakech · L’Hivernage'}
                </option>
                <option value={currentLang === 'ar' ? 'الرباط — السويسي' : 'Rabat · Souissi'}>
                  {currentLang === 'ar' ? 'الرباط — السويسي' : 'Rabat · Souissi'}
                </option>
              </select>
            </div>

            {/* Service */}
            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] mb-1 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#B89058]" />
                {t.labelRitual}
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] min-h-[44px]"
              >
                {currentLang === 'ar' ? (
                  <>
                    <option value="تصفيف الشعر الراقي وخصلات الشمس الذهبية">تصفيف الشعر الراقي وخصلات الشمس (650 درهم)</option>
                    <option value="العناية بالوجه الملكية بخلاصة النيرولي">العناية بالوجه الملكية بالنيرولي (850 درهم)</option>
                    <option value="مانيكير فاخر على رخام الترافرتين وورق الذهب">مانيكير فاخر ورخام الترافرتين (450 درهم)</option>
                    <option value="الحمام الملكي الخاص ومراسم العنبر">الحمام الملكي ومراسم العنبر (950 درهم)</option>
                    <option value="باقة مراسم العروس الملكية الشاملة">باقة العروس الملكية الشاملة (3500 درهم)</option>
                  </>
                ) : (
                  SALON_DATA.signatureServices.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title} ({s.duration} - {s.priceMAD} MAD)
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] mb-1 flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelDate}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] mb-1 font-medium">
                  {t.labelTime}
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] min-h-[44px]"
                >
                  <option value="10:30">10:30</option>
                  <option value="11:45">11:45</option>
                  <option value="14:00">14:00</option>
                  <option value="15:15">15:15</option>
                  <option value="16:30">16:30</option>
                  <option value="17:45">17:45</option>
                  <option value="19:00">19:00</option>
                </select>
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] mb-1 font-medium">
                  {t.labelName}
                </label>
                <input
                  type="text"
                  placeholder={t.placeholderName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058] min-h-[44px]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] mb-1 font-medium">
                  {t.labelPhone}
                </label>
                <input
                  type="tel"
                  placeholder={t.placeholderPhone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3 py-2 text-xs sm:text-sm text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058] min-h-[44px]"
                  required
                />
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="flex-1 py-3 px-4 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#181416] border border-[#25D366]/40 rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 min-h-[44px]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{t.btnWhatsapp}</span>
              </button>
              <button
                type="button"
                onClick={handleDirectSubmit}
                className="flex-1 py-3 px-4 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] rounded-sm text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs min-h-[44px]"
              >
                <span>{t.btnConfirm}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

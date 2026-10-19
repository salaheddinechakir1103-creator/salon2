import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail, MessageSquare, CheckCircle, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface BookingSectionProps {
  initialServiceTitle?: string;
  onClearPreselection?: () => void;
  currentLang?: Language;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  initialServiceTitle,
  onClearPreselection,
  currentLang = 'fr',
}) => {
  const t = TRANSLATIONS[currentLang].booking;

  const defaultSanctuary = currentLang === 'ar' ? 'الدار البيضاء — المثلث الذهبي (غوتييه)' : 'Casablanca — Triangle d’Or (Gauthier)';
  const [selectedSanctuary, setSelectedSanctuary] = useState<string>(defaultSanctuary);
  const [selectedService, setSelectedService] = useState<string>(
    initialServiceTitle || (currentLang === 'ar' ? 'تصفيف الشعر الراقي وخصلات الشمس' : 'Haute Coiffure & Balayage Solaire')
  );
  const [date, setDate] = useState<string>('');
  const [timeSlot, setTimeSlot] = useState<string>('14:30');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingRef, setBookingRef] = useState<string>('');

  useEffect(() => {
    if (initialServiceTitle) {
      setSelectedService(initialServiceTitle);
    }
  }, [initialServiceTitle]);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const dd = String(tomorrow.getDate()).padStart(2, '0');
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  const timeSlots = [
    '10:30', '11:45', '14:00', '15:15', '16:30', '17:45', '19:00'
  ];

  const handleWhatsAppBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(t.errorRequired);
      return;
    }
    setErrorMessage('');

    const message = encodeURIComponent(
      currentLang === 'ar'
        ? `السلام عليكم ميزون إكلا،\n\nأود طلب حجز موعد خاص عبر موقعكم :\n` +
          `• الفرع : ${selectedSanctuary}\n` +
          `• الطقس : ${selectedService}\n` +
          `• التاريخ المفضل : ${date}\n` +
          `• التوقيت : ${timeSlot}\n` +
          `• الاسم واللقب : ${fullName}\n` +
          `• رقم الهاتف : ${phone}\n` +
          (email ? `• البريد الإلكتروني : ${email}\n` : '') +
          (specialRequests ? `• ملاحظات : ${specialRequests}\n` : '') +
          `\nشكراً لإفادتي بتأكيد الموعد عبر كونسيرج الصالون.`
        : `Bonjour Maison Éclat,\n\nJe souhaite solliciter une réservation exclusive :\n` +
          `• Salon : ${selectedSanctuary}\n` +
          `• Rituel : ${selectedService}\n` +
          `• Date souhaitée : ${date}\n` +
          `• Créneau : ${timeSlot}\n` +
          `• Invitée : ${fullName}\n` +
          `• Téléphone : ${phone}\n` +
          (email ? `• Email : ${email}\n` : '') +
          (specialRequests ? `• Note : ${specialRequests}\n` : '') +
          `\nMerci de me confirmer la disponibilité avec votre conciergerie privée.`
    );

    const waUrl = `https://api.whatsapp.com/send?phone=212600000000&text=${message}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDirectOnlineBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) {
      setErrorMessage(t.errorRequired);
      return;
    }
    setErrorMessage('');
    const randomCode = 'ECLAT-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomCode);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookingRef('');
    setErrorMessage('');
    if (onClearPreselection) onClearPreselection();
  };

  return (
    <section id="reservation" className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
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

        {/* Confirmation State */}
        {isSubmitted ? (
          <div className="bg-[#FFFFFF] border border-[#B89058]/40 rounded-2xl p-6 sm:p-10 md:p-12 text-center shadow-lg max-w-2xl mx-auto animate-fade-in text-start">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF7F2] border border-[#B89058]/40 flex items-center justify-center mx-auto mb-5 text-[#B89058]">
              <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>

            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold">
                {t.successTag}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#181416] font-light mt-1.5 mb-2">
                {t.successTitle} {fullName}
              </h3>

              <p className="text-xs sm:text-sm text-[#5A504B] mb-5 font-light">
                {t.successDesc}
              </p>

              <div className="inline-block px-5 sm:px-6 py-2 bg-[#FAF7F2] border border-[#B89058]/40 rounded-lg font-mono text-base sm:text-lg text-[#8C6A3C] tracking-widest font-semibold mb-6">
                {bookingRef}
              </div>
            </div>

            {/* Recap */}
            <div className="bg-[#FAF7F2] rounded-xl p-4 sm:p-5 border border-[#B89058]/20 text-xs sm:text-sm text-[#5A504B] space-y-2 mb-6">
              <div className="flex justify-between border-b border-[#B89058]/15 pb-2">
                <span className="text-[#8C6A3C]">{t.recapSalon}</span>
                <span className="text-[#181416] font-medium">{selectedSanctuary}</span>
              </div>
              <div className="flex justify-between border-b border-[#B89058]/15 pb-2">
                <span className="text-[#8C6A3C]">{t.recapRitual}</span>
                <span className="text-[#181416] font-medium">{selectedService}</span>
              </div>
              <div className="flex justify-between border-b border-[#B89058]/15 pb-2">
                <span className="text-[#8C6A3C]">{t.recapDateTime}</span>
                <span className="text-[#181416] font-medium">{date} · {timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C6A3C]">{t.recapContact}</span>
                <span className="text-[#181416] font-medium">{phone}</span>
              </div>
            </div>

            <p className="text-xs text-[#8C6A3C] italic mb-6 max-w-md mx-auto text-center">
              {t.successDemo}
            </p>

            <div className="text-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#FFFFFF] bg-[#B89058] hover:bg-[#8C6A3C] rounded-sm transition-colors shadow-xs min-h-[44px]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{t.btnNewSimulation}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form className="bg-[#FFFFFF] border border-[#B89058]/25 rounded-2xl p-5 sm:p-8 md:p-10 shadow-lg space-y-6 text-start">
            {errorMessage && (
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7">
              {/* Sanctuary Location Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelSalon}
                </label>
                <select
                  value={selectedSanctuary}
                  onChange={(e) => setSelectedSanctuary(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-3 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] transition-colors min-h-[44px]"
                >
                  <option value={currentLang === 'ar' ? 'الدار البيضاء — المثلث الذهبي (غوتييه)' : 'Casablanca — Triangle d’Or (Gauthier)'}>
                    {currentLang === 'ar' ? 'الدار البيضاء — المثلث الذهبي (غوتييه)' : 'Casablanca — Triangle d’Or (Gauthier)'}
                  </option>
                  <option value={currentLang === 'ar' ? 'مراكش — الحي الشتوي (حدائق الزمرد)' : 'Marrakech — L’Hivernage (Jardins d’Émeraude)'}>
                    {currentLang === 'ar' ? 'مراكش — الحي الشتوي (حدائق الزمرد)' : 'Marrakech — L’Hivernage (Jardins d’Émeraude)'}
                  </option>
                  <option value={currentLang === 'ar' ? 'الرباط — السويسي (ممر السفارات)' : 'Rabat — Souissi (Allée des Ambassades)'}>
                    {currentLang === 'ar' ? 'الرباط — السويسي (ممر السفارات)' : 'Rabat — Souissi (Allée des Ambassades)'}
                  </option>
                </select>
              </div>

              {/* Ritual Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelRitual}
                </label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-3 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] transition-colors min-h-[44px]"
                >
                  {currentLang === 'ar' ? (
                    <>
                      <optgroup label="الطقوس التوقيعية الفاخرة">
                        <option value="تصفيف الشعر الراقي وخصلات الشمس الذهبية">تصفيف الشعر الراقي وخصلات الشمس (650 درهم)</option>
                        <option value="العناية بالوجه الملكية بخلاصة النيرولي">العناية بالوجه الملكية بالنيرولي (850 درهم)</option>
                        <option value="مانيكير فاخر على رخام الترافرتين وورق الذهب">مانيكير فاخر ورخام الترافرتين (450 درهم)</option>
                        <option value="الحمام الملكي الخاص ومراسم العنبر">الحمام الملكي ومراسم العنبر (950 درهم)</option>
                        <option value="باقة مراسم العروس الملكية الشاملة">باقة العروس الملكية الشاملة (3500 درهم)</option>
                      </optgroup>
                      <optgroup label="باقات العناية الإضافية">
                        <option value="قص الشعر وسيشوار كوتور فاخر">قص الشعر وسيشوار كوتور (450 درهم)</option>
                        <option value="بالياج الشمس الدافئة وغلاساج اللمعان">بالياج الشمس وغلاساج اللمعان (950 درهم)</option>
                        <option value="علاج بوتوكس الشعر والكيراتين النباتي">بوتوكس الشعر والكيراتين (1100 درهم)</option>
                        <option value="طقس بريق الذهب الملكي">طقس بريق الذهب الملكي (1800 درهم)</option>
                      </optgroup>
                    </>
                  ) : (
                    <>
                      <optgroup label="Rituels Signature">
                        <option value="Haute Coiffure & Balayage Solaire">Haute Coiffure & Balayage Solaire (650 MAD)</option>
                        <option value="Soin Visage Éclat Royal au Néroli">Soin Visage Éclat Royal au Néroli (850 MAD)</option>
                        <option value="Haute Manucure sur Travertin & Liseré d’Or">Haute Manucure sur Travertin & Liseré d’Or (450 MAD)</option>
                        <option value="Hammam Privatif & Cérémonie d’Ambre">Hammam Privatif & Cérémonie d’Ambre (950 MAD)</option>
                        <option value="Forfait Cérémonie Mariée Impériale">Forfait Cérémonie Mariée Impériale (3500 MAD)</option>
                      </optgroup>
                      <optgroup label="Menu Complet">
                        <option value="Coupe & Brushing Haute Couture">Coupe & Brushing Haute Couture (450 MAD)</option>
                        <option value="Balayage Solaire & Glaçage Gloss">Balayage Solaire & Glaçage Gloss (950 MAD)</option>
                        <option value="Soin Botox Capillaire & Kératine Végétale">Soin Botox Capillaire & Kératine (1100 MAD)</option>
                        <option value="Rituel Somptueux Éclat d’Or">Rituel Somptueux Éclat d’Or (1800 MAD)</option>
                      </optgroup>
                    </>
                  )}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelDate}
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#181416] focus:outline-none focus:border-[#B89058] transition-colors min-h-[44px]"
                  required
                />
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5">
                  {t.labelSlot}
                </label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setTimeSlot(slot)}
                      className={`px-3 py-2 text-[11px] sm:text-xs font-mono font-medium rounded-md transition-all min-h-[38px] flex-1 min-w-[70px] ${
                        timeSlot === slot
                          ? 'bg-[#B89058] text-[#FFFFFF] font-semibold shadow-xs'
                          : 'bg-[#FAF7F2] text-[#5A504B] hover:text-[#181416] border border-[#B89058]/20'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelName}
                </label>
                <input
                  type="text"
                  placeholder={t.placeholderName}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058] min-h-[44px]"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelPhone}
                </label>
                <input
                  type="tel"
                  placeholder={t.placeholderPhone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058] min-h-[44px]"
                  required
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#B89058]" />
                  {t.labelEmail}
                </label>
                <input
                  type="email"
                  placeholder={t.placeholderEmail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058] min-h-[44px]"
                />
              </div>

              {/* Special Requests */}
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#8C6A3C] font-semibold mb-1.5">
                  {t.labelNotes}
                </label>
                <textarea
                  rows={2}
                  placeholder={t.placeholderNotes}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058]"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-[#B89058]/20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handleWhatsAppBooking}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-sm bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#181416] border border-[#25D366]/40 text-xs font-semibold tracking-wider uppercase transition-all min-h-[44px]"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                <span>{t.btnWhatsapp}</span>
              </button>

              <button
                type="button"
                onClick={handleDirectOnlineBooking}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-sm bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase transition-all shadow-md min-h-[44px]"
              >
                <span>{t.btnOnline}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

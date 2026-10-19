import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, CheckCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { TRANSLATIONS, Language } from '../data/translations';

interface VIPConciergeWidgetProps {
  currentLang?: Language;
}

export const VIPConciergeWidget: React.FC<VIPConciergeWidgetProps> = ({ currentLang = 'fr' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const t = TRANSLATIONS[currentLang].concierge;

  const [messages, setMessages] = useState<Array<{ sender: 'concierge' | 'user'; text: string; time: string }>>([]);
  const [customInput, setCustomInput] = useState<string>('');

  useEffect(() => {
    setMessages([
      {
        sender: 'concierge',
        text: t.welcomeMsg,
        time: currentLang === 'ar' ? 'الآن' : 'À l’instant',
      },
    ]);
  }, [currentLang, t.welcomeMsg]);

  const handleOpen = () => {
    sounds.playCrystalChime(850);
    setIsOpen(true);
  };

  const handleSelectQuick = (inquiry: typeof t.quickInquiries[0]) => {
    sounds.playBowlTone();
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      sender: 'user' as const,
      text: inquiry.question,
      time: now,
    };
    const conciergeMsg = {
      sender: 'concierge' as const,
      text: inquiry.reply,
      time: now,
    };
    setMessages((prev) => [...prev, userMsg, conciergeMsg]);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    sounds.playBowlTone();
    const userText = customInput;
    setCustomInput('');
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userText,
        time: now,
      },
      {
        sender: 'concierge',
        text: currentLang === 'ar'
          ? 'تم استلام استفساركِ بعناية. لمتابعة التفاصيل وتأكيد طلبكِ فوراً، يرجى استكمال الحديث معي عبر واتساب.'
          : 'Parfaitement noté. Pour finaliser votre demande avec discrétion, continuons notre échange sur WhatsApp avec votre interlocutrice dédiée.',
        time: now,
      },
    ]);
  };

  const handleWhatsAppRedirect = () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.sender === 'user')?.text ||
      (currentLang === 'ar' ? 'السلام عليكم ميزون إكلا، أرغب في التواصل مع كونسيرج الصالون الخاص.' : 'Bonjour Maison Éclat, je souhaite échanger avec la conciergerie privée.');
    const encoded = encodeURIComponent(
      currentLang === 'ar'
        ? `السلام عليكم كنزة (ميزون إكلا) :\n\n${lastUserMsg}\n\nشكراً لإفادتي بالمواعيد.`
        : `Bonjour Maison Éclat (Kenza),\n\n${lastUserMsg}\n\nMerci de votre retour.`
    );
    window.open(`https://api.whatsapp.com/send?phone=212600000000&text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* Floating Gold Luxury Concierge Trigger Button - Matching the screenshot */}
      <div className="fixed bottom-4 end-4 z-40">
        {!isOpen && (
          <button
            onClick={handleOpen}
            className="flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 bg-[#FFFFFF] hover:bg-[#FAF7F2] border border-[#B89058]/40 rounded-full shadow-lg transition-all duration-300 hover:scale-105 group min-h-[44px]"
            aria-label="Ouvrir la conciergerie privée"
          >
            <div className="relative shrink-0">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FAF7F2] border border-[#B89058]/50 flex items-center justify-center text-[#B89058]">
                <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366]" />
              </div>
              <span className="absolute -top-0.5 -end-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#25D366] rounded-full border-2 border-[#FFFFFF]" />
            </div>

            <div className="text-start pe-1 leading-tight">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8C6A3C] font-semibold">
                {currentLang === 'ar' ? 'الكونسيرج الخاص' : 'CONCIERGERIE PRIVÉE'}
              </div>
              <div className="text-[11px] sm:text-xs text-[#181416] font-medium">
                {t.onlineName}
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Concierge Modal Window (Responsive for small phones & tablets) */}
      {isOpen && (
        <div className="fixed bottom-3 end-3 z-50 w-[calc(100vw-24px)] max-w-[380px] h-[480px] max-h-[82vh] bg-[#FFFFFF] border border-[#B89058]/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in text-[#181416] text-start">
          {/* Header */}
          <div className="p-3.5 bg-[#FAF7F2] border-b border-[#B89058]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#B89058]/60 flex items-center justify-center text-[#8C6A3C] font-serif text-base font-bold">
                  K
                </div>
                <span className="absolute bottom-0 end-0 w-2.5 h-2.5 bg-[#25D366] rounded-full border-2 border-[#FFFFFF]" />
              </div>
              <div>
                <div className="font-serif text-sm sm:text-base text-[#181416] leading-tight font-medium">
                  {t.onlineStatus}
                </div>
                <div className="text-[9px] sm:text-[10px] text-[#8C6A3C] tracking-wide uppercase font-semibold">
                  {t.salonSubtitle}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#5A504B] hover:text-[#181416] bg-[#F2EAE0] rounded-full transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Fermer la conciergerie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Conversation Body */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs bg-[#FAF7F2]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#B89058] text-[#FFFFFF] rounded-br-none shadow-xs'
                      : 'bg-[#FFFFFF] text-[#181416] border border-[#B89058]/25 rounded-bl-none shadow-xs'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-[#5A504B]/60 mt-0.5 px-1 flex items-center gap-1 font-mono">
                  {m.time}
                  {m.sender === 'user' && <CheckCheck className="w-3 h-3 text-[#B89058]" />}
                </span>
              </div>
            ))}

            {/* Quick Inquiries */}
            <div className="pt-1.5">
              <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8C6A3C] mb-1.5 font-semibold">
                {currentLang === 'ar' ? 'استفسارات شائعة سريعة :' : 'Questions Fréquentes :'}
              </div>
              <div className="flex flex-col gap-1.5">
                {t.quickInquiries.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSelectQuick(q)}
                    className="p-2 text-start bg-[#FFFFFF] hover:bg-[#F2EAE0] border border-[#B89058]/25 rounded-lg text-xs text-[#181416] transition-colors shadow-2xs min-h-[36px]"
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Action Bar */}
          <div className="p-3 bg-[#FFFFFF] border-t border-[#B89058]/20">
            <button
              onClick={handleWhatsAppRedirect}
              className="w-full mb-2 py-2 px-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 rounded-lg text-xs font-semibold uppercase tracking-wider text-[#181416] flex items-center justify-center gap-2 transition-colors min-h-[38px]"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
              <span>{t.btnWhatsapp}</span>
            </button>

            {/* Input Form */}
            <form onSubmit={handleSendCustom} className="flex items-center gap-2">
              <input
                type="text"
                placeholder={t.inputPlaceholder}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                className="flex-1 bg-[#FAF7F2] border border-[#B89058]/30 rounded-lg px-3 py-1.5 text-xs text-[#181416] placeholder:text-[#5A504B]/40 focus:outline-none focus:border-[#B89058] min-h-[38px]"
              />
              <button
                type="submit"
                className="p-2 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] rounded-lg transition-colors shadow-xs min-h-[38px] min-w-[38px] flex items-center justify-center"
                aria-label={t.btnSend}
              >
                <Send className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

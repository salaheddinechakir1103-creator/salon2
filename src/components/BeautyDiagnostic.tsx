import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, RotateCcw, MessageSquare } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { TRANSLATIONS, Language } from '../data/translations';

interface DiagnosticResult {
  title: string;
  subtitle: string;
  sanctuary: string;
  duration: string;
  priceMAD: number;
  ingredients: string[];
  description: string;
}

interface BeautyDiagnosticProps {
  onBookResult: (ritualTitle: string, sanctuary: string) => void;
  currentLang?: Language;
}

export const BeautyDiagnostic: React.FC<BeautyDiagnosticProps> = ({
  onBookResult,
  currentLang = 'fr',
}) => {
  const [step, setStep] = useState<number>(1);
  const [focusArea, setFocusArea] = useState<string>('coiffure');
  const [goal, setGoal] = useState<string>('brillance');
  const [selectedSanctuary, setSelectedSanctuary] = useState<string>(
    currentLang === 'ar' ? 'الدار البيضاء · المثلث الذهبي' : 'Casablanca · Triangle d’Or'
  );
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  const t = TRANSLATIONS[currentLang].diagnostic;

  const calculateResult = () => {
    sounds.playBowlTone();
    let ritual: DiagnosticResult;

    if (focusArea === 'mariee') {
      ritual = {
        title: currentLang === 'ar' ? 'بروتوكول مراسم العروس الملكية' : 'Protocole Cérémonie Mariée Impériale',
        subtitle: currentLang === 'ar' ? 'حمام بحليب الورد، علاج كوبيدو وتصفيف كوتور' : 'Hammam au lait de rose, soin Kobido & coiffure couture',
        sanctuary: selectedSanctuary,
        duration: '4h30',
        priceMAD: 3500,
        ingredients: currentLang === 'ar'
          ? ['حليب اللوز النقي', 'ورد قلعة مكونة الطازج', 'تين شوكي عضوي', 'ذهب عيار 24']
          : ['Lait d’amande douce', 'Roses fraîches de Kelaat M’gouna', 'Figue de Barbarie pure', 'Or 24 carats'],
        description: currentLang === 'ar'
          ? 'البروتوكول النبيل الأرقى في المغرب للعروس، في جناح ملكي خاص مع طاقم خبراء مخصص.'
          : 'Le protocole nuptial le plus exclusif du Royaume, orchestré dans une suite privative avec votre propre équipe de maîtres artisans.',
      };
    } else if (focusArea === 'coiffure') {
      if (goal === 'couleur') {
        ritual = {
          title: currentLang === 'ar' ? 'بالياج الشمس الدافئة وحمام زيت الأركان' : 'Balayage Solaire & Bain d’Huile d’Argan Tiède',
          subtitle: currentLang === 'ar' ? 'تفتيح معدني ناعم مصلح لألياف الشعر' : 'Éclaircissement minéral mèche à mèche & brillance miroir',
          sanctuary: selectedSanctuary,
          duration: '150 min',
          priceMAD: 950,
          ingredients: currentLang === 'ar'
            ? ['زيت أركان سوس المعصور بارداً', 'صبغات معدنية عضوية', 'كيراتين الحرير النباتي']
            : ['Huile d’argan torréfiée à froid du Souss', 'Pigments minéraux bio', 'Kératine végétale de soie'],
          description: currentLang === 'ar'
            ? 'يضيء خصلات الشعر بتموجات ذهبية ساحرة مع استعادة المرونة الطبيعية لألياف الشعر.'
            : 'Illumine la chevelure avec des reflets dorés chauds tout en restaurant l’élasticité naturelle de la fibre.',
        };
      } else {
        ritual = {
          title: currentLang === 'ar' ? 'قصة شعر كوتور وغلاساج عسل الأطلس' : 'Coupe Haute Couture & Glaçage Gloss au Miel d’Euphorbe',
          subtitle: currentLang === 'ar' ? 'قصة شعر حسب الملامح وسيشوار طويل الأمد' : 'Sculpture morphologique & brushing longue durée',
          sanctuary: selectedSanctuary,
          duration: '90 min',
          priceMAD: 650,
          ingredients: currentLang === 'ar'
            ? ['عسل الأطلس البري', 'ماء زهر النيرولي', 'حمض الهيالورونيك النباتي']
            : ['Miel sauvage de l’Atlas', 'Hydrolat de néroli', 'Acide hyaluronique botanique'],
          description: currentLang === 'ar'
            ? 'قصة شعر مخصصة مرسومة بدقة وفق ملامحكِ، متبوعة بلمعان براق يحمي الشعر.'
            : 'Une coupe sur-mesure dessinée selon l’ovale de votre visage, suivie d’un vernis protecteur ultra-brillant.',
        };
      }
    } else if (focusArea === 'visage') {
      ritual = {
        title: currentLang === 'ar' ? 'العناية الملكية بالنيرولي وتدليك كوبيدو الشاد' : 'Grand Soin Royal Néroli & Kobido Liftant',
        subtitle: currentLang === 'ar' ? 'تصريف عميق، شد فوري وماسك مرطب' : 'Drainage profond, lissage tenseur & masque hydrogel',
        sanctuary: selectedSanctuary,
        duration: '75 min',
        priceMAD: 850,
        ingredients: currentLang === 'ar'
          ? ['ماء زهر مقطر بالخميسات', 'زيت بذور التين الشوكي', 'طين كاولين أبيض نقي']
          : ['Fleur d’oranger distillée à Khémisset', 'Huile de pépins de figue de barbarie', 'Argile blanche kaolin'],
        description: currentLang === 'ar'
          ? 'تدليك منشط للدورة الدموية يعيد الحيوية ويوحد لون البشرة بنضارة فورية.'
          : 'Un remodelage facial énergisant qui relance la microcirculation et procure un éclat immédiat sans rougeurs.',
      };
    } else {
      ritual = {
        title: currentLang === 'ar' ? 'مراسم العنبر والحمام الخاص بالتادلاكت' : 'Cérémonie d’Ambre & Hammam Tadelakt Privatif',
        subtitle: currentLang === 'ar' ? 'تقشير بكيس الحرير وصابون أسود نقي' : 'Gommage kessa de soie, savon noir à l’eucalyptus & enveloppement',
        sanctuary: selectedSanctuary,
        duration: '100 min',
        priceMAD: 950,
        ingredients: currentLang === 'ar'
          ? ['صابون بلدي نقي بزيت الزيتون', 'غاسول طبيعي بالأعشاب السبعة', 'عنبر طبيعي خالص']
          : ['Savon noir pur à l’huile d’olive', 'Rhassoul aux 7 herbes médicinales', 'Ambre gris naturel'],
        description: currentLang === 'ar'
          ? 'استرخاء في حمامنا الخاص لفك العضلات وتنقية الجسم وتنعيم البشرة.'
          : 'Immersion sous les voûtes de notre hammam privé pour délasser les tensions musculaires et purifier la peau en profondeur.',
      };
    }

    setResult(ritual);
    setStep(4);
  };

  const handleWhatsAppBooking = () => {
    if (!result) return;
    const msg = encodeURIComponent(
      currentLang === 'ar'
        ? `السلام عليكم ميزون إكلا، قمت بتشخيص الجمال عبر موقعكم وأود حجز الوصفة التالية :\n• الطقس : ${result.title}\n• الصالون : ${result.sanctuary}\n• المدة : ${result.duration} (${result.priceMAD} درهم)\nشكراً لتأكيد الموعد المناسب.`
        : `Bonjour Maison Éclat,\n\nJ'ai complété votre Diagnostic Beauté en ligne et je souhaite réserver la prescription suivante :\n• Protocole : ${result.title}\n• Sanctuaire : ${result.sanctuary}\n• Durée : ${result.duration} (${result.priceMAD} MAD)\n\nPourriez-vous m'indiquer vos prochaines disponibilités ? Merci.`
    );
    window.open(`https://api.whatsapp.com/send?phone=212600000000&text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const resetDiagnostic = () => {
    sounds.playCrystalChime(750);
    setStep(1);
    setResult(null);
  };

  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
            <span>{t.kicker}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight mb-2 sm:mb-3">
            {t.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#5A504B] font-light">
            {t.desc}
          </p>
        </div>

        {/* Diagnostic Card Container */}
        <div className="bg-[#FFFFFF] border border-[#B89058]/30 rounded-2xl p-4 sm:p-7 md:p-9 shadow-md relative overflow-hidden">
          {/* Stepper Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-between border-b border-[#B89058]/20 pb-3 mb-5 sm:mb-7 text-[11px] sm:text-xs text-[#5A504B] font-mono">
              <span className={step >= 1 ? 'text-[#8C6A3C] font-semibold' : ''}>{t.step1}</span>
              <span>·</span>
              <span className={step >= 2 ? 'text-[#8C6A3C] font-semibold' : ''}>{t.step2}</span>
              <span>·</span>
              <span className={step >= 3 ? 'text-[#8C6A3C] font-semibold' : ''}>{t.step3}</span>
            </div>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in text-start">
              <h3 className="font-serif text-lg sm:text-2xl text-[#181416] font-light">
                {t.step1Question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    id: 'coiffure',
                    label: currentLang === 'ar' ? 'تصفيف الشعر الراقي والصبغات' : 'Haute Coiffure & Couleur',
                    desc: currentLang === 'ar' ? 'قصة شعر هندسية، خصلات بالياج أو غلاساج براق' : 'Coupe architecturale, balayage solaire ou soin gloss',
                  },
                  {
                    id: 'visage',
                    label: currentLang === 'ar' ? 'العناية بالبشرة والنيرولي' : 'Soins Visage & Botanique',
                    desc: currentLang === 'ar' ? 'ترطيب مكثف، تدليك كوبيدو ونيرولي نقي' : 'Hydratation intense, Kobido liftant et néroli pur',
                  },
                  {
                    id: 'hammam',
                    label: currentLang === 'ar' ? 'الحمام الملكي الخاص' : 'Hammam Privatif & Corps',
                    desc: currentLang === 'ar' ? 'مراسم العنبر، تنقية الجسم واسترخاء تام' : 'Cérémonie d’ambre, détoxification et relaxation totale',
                  },
                  {
                    id: 'mariee',
                    label: currentLang === 'ar' ? 'باقة العروس الملكية' : 'Forfait Mariée Impériale',
                    desc: currentLang === 'ar' ? 'تحضيرات زفاف ملكية في جناح خاص' : 'Préparation nuptiale royale et suite privatisée',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playCrystalChime(800);
                      setFocusArea(item.id);
                      setStep(2);
                    }}
                    className={`p-3.5 sm:p-5 rounded-xl text-start border transition-all min-h-[56px] ${
                      focusArea === item.id
                        ? 'border-[#B89058] bg-[#F4EDE2] shadow-xs'
                        : 'border-[#B89058]/20 bg-[#FAF7F2] hover:border-[#B89058]/50 hover:bg-[#F2EAE0]'
                    }`}
                  >
                    <div className="font-serif text-base sm:text-lg text-[#181416] mb-1 font-medium">{item.label}</div>
                    <div className="text-xs text-[#5A504B] font-light leading-relaxed">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in text-start">
              <h3 className="font-serif text-lg sm:text-2xl text-[#181416] font-light">
                {t.step2Question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    id: 'brillance',
                    label: currentLang === 'ar' ? 'لمعان مِرآتي وحيوية' : 'Brillance Miroir & Vitalité',
                    desc: currentLang === 'ar' ? 'علاج بهتان الشعر وتغذية عميقة' : 'Éliminer le terne, nourrir en profondeur',
                  },
                  {
                    id: 'couleur',
                    label: currentLang === 'ar' ? 'تفتيح ناعم وتموجات ذهبية' : 'Éclaircissement & Nuances Dorées',
                    desc: currentLang === 'ar' ? 'انعكاسات مشمسة طبيعية وخصلات شعر' : 'Reflets ensoleillés naturels et balayage',
                  },
                  {
                    id: 'lift',
                    label: currentLang === 'ar' ? 'شد وتجديد مرونة الوجه' : 'Lissage Tenseur & Repulpant',
                    desc: currentLang === 'ar' ? 'تدليك منشط للبشرة وتحفيز الكولاجين' : 'Modelage visage énergisant et fermeté',
                  },
                  {
                    id: 'relaxation',
                    label: currentLang === 'ar' ? 'استرخاء عميق وسكينة' : 'Apaisement Absolu & Sérénité',
                    desc: currentLang === 'ar' ? 'تخليص الجسم من التوتر واستعادة الهدوء' : 'Chasser les tensions et retrouver la paix',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playCrystalChime(950);
                      setGoal(item.id);
                      setStep(3);
                    }}
                    className={`p-3.5 sm:p-5 rounded-xl text-start border transition-all min-h-[56px] ${
                      goal === item.id
                        ? 'border-[#B89058] bg-[#F4EDE2] shadow-xs'
                        : 'border-[#B89058]/20 bg-[#FAF7F2] hover:border-[#B89058]/50 hover:bg-[#F2EAE0]'
                    }`}
                  >
                    <div className="font-serif text-base sm:text-lg text-[#181416] mb-1 font-medium">{item.label}</div>
                    <div className="text-xs text-[#5A504B] font-light leading-relaxed">{item.desc}</div>
                  </button>
                ))}
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#8C6A3C] hover:underline min-h-[36px] flex items-center"
                >
                  {t.back}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in text-start">
              <h3 className="font-serif text-lg sm:text-2xl text-[#181416] font-light">
                {t.step3Question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  {
                    id: currentLang === 'ar' ? 'الدار البيضاء · المثلث الذهبي' : 'Casablanca · Triangle d’Or',
                    city: currentLang === 'ar' ? 'الدار البيضاء' : 'Casablanca',
                    place: currentLang === 'ar' ? 'المثلث الذهبي — غوتييه' : 'Triangle d’Or — Gauthier',
                  },
                  {
                    id: currentLang === 'ar' ? 'مراكش · الحي الشتوي' : 'Marrakech · L’Hivernage',
                    city: currentLang === 'ar' ? 'مراكش' : 'Marrakech',
                    place: currentLang === 'ar' ? 'الحي الشتوي — Hivernage' : 'L’Hivernage',
                  },
                  {
                    id: currentLang === 'ar' ? 'الرباط · السويسي' : 'Rabat · Souissi',
                    city: currentLang === 'ar' ? 'الرباط' : 'Rabat',
                    place: currentLang === 'ar' ? 'السويسي — السفارات' : 'Souissi — Ambassades',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sounds.playCrystalChime(1100);
                      setSelectedSanctuary(item.id);
                    }}
                    className={`p-3.5 sm:p-5 rounded-xl text-start border transition-all min-h-[56px] ${
                      selectedSanctuary === item.id
                        ? 'border-[#B89058] bg-[#F4EDE2] shadow-xs'
                        : 'border-[#B89058]/20 bg-[#FAF7F2] hover:border-[#B89058]/50'
                    }`}
                  >
                    <div className="font-serif text-base sm:text-lg text-[#181416] mb-1 font-medium">{item.city}</div>
                    <div className="text-xs text-[#5A504B] font-light">{item.place}</div>
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#B89058]/20">
                <button
                  onClick={() => setStep(2)}
                  className="text-xs text-[#8C6A3C] hover:underline min-h-[36px] flex items-center"
                >
                  {t.back}
                </button>

                <button
                  onClick={calculateResult}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase rounded-sm transition-all shadow-md w-full sm:w-auto min-h-[44px]"
                >
                  <span>{t.generate}</span>
                  <ArrowRight className="w-4 h-4 text-[#FFFFFF] rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Prescription Result */}
          {step === 4 && result && (
            <div className="space-y-4 sm:space-y-5 animate-fade-in text-start">
              <div className="flex items-center justify-between border-b border-[#B89058]/20 pb-3">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold">
                  {t.prescriptionTag}
                </span>
                <button
                  onClick={resetDiagnostic}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C6A3C] hover:text-[#181416] min-h-[36px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.restart}</span>
                </button>
              </div>

              <div>
                <h3 className="font-serif text-xl sm:text-3xl text-[#181416] font-light mb-1">
                  {result.title}
                </h3>
                <div className="text-xs text-[#8C6A3C] tracking-wide mb-3 font-medium">
                  {result.subtitle}
                </div>
                <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed font-light mb-4">
                  {result.description}
                </p>
              </div>

              {/* Ingredients tag list */}
              <div className="p-3 sm:p-4 bg-[#FAF7F2] rounded-xl border border-[#B89058]/25">
                <div className="text-[10px] uppercase tracking-widest text-[#8C6A3C] mb-2 font-semibold">
                  {t.ingredientsTitle}
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {result.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-sm bg-[#FFFFFF] text-[#181416] border border-[#B89058]/30 font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Details & Pricing */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 pt-2 text-xs sm:text-sm text-[#5A504B]">
                <div>
                  <span className="text-[10px] sm:text-[11px] text-[#8C6A3C] block font-medium">{t.recSanctuary}</span>
                  <span className="text-[#181416] font-medium">{result.sanctuary}</span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] text-[#8C6A3C] block font-medium">{t.estDuration}</span>
                  <span className="text-[#181416] font-medium">{result.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] text-[#8C6A3C] block font-medium">{t.refPrice}</span>
                  <span className="font-mono text-base sm:text-lg text-[#8C6A3C] font-semibold">{result.priceMAD} MAD</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppBooking}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-sm bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#181416] border border-[#25D366]/40 text-xs font-semibold tracking-wider uppercase transition-colors min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>{t.bookWhatsapp}</span>
                </button>

                <button
                  onClick={() => onBookResult(result.title, result.sanctuary)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-sm bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] text-xs font-semibold tracking-wider uppercase transition-colors shadow-md min-h-[44px]"
                >
                  <Check className="w-4 h-4 text-[#FFFFFF]" />
                  <span>{t.confirmOnline}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

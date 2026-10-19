import React, { useState } from 'react';
import { SALON_DATA, ServiceItem } from '../data/salonData';
import { Clock, ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface SignatureServicesProps {
  onSelectService: (service: ServiceItem) => void;
  currentLang?: Language;
}

export const SignatureServices: React.FC<SignatureServicesProps> = ({
  onSelectService,
  currentLang = 'fr',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'coiffure' | 'visage' | 'onglerie' | 'hammam'>('all');
  const t = TRANSLATIONS[currentLang].services;

  const filteredServices = activeTab === 'all'
    ? SALON_DATA.signatureServices
    : SALON_DATA.signatureServices.filter((s) => s.category === activeTab);

  // Arabic translations mapping for signature service cards
  const arServiceDetails: Record<string, { title: string; subtitle: string; desc: string; features: string[] }> = {
    'coiffure-couture': {
      title: 'تصفيف الشعر الراقي وخصلات الشمس الذهبية',
      subtitle: 'قصة شعر هندسية ولمعان ذهبي',
      desc: 'تشخيص دقيق لملامح الوجه أمام مرايانا المقوسة، قصة شعر مخصصة على أيدي كبار المصففين، وخصلات بالياج شمسية مغذية بزيت أركان سوس العضوي النقي.',
      features: [
        'تشخيص دقيق لبنية الشعر وفروة الرأس',
        'حمام زيوت نباتية دافئة بالبخار المعقم',
        'قص وتسريحة حصرية متوافقة مع ملامحكِ',
        'سيشوار بلمعان براق يدوم طويلاً',
      ],
    },
    'soins-botanique': {
      title: 'العناية بالوجه الملكية بخلاصة النيرولي',
      subtitle: 'تصريف لمفاوي وترطيب نباتي عميق',
      desc: 'جلسة ترطيب وشد مكثفة تجمع بين ماء زهر البرتقال المقطر بالخميسات، وزيت بذور التين الشوكي، وتدليك الكوبيدو الياباني لرفع البشرة ونضارتها.',
      features: [
        'تنظيف مزدوج بماء الزهر المقطر',
        'تقشير إنزيمي لطيف بخلاصة الرمان',
        'تدليك كوبيدو لشد عضلات الوجه وتحفيز الكولاجين',
        'قناع هيدروجيل مركز ببذور التين الشوكي',
      ],
    },
    'onglerie-couture': {
      title: 'مانيكير فاخر على رخام الترافرتين وورق الذهب',
      subtitle: 'عناية فائقة بالأظافر ولمسة بريق ملكية',
      desc: 'تهذيب فائق الدقة، حمام ملطف ببتلات ورد قلعة مكونة، تقشير بالسكر البني العضوي، وتطبيق طلاء شبه دائم أو شريط ذهبي رقيق عيار 24 قيراطاً.',
      features: [
        'حمام بتلات الورد وزيت الأركان الدافئ',
        'عناية بالبشرة المحيطة بالأظافر بشمع النحل الطبيعي',
        'تدليك ريفلكسولوجي مهدئ لليدين والمعصمين',
        'طلاء ثابت بلمسة ليزري ذهبية حسب الطلب',
      ],
    },
    'hammam-sanctuaire': {
      title: 'الحمام الملكي الخاص ومراسم العنبر',
      subtitle: 'مقصورة بخار خاصة وتقشير بالصابون الأسود',
      desc: 'انغماس تام داخل مقصورة الحمام المغربي المنحوتة بالتادلاكت البيج. صابون أسود بزيت الأوكالبتوس، تقشير لطيف بكيس الحرير، ولفافة الطين بالطمي والأعشاب السبعة.',
      features: [
        'جناح حمام مغربي خاص بالكامل 100%',
        'صابون بلدي تقليدي بالزيوت العطرية',
        'لفافة الغاسول الطبيعي بالأعشاب السبعة',
        'جلسة استرخاء مع الشاي بالنعناع وحلويات ماء الزهر',
      ],
    },
    'mariee-imperiale': {
      title: 'باقة مراسم العروس الملكية الشاملة',
      subtitle: 'أعلى درجات التألق والعناية النبيلة',
      desc: 'التجربة النبيلة للعروس المغربية: حمام ملكي بحليب اللوز والورد، عناية كاشفة لإشراقة الوجه، تسريحة شعر كوتور مخصصة للتاج، ومكياج سهرة ثابت ومخملي.',
      features: [
        'حمام ملكي مخصص بالكامل مع مغطس حليب اللوز والورد',
        'عناية بالوجه بالتين الشوكي وتدليك كوبيدو لشد البشرة',
        'تصفيف شعر كوتور وإشراف على تركيب التاج والمجوهرات',
        'مكياج مخملي عالي الثبات مقاوم للدموع والأضواء',
        'جناح عروس خاص مع مشروبات منعشة ومقبلات راقية',
      ],
    },
  };

  return (
    <section id="rituels" className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-14 pb-6 border-b border-[#B89058]/25 text-start">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#B89058]" />
              <span>{t.kicker}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#181416] font-light leading-tight">
              {t.title}
            </h2>
          </div>

          {/* Filter tabs (Horizontally scrollable on mobile) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F2EAE0] rounded-lg border border-[#B89058]/25 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'coiffure', label: t.filterCoiffure },
              { id: 'visage', label: t.filterVisage },
              { id: 'onglerie', label: t.filterOnglerie },
              { id: 'hammam', label: t.filterHammam },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 min-h-[36px] ${
                  activeTab === tab.id
                    ? 'bg-[#FFFFFF] text-[#181416] shadow-xs font-semibold border border-[#B89058]/40'
                    : 'text-[#5A504B] hover:text-[#181416]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {filteredServices.map((service, index) => {
            const isLarge = index === 0 && activeTab === 'all';
            const arInfo = arServiceDetails[service.id];
            const displayTitle = currentLang === 'ar' && arInfo ? arInfo.title : service.title;
            const displaySubtitle = currentLang === 'ar' && arInfo ? arInfo.subtitle : service.subtitle;
            const displayDesc = currentLang === 'ar' && arInfo ? arInfo.desc : service.description;
            const displayFeatures = currentLang === 'ar' && arInfo ? arInfo.features : service.features;

            return (
              <div
                key={service.id}
                className={`${
                  isLarge ? 'lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center' : 'lg:col-span-6'
                } group bg-[#FFFFFF] border border-[#B89058]/20 rounded-2xl overflow-hidden hover:border-[#B89058]/60 transition-all duration-300 shadow-xs hover:shadow-md`}
              >
                {/* Visual Image */}
                <div
                  className={`${
                    isLarge ? 'lg:col-span-7 h-[240px] sm:h-[340px] lg:h-[440px]' : 'h-56 sm:h-64'
                  } relative overflow-hidden bg-[#F2EAE0]`}
                >
                  <img
                    src={service.image}
                    alt={displayTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Clean unboxed category badge */}
                  <div className="absolute top-3.5 start-3.5 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#181416] bg-[#FFFFFF]/92 backdrop-blur-md px-3 py-1 rounded-sm border border-[#B89058]/30 font-medium">
                    {displaySubtitle}
                  </div>
                </div>

                {/* Content details */}
                <div className={`${isLarge ? 'lg:col-span-5 p-5 sm:p-7 lg:p-8' : 'p-5 sm:p-6'} flex flex-col justify-between text-start`}>
                  <div>
                    {/* Duration & Pricing */}
                    <div className="flex items-center justify-between text-xs text-[#5A504B] mb-2 sm:mb-3">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-[#B89058]" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="font-mono text-xs sm:text-sm text-[#181416] tabular-nums font-semibold">
                        {t.fromPrice} {service.priceMAD} MAD{' '}
                        <span className="text-[10px] sm:text-[11px] text-[#8C6A3C] font-normal">
                          (~{service.priceEUR} €)
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg sm:text-2xl text-[#181416] font-normal mb-2 group-hover:text-[#8C6A3C] transition-colors leading-snug">
                      {displayTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#5A504B] leading-relaxed mb-4 sm:mb-5 font-light">
                      {displayDesc}
                    </p>

                    {/* Features */}
                    <div className="space-y-1.5 mb-5 sm:mb-6 border-t border-[#B89058]/15 pt-3">
                      {displayFeatures.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start gap-2 text-xs text-[#5A504B]">
                          <Check className="w-3.5 h-3.5 text-[#B89058] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div>
                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-xs font-semibold tracking-[0.16em] uppercase text-[#FFFFFF] bg-[#B89058] hover:bg-[#8C6A3C] rounded-sm transition-all shadow-xs group-hover:shadow-sm min-h-[44px]"
                    >
                      <span>{t.bookRitual}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#FFFFFF] rtl:-rotate-90" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

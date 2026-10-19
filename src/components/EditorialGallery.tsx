import React, { useState } from 'react';
import { SALON_DATA } from '../data/salonData';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface EditorialGalleryProps {
  currentLang?: Language;
}

export const EditorialGallery: React.FC<EditorialGalleryProps> = ({ currentLang = 'fr' }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const t = TRANSLATIONS[currentLang].gallery;

  const filteredItems = selectedCategory === 'all'
    ? SALON_DATA.gallery
    : SALON_DATA.gallery.filter((item) => item.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="galerie" className="py-14 sm:py-20 md:py-28 bg-[#FAF7F2] relative border-b border-[#B89058]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
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

          {/* Category Filter Buttons (Scrollable on small mobile screens) */}
          <div className="flex items-center gap-1.5 p-1 bg-[#F2EAE0] rounded-lg border border-[#B89058]/25 overflow-x-auto max-w-full">
            {[
              { id: 'all', label: t.filterAll },
              { id: 'coiffure', label: t.filterCoiffure },
              { id: 'visage', label: t.filterVisage },
              { id: 'onglerie', label: t.filterOnglerie },
              { id: 'hammam', label: t.filterHammam },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-all whitespace-nowrap shrink-0 min-h-[36px] ${
                  selectedCategory === cat.id
                    ? 'bg-[#FFFFFF] text-[#181416] shadow-xs font-semibold border border-[#B89058]/40'
                    : 'text-[#5A504B] hover:text-[#181416]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {filteredItems.map((item, index) => {
            const transItem = t.items.find((ti) => ti.id === item.id);
            const displayTitle = transItem ? transItem.title : item.title;
            const displayCaption = transItem ? transItem.caption : item.caption;
            const displayCat = transItem ? transItem.categoryLabel : item.category;

            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-[#B89058]/25 bg-[#FFFFFF] transition-all duration-300 hover:border-[#B89058]/60 hover:shadow-md shadow-xs"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#F2EAE0]">
                  <img
                    src={item.image}
                    alt={displayTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-104"
                    loading="lazy"
                  />
                </div>

                {/* Hover overlay with typography and zoom affordance */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 sm:p-6 flex flex-col justify-end text-white text-start">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#B89058] font-semibold bg-white/10 px-2 py-0.5 rounded">
                      {displayCat}
                    </span>
                    <div className="p-1.5 rounded-full bg-[#FFFFFF] text-[#181416]">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-[#FFFFFF] font-normal mb-1">
                    {displayTitle}
                  </h3>
                  <p className="text-xs text-[#FAF7F2]/90 font-light line-clamp-2">
                    {displayCaption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeLightboxIndex !== null && filteredItems[activeLightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 md:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 end-4 p-2.5 text-white bg-white/20 hover:bg-white/30 rounded-full transition-all z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t.closeView}
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute start-2 sm:start-4 md:start-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-all z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t.prevImg}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute end-2 sm:end-4 md:end-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white bg-black/50 hover:bg-black/80 rounded-full transition-all z-20 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={t.nextImg}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 rtl:rotate-180" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[60vh] sm:max-h-[70vh] max-w-full object-contain rounded-lg shadow-2xl border border-white/20"
            />
            {(() => {
              const currentItem = filteredItems[activeLightboxIndex];
              const transItem = t.items.find((ti) => ti.id === currentItem.id);
              const displayTitle = transItem ? transItem.title : currentItem.title;
              const displayCaption = transItem ? transItem.caption : currentItem.caption;
              const displayCat = transItem ? transItem.categoryLabel : currentItem.category;

              return (
                <div className="mt-3 sm:mt-4 text-center max-w-xl text-white">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#B89058] font-semibold mb-1">
                    {displayCat}
                  </div>
                  <div className="font-serif text-lg sm:text-2xl mb-1">
                    {displayTitle}
                  </div>
                  <div className="text-xs text-white/80 font-light">
                    {displayCaption}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

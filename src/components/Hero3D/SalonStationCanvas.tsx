import React, { useEffect, useRef, useState } from 'react';
import { SalonStationScene, LightingMode, ChairFinish, StationCameraView } from './SalonStationScene';
import { RotateCw, Sun, Moon, Sparkles, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';
import { TRANSLATIONS, Language } from '../../data/translations';

interface SalonStationCanvasProps {
  onBookStation?: () => void;
  currentLang?: Language;
}

export const SalonStationCanvas: React.FC<SalonStationCanvasProps> = ({
  onBookStation,
  currentLang = 'fr',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SalonStationScene | null>(null);

  const [lightingMode, setLightingMode] = useState<LightingMode>('daylight');
  const [chairFinish, setChairFinish] = useState<ChairFinish>('caramel');
  const [cameraView, setCameraView] = useState<StationCameraView>('overview');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  // Default collapsed on mobile screens, matching the screenshot
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);

  const t = TRANSLATIONS[currentLang].station3D;

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      const scene = new SalonStationScene(mountRef.current, {
        onLoaded: () => setIsSceneReady(true),
      });
      sceneRef.current = scene;
    } catch (err) {
      console.warn('WebGL init fallback:', err);
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, []);

  const handleLightingChange = (mode: LightingMode) => {
    setLightingMode(mode);
    sceneRef.current?.setLightingMode(mode);
  };

  const handleChairChange = (finish: ChairFinish) => {
    setChairFinish(finish);
    sceneRef.current?.setChairFinish(finish);
  };

  const handleCameraChange = (view: StationCameraView) => {
    setCameraView(view);
    sceneRef.current?.setCameraView(view);
  };

  const handleToggleRotate = () => {
    if (sceneRef.current) {
      const active = sceneRef.current.toggleAutoRotate();
      setIsRotating(active);
    }
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[640px] flex items-center justify-center overflow-hidden rounded-2xl border border-[#B89058]/25 bg-gradient-to-b from-[#FAF7F2] to-[#F2EAE0] shadow-sm">
      {/* 3D WebGL Canvas isolated mount with touch-pan-y to allow mobile vertical scrolling */}
      <div
        ref={mountRef}
        className={`w-full h-full touch-pan-y transition-opacity duration-700 ${
          isSceneReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ cursor: isRotating ? 'grab' : 'crosshair' }}
        aria-label="Poste de Coiffure & Miroir 3D Réaliste Maison Éclat"
      />

      {/* Title & Authentic 3D Salon Station Label - Perfectly matching the screenshot */}
      <div className="absolute top-3.5 start-3.5 sm:top-6 sm:start-7 md:start-8 pointer-events-none z-10 max-w-[85%] text-start">
        <div className="flex items-center gap-1.5 text-[8.5px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8C6A3C] font-semibold mb-0.5">
          <Sparkles className="w-3 h-3 text-[#B89058] shrink-0" />
          <span>{t.tag}</span>
        </div>
        <div className="font-serif text-lg sm:text-2xl md:text-3xl text-[#181416] font-normal leading-tight">
          {t.title}
        </div>
        {/* Description is visible on mobile without overlapping the mirror */}
        <div className="text-[9.5px] sm:text-xs text-[#5A504B] max-w-[240px] sm:max-w-md mt-0.5 font-light leading-snug line-clamp-2">
          {t.desc}
        </div>
      </div>

      {/* Collapsible Luxury Studio Controls Dock (Responsive on mobile) */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-[780px]">
        {/* Toggle pill button - Exactly as in the user's screenshot */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => {
              sounds.playCrystalChime(750);
              setIsDockCollapsed(!isDockCollapsed);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1 text-[10px] sm:text-[11px] tracking-wider uppercase text-[#181416] bg-[#FAF7F2]/95 hover:bg-[#FAF7F2] border border-[#B89058]/40 rounded-full transition-all duration-200 shadow-md backdrop-blur-md min-h-[30px]"
            aria-expanded={!isDockCollapsed}
            aria-label="Contrôles du poste 3D"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#B89058]" />
                <span>{t.toggleShow}</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#B89058]" />
                <span>{t.toggleHide}</span>
              </>
            )}
          </button>
        </div>

        {/* Panel Body */}
        <div
          className={`transition-all duration-300 ease-out origin-bottom ${
            isDockCollapsed
              ? 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden'
              : 'opacity-100 scale-100 h-auto'
          }`}
        >
          <div className="bg-[#FAF7F2]/98 backdrop-blur-xl border border-[#B89058]/40 rounded-xl p-3 sm:p-4 shadow-2xl space-y-2.5 max-h-[200px] sm:max-h-none overflow-y-auto text-start">
            <div className="flex flex-col md:flex-row items-center justify-between gap-2.5">
              {/* Lighting Mode Selector */}
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8C6A3C] font-semibold text-center md:text-start">
                  {t.lightAmbiance}
                </span>
                <div className="flex items-center justify-center md:justify-start gap-1 p-1 bg-[#F0E8DC] rounded-lg border border-[#B89058]/20 overflow-x-auto">
                  <button
                    onClick={() => handleLightingChange('daylight')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs rounded transition-all whitespace-nowrap min-h-[32px] ${
                      lightingMode === 'daylight'
                        ? 'bg-[#FFFFFF] text-[#181416] shadow-xs border border-[#B89058]/40 font-medium'
                        : 'text-[#6A5E57] hover:text-[#181416]'
                    }`}
                  >
                    <Sun className="w-3 h-3 text-[#B89058]" />
                    <span>{t.daylight}</span>
                  </button>
                  <button
                    onClick={() => handleLightingChange('golden')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs rounded transition-all whitespace-nowrap min-h-[32px] ${
                      lightingMode === 'golden'
                        ? 'bg-[#FFFFFF] text-[#181416] shadow-xs border border-[#B89058]/40 font-medium'
                        : 'text-[#6A5E57] hover:text-[#181416]'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-[#B89058]" />
                    <span>{t.golden}</span>
                  </button>
                  <button
                    onClick={() => handleLightingChange('evening')}
                    className={`flex items-center gap-1 px-2.5 py-1 text-[10px] sm:text-xs rounded transition-all whitespace-nowrap min-h-[32px] ${
                      lightingMode === 'evening'
                        ? 'bg-[#FFFFFF] text-[#181416] shadow-xs border border-[#B89058]/40 font-medium'
                        : 'text-[#6A5E57] hover:text-[#181416]'
                    }`}
                  >
                    <Moon className="w-3 h-3 text-[#8C6A3C]" />
                    <span>{t.evening}</span>
                  </button>
                </div>
              </div>

              {/* Chair Finish Swatches */}
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#8C6A3C] font-semibold text-center md:text-start">
                  {t.chairFinish}
                </span>
                <div className="flex items-center justify-center md:justify-start gap-1 p-1 bg-[#F0E8DC] rounded-lg border border-[#B89058]/20 overflow-x-auto">
                  {[
                    { id: 'caramel', color: '#9E6236', name: t.caramel },
                    { id: 'ivory', color: '#EDE6DC', name: t.ivory },
                    { id: 'terracotta', color: '#8D4A3D', name: t.terracotta },
                    { id: 'noir', color: '#242223', name: t.noir },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => handleChairChange(f.id as ChairFinish)}
                      className={`px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded flex items-center gap-1 transition-all min-h-[32px] ${
                        chairFinish === f.id
                          ? 'bg-[#FFFFFF] text-[#181416] shadow-xs font-medium border border-[#B89058]/40'
                          : 'text-[#6A5E57] hover:text-[#181416]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: f.color }}
                      />
                      <span>{f.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Auto-rotation toggle & CTA */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
                <button
                  onClick={handleToggleRotate}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] sm:text-xs font-medium transition-all min-h-[32px] ${
                    isRotating
                      ? 'bg-[#FFFFFF] border-[#B89058]/50 text-[#181416]'
                      : 'bg-[#F0E8DC] border-[#B89058]/20 text-[#6A5E57] hover:text-[#181416]'
                  }`}
                  title={isRotating ? 'Contrôle libre au curseur' : 'Activer la rotation'}
                >
                  <RotateCw className={`w-3 h-3 text-[#B89058] ${isRotating ? 'animate-spin-slow' : ''}`} />
                  <span>{isRotating ? t.auto : t.free}</span>
                </button>

                {onBookStation && (
                  <button
                    onClick={onBookStation}
                    className="px-3 py-1 bg-[#B89058] hover:bg-[#8C6A3C] text-[#FFFFFF] rounded-lg text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shadow-xs min-h-[32px]"
                  >
                    {t.takeSeat}
                  </button>
                )}
              </div>
            </div>

            {/* Camera View Switcher */}
            <div className="pt-1.5 border-t border-[#B89058]/15 flex flex-col sm:flex-row items-center justify-between gap-1 text-xs text-[#5A504B]">
              <span className="flex items-center gap-1 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#8C6A3C] font-semibold">
                <Eye className="w-3 h-3 text-[#B89058]" />
                {t.perspectives}
              </span>
              <div className="flex items-center gap-1 overflow-x-auto max-w-full">
                {[
                  { id: 'overview', label: t.viewOverview },
                  { id: 'mirror', label: t.viewMirror },
                  { id: 'chair', label: t.viewChair },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCameraChange(c.id as StationCameraView)}
                    className={`px-2 py-0.5 rounded text-[10px] sm:text-[11px] whitespace-nowrap transition-colors min-h-[28px] ${
                      cameraView === c.id
                        ? 'bg-[#FFFFFF] text-[#181416] border border-[#B89058]/50 font-medium shadow-2xs'
                        : 'text-[#6A5E57] hover:text-[#181416]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

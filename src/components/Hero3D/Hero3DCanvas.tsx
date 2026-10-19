import React, { useEffect, useRef, useState } from 'react';
import { PerfumeBottleScene, EssencePreset, CameraPreset } from './PerfumeBottleScene';
import { RotateCw, Sliders, ChevronDown, ChevronUp, Sparkles, Eye } from 'lucide-react';
import { sounds } from '../../utils/soundEffects';

interface Hero3DCanvasProps {
  onSelectRitualCTA?: () => void;
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ onSelectRitualCTA }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<PerfumeBottleScene | null>(null);

  const [activePreset, setActivePreset] = useState<EssencePreset>('rose');
  const [activeCamera, setActiveCamera] = useState<CameraPreset>('front');
  const [explodedVal, setExplodedVal] = useState<number>(0);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [isSceneReady, setIsSceneReady] = useState<boolean>(false);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);

  useEffect(() => {
    if (!mountRef.current) return;

    try {
      const scene = new PerfumeBottleScene(mountRef.current, {
        onLoaded: () => setIsSceneReady(true),
      });
      sceneRef.current = scene;
    } catch (err) {
      console.warn('WebGL initialization fallback:', err);
      setHasWebGLError(true);
    }

    return () => {
      if (sceneRef.current) {
        sceneRef.current.destroy();
        sceneRef.current = null;
      }
    };
  }, []);

  const handlePresetChange = (preset: EssencePreset) => {
    setActivePreset(preset);
    sceneRef.current?.applyPreset(preset);
  };

  const handleCameraChange = (cam: CameraPreset) => {
    setActiveCamera(cam);
    sceneRef.current?.setCameraView(cam);
  };

  const handleExplodedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExplodedVal(val);
    sceneRef.current?.setExplodedView(val);
  };

  const handleToggleRotate = () => {
    if (sceneRef.current) {
      const newState = sceneRef.current.toggleAutoRotate();
      setIsRotating(newState);
    }
  };

  return (
    <div className="relative w-full h-[640px] lg:h-[740px] flex items-center justify-center overflow-hidden">
      {/* 3D WebGL Canvas isolated mount */}
      <div
        ref={mountRef}
        className={`w-full h-full transition-opacity duration-1000 ${
          isSceneReady ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ cursor: isRotating ? 'grab' : 'crosshair' }}
        aria-label="Expérience 3D interactive du Flacon Signature Maison Éclat"
      />

      {/* Fallback if WebGL fails or loading */}
      {(!isSceneReady || hasWebGLError) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="w-60 h-80 rounded-2xl bg-gradient-to-b from-[#3D1428]/40 to-[#171217] border border-[#C5A265]/30 flex items-center justify-center p-6 text-center shadow-2xl backdrop-blur-sm">
            <div>
              <Sparkles className="w-8 h-8 text-[#E9D8C3] mx-auto mb-3 animate-pulse" />
              <div className="font-serif text-2xl text-[#F8F3EC] tracking-wide mb-1">Le Flacon Talisman</div>
              <div className="text-xs text-[#E9D8C3]/70">Cristal facetté 12 faces & Or 24k</div>
            </div>
          </div>
        </div>
      )}

      {/* Subtle brand watermark & object label */}
      <div className="absolute top-6 left-6 md:left-12 pointer-events-none z-10">
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A265] font-semibold mb-1">
          Haute Pièce N°01
        </div>
        <div className="font-serif text-2xl md:text-3xl text-[#F8F3EC] font-light">
          Le Flacon Talisman
        </div>
        <div className="text-xs text-[#E9D8C3]/65 max-w-xs mt-1">
          Cristal facetté 12 faces, socle d'obsidienne, collerette or brossé 24k et distillation pure de rose.
        </div>
      </div>

      {/* Consolidated Collapsible Bottom Dock (Zero Viewport Occlusion) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-[860px]">
        {/* Collapse / Expand Toggle */}
        <div className="flex justify-center mb-2">
          <button
            onClick={() => {
              sounds.playCrystalChime(700);
              setIsDockCollapsed(!isDockCollapsed);
            }}
            className="flex items-center gap-1.5 px-3 py-1 text-[11px] tracking-wider uppercase text-[#E9D8C3]/80 bg-[#171217]/85 hover:bg-[#3D1428]/90 border border-[#C5A265]/30 rounded-full transition-all duration-200 shadow-md backdrop-blur-sm"
            aria-expanded={!isDockCollapsed}
            aria-label="Afficher ou masquer l'atelier 3D"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Atelier 3D & Angles</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#C5A265]" />
                <span>Masquer l'atelier</span>
              </>
            )}
          </button>
        </div>

        {/* Dock Panel Body */}
        <div
          className={`transition-all duration-300 ease-out origin-bottom ${
            isDockCollapsed
              ? 'opacity-0 scale-95 pointer-events-none h-0 overflow-hidden'
              : 'opacity-100 scale-100 h-auto'
          }`}
        >
          <div className="bg-[#171217]/92 backdrop-blur-md border border-[#C5A265]/30 rounded-2xl p-3.5 md:p-4 shadow-2xl shadow-black/80 space-y-3">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Essence Swatch Tabs */}
              <div className="flex flex-col gap-1 w-full md:w-auto">
                <span className="text-[10px] uppercase tracking-widest text-[#E9D8C3]/60 font-medium">
                  Essence Botanique
                </span>
                <div className="flex items-center gap-1.5 p-1 bg-[#261521] rounded-lg border border-[#C5A265]/20">
                  {[
                    { id: 'rose', label: 'Rose Damascena' },
                    { id: 'ambre', label: 'Ambre Impérial' },
                    { id: 'oud', label: 'Oud & Cèdre' },
                    { id: 'neroli', label: 'Fleur d’Oranger' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => handlePresetChange(p.id as EssencePreset)}
                      className={`px-2.5 py-1 text-xs rounded transition-all whitespace-nowrap ${
                        activePreset === p.id
                          ? 'bg-[#3D1428] text-[#F8F3EC] shadow-sm border border-[#C5A265]/40 font-medium'
                          : 'text-[#E9D8C3]/70 hover:text-[#F8F3EC]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exploded View Slider */}
              <div className="flex flex-col gap-1 w-full md:w-36">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-[#E9D8C3]/60">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3 h-3 text-[#C5A265]" />
                    Éclaté
                  </span>
                  <span className="font-mono text-[11px] text-[#C5A265]">{Math.round(explodedVal * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={explodedVal}
                  onChange={handleExplodedChange}
                  className="w-full h-1.5 bg-[#261521] rounded-lg appearance-none cursor-pointer accent-[#C5A265]"
                  aria-label="Ajuster la vue éclatée de la bouteille"
                />
              </div>

              {/* Rotation & Action */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={handleToggleRotate}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                    isRotating
                      ? 'bg-[#3D1428] border-[#C5A265]/40 text-[#F8F3EC]'
                      : 'bg-[#261521] border-[#C5A265]/20 text-[#E9D8C3]/70 hover:text-[#F8F3EC]'
                  }`}
                  title={isRotating ? "Désactiver l'auto-rotation pour contrôler au curseur" : "Activer l'auto-rotation"}
                >
                  <RotateCw className={`w-3.5 h-3.5 text-[#C5A265] ${isRotating ? 'animate-spin-slow' : ''}`} />
                  <span className="hidden sm:inline">{isRotating ? 'Rotation' : 'Libre'}</span>
                </button>

                {onSelectRitualCTA && (
                  <button
                    onClick={onSelectRitualCTA}
                    className="px-3.5 py-1.5 bg-[#C5A265] hover:bg-[#D4AF37] text-[#171217] rounded-lg text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shadow-sm"
                  >
                    Réserver
                  </button>
                )}
              </div>
            </div>

            {/* Camera View Angle Selector */}
            <div className="pt-2 border-t border-[#C5A265]/15 flex items-center justify-between text-[11px] text-[#E9D8C3]/70">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[10px] text-[#C5A265]">
                <Eye className="w-3 h-3" />
                Angles Caméra :
              </span>
              <div className="flex items-center gap-1.5">
                {[
                  { id: 'front', label: 'Face' },
                  { id: 'cap', label: 'Bouchon & Or' },
                  { id: 'isometric', label: 'Perspective' },
                  { id: 'top', label: 'Zénith' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCameraChange(c.id as CameraPreset)}
                    className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                      activeCamera === c.id
                        ? 'bg-[#3D1428] text-[#F8F3EC] border border-[#C5A265]/40 font-medium'
                        : 'text-[#E9D8C3]/60 hover:text-[#F8F3EC]'
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

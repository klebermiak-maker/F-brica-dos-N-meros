import React from 'react';
import { GameMode } from '../types/math';
import { Star, Volume2, VolumeX, Sparkles, Printer, BookOpen, Compass, Layers, Wrench } from 'lucide-react';
import { playPopSound } from '../utils/audio';

interface HeaderProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  stars: number;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  stars,
  score,
  soundEnabled,
  onToggleSound
}) => {
  const navItems: { mode: GameMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'adventure', label: 'Missão Aventura', icon: <Compass className="w-4 h-4" /> },
    { mode: 'laboratory', label: 'Material Dourado', icon: <Layers className="w-4 h-4" /> },
    { mode: 'builder', label: 'Fábrica de Somas', icon: <Wrench className="w-4 h-4" /> },
    { mode: 'worksheet', label: 'Folha de Atividades', icon: <Printer className="w-4 h-4" /> },
    { mode: 'guide', label: 'Guia D08 BNCC', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-200/70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Clean Brand Wordmark (Single text element) */}
        <div 
          onClick={() => { playPopSound(); onSelectMode('adventure'); }}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-sm font-black text-lg group-hover:scale-105 transition-transform">
            D8
          </div>
          <span className="font-bold text-lg text-slate-800 tracking-tight group-hover:text-amber-600 transition-colors">
            Fábrica dos Números
          </span>
        </div>

        {/* Zone 2: Navigation Links (Clean text with active indicator, single line) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = currentMode === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => {
                  playPopSound();
                  onSelectMode(item.mode);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-100/90 text-amber-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Stars, Score & Audio controls) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Star counter */}
          <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-lg text-amber-800 font-bold text-xs">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span className="font-mono tabular-nums">{stars}</span>
            <span className="hidden sm:inline font-medium text-amber-600">estrelas</span>
          </div>

          {/* Score counter */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200/80 rounded-lg text-sky-800 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            <span className="font-mono tabular-nums">{score}</span>
            <span className="text-sky-600 font-medium">pts</span>
          </div>

          {/* Audio toggle button */}
          <button
            onClick={() => {
              playPopSound();
              onToggleSound();
            }}
            type="button"
            className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            title={soundEnabled ? 'Silenciar som' : 'Ativar som'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav strip for screens < 1024px */}
      <div className="flex lg:hidden overflow-x-auto py-1 px-3 border-t border-slate-100 bg-amber-50/50 gap-1 scrollbar-none">
        {navItems.map((item) => {
          const isActive = currentMode === item.mode;
          return (
            <button
              key={item.mode}
              onClick={() => {
                playPopSound();
                onSelectMode(item.mode);
              }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-amber-500 text-white'
                  : 'text-slate-600 bg-white border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

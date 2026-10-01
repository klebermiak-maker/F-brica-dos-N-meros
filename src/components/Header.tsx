import React from 'react';
import { GameMode } from '../types/math';
import { Star, Volume2, VolumeX, Sparkles, Printer, BookOpen, Compass, Layers, Wrench, Trophy } from 'lucide-react';
import { playPopSound } from '../utils/audio';
import { motion } from 'framer-motion';

interface HeaderProps {
  currentMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  stars: number;
  score: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenAchievements: () => void;
  unlockedAchievementsCount: number;
  totalAchievementsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  onSelectMode,
  stars,
  score,
  soundEnabled,
  onToggleSound,
  onOpenAchievements,
  unlockedAchievementsCount,
  totalAchievementsCount
}) => {
  const navItems: { mode: GameMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'adventure', label: 'Missão Aventura', icon: <Compass className="w-4 h-4" /> },
    { mode: 'laboratory', label: 'Material Dourado', icon: <Layers className="w-4 h-4" /> },
    { mode: 'builder', label: 'Fábrica de Somas', icon: <Wrench className="w-4 h-4" /> },
    { mode: 'worksheet', label: 'Folha de Atividades', icon: <Printer className="w-4 h-4" /> },
    { mode: 'guide', label: 'Guia D08 BNCC', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-amber-200/70 sticky top-0 z-40">
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
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-amber-950 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBackground"
                    className="absolute inset-0 bg-amber-100/90 border border-amber-300/80 rounded-xl shadow-2xs"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {item.icon}
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions (Achievements, Stars, Score & Audio controls) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Achievements Trigger Button */}
          <button
            onClick={() => {
              if (soundEnabled) playPopSound();
              onOpenAchievements();
            }}
            type="button"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-bold text-xs shadow-xs transition-transform hover:scale-105 cursor-pointer"
            title="Abrir Sala de Conquistas"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
            <span className="hidden sm:inline">Conquistas</span>
            <span className="bg-black/20 px-1.5 py-0.5 rounded-md font-mono text-[10px] text-amber-100">
              {unlockedAchievementsCount}/{totalAchievementsCount}
            </span>
          </button>

          {/* Star counter */}
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-800 font-bold text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span className="font-mono tabular-nums">{stars}</span>
            <span className="hidden md:inline font-medium text-amber-600">estrelas</span>
          </div>

          {/* Score counter */}
          <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-sky-50 border border-sky-200/80 rounded-xl text-sky-800 font-bold text-xs">
            <Sparkles className="w-3 h-3 text-sky-500" />
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
            className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
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
              className={`relative flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
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

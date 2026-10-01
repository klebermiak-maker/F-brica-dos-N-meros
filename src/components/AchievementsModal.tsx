import React, { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Sparkles, 
  Star, 
  Award, 
  Layers, 
  Wrench, 
  CheckCircle2, 
  Zap, 
  Target, 
  Crown, 
  Lock, 
  X, 
  TrendingUp,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ACHIEVEMENTS_DEFINITIONS, 
  AchievementDef, 
  StoredMetrics 
} from '../utils/achievementsData';
import { playPopSound } from '../utils/audio';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: StoredMetrics;
  soundEnabled: boolean;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  metrics,
  soundEnabled
}) => {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  if (!isOpen) return null;

  const unlockedSet = new Set(metrics.unlockedAchievementIds);
  const totalCount = ACHIEVEMENTS_DEFINITIONS.length;
  const unlockedCount = metrics.unlockedAchievementIds.length;
  const progressPercent = Math.round((unlockedCount / totalCount) * 100);

  const filteredList = ACHIEVEMENTS_DEFINITIONS.filter((def) => {
    const isUnlocked = unlockedSet.has(def.id);
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'locked') return !isUnlocked;
    return true;
  });

  const getIcon = (iconName: AchievementDef['icon'], isUnlocked: boolean) => {
    const className = `w-6 h-6 ${isUnlocked ? 'text-amber-500 fill-amber-300' : 'text-slate-400'}`;
    switch (iconName) {
      case 'trophy': return <Trophy className={className} />;
      case 'flame': return <Flame className={className} />;
      case 'sparkles': return <Sparkles className={className} />;
      case 'star': return <Star className={className} />;
      case 'award': return <Award className={className} />;
      case 'layers': return <Layers className={className} />;
      case 'wrench': return <Wrench className={className} />;
      case 'check': return <CheckCircle2 className={className} />;
      case 'zap': return <Zap className={className} />;
      case 'target': return <Target className={className} />;
      case 'crown': return <Crown className={className} />;
      default: return <Trophy className={className} />;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (soundEnabled) playPopSound();
            onClose();
          }}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 sm:p-6 text-white shrink-0 relative overflow-hidden">
            {/* Background decoration circles */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-amber-300/20 rounded-full blur-lg pointer-events-none" />

            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs border border-white/30 flex items-center justify-center text-white shadow-inner">
                  <Trophy className="w-7 h-7 text-amber-200 fill-amber-300" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                    Sala de Conquistas & Medalhas
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-100 font-medium">
                    Acompanhe seus marcos matemáticos e desbloqueie recompensas!
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (soundEnabled) playPopSound();
                  onClose();
                }}
                type="button"
                className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/30 border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer shrink-0"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics Bar inside Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-white/20">
              <div className="bg-black/15 rounded-xl p-2.5 text-center">
                <div className="text-[11px] text-amber-200 font-medium">Troféus Conquistados</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  {unlockedCount} / {totalCount}
                </div>
              </div>

              <div className="bg-black/15 rounded-xl p-2.5 text-center">
                <div className="text-[11px] text-amber-200 font-medium">Equações Resolvidas</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  {metrics.totalEquationsSolved} / 100
                </div>
              </div>

              <div className="bg-black/15 rounded-xl p-2.5 text-center">
                <div className="text-[11px] text-amber-200 font-medium">Maior Sequência</div>
                <div className="text-xl font-bold font-mono text-amber-300 mt-0.5 flex items-center justify-center gap-1">
                  <span>{metrics.maxStreak}</span>
                  <Flame className="w-4 h-4 text-orange-400 fill-orange-400" />
                </div>
              </div>

              <div className="bg-black/15 rounded-xl p-2.5 text-center">
                <div className="text-[11px] text-amber-200 font-medium">Progresso Geral</div>
                <div className="text-xl font-bold font-mono text-white mt-0.5">
                  {progressPercent}%
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-5 py-3 border-b border-slate-100 bg-amber-50/50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => { if (soundEnabled) playPopSound(); setFilter('all'); }}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === 'all'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Todas ({totalCount})
              </button>
              <button
                onClick={() => { if (soundEnabled) playPopSound(); setFilter('unlocked'); }}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === 'unlocked'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Conquistadas ({unlockedCount})
              </button>
              <button
                onClick={() => { if (soundEnabled) playPopSound(); setFilter('locked'); }}
                type="button"
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filter === 'locked'
                    ? 'bg-slate-700 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Em Andamento ({totalCount - unlockedCount})
              </button>
            </div>

            <div className="text-xs text-slate-500 font-medium hidden sm:block">
              Desbloqueie todas para se tornar o Grão-Mestre da Fábrica!
            </div>
          </div>

          {/* Achievements Grid List */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-3">
            {filteredList.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Trophy className="w-12 h-12 mx-auto mb-2 opacity-40 text-slate-300" />
                <p className="text-sm font-semibold">Nenhuma conquista nesta categoria ainda.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {filteredList.map((ach) => {
                  const isUnlocked = unlockedSet.has(ach.id);
                  const currentVal = ach.getValue(metrics);
                  const progress = Math.min(100, Math.round((currentVal / ach.targetValue) * 100));

                  return (
                    <div
                      key={ach.id}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                        isUnlocked
                          ? 'bg-gradient-to-br from-amber-50/80 to-emerald-50/40 border-amber-300/90 shadow-2xs'
                          : 'bg-white border-slate-200/90 opacity-90'
                      }`}
                    >
                      <div>
                        {/* Top row: Icon + status badge */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex items-center gap-3">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                              isUnlocked
                                ? 'bg-amber-100 border-amber-300 shadow-2xs'
                                : 'bg-slate-100 border-slate-200'
                            }`}>
                              {getIcon(ach.icon, isUnlocked)}
                            </div>
                            <div>
                              <h3 className={`text-sm font-bold ${isUnlocked ? 'text-slate-900' : 'text-slate-700'}`}>
                                {ach.title}
                              </h3>
                              <span className="text-[11px] font-semibold text-amber-600 flex items-center gap-1">
                                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                                <span>+{ach.rewardStars} estrelas de bônus</span>
                              </span>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isUnlocked ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                                <Check className="w-3 h-3 stroke-[3]" />
                                <span>Conquistado!</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[11px] font-semibold border border-slate-200">
                                <Lock className="w-3 h-3" />
                                <span>Bloqueado</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-3">
                          {ach.description}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="pt-2 border-t border-slate-100/80">
                        <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                          <span className="text-slate-500 font-medium">Progresso:</span>
                          <span className={`font-bold ${isUnlocked ? 'text-emerald-700' : 'text-slate-700'}`}>
                            {Math.min(currentVal, ach.targetValue)} / {ach.targetValue}
                          </span>
                        </div>

                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              isUnlocked
                                ? 'bg-gradient-to-r from-emerald-500 to-amber-500'
                                : 'bg-amber-400'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 shrink-0">
            <span>Todas as conquistas são salvas automaticamente no seu navegador.</span>
            <button
              onClick={() => {
                if (soundEnabled) playPopSound();
                onClose();
              }}
              type="button"
              className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Fechar Conquistas
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

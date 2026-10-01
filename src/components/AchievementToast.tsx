import React from 'react';
import { Trophy, Star, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementDef } from '../utils/achievementsData';

interface AchievementToastProps {
  achievement: AchievementDef | null;
  onDismiss: () => void;
  onOpenModal: () => void;
}

export const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onDismiss,
  onOpenModal
}) => {
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div
          initial={{ opacity: 0, y: -40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 450, damping: 28 }}
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl p-4 shadow-2xl border-2 border-amber-200/90 flex items-start gap-3 select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center shrink-0 shadow-inner">
            <Trophy className="w-6 h-6 text-amber-200 fill-amber-300 animate-bounce" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-amber-100">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Conquista Desbloqueada!</span>
            </div>
            <div className="font-black text-sm text-white mt-0.5">
              {achievement.title}
            </div>
            <div className="text-xs text-amber-100 font-medium leading-tight mt-0.5 line-clamp-2">
              {achievement.description}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-white/20 px-2 py-0.5 rounded-md text-amber-100">
                <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                <span>+{achievement.rewardStars} Estrelas</span>
              </span>
              <button
                onClick={onOpenModal}
                type="button"
                className="text-[11px] font-bold underline underline-offset-2 hover:text-amber-200 cursor-pointer"
              >
                Ver Todas
              </button>
            </div>
          </div>

          <button
            onClick={onDismiss}
            type="button"
            className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            title="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

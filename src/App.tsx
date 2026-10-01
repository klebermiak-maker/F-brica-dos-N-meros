/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GameMode } from './types/math';
import { Header } from './components/Header';
import { AdventureMode } from './components/AdventureMode';
import { GoldenMaterialLab } from './components/GoldenMaterialLab';
import { AdditionBuilder } from './components/AdditionBuilder';
import { WorksheetGenerator } from './components/WorksheetGenerator';
import { PedagogicalGuide } from './components/PedagogicalGuide';
import { AchievementsModal } from './components/AchievementsModal';
import { AchievementToast } from './components/AchievementToast';
import { 
  loadStoredMetrics, 
  saveStoredMetrics, 
  checkAchievements, 
  StoredMetrics, 
  AchievementDef, 
  ACHIEVEMENTS_DEFINITIONS 
} from './utils/achievementsData';
import { playVictoryFanfare } from './utils/audio';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentMode, setCurrentMode] = useState<GameMode>('adventure');
  
  const [stars, setStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('d08_stars');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [score, setScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('d08_score');
      return saved ? parseInt(saved, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('d08_sound');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // Achievements & Milestones state
  const [metrics, setMetrics] = useState<StoredMetrics>(() => loadStoredMetrics(stars));
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [toastAchievement, setToastAchievement] = useState<AchievementDef | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('d08_stars', stars.toString());
      localStorage.setItem('d08_score', score.toString());
      localStorage.setItem('d08_sound', soundEnabled.toString());
    } catch {
      // Ignore localStorage errors
    }
  }, [stars, score, soundEnabled]);

  // Keep metrics.totalStars synced with stars state
  useEffect(() => {
    setMetrics(prev => {
      if (prev.totalStars !== stars) {
        const updated = { ...prev, totalStars: stars };
        saveStoredMetrics(updated);
        // Check if any star-related achievement triggered
        const { updatedMetrics, newlyUnlocked } = checkAchievements(updated);
        if (newlyUnlocked.length > 0) {
          triggerAchievementUnlock(newlyUnlocked);
        }
        return updatedMetrics;
      }
      return prev;
    });
  }, [stars]);

  const triggerAchievementUnlock = (unlockedList: AchievementDef[]) => {
    if (unlockedList.length === 0) return;
    const first = unlockedList[0];
    setToastAchievement(first);

    // Reward bonus stars
    const totalBonus = unlockedList.reduce((acc, curr) => acc + curr.rewardStars, 0);
    if (totalBonus > 0) {
      setStars(prev => prev + totalBonus);
    }

    if (soundEnabled) {
      playVictoryFanfare();
    }

    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.25, x: 0.8 }
      });
    } catch {
      // Ignore
    }
  };

  const handleAddStars = (amount: number) => {
    setStars(prev => prev + amount);
  };

  const handleAddScore = (amount: number) => {
    setScore(prev => prev + amount);
  };

  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  // Called when any equation is solved across modes
  const handleEquationSolved = (streak: number = 1) => {
    setMetrics(prev => {
      const nextSolved = prev.totalEquationsSolved + 1;
      const nextCurrentStreak = streak;
      const nextMaxStreak = Math.max(prev.maxStreak, streak);
      
      const candidate: StoredMetrics = {
        ...prev,
        totalEquationsSolved: nextSolved,
        currentStreak: nextCurrentStreak,
        maxStreak: nextMaxStreak,
        totalStars: stars
      };

      const { updatedMetrics, newlyUnlocked } = checkAchievements(candidate);
      saveStoredMetrics(updatedMetrics);

      if (newlyUnlocked.length > 0) {
        triggerAchievementUnlock(newlyUnlocked);
      }

      return updatedMetrics;
    });
  };

  // Called when a piece exchange is made in Material Dourado Lab
  const handleLabExchange = () => {
    setMetrics(prev => {
      const candidate: StoredMetrics = {
        ...prev,
        labExchangesDone: prev.labExchangesDone + 1,
        totalStars: stars
      };
      const { updatedMetrics, newlyUnlocked } = checkAchievements(candidate);
      saveStoredMetrics(updatedMetrics);

      if (newlyUnlocked.length > 0) {
        triggerAchievementUnlock(newlyUnlocked);
      }

      return updatedMetrics;
    });
  };

  // Called when an addition combo is found in Addition Builder
  const handleBuilderCombo = () => {
    setMetrics(prev => {
      const candidate: StoredMetrics = {
        ...prev,
        builderCombosFound: prev.builderCombosFound + 1,
        totalStars: stars
      };
      const { updatedMetrics, newlyUnlocked } = checkAchievements(candidate);
      saveStoredMetrics(updatedMetrics);

      if (newlyUnlocked.length > 0) {
        triggerAchievementUnlock(newlyUnlocked);
      }

      return updatedMetrics;
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 font-sans">
      {/* 3-Zone Header Contract with Achievements button */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        stars={stars}
        score={score}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        unlockedAchievementsCount={metrics.unlockedAchievementIds.length}
        totalAchievementsCount={ACHIEVEMENTS_DEFINITIONS.length}
      />

      {/* Main Game Stage with Fluid Framer-Motion Transitions */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMode}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.985 }}
            transition={{ 
              duration: 0.22, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="w-full"
          >
            {currentMode === 'adventure' && (
              <AdventureMode
                onAddStars={handleAddStars}
                onAddScore={handleAddScore}
                soundEnabled={soundEnabled}
                onEquationSolved={handleEquationSolved}
              />
            )}

            {currentMode === 'laboratory' && (
              <GoldenMaterialLab
                onAddStars={handleAddStars}
                onAddScore={handleAddScore}
                soundEnabled={soundEnabled}
                onEquationSolved={handleEquationSolved}
                onLabExchange={handleLabExchange}
              />
            )}

            {currentMode === 'builder' && (
              <AdditionBuilder
                onAddStars={handleAddStars}
                onAddScore={handleAddScore}
                soundEnabled={soundEnabled}
                onEquationSolved={handleEquationSolved}
                onBuilderCombo={handleBuilderCombo}
              />
            )}

            {currentMode === 'worksheet' && (
              <WorksheetGenerator />
            )}

            {currentMode === 'guide' && (
              <PedagogicalGuide />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        metrics={metrics}
        soundEnabled={soundEnabled}
      />

      {/* Transient Unlock Toast */}
      <AchievementToast
        achievement={toastAchievement}
        onDismiss={() => setToastAchievement(null)}
        onOpenModal={() => {
          setToastAchievement(null);
          setIsAchievementsOpen(true);
        }}
      />

      {/* Quiet, Human Educational Footer */}
      <footer className="print:hidden border-t border-amber-200/60 bg-white/70 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Fábrica dos Números D08</span>
            <span aria-hidden="true">·</span>
            <span>Matemática para o 2º Ano do Ensino Fundamental</span>
          </div>

          <div className="flex items-center gap-3 text-slate-500">
            <span>BNCC EF02MA04 & EF02MA05</span>
            <span aria-hidden="true">·</span>
            <span>SAEB / SPAECE Descritor D08</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

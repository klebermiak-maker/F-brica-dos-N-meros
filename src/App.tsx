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

  useEffect(() => {
    try {
      localStorage.setItem('d08_stars', stars.toString());
      localStorage.setItem('d08_score', score.toString());
      localStorage.setItem('d08_sound', soundEnabled.toString());
    } catch {
      // Ignore localStorage errors
    }
  }, [stars, score, soundEnabled]);

  const handleAddStars = (amount: number) => {
    setStars(prev => prev + amount);
  };

  const handleAddScore = (amount: number) => {
    setScore(prev => prev + amount);
  };

  const handleToggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-amber-50/30 text-slate-800 font-sans">
      {/* 3-Zone Header Contract */}
      <Header
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        stars={stars}
        score={score}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
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
              />
            )}

            {currentMode === 'laboratory' && (
              <GoldenMaterialLab
                onAddStars={handleAddStars}
                onAddScore={handleAddScore}
                soundEnabled={soundEnabled}
              />
            )}

            {currentMode === 'builder' && (
              <AdditionBuilder
                onAddStars={handleAddStars}
                onAddScore={handleAddScore}
                soundEnabled={soundEnabled}
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

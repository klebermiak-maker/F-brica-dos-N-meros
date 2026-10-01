import React, { useState } from 'react';
import { MascotAvatar } from './MascotAvatar';
import { playPopSound, playCorrectSound, playVictoryFanfare } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Trash2, 
  RotateCcw, 
  Check, 
  Plus, 
  Award,
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdditionBuilderProps {
  onAddStars: (amount: number) => void;
  onAddScore: (amount: number) => void;
  soundEnabled: boolean;
}

interface PuzzleLevel {
  target: number;
  availableTiles: number[];
  possibleSolutionsCount: number;
}

const PUZZLE_LEVELS: PuzzleLevel[] = [
  {
    target: 245,
    availableTiles: [200, 100, 40, 5, 30, 15, 140, 240, 45, 20],
    possibleSolutionsCount: 4
  },
  {
    target: 358,
    availableTiles: [300, 200, 50, 8, 40, 18, 150, 350, 58, 100],
    possibleSolutionsCount: 4
  },
  {
    target: 472,
    availableTiles: [400, 300, 70, 2, 60, 12, 170, 470, 72, 200],
    possibleSolutionsCount: 4
  },
  {
    target: 539,
    availableTiles: [500, 400, 30, 9, 20, 19, 130, 530, 39, 300],
    possibleSolutionsCount: 4
  },
  {
    target: 684,
    availableTiles: [600, 500, 80, 4, 70, 14, 180, 680, 84, 400],
    possibleSolutionsCount: 4
  },
  {
    target: 196,
    availableTiles: [100, 90, 6, 80, 16, 180, 96, 50, 40, 10],
    possibleSolutionsCount: 4
  },
  {
    target: 327,
    availableTiles: [300, 200, 20, 7, 10, 17, 120, 320, 27, 100],
    possibleSolutionsCount: 4
  },
  {
    target: 615,
    availableTiles: [600, 500, 10, 5, 110, 15, 610, 550, 65, 400],
    possibleSolutionsCount: 4
  },
  {
    target: 753,
    availableTiles: [700, 600, 50, 3, 40, 13, 150, 750, 53, 500],
    possibleSolutionsCount: 4
  },
  {
    target: 842,
    availableTiles: [800, 700, 40, 2, 30, 12, 140, 840, 42, 600],
    possibleSolutionsCount: 4
  }
];

export const AdditionBuilder: React.FC<AdditionBuilderProps> = ({
  onAddStars,
  onAddScore,
  soundEnabled
}) => {
  const [levelIndex, setLevelIndex] = useState(0);
  const currentPuzzle = PUZZLE_LEVELS[levelIndex] || PUZZLE_LEVELS[0];

  const [trayTiles, setTrayTiles] = useState<number[]>([]);
  const [discoveredCombinations, setDiscoveredCombinations] = useState<string[]>([]);
  const [message, setMessage] = useState<string>(
    'Escolha cartões abaixo para formar o número alvo na esteira de adições!'
  );

  const currentSum = trayTiles.reduce((acc, curr) => acc + curr, 0);
  const isMatch = currentSum === currentPuzzle.target;

  const handleAddTile = (value: number) => {
    if (trayTiles.length >= 5) return;
    if (soundEnabled) playPopSound();
    
    const nextTiles = [...trayTiles, value];
    setTrayTiles(nextTiles);

    const sum = nextTiles.reduce((a, b) => a + b, 0);
    if (sum === currentPuzzle.target) {
      handleMatchSuccess(nextTiles);
    } else if (sum > currentPuzzle.target) {
      setMessage(`A soma deu ${sum}, passou do alvo ${currentPuzzle.target}! Clique em uma peça para retirar.`);
    } else {
      setMessage(`Soma atual: ${sum}. Faltam ${currentPuzzle.target - sum} para atingir a meta!`);
    }
  };

  const handleRemoveTile = (indexToRemove: number) => {
    if (soundEnabled) playPopSound();
    const nextTiles = trayTiles.filter((_, idx) => idx !== indexToRemove);
    setTrayTiles(nextTiles);
    const sum = nextTiles.reduce((a, b) => a + b, 0);
    setMessage(`Soma atual: ${sum}.`);
  };

  const handleClearTray = () => {
    if (soundEnabled) playPopSound();
    setTrayTiles([]);
    setMessage('Esteira limpa. Escolha novos cartões!');
  };

  const handleMatchSuccess = (tiles: number[]) => {
    const key = [...tiles].sort((a, b) => b - a).join(' + ');
    
    if (discoveredCombinations.includes(key)) {
      setMessage(`Você já havia descoberto a soma "${key}"! Tente agora com outros números!`);
      return;
    }

    if (soundEnabled) playCorrectSound();
    const newCombinations = [...discoveredCombinations, key];
    setDiscoveredCombinations(newCombinations);
    
    onAddStars(2);
    onAddScore(75);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore
    }

    if (newCombinations.length >= 3) {
      if (soundEnabled) playVictoryFanfare();
      setMessage(`🎉 ESPETACULAR! Você descobriu 3 maneiras diferentes de compor ${currentPuzzle.target}! Pode avançar de nível!`);
    } else {
      setMessage(`🌟 Muito bem! Você encontrou: ${key} = ${currentPuzzle.target}. Consegue achar mais uma forma diferente?`);
    }
  };

  const handleNextLevel = () => {
    if (soundEnabled) playPopSound();
    const nextIdx = (levelIndex + 1) % PUZZLE_LEVELS.length;
    setLevelIndex(nextIdx);
    setTrayTiles([]);
    setDiscoveredCombinations([]);
    setMessage(`Novo nível da fábrica! Monte o número ${PUZZLE_LEVELS[nextIdx].target} de formas diferentes!`);
  };

  return (
    <div className="space-y-6">
      {/* Intro Mascot */}
      <div className="bg-white border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotAvatar
          mood={isMatch ? 'celebrating' : 'thinking'}
          message={message}
          speakableText={message}
        />
      </div>

      {/* Target Level Card */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="text-xs uppercase font-bold text-amber-600 tracking-wider">
              Desafio da Fábrica #{levelIndex + 1} de {PUZZLE_LEVELS.length}
            </div>
            <h2 className="text-lg font-bold text-slate-800">
              Construa o Número Alvo com Adições
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {discoveredCombinations.length >= 2 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextLevel}
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                <span>Próximo Nível</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}
            <button
              onClick={() => {
                setTrayTiles([]);
                setDiscoveredCombinations([]);
              }}
              type="button"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Reiniciar nível atual"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Big Target Banner with smooth transition */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentPuzzle.target}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 text-white text-center shadow-md"
          >
            <div className="text-xs uppercase font-bold text-amber-100">
              Número Alvo a Conquistar
            </div>
            <div className="text-4xl sm:text-5xl font-mono font-black my-1">
              {currentPuzzle.target}
            </div>
            <div className="text-xs text-amber-100 font-medium">
              Descobertas: {discoveredCombinations.length} de 3 formas diferentes
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Discovered Combinations Tags */}
        {discoveredCombinations.length > 0 && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-600 mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span>Suas Fórmulas Descobertas:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {discoveredCombinations.map((combo, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 font-mono font-bold text-xs flex items-center gap-1.5 shadow-2xs"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{combo} = {currentPuzzle.target}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      {/* Assembly Tray (Esteira de Adição) */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-b border-slate-800 pb-2">
          <span>SUA ESTEIRA DE ADIÇÃO (Clique no cartão para remover)</span>
          <button
            onClick={handleClearTray}
            disabled={trayTiles.length === 0}
            className="flex items-center gap-1 text-rose-400 hover:text-rose-300 disabled:opacity-30 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Esteira</span>
          </button>
        </div>

        {/* Tiles in tray with smooth spring bounce */}
        <div className="min-h-[90px] bg-slate-800/80 border-2 border-dashed border-slate-700 rounded-2xl p-4 flex flex-wrap items-center justify-center gap-3">
          {trayTiles.length === 0 ? (
            <span className="text-xs sm:text-sm text-slate-400 italic">
              Nenhum cartão na esteira. Clique nos cartões amarelos abaixo para somar!
            </span>
          ) : (
            <AnimatePresence>
              {trayTiles.map((val, idx) => (
                <React.Fragment key={`${val}_${idx}`}>
                  {idx > 0 && <span className="text-amber-400 font-bold text-xl">+</span>}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleRemoveTile(idx)}
                    className="px-4 py-2.5 bg-amber-400 hover:bg-rose-400 text-amber-950 hover:text-white font-mono font-black text-xl rounded-xl shadow-md transition-colors group relative cursor-pointer"
                    title="Clique para remover da esteira"
                  >
                    {val}
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      ×
                    </span>
                  </motion.button>
                </React.Fragment>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Live Sum Indicator */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Soma da Esteira:</span>
            <span
              className={`font-mono font-black text-2xl ${
                isMatch
                  ? 'text-emerald-400 animate-pulse'
                  : currentSum > currentPuzzle.target
                  ? 'text-rose-400'
                  : 'text-amber-300'
              }`}
            >
              {currentSum}
            </span>
          </div>

          <div>
            {isMatch ? (
              <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500 text-emerald-300 text-xs font-bold rounded-lg flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Meta Atingida!
              </span>
            ) : currentSum > currentPuzzle.target ? (
              <span className="px-3 py-1 bg-rose-500/20 border border-rose-500 text-rose-300 text-xs font-bold rounded-lg">
                Passou em {currentSum - currentPuzzle.target}
              </span>
            ) : (
              <span className="text-xs text-slate-400">
                Faltam {currentPuzzle.target - currentSum}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Available Cards / Conveyor Belt */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs">
        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
          Banco de Cartões Numéricos (Clique para adicionar à esteira):
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {currentPuzzle.availableTiles.map((tileVal, idx) => {
            const isHundreds = tileVal >= 100;
            const isTens = tileVal >= 10 && tileVal < 100;

            let badgeColor = 'bg-amber-100 border-amber-300 text-amber-900 hover:bg-amber-200';
            if (isHundreds) {
              badgeColor = 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100';
            } else if (isTens) {
              badgeColor = 'bg-sky-50 border-sky-300 text-sky-900 hover:bg-sky-100';
            }

            return (
              <motion.button
                key={`${tileVal}_${idx}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddTile(tileVal)}
                type="button"
                className={`p-3 sm:p-4 rounded-xl border-2 font-mono font-black text-xl shadow-xs flex flex-col items-center justify-center cursor-pointer ${badgeColor}`}
              >
                <span>{tileVal}</span>
                <span className="text-[10px] font-sans font-medium text-slate-500 mt-0.5">
                  {isHundreds ? 'Centena' : isTens ? 'Dezena' : 'Unidade'}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

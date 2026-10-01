import React, { useState } from 'react';
import { GoldenBlocksView } from './GoldenBlocksView';
import { MascotAvatar } from './MascotAvatar';
import { playPopSound, playCorrectSound, playVictoryFanfare } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Plus, 
  Minus, 
  RotateCcw, 
  ArrowRightLeft, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Award,
  ArrowRight,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GoldenMaterialLabProps {
  onAddStars: (amount: number) => void;
  onAddScore: (amount: number) => void;
  soundEnabled: boolean;
  onEquationSolved?: (streak: number) => void;
  onLabExchange?: () => void;
}

const LAB_TARGETS = [235, 148, 356, 427, 514, 189, 362, 470, 508, 625];

function formatAddition(c: number, d: number, u: number): string {
  const parts: string[] = [];
  if (c > 0) parts.push(`${c * 100}`);
  if (d > 0) parts.push(`${d * 10}`);
  if (u > 0) parts.push(`${u}`);
  if (parts.length === 0) return '0';
  return parts.join(' + ');
}

export const GoldenMaterialLab: React.FC<GoldenMaterialLabProps> = ({
  onAddStars,
  onAddScore,
  soundEnabled,
  onEquationSolved,
  onLabExchange
}) => {
  const [targetIndex, setTargetIndex] = useState(0);
  const targetNumber = LAB_TARGETS[targetIndex];

  // Current blocks in lab
  const initialC = Math.floor(targetNumber / 100);
  const initialD = Math.floor((targetNumber % 100) / 10);
  const initialU = targetNumber % 10;

  const [centenas, setCentenas] = useState(initialC);
  const [dezenas, setDezenas] = useState(initialD);
  const [unidades, setUnidades] = useState(initialU);

  const [discoveredForms, setDiscoveredForms] = useState<string[]>([
    formatAddition(initialC, initialD, initialU)
  ]);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    `Bem-vindo ao Laboratório! O número alvo é ${targetNumber}. Use as Trocas Mágicas para descobrir novas adições!`
  );

  const totalValue = centenas * 100 + dezenas * 10 + unidades;

  const checkDiscovery = (newC: number, newD: number, newU: number, msg: string) => {
    setFeedbackMsg(msg);
    const sum = newC * 100 + newD * 10 + newU;
    const form = formatAddition(newC, newD, newU);
    
    if (sum === targetNumber && !discoveredForms.includes(form)) {
      if (soundEnabled) playCorrectSound();
      setDiscoveredForms(prev => [...prev, form]);
      onAddStars(2);
      onAddScore(80);
      onEquationSolved?.(1);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    }
  };

  // Add / Remove pieces
  const handleModifyPiece = (type: 'c' | 'd' | 'u', delta: number) => {
    if (soundEnabled) playPopSound();
    let nextC = centenas;
    let nextD = dezenas;
    let nextU = unidades;

    if (type === 'c') {
      nextC = Math.max(0, Math.min(9, centenas + delta));
      setCentenas(nextC);
    } else if (type === 'd') {
      nextD = Math.max(0, Math.min(30, dezenas + delta));
      setDezenas(nextD);
    } else {
      nextU = Math.max(0, Math.min(50, unidades + delta));
      setUnidades(nextU);
    }

    const sum = nextC * 100 + nextD * 10 + nextU;
    if (sum === targetNumber) {
      checkDiscovery(nextC, nextD, nextU, `Você montou o número ${targetNumber}!`);
    } else {
      setFeedbackMsg(`Total atual: ${sum}. Alvo: ${targetNumber}.`);
    }
  };

  // Reagrupamento: Trocar 1 Placa por 10 Barras
  const handleTrocaPlacaPorBarras = () => {
    if (centenas <= 0) return;
    if (soundEnabled) playPopSound();
    
    const nextC = centenas - 1;
    const nextD = dezenas + 10;
    const nextU = unidades;
    
    setCentenas(nextC);
    setDezenas(nextD);
    onLabExchange?.();
    
    checkDiscovery(nextC, nextD, nextU, 'Você trocou 1 centena (100) por 10 dezenas! O total continua o mesmo, mas a adição mudou!');
  };

  // Agrupamento: Trocar 10 Barras por 1 Placa
  const handleTrocaBarrasPorPlaca = () => {
    if (dezenas < 10) return;
    if (soundEnabled) playPopSound();
    
    const nextC = centenas + 1;
    const nextD = dezenas - 10;
    const nextU = unidades;

    setCentenas(nextC);
    setDezenas(nextD);
    onLabExchange?.();
    
    checkDiscovery(nextC, nextD, nextU, 'Você juntou 10 barras para formar 1 placa de 100!');
  };

  // Reagrupamento: Trocar 1 Barra por 10 Cubinhos
  const handleTrocaBarraPorCubos = () => {
    if (dezenas <= 0) return;
    if (soundEnabled) playPopSound();
    
    const nextC = centenas;
    const nextD = dezenas - 1;
    const nextU = unidades + 10;

    setDezenas(nextD);
    setUnidades(nextU);
    onLabExchange?.();
    
    checkDiscovery(nextC, nextD, nextU, 'Você trocou 1 dezena (10) por 10 cubinhos! Veja como a adição se transformou!');
  };

  // Agrupamento: Trocar 10 Cubinhos por 1 Barra
  const handleTrocaCubosPorBarra = () => {
    if (unidades < 10) return;
    if (soundEnabled) playPopSound();
    
    const nextC = centenas;
    const nextD = dezenas + 1;
    const nextU = unidades - 10;

    setDezenas(nextD);
    setUnidades(nextU);
    onLabExchange?.();
    
    checkDiscovery(nextC, nextD, nextU, 'Você agrupou 10 cubinhos em 1 barra de dez!');
  };

  // Reset to current target canonical
  const handleResetTarget = () => {
    if (soundEnabled) playPopSound();
    const c = Math.floor(targetNumber / 100);
    const d = Math.floor((targetNumber % 100) / 10);
    const u = targetNumber % 10;
    setCentenas(c);
    setDezenas(d);
    setUnidades(u);
    setFeedbackMsg(`Peças reiniciadas para a forma canônica do número ${targetNumber}.`);
  };

  // Select specific target
  const handleSelectTarget = (idx: number) => {
    if (soundEnabled) playPopSound();
    const nextT = LAB_TARGETS[idx];
    const c = Math.floor(nextT / 100);
    const d = Math.floor((nextT % 100) / 10);
    const u = nextT % 10;

    setTargetIndex(idx);
    setCentenas(c);
    setDezenas(d);
    setUnidades(u);

    const initialForm = formatAddition(c, d, u);
    setDiscoveredForms([initialForm]);
    setFeedbackMsg(`Missão #${idx + 1} de 10: Descubra diferentes adições para compor ${nextT}!`);
  };

  // Next target
  const handleNextTarget = () => {
    const nextIdx = (targetIndex + 1) % LAB_TARGETS.length;
    handleSelectTarget(nextIdx);
  };

  // Dynamic non-zero terms for live addition display
  const additionTerms: { val: number; label: string }[] = [];
  if (centenas > 0) additionTerms.push({ val: centenas * 100, label: `${centenas} ${centenas === 1 ? 'centena' : 'centenas'}` });
  if (dezenas > 0) additionTerms.push({ val: dezenas * 10, label: `${dezenas} ${dezenas === 1 ? 'dezena' : 'dezenas'}` });
  if (unidades > 0) additionTerms.push({ val: unidades, label: `${unidades} ${unidades === 1 ? 'unidade' : 'unidades'}` });

  return (
    <div className="space-y-6">
      {/* Introduction Banner & Mascot */}
      <div className="bg-white border border-amber-200/90 rounded-3xl p-5 sm:p-6 shadow-xs">
        <MascotAvatar
          mood="teaching"
          message={feedbackMsg}
          speakableText={feedbackMsg}
        />
      </div>

      {/* 10 Targets Selector Strip */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            10 Missões do Laboratório D08:
          </span>
          <span className="text-xs text-amber-700 font-bold">
            Missão #{targetIndex + 1} de 10 (Alvo: {targetNumber})
          </span>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
          {LAB_TARGETS.map((tgt, idx) => {
            const isCurrent = idx === targetIndex;
            return (
              <button
                key={tgt}
                onClick={() => handleSelectTarget(idx)}
                type="button"
                className={`py-2 px-1 rounded-xl text-center border font-mono font-bold text-xs transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-amber-500 border-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                <div className="text-[10px] uppercase font-sans font-semibold opacity-80">#{idx + 1}</div>
                <div>{tgt}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Challenge Badge & Forms discovered */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-base">
                Missão do Material Dourado #{targetIndex + 1} de {LAB_TARGETS.length}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Número Alvo: <span className="font-mono font-bold text-amber-700 text-base">{targetNumber}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleNextTarget}
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <span>Próximo Alvo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetTarget}
              type="button"
              className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Reiniciar peças para este número"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List of discovered additions for this target */}
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span>Formas de adição descobertas para o número {targetNumber}:</span>
            <span className="font-mono text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200 font-bold">
              {discoveredForms.length} forma(s) encontrada(s)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {discoveredForms.map((form, i) => (
              <motion.div
                key={`${form}_${i}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-900 font-mono font-bold text-xs shadow-2xs"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{form} = {targetNumber}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Value & Mathematical Addition Box */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Adição Atual no Tabuleiro
          </div>

          {/* Clean addition expression without 0 terms */}
          <div className="text-2xl sm:text-4xl font-mono font-bold tracking-tight text-amber-300 flex items-center justify-center flex-wrap gap-2">
            {additionTerms.length === 0 ? (
              <span>0</span>
            ) : (
              additionTerms.map((term, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-slate-400">+</span>}
                  <span>{term.val}</span>
                </React.Fragment>
              ))
            )}
            <span className="text-slate-400">=</span>
            <span className={`underline underline-offset-4 decoration-4 ${totalValue === targetNumber ? 'text-emerald-400 decoration-emerald-400' : 'text-white decoration-amber-400'}`}>
              {totalValue}
            </span>
          </div>

          <div className="text-xs text-slate-300 font-medium">
            {centenas} {centenas === 1 ? 'centena' : 'centenas'} ({centenas * 100}) · {dezenas} {dezenas === 1 ? 'dezena' : 'dezenas'} ({dezenas * 10}) · {unidades} {unidades === 1 ? 'unidade' : 'unidades'} ({unidades})
          </div>
        </div>
      </div>

      {/* Visual Golden Blocks Display */}
      <GoldenBlocksView
        centenas={centenas}
        dezenas={dezenas}
        unidades={unidades}
      />

      {/* Interactive Controls & Regrouping (Trocas Mágicas) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quantity Controllers */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            1. Adicionar ou Tirar Peças
          </div>

          <div className="space-y-2 text-xs">
            {/* Centenas row */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-700">Placas de 100:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleModifyPiece('c', -1)}
                  disabled={centenas <= 0}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{centenas}</span>
                <button
                  onClick={() => handleModifyPiece('c', 1)}
                  disabled={centenas >= 9}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Dezenas row */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-700">Barras de 10:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleModifyPiece('d', -1)}
                  disabled={dezenas <= 0}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{dezenas}</span>
                <button
                  onClick={() => handleModifyPiece('d', 1)}
                  disabled={dezenas >= 30}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Unidades row */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-700">Cubinhos de 1:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleModifyPiece('u', -1)}
                  disabled={unidades <= 0}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{unidades}</span>
                <button
                  onClick={() => handleModifyPiece('u', 1)}
                  disabled={unidades >= 50}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* The Magic of Regrouping (Trocas Mágicas - O Coração do D08!) */}
        <div className="bg-white border border-amber-200/80 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-amber-600" />
              2. Trocas Mágicas (Reagrupar)
            </span>
            <span className="text-[11px] text-slate-500 font-medium">Mantém a mesma soma!</span>
          </div>

          <div className="space-y-2">
            {/* Trocar 1 Placa por 10 Barras */}
            <button
              onClick={handleTrocaPlacaPorBarras}
              disabled={centenas < 1}
              className="w-full p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-amber-50/70 transition-colors cursor-pointer"
            >
              <span>Desmanchar 1 Placa em 10 Barras</span>
              <span className="font-mono text-[11px] text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
                -100 +100
              </span>
            </button>

            {/* Trocar 10 Barras por 1 Placa */}
            <button
              onClick={handleTrocaBarrasPorPlaca}
              disabled={dezenas < 10}
              className="w-full p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-emerald-50/70 transition-colors cursor-pointer"
            >
              <span>Juntar 10 Barras em 1 Placa</span>
              <span className="font-mono text-[11px] text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                +1 Placa
              </span>
            </button>

            {/* Trocar 1 Barra por 10 Cubinhos */}
            <button
              onClick={handleTrocaBarraPorCubos}
              disabled={dezenas < 1}
              className="w-full p-2.5 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-sky-50/70 transition-colors cursor-pointer"
            >
              <span>Desmanchar 1 Barra em 10 Cubinhos</span>
              <span className="font-mono text-[11px] text-sky-800 bg-white px-2 py-0.5 rounded border border-sky-200">
                -10 +10
              </span>
            </button>

            {/* Trocar 10 Cubinhos por 1 Barra */}
            <button
              onClick={handleTrocaCubosPorBarra}
              disabled={unidades < 10}
              className="w-full p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-indigo-50/70 transition-colors cursor-pointer"
            >
              <span>Juntar 10 Cubinhos em 1 Barra</span>
              <span className="font-mono text-[11px] text-indigo-800 bg-white px-2 py-0.5 rounded border border-indigo-200">
                +1 Barra
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

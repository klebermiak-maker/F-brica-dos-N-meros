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
  Award
} from 'lucide-react';

interface GoldenMaterialLabProps {
  onAddStars: (amount: number) => void;
  onAddScore: (amount: number) => void;
  soundEnabled: boolean;
}

export const GoldenMaterialLab: React.FC<GoldenMaterialLabProps> = ({
  onAddStars,
  onAddScore,
  soundEnabled
}) => {
  // Current blocks in lab
  const [centenas, setCentenas] = useState(2);
  const [dezenas, setDezenas] = useState(3);
  const [unidades, setUnidades] = useState(5);

  // Target challenge mode
  const [targetNumber, setTargetNumber] = useState<number>(235);
  const [discoveredForms, setDiscoveredForms] = useState<string[]>([
    '200 + 30 + 5'
  ]);
  const [feedbackMsg, setFeedbackMsg] = useState<string>(
    'Bem-vindo ao Laboratório! Adicione peças ou use os botões de troca para ver as diferentes adições do mesmo número!'
  );

  const totalValue = centenas * 100 + dezenas * 10 + unidades;

  // Current addition expression
  const currentAddition = `${centenas * 100} + ${dezenas * 10} + ${unidades}`;

  // Add / Remove pieces
  const handleModifyPiece = (type: 'c' | 'd' | 'u', delta: number) => {
    if (soundEnabled) playPopSound();
    if (type === 'c') {
      const next = Math.max(0, Math.min(9, centenas + delta));
      setCentenas(next);
    } else if (type === 'd') {
      const next = Math.max(0, Math.min(30, dezenas + delta));
      setDezenas(next);
    } else {
      const next = Math.max(0, Math.min(50, unidades + delta));
      setUnidades(next);
    }
  };

  // Reagrupamento: Trocar 1 Placa por 10 Barras
  const handleTrocaPlacaPorBarras = () => {
    if (centenas <= 0) return;
    if (soundEnabled) playPopSound();
    
    setCentenas(prev => prev - 1);
    setDezenas(prev => prev + 10);
    
    const newForm = `${(centenas - 1) * 100} + ${(dezenas + 10) * 10} + ${unidades}`;
    checkDiscoveredForm(newForm, 'Você trocou 1 centena por 10 dezenas! O total continua o mesmo, mas a adição mudou!');
  };

  // Agrupamento: Trocar 10 Barras por 1 Placa
  const handleTrocaBarrasPorPlaca = () => {
    if (dezenas < 10) return;
    if (soundEnabled) playPopSound();
    
    setCentenas(prev => prev + 1);
    setDezenas(prev => prev - 10);
    
    const newForm = `${(centenas + 1) * 100} + ${(dezenas - 10) * 10} + ${unidades}`;
    checkDiscoveredForm(newForm, 'Você juntou 10 barras para formar 1 placa de 100!');
  };

  // Reagrupamento: Trocar 1 Barra por 10 Cubinhos
  const handleTrocaBarraPorCubos = () => {
    if (dezenas <= 0) return;
    if (soundEnabled) playPopSound();
    
    setDezenas(prev => prev - 1);
    setUnidades(prev => prev + 10);
    
    const newForm = `${centenas * 100} + ${(dezenas - 1) * 10} + ${unidades + 10}`;
    checkDiscoveredForm(newForm, 'Você trocou 1 dezena por 10 cubinhos! Veja como a adição se transformou!');
  };

  // Agrupamento: Trocar 10 Cubinhos por 1 Barra
  const handleTrocaCubosPorBarra = () => {
    if (unidades < 10) return;
    if (soundEnabled) playPopSound();
    
    setDezenas(prev => prev + 1);
    setUnidades(prev => prev - 10);
    
    const newForm = `${centenas * 100} + ${(dezenas + 1) * 10} + ${unidades - 10}`;
    checkDiscoveredForm(newForm, 'Você agrupou 10 cubinhos em 1 barra de dez!');
  };

  const checkDiscoveredForm = (newForm: string, msg: string) => {
    setFeedbackMsg(msg);
    if (totalValue === targetNumber && !discoveredForms.includes(newForm)) {
      if (soundEnabled) playCorrectSound();
      setDiscoveredForms(prev => [...prev, newForm]);
      onAddStars(2);
      onAddScore(80);
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    }
  };

  // Novo Desafio de Número
  const handleNewTarget = () => {
    if (soundEnabled) playPopSound();
    const targets = [148, 256, 342, 427, 513, 175, 360, 489];
    const nextTarget = targets[Math.floor(Math.random() * targets.length)];
    
    const c = Math.floor(nextTarget / 100);
    const d = Math.floor((nextTarget % 100) / 10);
    const u = nextTarget % 10;
    
    setTargetNumber(nextTarget);
    setCentenas(c);
    setDezenas(d);
    setUnidades(u);
    
    const initialForm = `${c * 100} + ${d * 10} + ${u}`;
    setDiscoveredForms([initialForm]);
    setFeedbackMsg(`Nova missão: Descubra diferentes formas de compor o número ${nextTarget} fazendo trocas!`);
  };

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

      {/* Target Challenge Badge & Forms discovered */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-slate-800 text-base">
                Missão das Diferentes Adições
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Número Alvo: <span className="font-mono font-bold text-amber-700 text-sm">{targetNumber}</span>
            </p>
          </div>

          <button
            onClick={handleNewTarget}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sortear Outro Número</span>
          </button>
        </div>

        {/* List of discovered additions for this target */}
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3">
          <div className="text-xs font-bold text-slate-700 mb-2 flex items-center justify-between">
            <span>Formas descobertas para o número {targetNumber}:</span>
            <span className="font-mono text-amber-800 bg-white px-2 py-0.5 rounded border border-amber-200">
              {discoveredForms.length} forma(s) encontrada(s)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {discoveredForms.map((form, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-900 font-mono font-bold text-xs shadow-2xs"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{form} = {targetNumber}</span>
              </div>
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

          <div className="text-2xl sm:text-4xl font-mono font-bold tracking-tight text-amber-300 flex items-center justify-center flex-wrap gap-2">
            <span>{centenas * 100}</span>
            <span className="text-slate-400">+</span>
            <span>{dezenas * 10}</span>
            <span className="text-slate-400">+</span>
            <span>{unidades}</span>
            <span className="text-slate-400">=</span>
            <span className="text-white underline decoration-amber-400 decoration-4 underline-offset-4">
              {totalValue}
            </span>
          </div>

          <div className="text-xs text-slate-300 font-medium">
            {centenas} centenas ({centenas * 100}) · {dezenas} dezenas ({dezenas * 10}) · {unidades} unidades ({unidades})
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
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{centenas}</span>
                <button
                  onClick={() => handleModifyPiece('c', 1)}
                  disabled={centenas >= 9}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
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
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{dezenas}</span>
                <button
                  onClick={() => handleModifyPiece('d', 1)}
                  disabled={dezenas >= 30}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
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
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center font-mono font-bold text-sm">{unidades}</span>
                <button
                  onClick={() => handleModifyPiece('u', 1)}
                  disabled={unidades >= 50}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 flex items-center justify-center disabled:opacity-30"
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
            <span className="text-[11px] text-slate-500">Mantém a mesma soma!</span>
          </div>

          <div className="space-y-2">
            {/* Trocar 1 Placa por 10 Barras */}
            <button
              onClick={handleTrocaPlacaPorBarras}
              disabled={centenas < 1}
              className="w-full p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-amber-50/70 transition-colors"
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
              className="w-full p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 hover:bg-emerald-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-emerald-50/70 transition-colors"
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
              className="w-full p-2.5 rounded-xl border border-sky-200 bg-sky-50/70 hover:bg-sky-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-sky-50/70 transition-colors"
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
              className="w-full p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/70 hover:bg-indigo-100/90 text-left text-xs font-semibold text-slate-800 flex items-center justify-between disabled:opacity-40 disabled:hover:bg-indigo-50/70 transition-colors"
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

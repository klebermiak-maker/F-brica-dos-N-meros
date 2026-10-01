import React, { useState } from 'react';
import { D08Question, QuestionOption } from '../types/math';
import { 
  D08_STATIC_QUESTIONS, 
  TIER_CONFIG, 
  generateRandomD08Problem, 
  getShuffledTierQuestions,
  shuffleArray,
  shuffleQuestion 
} from '../utils/d08Data';
import { GoldenBlocksView } from './GoldenBlocksView';
import { MascotAvatar } from './MascotAvatar';
import { 
  playCorrectSound, 
  playWrongSound, 
  playPopSound, 
  playVictoryFanfare 
} from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Trophy,
  Flame,
  Lightbulb,
  Shuffle,
  Award
} from 'lucide-react';

interface AdventureModeProps {
  onAddStars: (amount: number) => void;
  onAddScore: (amount: number) => void;
  soundEnabled: boolean;
}

export const AdventureMode: React.FC<AdventureModeProps> = ({
  onAddStars,
  onAddScore,
  soundEnabled
}) => {
  const [selectedTier, setSelectedTier] = useState<1 | 2 | 3 | 4>(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [roundCompleted, setRoundCompleted] = useState(false);
  const [correctCountInRound, setCorrectCountInRound] = useState(0);

  // Exactly 10 shuffled questions for each tier
  const [tierQuestions, setTierQuestions] = useState<Record<number, D08Question[]>>({
    1: getShuffledTierQuestions(1, 10),
    2: getShuffledTierQuestions(2, 10),
    3: getShuffledTierQuestions(3, 10),
    4: getShuffledTierQuestions(4, 10),
  });

  const activeQuestions = tierQuestions[selectedTier] || [];
  const currentQuestion: D08Question = activeQuestions[currentQuestionIndex] || activeQuestions[0];
  const isLastQuestion = currentQuestionIndex === activeQuestions.length - 1;

  const handleSelectTier = (tier: 1 | 2 | 3 | 4) => {
    if (soundEnabled) playPopSound();
    setSelectedTier(tier);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
    setRoundCompleted(false);
    setCorrectCountInRound(0);
  };

  const handleShuffle = () => {
    if (soundEnabled) playPopSound();
    const newShuffled = getShuffledTierQuestions(selectedTier, 10);
    setTierQuestions(prev => ({
      ...prev,
      [selectedTier]: newShuffled
    }));
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
    setRoundCompleted(false);
    setCorrectCountInRound(0);
  };

  const handleOptionClick = (option: QuestionOption) => {
    if (isAnswered) return;
    
    setSelectedOptionId(option.id);
    setIsAnswered(true);

    if (option.isCorrect) {
      if (soundEnabled) playCorrectSound();
      const newStreak = streak + 1;
      setStreak(newStreak);
      setCorrectCountInRound(prev => prev + 1);
      
      const starReward = newStreak >= 3 ? 2 : 1;
      onAddStars(starReward);
      onAddScore(50 + (newStreak * 10));

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Ignore if unavailable
      }
    } else {
      if (soundEnabled) playWrongSound();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (soundEnabled) playPopSound();
    
    if (isLastQuestion) {
      // Completed all 10 challenges!
      if (soundEnabled) playVictoryFanfare();
      setRoundCompleted(true);
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 }
        });
      } catch {
        // Ignore
      }
      return;
    }

    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
  };

  const selectedOption = currentQuestion?.options.find(o => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="space-y-6">
      {/* Tier / Level Selector Bar */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-3 sm:p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-800">
              Missões do Descritor D08 · 10 Desafios
            </h2>
            <p className="text-xs text-slate-500">
              Complete os 10 desafios de cada nível para dominar as diferentes adições de até 3 ordens!
            </p>
          </div>

          {streak > 1 && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-xs font-bold self-start sm:self-auto">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-400" />
              <span>Sequência: {streak} acertos seguidos!</span>
            </div>
          )}
        </div>

        {/* Level Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {TIER_CONFIG.map((tier) => {
            const isSelected = selectedTier === tier.tier;
            return (
              <button
                key={tier.tier}
                onClick={() => handleSelectTier(tier.tier as 1 | 2 | 3 | 4)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 border-amber-600 text-white shadow-sm ring-2 ring-amber-300'
                    : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold truncate">{tier.name}</div>
                <div className={`text-[11px] truncate ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                  {tier.range}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Round Completed Screen (After 10 Challenges) */}
      {roundCompleted ? (
        <div className="bg-white border border-amber-300 rounded-3xl p-6 sm:p-10 shadow-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-amber-600 shadow-inner">
            <Trophy className="w-10 h-10 text-amber-600" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <span className="text-xs uppercase font-extrabold tracking-widest text-amber-600">
              Nível Concluído com Sucesso!
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Você completou os 10 Desafios do {TIER_CONFIG[selectedTier - 1].name}!
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              Você acertou {correctCountInRound} de 10 desafios neste nível, exercitando a composição e decomposição de números naturais de até 3 ordens!
            </p>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto text-center">
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-xs text-amber-700 font-medium">Desafios</div>
              <div className="text-2xl font-mono font-bold text-amber-900">10 / 10</div>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-xs text-emerald-700 font-medium">Acertos</div>
              <div className="text-2xl font-mono font-bold text-emerald-900">{correctCountInRound}</div>
            </div>
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200 col-span-2 sm:col-span-1">
              <div className="text-xs text-sky-700 font-medium">Maior Sequência</div>
              <div className="text-2xl font-mono font-bold text-sky-900">{streak} 🔥</div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleShuffle}
              type="button"
              className="w-full sm:w-auto px-6 py-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-amber-700" />
              <span>Jogar Mais 10 Desafios Embaralhados</span>
            </button>

            {selectedTier < 4 && (
              <button
                onClick={() => handleSelectTier((selectedTier + 1) as 1 | 2 | 3 | 4)}
                type="button"
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Avançar para o Próximo Nível</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Main Question Arena */
        <div className="bg-white border border-amber-200/90 rounded-3xl p-5 sm:p-8 shadow-sm relative overflow-hidden">
          {/* 10-Step Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold text-amber-800">
                Desafio {currentQuestionIndex + 1} de {activeQuestions.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShuffle}
                  type="button"
                  title="Embaralhar ordem das questões e alternativas"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-amber-300 bg-amber-50 text-amber-800 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer shadow-2xs"
                >
                  <Shuffle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Embaralhar 10 Desafios</span>
                </button>
                <span className="hidden sm:inline font-medium">Descritor D08</span>
              </div>
            </div>

            {/* 10-Step Visual Segment Indicator */}
            <div className="grid grid-cols-10 gap-1.5 h-2">
              {Array.from({ length: 10 }).map((_, stepIdx) => {
                let stepColor = 'bg-slate-200';
                if (stepIdx < currentQuestionIndex) {
                  stepColor = 'bg-emerald-500';
                } else if (stepIdx === currentQuestionIndex) {
                  stepColor = isAnswered ? (isCorrect ? 'bg-emerald-500' : 'bg-rose-400') : 'bg-amber-400 animate-pulse';
                }
                return (
                  <div
                    key={stepIdx}
                    title={`Desafio ${stepIdx + 1} de 10`}
                    className={`rounded-full transition-all duration-300 ${stepColor}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Question Header & Mascot */}
          <div className="mb-6">
            <MascotAvatar
              mood={isAnswered ? (isCorrect ? 'celebrating' : 'thinking') : 'teaching'}
              message={currentQuestion.questionText}
              speakableText={`${currentQuestion.title}. ${currentQuestion.questionText}`}
            />
          </div>

          {/* Big Target Number Banner */}
          <div className="my-6 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-6 text-white text-center shadow-md">
            <div className="text-xs uppercase tracking-widest font-bold text-amber-100 mb-1">
              Desafio {currentQuestionIndex + 1} de 10 · Número Alvo
            </div>
            <div className="text-4xl sm:text-6xl font-black font-mono tracking-tight drop-shadow-sm">
              {currentQuestion.targetNumber}
            </div>
            <div className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
              Centenas, Dezenas e Unidades por diferentes adições
            </div>
          </div>

          {/* Interactive Answer Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;
              let cardStyle = 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800';

              if (isAnswered) {
                if (option.isCorrect) {
                  cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
                } else if (isSelected) {
                  cardStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200';
                } else {
                  cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                  className={`p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-150 flex items-center justify-between group ${cardStyle} cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-amber-200 text-slate-700 group-hover:text-amber-900 font-bold text-sm flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div>
                      <span className="text-lg sm:text-xl font-bold font-mono tracking-tight">
                        {option.text}
                      </span>
                    </div>
                  </div>

                  {isAnswered && (
                    <div className="shrink-0 ml-2">
                      {option.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-rose-500" />
                      ) : null}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Section (Shown after answering) */}
          {isAnswered && selectedOption && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 mb-6 transition-all ${
                isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCorrect ? (
                  <Sparkles className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                
                <div className="flex-1 space-y-1">
                  <div className="font-bold text-base">
                    {isCorrect ? '✨ Muito Bem! Você Acertou!' : '💡 Veja a Explicação Pedagógica:'}
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {selectedOption.explanation}
                  </p>
                  <div className="text-xs text-slate-600 mt-2 font-mono">
                    Expressão calculada: {selectedOption.expression}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Controls & Hint Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                if (soundEnabled) playPopSound();
                setShowHint(!showHint);
              }}
              type="button"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-amber-300 bg-amber-50/80 text-amber-800 text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>{showHint ? 'Ocultar Ajuda Visual' : 'Ver Ajuda no Material Dourado'}</span>
            </button>

            {isAnswered ? (
              <button
                onClick={handleNextQuestion}
                type="button"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isLastQuestion ? (
                  <>
                    <span>Concluir 10 Desafios</span>
                    <Trophy className="w-4 h-4 text-amber-300" />
                  </>
                ) : (
                  <>
                    <span>Próximo Desafio ({currentQuestionIndex + 2}/10)</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <span className="text-xs text-slate-400 italic">
                Clique em uma das opções acima para responder
              </span>
            )}
          </div>

          {/* Visual Hint Box with Material Dourado */}
          {showHint && (
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Dica Visual do Robô Dito:</span>
              </div>
              <p className="text-xs text-slate-700 mb-3 font-medium">
                {currentQuestion.hint.text}
              </p>
              <GoldenBlocksView
                centenas={currentQuestion.hint.centenas}
                dezenas={currentQuestion.hint.dezenas}
                unidades={currentQuestion.hint.unidades}
                compact
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

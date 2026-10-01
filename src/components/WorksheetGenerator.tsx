import React, { useState, useEffect } from 'react';
import { Printer, CheckSquare, FileText, Shuffle } from 'lucide-react';
import { playPopSound } from '../utils/audio';
import { shuffleArray } from '../utils/d08Data';

interface RawOption {
  text: string;
  isCorrect: boolean;
}

interface RawWorksheetQuestion {
  id: number;
  number: number;
  question: string;
  options: RawOption[];
  explanation: string;
}

interface FormattedWorksheetQuestion {
  id: number;
  number: number;
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

const RAW_WORKSHEETS: Record<string, RawWorksheetQuestion[]> = {
  facil: [
    {
      id: 1,
      number: 48,
      question: 'Marque a opção que representa o número 48 por meio de uma adição:',
      options: [
        { text: '40 + 8', isCorrect: true },
        { text: '4 + 8', isCorrect: false },
        { text: '40 + 80', isCorrect: false },
        { text: '30 + 8', isCorrect: false },
      ],
      explanation: '4 dezenas (40) + 8 unidades (8) = 48.'
    },
    {
      id: 2,
      number: 75,
      question: 'O número 75 pode ser decomposto de uma forma diferente como:',
      options: [
        { text: '60 + 15', isCorrect: true },
        { text: '70 + 15', isCorrect: false },
        { text: '60 + 5', isCorrect: false },
        { text: '50 + 15', isCorrect: false },
      ],
      explanation: '60 + 15 = 75 (troca de 1 dezena por 10 unidades).'
    },
    {
      id: 3,
      number: 92,
      question: 'Complete a adição para formar 92: 92 = 80 + ___',
      options: [
        { text: '12', isCorrect: true },
        { text: '2', isCorrect: false },
        { text: '22', isCorrect: false },
        { text: '10', isCorrect: false },
      ],
      explanation: '80 + 12 = 92.'
    },
    {
      id: 4,
      number: 63,
      question: 'Qual das diferentes adições abaixo resulta no número 63?',
      options: [
        { text: '50 + 13', isCorrect: true },
        { text: '60 + 30', isCorrect: false },
        { text: '50 + 3', isCorrect: false },
        { text: '40 + 13', isCorrect: false },
      ],
      explanation: '50 + 13 = 63 (troca de 1 dezena por 10 unidades).'
    },
    {
      id: 5,
      number: 56,
      question: 'Ao juntar 30 + 26, qual número é formado?',
      options: [
        { text: '56', isCorrect: true },
        { text: '46', isCorrect: false },
        { text: '66', isCorrect: false },
        { text: '36', isCorrect: false },
      ],
      explanation: '30 + 26 = 56.'
    },
    {
      id: 6,
      number: 84,
      question: 'Como podemos escrever 84 com duas dezenas a menos e mais unidades?',
      options: [
        { text: '60 + 24', isCorrect: true },
        { text: '70 + 24', isCorrect: false },
        { text: '60 + 14', isCorrect: false },
        { text: '80 + 24', isCorrect: false },
      ],
      explanation: '60 + 24 = 84.'
    },
    {
      id: 7,
      number: 43,
      question: 'Qual das alternativas apresenta uma decomposição correta para o número 43?',
      options: [
        { text: '30 + 13', isCorrect: true },
        { text: '30 + 3', isCorrect: false },
        { text: '40 + 13', isCorrect: false },
        { text: '20 + 13', isCorrect: false },
      ],
      explanation: '30 + 13 = 43.'
    },
    {
      id: 8,
      number: 69,
      question: 'Complete a igualdade: 69 = 60 + ___',
      options: [
        { text: '9', isCorrect: true },
        { text: '90', isCorrect: false },
        { text: '19', isCorrect: false },
        { text: '6', isCorrect: false },
      ],
      explanation: '60 + 9 = 69.'
    },
    {
      id: 9,
      number: 98,
      question: 'Se trocarmos 1 dezena por 10 unidades, o número 98 pode ser escrito como:',
      options: [
        { text: '80 + 18', isCorrect: true },
        { text: '80 + 8', isCorrect: false },
        { text: '90 + 18', isCorrect: false },
        { text: '70 + 18', isCorrect: false },
      ],
      explanation: '80 + 18 = 98.'
    },
    {
      id: 10,
      number: 27,
      question: 'Qual adição com 1 dezena inteira forma 27?',
      options: [
        { text: '10 + 17', isCorrect: true },
        { text: '10 + 7', isCorrect: false },
        { text: '20 + 17', isCorrect: false },
        { text: '10 + 27', isCorrect: false },
      ],
      explanation: '10 + 17 = 27.'
    }
  ],
  medio: [
    {
      id: 1,
      number: 236,
      question: 'Qual das adições representa a composição do número 236?',
      options: [
        { text: '200 + 30 + 6', isCorrect: true },
        { text: '20 + 30 + 6', isCorrect: false },
        { text: '200 + 360', isCorrect: false },
        { text: '200 + 3 + 6', isCorrect: false },
      ],
      explanation: '2 centenas (200) + 3 dezenas (30) + 6 unidades (6) = 236.'
    },
    {
      id: 2,
      number: 345,
      question: 'Ao trocar 1 dezena por 10 unidades, o número 345 pode ser escrito como:',
      options: [
        { text: '300 + 30 + 15', isCorrect: true },
        { text: '300 + 40 + 15', isCorrect: false },
        { text: '200 + 30 + 15', isCorrect: false },
        { text: '300 + 20 + 15', isCorrect: false },
      ],
      explanation: '300 + 30 + 15 = 345.'
    },
    {
      id: 3,
      number: 184,
      question: 'Mariana tem 1 cédula de 100 reais e 84 reais em notas menores. A adição que representa o dinheiro de Mariana é:',
      options: [
        { text: '100 + 84', isCorrect: true },
        { text: '10 + 84', isCorrect: false },
        { text: '100 + 804', isCorrect: false },
        { text: '180 + 40', isCorrect: false },
      ],
      explanation: '100 + 84 = 184.'
    },
    {
      id: 4,
      number: 409,
      question: 'Como podemos decompor o número 409 por meio de adições?',
      options: [
        { text: '400 + 9', isCorrect: true },
        { text: '40 + 9', isCorrect: false },
        { text: '400 + 90', isCorrect: false },
        { text: '400 + 900', isCorrect: false },
      ],
      explanation: '4 centenas (400) + 0 dezenas + 9 unidades (9) = 409.'
    },
    {
      id: 5,
      number: 278,
      question: 'Qual das somas abaixo resulta em 278 com troca de centena por dezenas?',
      options: [
        { text: '100 + 170 + 8', isCorrect: true },
        { text: '200 + 170 + 8', isCorrect: false },
        { text: '100 + 70 + 8', isCorrect: false },
        { text: '100 + 180 + 8', isCorrect: false },
      ],
      explanation: '100 + 170 + 8 = 278.'
    },
    {
      id: 6,
      number: 350,
      question: 'Complete a igualdade: 350 = 300 + ___',
      options: [
        { text: '50', isCorrect: true },
        { text: '5', isCorrect: false },
        { text: '500', isCorrect: false },
        { text: '15', isCorrect: false },
      ],
      explanation: '300 + 50 = 350.'
    },
    {
      id: 7,
      number: 156,
      question: 'Podemos decompor 156 com troca de 1 dezena por 10 unidades como:',
      options: [
        { text: '100 + 40 + 16', isCorrect: true },
        { text: '100 + 50 + 16', isCorrect: false },
        { text: '100 + 40 + 6', isCorrect: false },
        { text: '200 + 40 + 16', isCorrect: false },
      ],
      explanation: '100 + 40 + 16 = 156.'
    },
    {
      id: 8,
      number: 432,
      question: 'Qual das expressões representa 432 em 2 parcelas?',
      options: [
        { text: '400 + 32', isCorrect: true },
        { text: '40 + 32', isCorrect: false },
        { text: '400 + 320', isCorrect: false },
        { text: '430 + 12', isCorrect: false },
      ],
      explanation: '400 + 32 = 432.'
    },
    {
      id: 9,
      number: 207,
      question: 'A decomposição por adições do número 207 é:',
      options: [
        { text: '200 + 7', isCorrect: true },
        { text: '200 + 70', isCorrect: false },
        { text: '20 + 7', isCorrect: false },
        { text: '200 + 700', isCorrect: false },
      ],
      explanation: '2 centenas (200) + 7 unidades (7) = 207.'
    },
    {
      id: 10,
      number: 389,
      question: 'Se trocarmos 1 centena por 10 dezenas, o número 389 pode ser escrito como:',
      options: [
        { text: '200 + 180 + 9', isCorrect: true },
        { text: '300 + 180 + 9', isCorrect: false },
        { text: '200 + 80 + 9', isCorrect: false },
        { text: '100 + 180 + 9', isCorrect: false },
      ],
      explanation: '200 + 180 + 9 = 389.'
    }
  ],
  avancado: [
    {
      id: 1,
      number: 562,
      question: 'Qual das diferentes adições abaixo forma o número 562 com troca de 1 centena por 10 dezenas?',
      options: [
        { text: '400 + 160 + 2', isCorrect: true },
        { text: '500 + 160 + 2', isCorrect: false },
        { text: '400 + 60 + 2', isCorrect: false },
        { text: '300 + 160 + 2', isCorrect: false },
      ],
      explanation: '400 + 160 = 560, mais 2 = 562!'
    },
    {
      id: 2,
      number: 785,
      question: 'Qual das diferentes adições forma o número 785 com troca de 1 centena por 10 dezenas?',
      options: [
        { text: '600 + 180 + 5', isCorrect: true },
        { text: '700 + 80 + 50', isCorrect: false },
        { text: '600 + 80 + 5', isCorrect: false },
        { text: '500 + 180 + 5', isCorrect: false },
      ],
      explanation: '600 + 180 = 780, mais 5 = 785.'
    },
    {
      id: 3,
      number: 624,
      question: 'Complete o termo ausente na igualdade: 624 = 500 + ___ + 4',
      options: [
        { text: '120', isCorrect: true },
        { text: '20', isCorrect: false },
        { text: '124', isCorrect: false },
        { text: '24', isCorrect: false },
      ],
      explanation: '500 + 120 + 4 = 624.'
    },
    {
      id: 4,
      number: 938,
      question: 'Em uma fábrica, 938 cadernos foram organizados em 9 caixas de 100, 3 pacotes de 10 e 8 avulsos. A expressão que representa isso é:',
      options: [
        { text: '900 + 30 + 8', isCorrect: true },
        { text: '90 + 30 + 8', isCorrect: false },
        { text: '900 + 380', isCorrect: false },
        { text: '900 + 3 + 8', isCorrect: false },
      ],
      explanation: '9 de 100 (900) + 3 de 10 (30) + 8 = 938.'
    },
    {
      id: 5,
      number: 847,
      question: 'Qual das adições forma 847 trocando 1 dezena por 10 unidades?',
      options: [
        { text: '800 + 30 + 17', isCorrect: true },
        { text: '800 + 40 + 17', isCorrect: false },
        { text: '700 + 30 + 17', isCorrect: false },
        { text: '800 + 20 + 17', isCorrect: false },
      ],
      explanation: '800 + 30 + 17 = 847.'
    },
    {
      id: 6,
      number: 905,
      question: 'A decomposição por adições do número 905 é:',
      options: [
        { text: '900 + 5', isCorrect: true },
        { text: '90 + 5', isCorrect: false },
        { text: '900 + 50', isCorrect: false },
        { text: '900 + 500', isCorrect: false },
      ],
      explanation: '9 centenas (900) + 0 dezenas + 5 unidades (5) = 905.'
    },
    {
      id: 7,
      number: 673,
      question: 'Como podemos decompor 673 trocando 1 dezena por 10 unidades?',
      options: [
        { text: '600 + 60 + 13', isCorrect: true },
        { text: '600 + 70 + 13', isCorrect: false },
        { text: '600 + 50 + 13', isCorrect: false },
        { text: '500 + 60 + 13', isCorrect: false },
      ],
      explanation: '600 + 60 + 13 = 673.'
    },
    {
      id: 8,
      number: 820,
      question: 'Qual das somas abaixo resulta em 820 com troca de 1 centena por 10 dezenas?',
      options: [
        { text: '700 + 120', isCorrect: true },
        { text: '700 + 20', isCorrect: false },
        { text: '800 + 120', isCorrect: false },
        { text: '700 + 220', isCorrect: false },
      ],
      explanation: '700 + 120 = 820.'
    },
    {
      id: 9,
      number: 954,
      question: 'Complete o termo ausente na igualdade com troca de centena: 954 = 800 + ___ + 4',
      options: [
        { text: '150', isCorrect: true },
        { text: '50', isCorrect: false },
        { text: '15', isCorrect: false },
        { text: '250', isCorrect: false },
      ],
      explanation: '800 + 150 + 4 = 954.'
    },
    {
      id: 10,
      number: 999,
      question: 'O maior número natural de 3 ordens (999) pode ser decomposto por meio de adições como:',
      options: [
        { text: '900 + 90 + 9', isCorrect: true },
        { text: '90 + 90 + 9', isCorrect: false },
        { text: '900 + 990', isCorrect: false },
        { text: '900 + 9 + 9', isCorrect: false },
      ],
      explanation: '900 + 90 + 9 = 999.'
    }
  ]
};

function formatAndShuffleWorksheet(level: string): FormattedWorksheetQuestion[] {
  const rawList = RAW_WORKSHEETS[level] || RAW_WORKSHEETS['medio'];
  // 1. Embaralha a ordem das 10 questões
  const shuffledQuestions = shuffleArray(rawList);

  // 2. Para cada questão, embaralha as alternativas e atribui as letras A, B, C, D
  return shuffledQuestions.map((q) => {
    const shuffledOptions = shuffleArray(q.options);
    const letters = ['A', 'B', 'C', 'D'];
    let correctStr = '';

    const formattedOptions = shuffledOptions.map((opt, idx) => {
      const letter = letters[idx];
      const line = `${letter}) ${opt.text}`;
      if (opt.isCorrect) {
        correctStr = line;
      }
      return line;
    });

    return {
      id: q.id,
      number: q.number,
      question: q.question,
      options: formattedOptions,
      correct: correctStr,
      explanation: q.explanation
    };
  });
}

export const WorksheetGenerator: React.FC = () => {
  const [level, setLevel] = useState<'facil' | 'medio' | 'avancado'>('medio');
  const [showAnswerKey, setShowAnswerKey] = useState<boolean>(false);
  const [schoolName, setSchoolName] = useState<string>('Escola Municipal de Ensino Fundamental');
  const [questions, setQuestions] = useState<FormattedWorksheetQuestion[]>(() => 
    formatAndShuffleWorksheet('medio')
  );

  useEffect(() => {
    setQuestions(formatAndShuffleWorksheet(level));
  }, [level]);

  const handleShuffle = () => {
    playPopSound();
    setQuestions(formatAndShuffleWorksheet(level));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Control panel (Hidden when printing) */}
      <div className="print:hidden bg-white border border-amber-200/80 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>Gerador de Folha de Atividades Impressa · 10 Desafios</span>
            </h2>
            <p className="text-xs text-slate-500">
              Imprima 10 exercícios alinhados ao Descritor D08 (BNCC EF02MA04). Embaralhe questões e alternativas com um clique!
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShuffle}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-amber-700" />
              <span>Embaralhar 10 Questões & Alternativas</span>
            </button>

            <button
              onClick={handlePrint}
              type="button"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Level selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Dificuldade:
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as any)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium cursor-pointer"
            >
              <option value="facil">Nível 1: Até 99 (10 Desafios de Dezenas e Unidades)</option>
              <option value="medio">Nível 2: Centenas até 500 (10 Desafios Canônicos & Trocas)</option>
              <option value="avancado">Nível 3: Até 999 (10 Desafios do SAEB)</option>
            </select>
          </div>

          {/* School Name input */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nome da Escola (Cabeçalho):
            </label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium"
            />
          </div>

          {/* Answer Key Toggle */}
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 w-full">
              <input
                type="checkbox"
                checked={showAnswerKey}
                onChange={(e) => setShowAnswerKey(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 cursor-pointer"
              />
              <span className="font-semibold text-slate-700">Incluir Gabarito com 10 Respostas</span>
            </label>
          </div>
        </div>
      </div>

      {/* Printable Sheet (Stylized for both screen preview and pristine A4 printing) */}
      <div className="bg-white border border-slate-300 print:border-none p-6 sm:p-10 rounded-2xl shadow-sm max-w-4xl mx-auto print:max-w-none print:p-0 text-slate-900 font-sans print:shadow-none">
        {/* Printable Header */}
        <div className="border-b-2 border-slate-800 pb-4 mb-6">
          <div className="text-center font-bold text-base uppercase tracking-wider text-slate-800 mb-1">
            {schoolName || 'Escola de Ensino Fundamental'}
          </div>
          <div className="text-center font-black text-xl text-slate-900 mb-3">
            Atividade de Matemática · Descritor D08 (10 Desafios)
          </div>
          <div className="text-center text-xs text-slate-600 mb-4 font-medium">
            Habilidade BNCC EF02MA04: Compor ou decompor números naturais de até 3 ordens por meio de diferentes adições
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border border-slate-400 p-2.5 rounded-md bg-slate-50/50 print:bg-transparent">
            <div>
              <span className="font-bold">Aluno(a):</span> ____________________
            </div>
            <div>
              <span className="font-bold">Turma:</span> 2º Ano _____
            </div>
            <div>
              <span className="font-bold">Data:</span> ___/___/______
            </div>
            <div>
              <span className="font-bold">Nota:</span> _________
            </div>
          </div>
        </div>

        {/* Motivational instructions for 2nd grader */}
        <div className="p-3 bg-amber-50/60 print:bg-transparent border border-amber-200 print:border-slate-300 rounded-lg text-xs mb-6 text-slate-800">
          <strong>Instruções:</strong> Leia com atenção cada um dos 10 desafios abaixo. Lembre-se de que um mesmo número pode ser decomposto de várias maneiras somando centenas, dezenas e unidades!
        </div>

        {/* 10 Questions Grid */}
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={`${q.id}_${idx}`} className="border-b border-slate-200 pb-5 last:border-b-0">
              <div className="flex items-start gap-2 mb-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <p className="font-semibold text-sm text-slate-900 leading-snug">
                  {q.question}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-8">
                {q.options.map((opt, optIdx) => (
                  <div
                    key={optIdx}
                    className="p-2 border border-slate-300 rounded-md text-xs font-mono font-medium flex items-center gap-2 hover:bg-slate-50"
                  >
                    <span className="w-4 h-4 rounded-full border border-slate-400 inline-block shrink-0" />
                    <span>{opt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Answer Key (Gabarito de 10 Questões) */}
        {showAnswerKey && (
          <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-400">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Gabarito Comentado para o Professor · 10 Desafios:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {questions.map((q, idx) => (
                <div key={`key_${q.id}_${idx}`} className="p-2 bg-slate-100 rounded border border-slate-200">
                  <span className="font-bold">Desafio {idx + 1}:</span> {q.correct}
                  <div className="text-slate-600 text-[11px] mt-0.5 italic">
                    {q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { BookOpen, Sparkles, CheckCircle2, Lightbulb, GraduationCap, Compass } from 'lucide-react';

export const PedagogicalGuide: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-2">
          <GraduationCap className="w-4 h-4" />
          <span>Diretrizes Pedagógicas · 2º Ano do Ensino Fundamental</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Descritor D08: Composição e Decomposição de Números
        </h1>
        <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
          Compreenda a fundamentação matemática, o alinhamento com a BNCC e por que a decomposição por <strong>diferentes adições</strong> é a chave para o cálculo mental e as operações com trocas.
        </p>
      </div>

      {/* BNCC & SAEB Descriptor Box */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-600" />
          <span>Mapeamento Curricular: D08 & BNCC</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
            <span className="font-bold text-amber-900 block mb-1 text-sm">
              Descritor D08 (SAEB / Prova Brasil)
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              "Compor ou decompor número natural de até três ordens por meio de diferentes adições."
            </p>
            <p className="text-slate-500 mt-2 text-[11px]">
              Avalia se a criança do ciclo de alfabetização matemática compreende o valor posicional do algarismo (Centena, Dezena, Unidade) e a flexibilidade de agrupamentos aditivos.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200">
            <span className="font-bold text-sky-900 block mb-1 text-sm">
              Habilidade BNCC EF02MA04
            </span>
            <p className="text-slate-700 leading-relaxed font-medium">
              "Compor e decompor número natural de até 1000, por meio de diferentes adições e multiplicações (por 10), para compreender e utilizar o sistema de numeração decimal."
            </p>
            <p className="text-slate-500 mt-2 text-[11px]">
              Recomenda enfaticamente o suporte de materiais manipuláveis (material dourado, ábacos, fichas sobrepostas e cédulas lúdicas).
            </p>
          </div>
        </div>
      </div>

      {/* Why Different Additions Matter (A Importância das Diferentes Adições) */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-600" />
          <span>Por que "Diferentes Adições" é tão Cobrado nas Avaliações?</span>
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Muitos alunos aprendem apenas a decomposição <em>canônica</em>: <br />
          <span className="font-mono font-bold text-slate-800">354 = 300 + 50 + 4</span>.
        </p>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          No entanto, o verdadeiro domínio do Sistema de Numeração Decimal e a base para a <strong>subtração com reserva (reagrupamento)</strong> dependem da compreensão de que 1 centena pode ser trocada por 10 dezenas, e 1 dezena por 10 unidades:
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs sm:text-sm space-y-2">
          <div className="text-slate-800 font-bold">Exemplo com o número 354:</div>
          <div className="flex items-center gap-2 text-emerald-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>Forma Canônica: <strong>300 + 50 + 4</strong></span>
          </div>
          <div className="flex items-center gap-2 text-indigo-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-600" />
            <span>Troca de 1 Dezena: <strong>300 + 40 + 14</strong></span>
          </div>
          <div className="flex items-center gap-2 text-amber-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-600" />
            <span>Troca de 1 Centena: <strong>200 + 150 + 4</strong></span>
          </div>
          <div className="flex items-center gap-2 text-purple-800">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-purple-600" />
            <span>Composição em 2 parcelas: <strong>300 + 54</strong> ou <strong>350 + 4</strong></span>
          </div>
        </div>

        <div className="p-3.5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs text-amber-900 leading-relaxed">
          <strong>Impacto na aprendizagem:</strong> Quando o aluno compreende que <em>300 + 40 + 14</em> é o mesmo número <em>354</em>, ele não "decora" a regra de <em>pedir emprestado</em> na subtração; ele entende o significado real de <strong>desagrupar uma dezena</strong>.
        </div>
      </div>

      {/* Practical Classroom Strategies */}
      <div className="bg-white border border-amber-200/80 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span>Sugestões Práticas para Professores do 2º Ano</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="font-bold text-slate-800 block">1. Jogo do "Nunca Dez"</span>
            <p className="text-slate-600 leading-relaxed">
              Jogue com dados e material dourado. Ao juntar 10 cubinhos, a criança DEVE trocar por 1 barra. Ao juntar 10 barras, troca por 1 placa.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="font-bold text-slate-800 block">2. Fichas Sobrepostas</span>
            <p className="text-slate-600 leading-relaxed">
              Use fichas escalonadas (100 a 900, 10 a 90, 1 a 9). Ao sobrepor a ficha 200, 40 e 5, o número 245 se forma concretamente.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="font-bold text-slate-800 block">3. O "Balanço das Trocas"</span>
            <p className="text-slate-600 leading-relaxed">
              Use a aba "Material Dourado" deste aplicativo em projetor de sala de aula e peça aos alunos que prevejam o que acontece com a adição ao clicar em "Trocar".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

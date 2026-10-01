export type GameMode = 'adventure' | 'laboratory' | 'builder' | 'worksheet' | 'guide';

export type QuestionType = 
  | 'choose_addition'       // Qual das adições forma o número X?
  | 'find_missing_term'     // Complete o termo que falta: 348 = 300 + ? + 8
  | 'which_is_not'          // Qual das opções NÃO representa o número X?
  | 'real_world_context';   // Lucas tem 2 notas de 100 e 14 de 10...

export interface QuestionOption {
  id: string;
  text: string;
  expression: string;
  isCorrect: boolean;
  explanation: string;
}

export interface D08Question {
  id: string;
  tier: 1 | 2 | 3 | 4;
  title: string;
  targetNumber: number;
  questionText: string;
  type: QuestionType;
  options: QuestionOption[];
  hint: {
    centenas: number;
    dezenas: number;
    unidades: number;
    text: string;
  };
  contextNote?: string;
}

export interface PlayerStats {
  score: number;
  stars: number;
  completedQuestions: string[];
  streak: number;
  unlockedTiers: number[];
}

export interface DecomposedTerm {
  value: number;
  label: string;
  category: 'centena' | 'dezena' | 'unidade' | 'composto';
}

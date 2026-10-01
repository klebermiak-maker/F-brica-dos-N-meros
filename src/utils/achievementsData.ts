export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  category: 'equations' | 'streak' | 'stars' | 'lab' | 'builder';
  icon: 'trophy' | 'flame' | 'sparkles' | 'star' | 'award' | 'layers' | 'wrench' | 'check' | 'zap' | 'target' | 'crown';
  targetValue: number;
  rewardStars: number;
  getValue: (metrics: StoredMetrics) => number;
}

export interface StoredMetrics {
  totalEquationsSolved: number;
  maxStreak: number;
  currentStreak: number;
  totalStars: number;
  labExchangesDone: number;
  builderCombosFound: number;
  unlockedAchievementIds: string[];
}

export const DEFAULT_METRICS: StoredMetrics = {
  totalEquationsSolved: 0,
  maxStreak: 0,
  currentStreak: 0,
  totalStars: 0,
  labExchangesDone: 0,
  builderCombosFound: 0,
  unlockedAchievementIds: []
};

export const ACHIEVEMENTS_DEFINITIONS: AchievementDef[] = [
  {
    id: 'first_equation',
    title: 'Primeira Soma',
    description: 'Resolva a sua primeira equação de adição com sucesso!',
    category: 'equations',
    icon: 'sparkles',
    targetValue: 1,
    rewardStars: 1,
    getValue: (m) => m.totalEquationsSolved
  },
  {
    id: 'streak_3',
    title: 'Na Ponta da Língua',
    description: 'Acerte 3 desafios seguidos sem errar.',
    category: 'streak',
    icon: 'flame',
    targetValue: 3,
    rewardStars: 2,
    getValue: (m) => m.maxStreak
  },
  {
    id: 'streak_5',
    title: 'Sequência Perfeita',
    description: 'Acerte 5 questões consecutivas sem errar! Foco e precisão total.',
    category: 'streak',
    icon: 'zap',
    targetValue: 5,
    rewardStars: 3,
    getValue: (m) => m.maxStreak
  },
  {
    id: 'equations_10',
    title: 'Explorador dos Números',
    description: 'Resolva 10 equações de composição e decomposição.',
    category: 'equations',
    icon: 'check',
    targetValue: 10,
    rewardStars: 2,
    getValue: (m) => m.totalEquationsSolved
  },
  {
    id: 'stars_15',
    title: 'Colecionador Brilhante',
    description: 'Acumule 15 estrelas douradas nas suas conquistas.',
    category: 'stars',
    icon: 'star',
    targetValue: 15,
    rewardStars: 3,
    getValue: (m) => m.totalStars
  },
  {
    id: 'streak_10',
    title: 'Sequência Lendária',
    description: 'Acerte 10 desafios seguidos! Um verdadeiro mestre da matemática.',
    category: 'streak',
    icon: 'crown',
    targetValue: 10,
    rewardStars: 5,
    getValue: (m) => m.maxStreak
  },
  {
    id: 'equations_25',
    title: 'Calculador Veloz',
    description: 'Resolva 25 equações de adição no jogo.',
    category: 'equations',
    icon: 'target',
    targetValue: 25,
    rewardStars: 3,
    getValue: (m) => m.totalEquationsSolved
  },
  {
    id: 'lab_master',
    title: 'Alquimista do Material Dourado',
    description: 'Realize 5 trocas mágicas entre placas, barras e cubinhos.',
    category: 'lab',
    icon: 'layers',
    targetValue: 5,
    rewardStars: 3,
    getValue: (m) => m.labExchangesDone
  },
  {
    id: 'builder_architect',
    title: 'Arquiteto da Fábrica',
    description: 'Descubra 5 diferentes combinações de adição na Fábrica de Somas.',
    category: 'builder',
    icon: 'wrench',
    targetValue: 5,
    rewardStars: 3,
    getValue: (m) => m.builderCombosFound
  },
  {
    id: 'equations_50',
    title: 'Mestre da Decomposição',
    description: 'Resolva 50 equações de até 3 ordens com centenas, dezenas e unidades.',
    category: 'equations',
    icon: 'award',
    targetValue: 50,
    rewardStars: 5,
    getValue: (m) => m.totalEquationsSolved
  },
  {
    id: 'stars_40',
    title: 'Galáxia de Estrelas',
    description: 'Conquiste 40 estrelas de conhecimento.',
    category: 'stars',
    icon: 'star',
    targetValue: 40,
    rewardStars: 5,
    getValue: (m) => m.totalStars
  },
  {
    id: 'equations_100',
    title: 'Centena de Equações Resolvidas',
    description: 'Resolva 100 equações de adição! O troféu máximo da Fábrica dos Números D08.',
    category: 'equations',
    icon: 'trophy',
    targetValue: 100,
    rewardStars: 10,
    getValue: (m) => m.totalEquationsSolved
  }
];

const METRICS_STORAGE_KEY = 'd08_gameplay_metrics';

export function loadStoredMetrics(currentStars: number): StoredMetrics {
  try {
    const raw = localStorage.getItem(METRICS_STORAGE_KEY);
    if (!raw) {
      return { ...DEFAULT_METRICS, totalStars: currentStars };
    }
    const parsed = JSON.parse(raw);
    return {
      totalEquationsSolved: parsed.totalEquationsSolved ?? 0,
      maxStreak: parsed.maxStreak ?? 0,
      currentStreak: parsed.currentStreak ?? 0,
      totalStars: Math.max(parsed.totalStars ?? 0, currentStars),
      labExchangesDone: parsed.labExchangesDone ?? 0,
      builderCombosFound: parsed.builderCombosFound ?? 0,
      unlockedAchievementIds: Array.isArray(parsed.unlockedAchievementIds) ? parsed.unlockedAchievementIds : []
    };
  } catch {
    return { ...DEFAULT_METRICS, totalStars: currentStars };
  }
}

export function saveStoredMetrics(metrics: StoredMetrics): void {
  try {
    localStorage.setItem(METRICS_STORAGE_KEY, JSON.stringify(metrics));
  } catch {
    // Ignore storage errors
  }
}

export interface CheckAchievementsResult {
  updatedMetrics: StoredMetrics;
  newlyUnlocked: AchievementDef[];
}

export function checkAchievements(metrics: StoredMetrics): CheckAchievementsResult {
  const newlyUnlocked: AchievementDef[] = [];
  const currentUnlocked = new Set(metrics.unlockedAchievementIds);

  for (const def of ACHIEVEMENTS_DEFINITIONS) {
    if (!currentUnlocked.has(def.id)) {
      const currentVal = def.getValue(metrics);
      if (currentVal >= def.targetValue) {
        currentUnlocked.add(def.id);
        newlyUnlocked.push(def);
      }
    }
  }

  const updatedMetrics: StoredMetrics = {
    ...metrics,
    unlockedAchievementIds: Array.from(currentUnlocked)
  };

  if (newlyUnlocked.length > 0) {
    saveStoredMetrics(updatedMetrics);
  }

  return {
    updatedMetrics,
    newlyUnlocked
  };
}

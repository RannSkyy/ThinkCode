import { GameId, LevelResult, GameProgress, OverallProgress } from '../types';

const PROGRESS_KEY = 'coding_kids_progress_v1';
const HISTORY_KEY = 'coding_kids_history_v1';

const INITIAL_GAMES: GameId[] = ['maze', 'block', 'pattern', 'debug', 'loop', 'ifelse', 'builder'];

export function getInitialProgress(): OverallProgress {
  const gamesProgress: Record<GameId, GameProgress> = {} as Record<GameId, GameProgress>;
  
  INITIAL_GAMES.forEach(id => {
    gamesProgress[id] = {
      gameId: id,
      unlockedLevel: 1, // Start with level 1 unlocked
      completedLevels: {},
    };
  });

  return {
    totalStars: 0,
    totalCompleted: 0,
    gamesProgress,
  };
}

export function loadOverallProgress(): OverallProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return getInitialProgress();
    const parsed = JSON.parse(raw) as OverallProgress;
    
    // Ensure all 7 games exist in data
    const initial = getInitialProgress();
    INITIAL_GAMES.forEach(id => {
      if (!parsed.gamesProgress[id]) {
        parsed.gamesProgress[id] = initial.gamesProgress[id];
      }
    });
    return parsed;
  } catch {
    return getInitialProgress();
  }
}

export function saveOverallProgress(progress: OverallProgress) {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function loadHistory(): LevelResult[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as LevelResult[];
  } catch {
    return [];
  }
}

export function saveHistory(history: LevelResult[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.error('Failed to save history to localStorage', e);
  }
}

export function recordLevelCompletion(result: LevelResult): OverallProgress {
  const progress = loadOverallProgress();
  const history = loadHistory();

  // Add to history (newest first)
  const updatedHistory = [result, ...history].slice(0, 100); // keep recent 100
  saveHistory(updatedHistory);

  // Update Game Progress
  const gProgress = progress.gamesProgress[result.gameId];
  if (!gProgress.completedLevels[result.levelNumber]) {
    gProgress.completedLevels[result.levelNumber] = {
      bestScore: result.score,
      bestStars: result.stars,
      bestTime: result.durationSeconds,
    };
  } else {
    const existing = gProgress.completedLevels[result.levelNumber];
    existing.bestScore = Math.max(existing.bestScore, result.score);
    existing.bestStars = Math.max(existing.bestStars, result.stars);
    existing.bestTime = Math.min(existing.bestTime, result.durationSeconds);
  }

  // Unlock next level if this was the current highest
  if (result.levelNumber >= gProgress.unlockedLevel && result.levelNumber < 9) {
    gProgress.unlockedLevel = result.levelNumber + 1;
  }

  // Recalculate totals
  let totalStars = 0;
  let totalCompleted = 0;

  INITIAL_GAMES.forEach(id => {
    const gp = progress.gamesProgress[id];
    Object.values(gp.completedLevels).forEach(lvl => {
      totalStars += lvl.bestStars;
      totalCompleted += 1;
    });
  });

  progress.totalStars = totalStars;
  progress.totalCompleted = totalCompleted;

  saveOverallProgress(progress);
  return progress;
}

export function calculateGameProgressPercent(gameId: GameId, progress: OverallProgress): number {
  const gProgress = progress.gamesProgress[gameId];
  if (!gProgress) return 0;
  const completedCount = Object.keys(gProgress.completedLevels).length;
  return Math.min(100, Math.round((completedCount / 9) * 100));
}

export function resetAllData() {
  try {
    localStorage.removeItem(PROGRESS_KEY);
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

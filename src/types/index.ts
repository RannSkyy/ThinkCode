export type Difficulty = 'easy' | 'medium' | 'hard';

export type GameId = 
  | 'maze'
  | 'block'
  | 'pattern'
  | 'debug'
  | 'loop'
  | 'ifelse'
  | 'builder';

export interface GameInfo {
  id: GameId;
  title: string;
  tagline: string;
  concepts: string[];
  description: string;
  iconName: string;
  themeColor: string; // Tailwind color name like 'blue', 'emerald', 'amber', 'purple'
  bgGradient: string;
  totalLevels: number;
}

export interface LevelResult {
  gameId: GameId;
  levelNumber: number;
  difficulty: Difficulty;
  score: number;
  durationSeconds: number;
  mistakesCount: number;
  stars: number; // 1 to 3
  completedAt: string;
}

export interface GameProgress {
  gameId: GameId;
  unlockedLevel: number; // 1 to 9
  completedLevels: {
    [levelNumber: number]: {
      bestScore: number;
      bestStars: number;
      bestTime: number;
    };
  };
}

export interface OverallProgress {
  totalStars: number;
  totalCompleted: number;
  gamesProgress: Record<GameId, GameProgress>;
}

export interface LearningMaterial {
  id: string;
  title: string;
  concept: string;
  readingTimeMinutes: number;
  summary: string;
  illustrationIcon: string;
  color: string;
  sections: {
    heading: string;
    content: string;
    analogy?: string;
    codeExample?: string;
    kidTip?: string;
  }[];
  quickQuiz: {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
  };
  recommendedGameId: GameId;
}

// ---------------- GAME-SPECIFIC LEVEL INTERFACES ----------------

// 1. Maze Logic
export type MazeDirection = 'N' | 'E' | 'S' | 'W';
export type MazeCommand = 'FORWARD' | 'TURN_LEFT' | 'TURN_RIGHT' | 'JUMP';

export interface MazeLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  gridSize: { rows: number; cols: number };
  start: { r: number; c: number; dir: MazeDirection };
  goal: { r: number; c: number };
  walls: { r: number; c: number }[];
  hazards?: { r: number; c: number }[]; // Lava or water trap (needs jump or avoid)
  coins?: { r: number; c: number }[];
  maxCommands?: number;
  instruction: string;
  hint: string;
}

// 2. Block Coding
export type ActionBlockType = 
  | 'MOVE_FORWARD'
  | 'TURN_LEFT'
  | 'TURN_RIGHT'
  | 'COLLECT_GEM'
  | 'UNLOCK_GATE'
  | 'ACTIVATE_SWITCH';

export interface BlockCodingLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  title: string;
  instruction: string;
  hint: string;
  availableBlocks: { type: ActionBlockType; label: string; count?: number }[];
  grid: {
    rows: number;
    cols: number;
    playerStart: { r: number; c: number; dir: MazeDirection };
    targets: { r: number; c: number; type: 'gem' | 'gate' | 'switch' | 'exit' }[];
    obstacles: { r: number; c: number }[];
  };
}

// 3. Pattern Puzzle
export interface PatternItem {
  id: string;
  label: string;
  symbol: string;
  color: string;
}

export interface PatternLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  title: string;
  patternSequence: (PatternItem | null)[]; // null represents the missing spot(s)
  missingIndex: number;
  options: PatternItem[];
  correctOptionId: string;
  ruleExplanation: string;
  hint: string;
}

// 4. Debug Challenge
export interface DebugCommand {
  id: string;
  text: string;
  action: string;
}

export interface DebugLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  title: string;
  story: string;
  buggyCode: DebugCommand[];
  possibleFixes: {
    type: 'replace' | 'remove' | 'reorder';
    buggyLineIndex: number;
    options?: DebugCommand[];
    correctReplacementId?: string;
  };
  goalDescription: string;
  explanation: string;
  hint: string;
}

// 5. Loop Adventure
export interface LoopLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  title: string;
  trackLength: number; // Path steps
  obstaclePattern: ('gem' | 'step' | 'fire' | 'star')[];
  instruction: string;
  targetLoops: number;
  loopBodyOptions: { id: string; actions: string[]; label: string }[];
  correctLoopBodyId: string;
  correctRepeatCount: number;
  hint: string;
}

// 6. If Else Adventure
export interface ConditionalRule {
  condition: string;
  ifAction: string;
  elseAction: string;
}

export interface IfElseLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  title: string;
  scenario: string;
  weatherOrState: { label: string; conditionValue: boolean; icon: string };
  conditions: {
    questionText: string;
    expectedCondition: string;
    options: { ifAction: string; elseAction: string; id: string; label: string }[];
    correctOptionId: string;
  };
  explanation: string;
  hint: string;
}

// 7. Logic Builder
export interface LogicStep {
  id: string;
  text: string;
  icon: string;
  order: number;
}

export interface LogicBuilderLevelData {
  levelNumber: number;
  difficulty: Difficulty;
  activityName: string;
  category: string;
  steps: LogicStep[]; // initially shuffled
  hint: string;
  explanation: string;
}

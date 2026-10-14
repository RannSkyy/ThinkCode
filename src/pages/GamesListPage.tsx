import React, { useState } from 'react';
import { 
  Gamepad2, 
  Compass, 
  Blocks, 
  Sparkles, 
  Bug, 
  Repeat, 
  GitBranch, 
  Layers, 
  Lock, 
  Star, 
  Play, 
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { GAMES_DATA } from '../data/gamesData';
import { GameId, OverallProgress } from '../types';
import { calculateGameProgressPercent } from '../store/storage';
import { sound } from '../utils/sound';

interface GamesListPageProps {
  progress: OverallProgress;
  onSelectGame: (gameId: GameId, levelNumber: number) => void;
}

const GAME_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Blocks,
  Sparkles,
  Bug,
  Repeat,
  GitBranch,
  Layers,
};

export const GamesListPage: React.FC<GamesListPageProps> = ({ progress, onSelectGame }) => {
  // Expanded game accordion or default expanded first game
  const [expandedGameId, setExpandedGameId] = useState<GameId | null>('maze');
  const [activeDifficultyTab, setActiveDifficultyTab] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  const toggleExpand = (id: GameId) => {
    sound.playClick();
    setExpandedGameId(prev => (prev === id ? null : id));
  };

  const getDifficultyForLevel = (lvl: number): 'easy' | 'medium' | 'hard' => {
    if (lvl <= 3) return 'easy';
    if (lvl <= 6) return 'medium';
    return 'hard';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>7 Game Logika · 63 Level Total</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pilih Permainan & Level
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Tiap game terdiri dari 9 level: 3 Level Mudah, 3 Level Sedang, dan 3 Level Sulit. Selesaikan level untuk membuka level berikutnya!
        </p>
      </div>

      {/* Difficulty Filter Tabs */}
      <div className="flex items-center justify-center gap-1 p-1 bg-slate-100 rounded-xl max-w-sm mx-auto">
        <button
          onClick={() => {
            sound.playClick();
            setActiveDifficultyTab('all');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeDifficultyTab === 'all'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Semua (1-9)
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveDifficultyTab('easy');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeDifficultyTab === 'easy'
              ? 'bg-white text-emerald-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Mudah (1-3)
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveDifficultyTab('medium');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeDifficultyTab === 'medium'
              ? 'bg-white text-amber-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sedang (4-6)
        </button>
        <button
          onClick={() => {
            sound.playClick();
            setActiveDifficultyTab('hard');
          }}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeDifficultyTab === 'hard'
              ? 'bg-white text-rose-700 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sulit (7-9)
        </button>
      </div>

      {/* Games List Accordion / Cards */}
      <div className="space-y-4">
        {GAMES_DATA.map(game => {
          const Icon = GAME_ICONS[game.iconName] || Gamepad2;
          const percent = calculateGameProgressPercent(game.id, progress);
          const gProgress = progress.gamesProgress[game.id];
          const unlockedLevel = gProgress?.unlockedLevel || 1;
          const isExpanded = expandedGameId === game.id;

          const levelNumbers = Array.from({ length: game.totalLevels }, (_, i) => i + 1).filter(lvl => {
            if (activeDifficultyTab === 'easy') return lvl <= 3;
            if (activeDifficultyTab === 'medium') return lvl >= 4 && lvl <= 6;
            if (activeDifficultyTab === 'hard') return lvl >= 7;
            return true;
          });

          return (
            <div
              key={game.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all"
            >
              {/* Card Summary Header */}
              <div
                onClick={() => toggleExpand(game.id)}
                className="p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-slate-900 text-base sm:text-lg truncate">
                        {game.title}
                      </h2>
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                        {percent}%
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium truncate">
                      {game.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      sound.playClick();
                      onSelectGame(game.id, unlockedLevel);
                    }}
                    className="hidden sm:flex items-center gap-1.5 py-2 px-3.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>Lanjut (Level {unlockedLevel})</span>
                  </button>

                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Level Selector Grid */}
              {isExpanded && (
                <div className="border-t border-slate-100 p-4 sm:p-6 bg-slate-50/60 space-y-4 animate-in fade-in">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
                    <p className="text-slate-600">{game.description}</p>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="flex items-center gap-1 text-emerald-700">● 1-3 Mudah</span>
                      <span className="flex items-center gap-1 text-amber-700">● 4-6 Sedang</span>
                      <span className="flex items-center gap-1 text-rose-700">● 7-9 Sulit</span>
                    </div>
                  </div>

                  {/* 9 Level Bubbles */}
                  <div className="grid grid-cols-3 sm:grid-cols-9 gap-2.5">
                    {levelNumbers.map(lvl => {
                      const isUnlocked = lvl <= unlockedLevel;
                      const levelResult = gProgress?.completedLevels[lvl];
                      const difficulty = getDifficultyForLevel(lvl);

                      let ringColor = 'border-emerald-200';
                      if (difficulty === 'medium') ringColor = 'border-amber-200';
                      if (difficulty === 'hard') ringColor = 'border-rose-200';

                      return (
                        <button
                          key={lvl}
                          onClick={() => {
                            if (isUnlocked) {
                              sound.playClick();
                              onSelectGame(game.id, lvl);
                            } else {
                              sound.playError();
                            }
                          }}
                          disabled={!isUnlocked}
                          className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                            isUnlocked
                              ? `bg-white hover:scale-105 active:scale-95 shadow-xs cursor-pointer ${ringColor}`
                              : 'bg-slate-100 border-slate-200 opacity-60 cursor-not-allowed'
                          }`}
                        >
                          {/* Top icon or lock */}
                          <div className="h-5 flex items-center justify-center mb-1">
                            {!isUnlocked ? (
                              <Lock className="w-4 h-4 text-slate-400" />
                            ) : levelResult ? (
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 3 }).map((_, sIdx) => (
                                  <Star
                                    key={sIdx}
                                    className={`w-3 h-3 ${
                                      sIdx < levelResult.bestStars
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-slate-200 fill-slate-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <span className="text-[10px] text-blue-600 font-bold uppercase">Baru</span>
                            )}
                          </div>

                          <span className={`text-base font-extrabold ${isUnlocked ? 'text-slate-900' : 'text-slate-400'}`}>
                            {lvl}
                          </span>

                          <span className="text-[9px] text-slate-400 mt-0.5 font-medium capitalize">
                            {difficulty}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCcw, Star } from 'lucide-react';
import { GameId, LevelResult } from '../types';
import { GAMES_DATA } from '../data/gamesData';
import { getLevelData } from '../data/levels';
import { DifficultyBadge } from '../components/common/DifficultyBadge';
import { ResultModal } from '../components/common/ResultModal';
import { recordLevelCompletion, loadOverallProgress } from '../store/storage';
import { sound } from '../utils/sound';

// Games
import { MazeGame } from '../games/maze/MazeGame';
import { BlockCodingGame } from '../games/block/BlockCodingGame';
import { PatternGame } from '../games/pattern/PatternGame';
import { DebugGame } from '../games/debug/DebugGame';
import { LoopGame } from '../games/loop/LoopGame';
import { IfElseGame } from '../games/ifelse/IfElseGame';
import { LogicBuilderGame } from '../games/builder/LogicBuilderGame';

interface GamePlayPageProps {
  gameId: GameId;
  initialLevelNumber: number;
  onExit: () => void;
  onGoToGames: () => void;
  onGoToHistory: () => void;
  onProgressUpdated: () => void;
}

export const GamePlayPage: React.FC<GamePlayPageProps> = ({
  gameId,
  initialLevelNumber,
  onExit,
  onGoToGames,
  onGoToHistory,
  onProgressUpdated,
}) => {
  const [levelNumber, setLevelNumber] = useState(initialLevelNumber);
  const [resultModalData, setResultModalData] = useState<LevelResult | null>(null);
  const [isModalDismissed, setIsModalDismissed] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const gameInfo = GAMES_DATA.find(g => g.id === gameId) || GAMES_DATA[0];
  const levelData = getLevelData(gameId, levelNumber);

  const overallProg = loadOverallProgress();
  const bestRecord = overallProg.gamesProgress[gameId]?.completedLevels[levelNumber];

  const handleLevelChange = (newLvl: number) => {
    if (newLvl < 1 || newLvl > gameInfo.totalLevels) return;
    sound.playClick();
    setLevelNumber(newLvl);
    setResultModalData(null);
    setIsModalDismissed(false);
    setRetryCount(0);
  };

  const handleGameCompleted = (result: LevelResult) => {
    recordLevelCompletion(result);
    setResultModalData(result);
    setIsModalDismissed(false);
    onProgressUpdated();
  };

  const handleNextLevel = () => {
    if (levelNumber < gameInfo.totalLevels) {
      setLevelNumber(l => l + 1);
      setResultModalData(null);
      setIsModalDismissed(false);
      setRetryCount(0);
    } else {
      onGoToGames();
    }
  };

  const handleRetryCurrent = () => {
    sound.playReset();
    setRetryCount(c => c + 1);
    setResultModalData(null);
    setIsModalDismissed(false);
  };

  return (
    <div className="space-y-6">
      {/* Game Header Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: Back button & Game Name */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              onExit();
            }}
            className="w-10 h-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            title="Kembali ke Daftar Level"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-slate-900">
              {gameInfo.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-0.5">
              <DifficultyBadge difficulty={levelData.difficulty} />
              {bestRecord && (
                <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-md border border-amber-200 text-[11px] font-bold text-amber-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                  <span>Rekor Terbaik: {bestRecord.bestScore} Poin ({bestRecord.bestStars}★)</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center / Right: Level Stepper Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLevelChange(levelNumber - 1)}
            disabled={levelNumber <= 1}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors cursor-pointer"
            title="Level Sebelumnya"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="px-3.5 py-1.5 bg-slate-100 rounded-xl text-center">
            <span className="text-xs font-bold text-slate-800">
              Level {levelNumber} <span className="text-slate-400 font-normal">/ {gameInfo.totalLevels}</span>
            </span>
          </div>

          <button
            onClick={() => handleLevelChange(levelNumber + 1)}
            disabled={levelNumber >= gameInfo.totalLevels}
            className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition-colors cursor-pointer"
            title="Level Berikutnya"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Dynamic Game Component Injection */}
      <main className="min-h-[500px]">
        {gameId === 'maze' && (
          <MazeGame
            key={`maze-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}

        {gameId === 'block' && (
          <BlockCodingGame
            key={`block-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}

        {gameId === 'pattern' && (
          <PatternGame
            key={`pattern-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}

        {gameId === 'debug' && (
          <DebugGame
            key={`debug-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}

        {gameId === 'loop' && (
          <LoopGame
            key={`loop-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}

        {gameId === 'ifelse' && (
          <IfElseGame
            key={`ifelse-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}

        {gameId === 'builder' && (
          <LogicBuilderGame
            key={`builder-${levelNumber}-${retryCount}`}
            levelData={levelData as any}
            onComplete={handleGameCompleted}
            onExit={onExit}
          />
        )}
      </main>

      {/* Result Modal when level is completed */}
      {resultModalData && !isModalDismissed && (
        <ResultModal
          result={resultModalData}
          gameTitle={gameInfo.title}
          maxLevels={gameInfo.totalLevels}
          onRetry={handleRetryCurrent}
          onNextLevel={levelNumber < gameInfo.totalLevels ? handleNextLevel : undefined}
          onGoToGames={onGoToGames}
          onGoToHistory={onGoToHistory}
          onClose={() => setIsModalDismissed(true)}
        />
      )}

      {/* Floating Bottom Bar if player dismissed modal to review the puzzle */}
      {resultModalData && isModalDismissed && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in slide-in-from-bottom-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
            <span>⭐ {resultModalData.score} Poin</span>
            <span className="text-slate-400">·</span>
            <span className="text-emerald-400">Level Selesai!</span>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              setIsModalDismissed(false);
            }}
            className="py-1 px-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
          >
            Buka Skor & Hasil
          </button>

          {levelNumber < gameInfo.totalLevels && (
            <button
              onClick={() => {
                sound.playClick();
                handleNextLevel();
              }}
              className="py-1 px-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Level Berikutnya →
            </button>
          )}
        </div>
      )}
    </div>
  );
};

import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, ArrowRight, Grid, History, Award, Clock, AlertCircle, X } from 'lucide-react';
import { StarRating } from './StarRating';
import { DifficultyBadge } from './DifficultyBadge';
import { LevelResult } from '../../types';
import { sound } from '../../utils/sound';

interface ResultModalProps {
  result: LevelResult;
  gameTitle: string;
  maxLevels?: number;
  onRetry: () => void;
  onNextLevel?: () => void;
  onGoToGames: () => void;
  onGoToHistory: () => void;
  onClose?: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  result,
  gameTitle,
  maxLevels = 9,
  onRetry,
  onNextLevel,
  onGoToGames,
  onGoToHistory,
  onClose,
}) => {
  useEffect(() => {
    // Play victory sound
    sound.playSuccess();

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'],
      });
    } catch {
      // ignore
    }
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getEncouragement = (stars: number) => {
    if (stars === 3) return 'Luar Biasa! Logikamu Sangat Tajam! 🌟';
    if (stars === 2) return 'Hebat Sekali! Misi Terselesaikan! 👍';
    return 'Bagus! Tingkatkan Kecepatanmu! 💪';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm max-h-[88vh] bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden transform transition-all">
        {/* Header Ribbon (Compact) with Close 'X' Button */}
        <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 px-4 py-3 sm:py-3.5 text-center text-white shrink-0">
          {/* Close 'X' Button */}
          {onClose && (
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup hasil untuk melihat kembali soal & arena"
              aria-label="Tutup dan lihat soal"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          )}

          <div className="w-10 h-10 mx-auto mb-1 bg-white/15 rounded-xl flex items-center justify-center backdrop-blur-md shadow-inner">
            <Award className="w-6 h-6 text-amber-300 animate-pulse" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold tracking-tight">Level Selesai!</h2>
          <p className="text-blue-100 text-xs mt-0.5">{getEncouragement(result.stars)}</p>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-5 space-y-3.5 overflow-y-auto flex-1">
          {/* Stars display */}
          <div className="flex flex-col items-center justify-center py-1">
            <StarRating stars={result.stars} size="md" animated />
            <div className="mt-1.5">
              <DifficultyBadge difficulty={result.difficulty} levelNumber={result.levelNumber} />
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">{gameTitle}</p>
          </div>

          {/* Stats Grid (Compact) */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-0.5">
                <Award className="w-3 h-3 text-amber-500" />
                <span>Skor</span>
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-800">{result.score}</span>
              <span className="text-[9px] text-emerald-600 font-medium">Maks. 100</span>
            </div>

            <div className="flex flex-col items-center border-x border-slate-200 px-1">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-0.5">
                <Clock className="w-3 h-3 text-blue-500" />
                <span>Waktu</span>
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-800">{formatTime(result.durationSeconds)}</span>
              <span className="text-[9px] text-slate-400">mm:ss</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-slate-400 text-[11px] mb-0.5">
                <AlertCircle className="w-3 h-3 text-rose-500" />
                <span>Salah</span>
              </div>
              <span className="text-base sm:text-lg font-bold text-slate-800">{result.mistakesCount}</span>
              <span className="text-[9px] text-slate-400">kali coba</span>
            </div>
          </div>



          {/* Buttons Navigation */}
          <div className="space-y-2 pt-1">
            {onNextLevel && result.levelNumber < maxLevels && (
              <button
                onClick={() => {
                  sound.playClick();
                  onNextLevel();
                }}
                className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all text-xs sm:text-sm cursor-pointer"
              >
                <span>Level Berikutnya ({result.levelNumber + 1})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  onRetry();
                }}
                className="py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.98] text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>Main Lagi</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onGoToGames();
                }}
                className="py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 active:scale-[0.98] text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors text-xs cursor-pointer"
              >
                <Grid className="w-3.5 h-3.5 text-slate-500" />
                <span>Game Lain</span>
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onGoToHistory();
              }}
              className="w-full py-1 text-center text-[11px] font-medium text-slate-500 hover:text-blue-600 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <History className="w-3 h-3" />
              <span>Lihat Riwayat & Rekor</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

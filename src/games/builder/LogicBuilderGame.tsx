import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  CheckCircle2, 
  Lightbulb, 
  Sparkles, 
  Play, 
  RotateCcw,
  AlertTriangle
} from 'lucide-react';
import { LogicBuilderLevelData, LevelResult, LogicStep } from '../../types';
import { sound } from '../../utils/sound';

interface LogicBuilderGameProps {
  levelData: LogicBuilderLevelData;
  onComplete: (result: LevelResult) => void;
  onExit: () => void;
}

// Deterministic shuffle that ensures not starting already solved
function shuffleSteps(steps: LogicStep[]): LogicStep[] {
  const cloned = [...steps];
  // Reverse or swap elements to guarantee unsorted
  cloned.reverse();
  if (cloned.length > 2) {
    const temp = cloned[0];
    cloned[0] = cloned[1];
    cloned[1] = temp;
  }
  return cloned;
}

export const LogicBuilderGame: React.FC<LogicBuilderGameProps> = ({ levelData, onComplete, onExit }) => {
  const [items, setItems] = useState<LogicStep[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    setItems(shuffleSteps(levelData.steps));
    setIsChecking(false);
    setIsSuccess(false);
    setShowHint(false);
    setFeedbackMsg(null);
  }, [levelData]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isSuccess) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    sound.playClick();
    const updated = [...items];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    setItems(updated);
    setFeedbackMsg(null);
  };

  const handleTestAlgorithm = () => {
    sound.playClick();
    setIsChecking(true);

    // Check if every item is in sequential order 1, 2, 3...
    const isSorted = items.every((item, idx) => item.order === idx + 1);

    if (isSorted) {
      sound.playCollect();
      setIsSuccess(true);
      setFeedbackMsg(levelData.explanation);

      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 5 + (durationSeconds < 25 ? 10 : 0));

      window.setTimeout(() => {
        onComplete({
          gameId: 'builder',
          levelNumber: levelData.levelNumber,
          difficulty: levelData.difficulty,
          score: Math.max(70, score),
          durationSeconds,
          mistakesCount: mistakes,
          stars,
          completedAt: new Date().toISOString(),
        });
      }, 900);
    } else {
      sound.playError();
      setMistakes(m => m + 1);
      setFeedbackMsg('Urutan masih belum tepat. Coba periksa kartu mana yang harus dilakukan lebih dulu!');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setItems(shuffleSteps(levelData.steps));
    setIsSuccess(false);
    setFeedbackMsg(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-700 bg-violet-50 px-2.5 py-1 rounded-md">
              Konsep: Algoritma & Urutan Aktivitas
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              Kategori: {levelData.category}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
            {levelData.activityName}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Susun kartu-kartu berikut dari langkah pertama (atas) hingga langkah terakhir (bawah).
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setShowHint(!showHint);
          }}
          className="flex items-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors cursor-pointer shrink-0"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
        </button>
      </div>

      {showHint && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-start gap-2 animate-in fade-in">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span><strong>Petunjuk:</strong> {levelData.hint}</span>
        </div>
      )}

      {/* Interactive Sorting Cards List */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Daftar Kartu Langkah ({items.length} Langkah)
          </span>
          <span className="text-[11px] text-slate-400">
            Gunakan tombol ⬆️ ⬇️ untuk menaikkan/menurunkan posisi
          </span>
        </div>

        <div className="space-y-2.5">
          {items.map((step, idx) => {
            const isCorrectPosition = isSuccess || (isChecking && step.order === idx + 1);

            return (
              <div
                key={step.id}
                className={`p-3.5 sm:p-4 rounded-xl border-2 flex items-center justify-between gap-3 transition-all ${
                  isSuccess
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : 'border-slate-200 bg-white hover:border-violet-300'
                }`}
              >
                {/* Step Index & Content */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <span className="text-2xl shrink-0">{step.icon}</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                    {step.text}
                  </p>
                </div>

                {/* Move Controls */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => moveItem(idx, 'up')}
                    disabled={idx === 0 || isSuccess}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors disabled:opacity-30 cursor-pointer"
                    title="Pindahkan ke atas"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveItem(idx, 'down')}
                    disabled={idx === items.length - 1 || isSuccess}
                    className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-violet-600 hover:bg-violet-50 transition-colors disabled:opacity-30 cursor-pointer"
                    title="Pindahkan ke bawah"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {feedbackMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 mt-3 ${
              isSuccess
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {isSuccess ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-3">
          <button
            onClick={handleTestAlgorithm}
            disabled={isSuccess}
            className="py-3 px-4 bg-violet-600 hover:bg-violet-700 active:scale-98 text-white font-bold rounded-xl shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Uji Alur Logika</span>
          </button>

          <button
            onClick={handleReset}
            disabled={isSuccess}
            className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Acak Ulang Kartu</span>
          </button>
        </div>
      </div>
    </div>
  );
};

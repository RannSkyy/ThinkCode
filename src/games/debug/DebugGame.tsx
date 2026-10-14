import React, { useState, useEffect } from 'react';
import { Bug, Wrench, CheckCircle2, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';
import { DebugLevelData, LevelResult } from '../../types';
import { sound } from '../../utils/sound';

interface DebugGameProps {
  levelData: DebugLevelData;
  onComplete: (result: LevelResult) => void;
  onExit: () => void;
}

export const DebugGame: React.FC<DebugGameProps> = ({ levelData, onComplete, onExit }) => {
  const [selectedReplacementId, setSelectedReplacementId] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    setSelectedReplacementId(null);
    setIsFixed(false);
    setShowHint(false);
    setFeedbackMsg(null);
  }, [levelData]);

  const handleApplyFix = (replacementId: string) => {
    if (isFixed) return;
    sound.playClick();
    setSelectedReplacementId(replacementId);

    const isCorrect = replacementId === levelData.possibleFixes.correctReplacementId;

    if (isCorrect) {
      sound.playCollect();
      setIsFixed(true);
      setFeedbackMsg(levelData.explanation);

      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 10 + (durationSeconds < 20 ? 10 : 0));

      window.setTimeout(() => {
        onComplete({
          gameId: 'debug',
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
      setFeedbackMsg('Perbaikan belum tepat. Kode masih mengalami kegagalan. Coba opsi lain!');
    }
  };

  const buggyIndex = levelData.possibleFixes.buggyLineIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
              Konsep: Debugging & Analisis
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              {levelData.title}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm sm:text-base mt-1.5">
            {levelData.goalDescription}
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
          <span><strong>Petunjuk Detektif:</strong> {levelData.hint}</span>
        </div>
      )}

      {/* Story Scenario */}
      <div className="bg-gradient-to-r from-rose-50/80 to-amber-50/50 p-4 sm:p-5 rounded-2xl border border-rose-200/80 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
          <Bug className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
            Laporan Masalah (Bug Report)
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
            {levelData.story}
          </p>
        </div>
      </div>

      {/* Code Inspector */}
      <div className="bg-slate-900 text-slate-100 p-5 sm:p-6 rounded-2xl shadow-md space-y-3 font-mono">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-xs text-slate-400">
          <span>// Baris Kode Program</span>
          <span className="text-[11px] text-rose-400">Periksa baris bertanda BUG ⚠️</span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm">
          {levelData.buggyCode.map((line, idx) => {
            const isBuggyLine = idx === buggyIndex;

            if (isBuggyLine) {
              const appliedOption = levelData.possibleFixes.options?.find(o => o.id === selectedReplacementId);

              return (
                <div
                  key={line.id}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isFixed
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/70 border-rose-500 text-rose-200 animate-pulse'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500 font-bold">{idx + 1}.</span>
                    <span>
                      {isFixed && appliedOption ? appliedOption.text : line.text}
                    </span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
                    {isFixed ? '✅ DIPERBAIKI' : '⚠️ BUG DI SINI'}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={line.id}
                className="p-3 bg-slate-800/60 rounded-xl border border-slate-800 text-slate-300 flex items-center gap-3"
              >
                <span className="text-slate-500 font-bold">{idx + 1}.</span>
                <span>{line.text}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Replacement Options */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Pilih Perbaikan Baris ke-{buggyIndex + 1}:
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {levelData.possibleFixes.options?.map(opt => {
            const isSelected = selectedReplacementId === opt.id;
            const isCorrect = isFixed && isSelected;
            const isWrong = isSelected && !isFixed;

            return (
              <button
                key={opt.id}
                onClick={() => handleApplyFix(opt.id)}
                disabled={isFixed}
                className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all active:scale-[0.99] flex items-center justify-between cursor-pointer ${
                  isCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold'
                    : isWrong
                    ? 'border-rose-400 bg-rose-50 text-rose-900'
                    : 'border-slate-200 hover:border-blue-400 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span>{opt.text}</span>
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isWrong ? (
                  <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                ) : null}
              </button>
            );
          })}
        </div>

        {feedbackMsg && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 mt-3 ${
              isFixed
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {isFixed ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{feedbackMsg}</span>
          </div>
        )}
      </div>
    </div>
  );
};

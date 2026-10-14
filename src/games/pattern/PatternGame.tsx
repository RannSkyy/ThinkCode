import React, { useState, useEffect } from 'react';
import { Sparkles, Lightbulb, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';
import { PatternLevelData, LevelResult, PatternItem } from '../../types';
import { sound } from '../../utils/sound';

interface PatternGameProps {
  levelData: PatternLevelData;
  onComplete: (result: LevelResult) => void;
  onExit: () => void;
}

export const PatternGame: React.FC<PatternGameProps> = ({ levelData, onComplete, onExit }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);
  }, [levelData]);

  const handleSelectOption = (opt: PatternItem) => {
    if (isAnswered && isCorrect) return;
    sound.playClick();
    setSelectedOptionId(opt.id);

    if (opt.id === levelData.correctOptionId) {
      // Correct!
      setIsAnswered(true);
      setIsCorrect(true);
      sound.playCollect();

      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 10 + (durationSeconds < 15 ? 10 : 0));

      window.setTimeout(() => {
        onComplete({
          gameId: 'pattern',
          levelNumber: levelData.levelNumber,
          difficulty: levelData.difficulty,
          score: Math.max(70, score),
          durationSeconds,
          mistakesCount: mistakes,
          stars,
          completedAt: new Date().toISOString(),
        });
      }, 700);
    } else {
      // Wrong choice
      sound.playError();
      setIsAnswered(true);
      setIsCorrect(false);
      setMistakes(m => m + 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
              Konsep: Pattern Recognition
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              {levelData.title}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm sm:text-base mt-1.5">
            Temukan potongan yang hilang tanda tanya (?) agar pola berulang dengan sempurna!
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

      {/* Pattern Sequence Board */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Rangkaian Pola Algoritma
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
          {levelData.patternSequence.map((item, idx) => {
            const isMissing = idx === levelData.missingIndex;
            return (
              <div key={idx} className="flex items-center gap-2 sm:gap-3">
                <div
                  className={`min-w-16 min-h-16 sm:min-w-20 sm:min-h-20 p-2 rounded-2xl flex flex-col items-center justify-center text-center border-2 transition-all ${
                    isMissing
                      ? 'bg-amber-50 border-amber-400 border-dashed animate-pulse ring-2 ring-amber-200'
                      : 'bg-white border-slate-200 shadow-xs'
                  }`}
                >
                  {isMissing ? (
                    <HelpCircle className="w-8 h-8 text-amber-500 animate-bounce mx-auto" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center w-full">
                      <span className="text-2xl sm:text-3xl mx-auto">{item?.symbol}</span>
                      <span className="text-[10px] sm:text-xs text-slate-600 font-semibold text-center leading-tight mt-1 px-0.5 whitespace-normal">
                        {item?.label}
                      </span>
                    </div>
                  )}
                </div>

                {idx < levelData.patternSequence.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 hidden sm:block" />
                )}
              </div>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all animate-in fade-in ${
              isCorrect
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{levelData.ruleExplanation}</span>
              </>
            ) : (
              <span>Pilihan belum tepat. Amati urutan kembali dan pilih jawaban lain!</span>
            )}
          </div>
        )}
      </div>

      {/* Answer Options */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
          Pilih Elemen Pengisi Pola yang Tepat
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {levelData.options.map(opt => {
            const isSelected = selectedOptionId === opt.id;
            const isThisCorrect = isAnswered && opt.id === levelData.correctOptionId;
            const isThisWrong = isAnswered && isSelected && !isCorrect;

            let borderStyle = 'border-slate-200 hover:border-purple-300 bg-white hover:bg-purple-50/50';
            if (isThisCorrect) borderStyle = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-300';
            if (isThisWrong) borderStyle = 'border-rose-400 bg-rose-50';

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt)}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shadow-xs ${borderStyle}`}
              >
                <span className="text-3xl">{opt.symbol}</span>
                <span className="text-xs font-semibold text-slate-700">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

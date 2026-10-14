import React, { useState, useEffect } from 'react';
import { GitBranch, CheckCircle2, AlertTriangle, Lightbulb, Sparkles } from 'lucide-react';
import { IfElseLevelData, LevelResult } from '../../types';
import { sound } from '../../utils/sound';

interface IfElseGameProps {
  levelData: IfElseLevelData;
  onComplete: (result: LevelResult) => void;
  onExit: () => void;
}

export const IfElseGame: React.FC<IfElseGameProps> = ({ levelData, onComplete, onExit }) => {
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

  const handleSelectOption = (optionId: string) => {
    if (isAnswered && isCorrect) return;
    sound.playClick();
    setSelectedOptionId(optionId);

    const isMatch = optionId === levelData.conditions.correctOptionId;

    if (isMatch) {
      sound.playCollect();
      setIsAnswered(true);
      setIsCorrect(true);

      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 10 + (durationSeconds < 20 ? 10 : 0));

      window.setTimeout(() => {
        onComplete({
          gameId: 'ifelse',
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
      setIsAnswered(true);
      setIsCorrect(false);
      setMistakes(m => m + 1);
    }
  };

  const selectedOpt = levelData.conditions.options.find(o => o.id === selectedOptionId);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md">
              Konsep: Conditional & Percabangan
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              {levelData.title}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm sm:text-base mt-1.5">
            Tentukan percabangan IF ... ELSE yang paling tepat untuk situasi saat ini!
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

      {/* Sensor State & Scenario */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Kondisi Lingkungan (Sensor Input)
          </span>
          <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
            levelData.weatherOrState.conditionValue
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-rose-100 text-rose-800'
          }`}>
            Kondisi: {levelData.weatherOrState.conditionValue ? 'TRUE (BENAR)' : 'FALSE (SALAH)'}
          </span>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <span className="text-4xl">{levelData.weatherOrState.icon}</span>
          <div>
            <p className="text-sm font-bold text-slate-900">{levelData.weatherOrState.label}</p>
            <p className="text-xs text-slate-600 mt-0.5">{levelData.scenario}</p>
          </div>
        </div>

        {/* Visual Decision Tree Branch */}
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-xl border border-cyan-200 font-mono text-xs sm:text-sm space-y-2">
          <div className="text-slate-700 font-semibold flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-cyan-600" />
            <span>IF ({levelData.conditions.expectedCondition}) {'{'}</span>
          </div>
          <div className="pl-6 text-emerald-700 font-sans font-medium">
            → Aksi Benar (Jika Kondisi True):{' '}
            <span className="font-bold underline">{selectedOpt ? selectedOpt.ifAction : '... (Pilih di bawah)'}</span>
          </div>
          <div className="text-slate-700 font-semibold">{'}'} ELSE {'{'}</div>
          <div className="pl-6 text-blue-700 font-sans font-medium">
            → Aksi Lain (Jika Kondisi False):{' '}
            <span className="font-bold underline">{selectedOpt ? selectedOpt.elseAction : '... (Pilih di bawah)'}</span>
          </div>
          <div className="text-slate-700 font-semibold">{'}'}</div>
        </div>
      </div>

      {/* Branch Options */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Pilihan Rangkaian Logika Percabangan:
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {levelData.conditions.options.map(opt => {
            const isSelected = selectedOptionId === opt.id;
            const isThisCorrect = isAnswered && isSelected && isCorrect;
            const isThisWrong = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={opt.id}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-xl border text-left text-xs sm:text-sm transition-all active:scale-[0.99] flex items-center justify-between cursor-pointer ${
                  isThisCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold'
                    : isThisWrong
                    ? 'border-rose-400 bg-rose-50 text-rose-900'
                    : 'border-slate-200 hover:border-cyan-400 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div>
                  <p className="font-bold text-slate-900">{opt.label}</p>
                  <p className="text-[11px] text-slate-500 mt-1">
                    IF: {opt.ifAction} · ELSE: {opt.elseAction}
                  </p>
                </div>

                {isThisCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                ) : isThisWrong ? (
                  <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
                ) : null}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center gap-2 mt-3 animate-in fade-in ${
              isCorrect
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium'
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
            )}
            <span>{isCorrect ? levelData.explanation : 'Keputusan percabangan belum tepat. Periksa kembali kondisi situasi!'}</span>
          </div>
        )}
      </div>
    </div>
  );
};

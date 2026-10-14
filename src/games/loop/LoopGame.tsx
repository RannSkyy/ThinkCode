import React, { useState, useEffect, useRef } from 'react';
import { Repeat, Play, RotateCcw, Lightbulb, Sparkles, Plus, Minus, CheckCircle2 } from 'lucide-react';
import { RobotCharacter, GemAsset, GoalStarAsset, HazardAsset } from '../../components/common/GameAssets';
import { LoopLevelData, LevelResult } from '../../types';
import { sound } from '../../utils/sound';

interface LoopGameProps {
  levelData: LoopLevelData;
  onComplete: (result: LevelResult) => void;
  onExit: () => void;
}

export const LoopGame: React.FC<LoopGameProps> = ({ levelData, onComplete, onExit }) => {
  const [selectedBodyId, setSelectedBodyId] = useState<string>(levelData.loopBodyOptions[0].id);
  const [repeatCount, setRepeatCount] = useState<number>(1);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [startTime] = useState<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setSelectedBodyId(levelData.loopBodyOptions[0].id);
    setRepeatCount(1);
    setIsRunning(false);
    setCurrentStep(0);
    setShowHint(false);
    setErrorMessage(null);
  }, [levelData]);

  const changeRepeatCount = (delta: number) => {
    if (isRunning) return;
    sound.playClick();
    setRepeatCount(prev => Math.max(1, Math.min(10, prev + delta)));
    setErrorMessage(null);
  };

  const runLoop = async () => {
    if (isRunning) return;
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIsRunning(true);
    setErrorMessage(null);
    setCurrentStep(0);

    const isCorrectBody = selectedBodyId === levelData.correctLoopBodyId;
    const isCorrectCount = repeatCount === levelData.correctRepeatCount;

    // Simulate stepping through track
    const totalSimSteps = repeatCount;

    for (let i = 1; i <= totalSimSteps; i++) {
      setCurrentStep(i);
      sound.playStep();

      await new Promise(res => {
        timerRef.current = window.setTimeout(res, 350);
      });
    }

    setIsRunning(false);

    if (isCorrectBody && isCorrectCount) {
      sound.playCollect();
      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 5 + (durationSeconds < 25 ? 10 : 0));

      window.setTimeout(() => {
        onComplete({
          gameId: 'loop',
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
      sound.playError();
      setMistakes(m => m + 1);

      if (!isCorrectBody) {
        setErrorMessage('Aksi di dalam loop belum tepat untuk mengatasi rintangan ini.');
      } else if (repeatCount < levelData.correctRepeatCount) {
        setErrorMessage(`Jumlah pengulangan (${repeatCount}x) masih kurang untuk mencapai tujuan!`);
      } else {
        setErrorMessage(`Jumlah pengulangan (${repeatCount}x) terlalu banyak! Robot melampaui garis finish.`);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md">
              Konsep: Loop & Repeat
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              {levelData.title}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm sm:text-base mt-1.5">
            {levelData.instruction}
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

      {/* Track Visualizer */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Lintasan Misi ({levelData.obstaclePattern.length} Segmen)
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Posisi Saat Ini: {currentStep} / {levelData.targetLoops}
          </span>
        </div>

        {/* Path segments */}
        <div className="overflow-x-auto pb-2 flex items-center justify-center">
          <div className="flex items-center justify-center gap-2 min-w-max p-2 bg-slate-50 rounded-2xl border border-slate-200 mx-auto">
            {/* Start Slot */}
            <div className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center p-1 transition-all ${
              currentStep === 0 ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300' : 'bg-white border-slate-200'
            }`}>
              <RobotCharacter size="sm" />
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">Start</span>
            </div>

            {/* Steps */}
            {levelData.obstaclePattern.map((obs, idx) => {
              const stepNum = idx + 1;
              const isRobotHere = currentStep === stepNum;

              let label = 'Jalan';
              if (obs === 'gem') label = 'Permata';
              if (obs === 'star') label = 'Bintang';
              if (obs === 'fire') label = 'Api';

              return (
                <div
                  key={idx}
                  className={`w-14 h-16 rounded-xl border flex flex-col items-center justify-center p-1 transition-all ${
                    isRobotHere
                      ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 scale-105'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="h-7 flex items-center justify-center">
                    {isRobotHere ? (
                      <RobotCharacter size="sm" />
                    ) : obs === 'gem' ? (
                      <GemAsset size={20} />
                    ) : obs === 'star' ? (
                      <GoalStarAsset size={20} />
                    ) : obs === 'fire' ? (
                      <HazardAsset size={20} />
                    ) : (
                      <span className="w-3 h-3 rounded-full bg-slate-300" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium mt-0.5">{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {errorMessage && (
          <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 flex items-center justify-between animate-in fade-in">
            <span>{errorMessage}</span>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-600 font-bold hover:underline cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}
      </div>

      {/* Loop Code Configurator */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent p-5 sm:p-6 rounded-2xl border-2 border-amber-300 bg-white shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-amber-800">
          <Repeat className="w-5 h-5 text-amber-600" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Struktur Blok Pengulangan (Loop Block)
          </h3>
        </div>

        {/* Code Builder Visualizer */}
        <div className="bg-slate-900 text-amber-300 p-4 rounded-xl font-mono text-sm space-y-2 border border-slate-800">
          <div className="flex items-center gap-3">
            <span className="text-amber-400 font-bold">ULANGI</span>
            {/* Stepper Inside */}
            <div className="inline-flex items-center bg-slate-800 rounded-lg p-1 border border-slate-700">
              <button
                onClick={() => changeRepeatCount(-1)}
                disabled={repeatCount <= 1 || isRunning}
                className="w-7 h-7 flex items-center justify-center text-white hover:bg-slate-700 rounded transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center font-bold text-white text-base">
                {repeatCount}
              </span>
              <button
                onClick={() => changeRepeatCount(1)}
                disabled={repeatCount >= 10 || isRunning}
                className="w-7 h-7 flex items-center justify-center text-white hover:bg-slate-700 rounded transition-colors disabled:opacity-40 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-amber-400 font-bold">KALI {'{'}</span>
          </div>

          <div className="pl-6 py-1 text-emerald-400 font-sans text-xs sm:text-sm">
            // Aksi yang akan diulang:
          </div>

          <div className="pl-6 text-white font-sans text-sm font-semibold">
            {levelData.loopBodyOptions.find(b => b.id === selectedBodyId)?.label}
          </div>

          <div>{'}'}</div>
        </div>

        {/* Loop Body Options */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Pilih Isi Aksi Loop:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {levelData.loopBodyOptions.map(opt => {
              const isSelected = selectedBodyId === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedBodyId(opt.id);
                  }}
                  disabled={isRunning}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all active:scale-98 cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-50 text-amber-900 ring-2 ring-amber-300'
                      : 'border-slate-200 hover:border-amber-300 bg-white text-slate-700'
                  }`}
                >
                  <p className="font-bold">{opt.label}</p>
                  <p className="text-[10px] text-slate-400 font-normal mt-1">
                    {opt.actions.join(' -> ')}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Run Controls */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={runLoop}
            disabled={isRunning}
            className="flex-1 py-3 px-4 bg-amber-600 hover:bg-amber-700 active:scale-98 text-white font-bold rounded-xl shadow-md shadow-amber-600/20 flex items-center justify-center gap-2 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Jalankan Perulangan</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setCurrentStep(0);
              setErrorMessage(null);
            }}
            disabled={isRunning}
            className="py-3 px-4 bg-white hover:bg-slate-50 text-slate-700 font-medium rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className="w-4 h-4 text-slate-500" />
            <span>Reset Posisi</span>
          </button>
        </div>
      </div>
    </div>
  );
};

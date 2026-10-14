import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  RotateCw,
  ArrowUp, 
  ChevronsUp, 
  Trash2, 
  Lightbulb, 
  Sparkles,
  Award
} from 'lucide-react';
import { 
  RobotCharacter, 
  WallAsset, 
  HazardAsset, 
  GoldCoinAsset, 
  GoalStarAsset 
} from '../../components/common/GameAssets';
import { MazeLevelData, MazeCommand, MazeDirection, LevelResult } from '../../types';
import { sound } from '../../utils/sound';

interface MazeGameProps {
  levelData: MazeLevelData;
  onComplete: (result: LevelResult) => void;
  onExit: () => void;
}

const DIR_ANGLES: Record<MazeDirection, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

const DIR_DELTAS: Record<MazeDirection, { r: number; c: number }> = {
  N: { r: -1, c: 0 },
  E: { r: 0, c: 1 },
  S: { r: 1, c: 0 },
  W: { r: 0, c: -1 },
};

const NEXT_DIR_LEFT: Record<MazeDirection, MazeDirection> = {
  N: 'W',
  W: 'S',
  S: 'E',
  E: 'N',
};

const NEXT_DIR_RIGHT: Record<MazeDirection, MazeDirection> = {
  N: 'E',
  E: 'S',
  S: 'W',
  W: 'N',
};

export const MazeGame: React.FC<MazeGameProps> = ({ levelData, onComplete, onExit }) => {
  const [commands, setCommands] = useState<MazeCommand[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);

  // Player position and state
  const [playerPos, setPlayerPos] = useState({ ...levelData.start });
  const [collectedCoins, setCollectedCoins] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Timer
  const [startTime] = useState<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // Reset when level changes
    setCommands([]);
    setIsRunning(false);
    setCurrentStepIndex(null);
    setPlayerPos({ ...levelData.start });
    setCollectedCoins([]);
    setErrorMessage(null);
    setShowHint(false);
  }, [levelData]);

  const addCommand = (cmd: MazeCommand) => {
    if (isRunning) return;
    if (levelData.maxCommands && commands.length >= levelData.maxCommands) {
      sound.playError();
      return;
    }
    sound.playClick();
    setCommands(prev => [...prev, cmd]);
    setErrorMessage(null);
  };

  const removeLastCommand = () => {
    if (isRunning || commands.length === 0) return;
    sound.playClick();
    setCommands(prev => prev.slice(0, -1));
  };

  const resetSimulation = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStepIndex(null);
    setPlayerPos({ ...levelData.start });
    setCollectedCoins([]);
    setErrorMessage(null);
  };

  const runProgram = async () => {
    if (isRunning || commands.length === 0) return;
    resetSimulation();
    setIsRunning(true);
    setErrorMessage(null);

    let curR = levelData.start.r;
    let curC = levelData.start.c;
    let curDir = levelData.start.dir;
    const coinsCollected: string[] = [];

    const isWall = (r: number, c: number) => {
      return levelData.walls.some(w => w.r === r && w.c === c);
    };

    const isHazard = (r: number, c: number) => {
      return (levelData.hazards || []).some(h => h.r === r && h.c === c);
    };

    const isCoin = (r: number, c: number) => {
      return (levelData.coins || []).some(coin => coin.r === r && coin.c === c);
    };

    for (let i = 0; i < commands.length; i++) {
      setCurrentStepIndex(i);
      const cmd = commands[i];

      if (cmd === 'FORWARD') {
        const delta = DIR_DELTAS[curDir];
        const nextR = curR + delta.r;
        const nextC = curC + delta.c;

        // Check boundaries
        if (nextR < 0 || nextR >= levelData.gridSize.rows || nextC < 0 || nextC >= levelData.gridSize.cols) {
          sound.playError();
          setErrorMessage('Aduh! Kiko keluar dari peta batas labirin.');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        // Check walls
        if (isWall(nextR, nextC)) {
          sound.playError();
          setErrorMessage('Ups! Kiko menabrak tembok batu.');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        // Check hazard (walking into fire without jump)
        if (isHazard(nextR, nextC)) {
          sound.playError();
          setErrorMessage('Gawat! Kiko terperosok ke dalam jebakan! Gunakan Lompat.');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        curR = nextR;
        curC = nextC;
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();

        if (isCoin(curR, curC) && !coinsCollected.includes(`${curR},${curC}`)) {
          coinsCollected.push(`${curR},${curC}`);
          setCollectedCoins([...coinsCollected]);
          sound.playCollect();
        }
      } else if (cmd === 'TURN_LEFT') {
        curDir = NEXT_DIR_LEFT[curDir];
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();
      } else if (cmd === 'TURN_RIGHT') {
        curDir = NEXT_DIR_RIGHT[curDir];
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();
      } else if (cmd === 'JUMP') {
        const delta = DIR_DELTAS[curDir];
        // Jump moves 2 cells forward
        const nextR = curR + delta.r * 2;
        const nextC = curC + delta.c * 2;

        if (nextR < 0 || nextR >= levelData.gridSize.rows || nextC < 0 || nextC >= levelData.gridSize.cols) {
          sound.playError();
          setErrorMessage('Lompatan Kiko mendarat di luar arena!');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        if (isWall(nextR, nextC)) {
          sound.playError();
          setErrorMessage('Lompatan Kiko menabrak tembok!');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        curR = nextR;
        curC = nextC;
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();

        if (isCoin(curR, curC) && !coinsCollected.includes(`${curR},${curC}`)) {
          coinsCollected.push(`${curR},${curC}`);
          setCollectedCoins([...coinsCollected]);
          sound.playCollect();
        }
      }

      // Step delay
      await new Promise(res => {
        timerRef.current = window.setTimeout(res, 350);
      });
    }

    setIsRunning(false);

    // Check if reached goal
    if (curR === levelData.goal.r && curC === levelData.goal.c) {
      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      // Calculate score: Base 100, max 100. Fast bonus included.
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 5 + (durationSeconds < 30 ? 10 : 0));

      onComplete({
        gameId: 'maze',
        levelNumber: levelData.levelNumber,
        difficulty: levelData.difficulty,
        score: Math.max(70, score),
        durationSeconds,
        mistakesCount: mistakes,
        stars,
        completedAt: new Date().toISOString(),
      });
    } else {
      sound.playError();
      setErrorMessage('Robot berhenti sebelum mencapai portal bintang. Tambahkan langkah!');
      setMistakes(m => m + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Banner & Instructions */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
              Konsep: Sequence & Algoritma
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">
              Maks Perintah: {levelData.maxCommands || 20}
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm sm:text-base mt-1.5 leading-relaxed">
            {levelData.instruction}
          </p>
        </div>

        <button
          onClick={() => {
            sound.playClick();
            setShowHint(!showHint);
          }}
          className="flex items-center justify-center gap-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl border border-amber-200 transition-colors cursor-pointer shrink-0"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
          <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
        </button>
      </div>

      {showHint && (
        <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-900 flex items-center justify-center gap-2 text-center animate-in fade-in">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <span><strong>Petunjuk Guru:</strong> {levelData.hint}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl text-xs text-rose-800 flex items-center justify-between text-center animate-in fade-in">
          <span className="flex-1">{errorMessage}</span>
          <button
            onClick={() => setErrorMessage(null)}
            className="text-xs text-rose-600 font-bold hover:underline cursor-pointer ml-2"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Main Game Stage: Grid on Left/Top, Command Builder on Right/Bottom */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Labirin Grid View */}
        <div className="md:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center">
          <div 
            className="grid gap-1 sm:gap-1.5 p-2 bg-slate-100 rounded-2xl border-2 border-slate-300 shadow-inner mx-auto max-w-full overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${levelData.gridSize.cols}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: levelData.gridSize.rows }).map((_, r) =>
              Array.from({ length: levelData.gridSize.cols }).map((_, c) => {
                const isPlayer = playerPos.r === r && playerPos.c === c;
                const isGoal = levelData.goal.r === r && levelData.goal.c === c;
                const isWall = levelData.walls.some(w => w.r === r && w.c === c);
                const isHazard = (levelData.hazards || []).some(h => h.r === r && h.c === c);
                const hasCoin = (levelData.coins || []).some(coin => coin.r === r && coin.c === c) && !collectedCoins.includes(`${r},${c}`);

                let cellBg = 'bg-white';
                if (isWall) cellBg = 'bg-slate-700 shadow-sm';
                if (isHazard) cellBg = 'bg-rose-50 border border-rose-300';
                if (isGoal) cellBg = 'bg-amber-50';

                const cellSizeClass = levelData.gridSize.cols >= 7 
                  ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11' 
                  : 'w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13';

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`${cellSizeClass} rounded-xl flex items-center justify-center text-center relative transition-all duration-200 border border-slate-200/60 overflow-hidden ${cellBg}`}
                  >
                    {isWall && (
                      <WallAsset />
                    )}

                    {isHazard && !isPlayer && (
                      <div className="flex items-center justify-center w-full h-full">
                        <HazardAsset size={22} />
                      </div>
                    )}

                    {hasCoin && !isPlayer && (
                      <div className="flex items-center justify-center w-full h-full">
                        <GoldCoinAsset size={22} />
                      </div>
                    )}

                    {isGoal && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <GoalStarAsset size={26} />
                      </div>
                    )}

                    {isPlayer && (
                      <div className="z-10 flex items-center justify-center w-full h-full">
                        <RobotCharacter dir={playerPos.dir} size={levelData.gridSize.cols >= 7 ? 'sm' : 'md'} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 mt-4 text-center">
            <div className="flex items-center gap-1.5">
              <RobotCharacter size="sm" />
              <span className="font-semibold text-slate-700">Robot Kiko</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded overflow-hidden">
                <WallAsset />
              </div>
              <span>Tembok</span>
            </div>
            <div className="flex items-center gap-1">
              <GoldCoinAsset size={18} />
              <span>Koin Emas</span>
            </div>
            <div className="flex items-center gap-1">
              <GoalStarAsset size={18} />
              <span>Bintang Portal</span>
            </div>
          </div>
        </div>

        {/* Command Programming Panel */}
        <div className="md:col-span-5 space-y-4">
          {/* Action Buttons Pad */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Pilihan Perintah Robot
            </h3>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => addCommand('FORWARD')}
                disabled={isRunning}
                className="py-2.5 px-3 bg-blue-50 hover:bg-blue-100 active:scale-95 text-blue-700 font-semibold rounded-xl border border-blue-200 flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer disabled:opacity-50"
              >
                <ArrowUp className="w-4 h-4 text-blue-600" />
                <span>Maju 1 Langkah</span>
              </button>

              <button
                onClick={() => addCommand('JUMP')}
                disabled={isRunning}
                className="py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 active:scale-95 text-emerald-700 font-semibold rounded-xl border border-emerald-200 flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer disabled:opacity-50"
              >
                <ChevronsUp className="w-4 h-4 text-emerald-600" />
                <span>Lompat (2 Petak)</span>
              </button>

              <button
                onClick={() => addCommand('TURN_LEFT')}
                disabled={isRunning}
                className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-700 font-semibold rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4 text-indigo-600" />
                <span>Belok Kiri 90°</span>
              </button>

              <button
                onClick={() => addCommand('TURN_RIGHT')}
                disabled={isRunning}
                className="py-2.5 px-3 bg-indigo-50 hover:bg-indigo-100 active:scale-95 text-indigo-700 font-semibold rounded-xl border border-indigo-200 flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer disabled:opacity-50"
              >
                <RotateCw className="w-4 h-4 text-indigo-600" />
                <span>Belok Kanan 90°</span>
              </button>
            </div>
          </div>

          {/* Sequence Script Visualizer */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Susunan Algoritma
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  ({commands.length} langkah)
                </span>
              </div>

              {commands.length > 0 && !isRunning && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={removeLastCommand}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Hapus baris terakhir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setCommands([]);
                    }}
                    className="text-[11px] text-slate-500 hover:text-rose-600 font-medium cursor-pointer"
                  >
                    Kosongkan
                  </button>
                </div>
              )}
            </div>

            {/* Program sequence list */}
            <div className="min-h-28 max-h-48 overflow-y-auto bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex flex-col gap-1.5">
              {commands.length === 0 ? (
                <div className="h-28 flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                  <p>Belum ada perintah.</p>
                  <p className="text-[11px] mt-0.5 text-slate-400">
                    Klik tombol perintah di atas untuk menyusun langkah!
                  </p>
                </div>
              ) : (
                commands.map((cmd, idx) => {
                  const isCurrent = currentStepIndex === idx;
                  let cmdLabel = 'Maju';
                  if (cmd === 'TURN_LEFT') cmdLabel = 'Belok Kiri';
                  if (cmd === 'TURN_RIGHT') cmdLabel = 'Belok Kanan';
                  if (cmd === 'JUMP') cmdLabel = 'Lompat';

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-sm scale-102'
                          : 'bg-white text-slate-700 border border-slate-200/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 text-[10px] ${isCurrent ? 'text-blue-200' : 'text-slate-400'}`}>
                          {idx + 1}.
                        </span>
                        <span>{cmdLabel}</span>
                      </div>
                      {isCurrent && <span className="text-[10px] animate-pulse">Berjalan...</span>}
                    </div>
                  );
                })
              )}
            </div>

            {/* Run and Reset Controls */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={runProgram}
                disabled={isRunning || commands.length === 0}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all text-sm cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Jalankan Kode</span>
              </button>

              <button
                onClick={resetSimulation}
                disabled={isRunning}
                className="py-3 px-3 bg-white hover:bg-slate-50 active:scale-95 text-slate-700 font-medium rounded-xl border border-slate-200 flex items-center justify-center gap-1.5 transition-all text-sm cursor-pointer disabled:opacity-50"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Reset Robot</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  RotateCw,
  ArrowUp, 
  Sparkles, 
  Key, 
  ToggleLeft, 
  Trash2, 
  Lightbulb,
  DoorOpen
} from 'lucide-react';
import {
  RobotCharacter,
  WallAsset,
  GemAsset,
  GateAsset,
  SwitchAsset,
  GoalStarAsset
} from '../../components/common/GameAssets';
import { BlockCodingLevelData, ActionBlockType, MazeDirection, LevelResult } from '../../types';
import { sound } from '../../utils/sound';

interface BlockCodingGameProps {
  levelData: BlockCodingLevelData;
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

export const BlockCodingGame: React.FC<BlockCodingGameProps> = ({ levelData, onComplete, onExit }) => {
  const [blocks, setBlocks] = useState<ActionBlockType[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number | null>(null);

  // Simulation state
  const [playerPos, setPlayerPos] = useState({ ...levelData.grid.playerStart });
  const [collectedGems, setCollectedGems] = useState<string[]>([]);
  const [activatedSwitches, setActivatedSwitches] = useState<string[]>([]);
  const [unlockedGates, setUnlockedGates] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const [startTime] = useState<number>(Date.now());
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setBlocks([]);
    setIsRunning(false);
    setCurrentStepIndex(null);
    setPlayerPos({ ...levelData.grid.playerStart });
    setCollectedGems([]);
    setActivatedSwitches([]);
    setUnlockedGates([]);
    setErrorMessage(null);
    setShowHint(false);
  }, [levelData]);

  const addBlock = (blockType: ActionBlockType) => {
    if (isRunning) return;
    if (blocks.length >= 24) {
      sound.playError();
      return;
    }
    sound.playClick();
    setBlocks(prev => [...prev, blockType]);
    setErrorMessage(null);
  };

  const removeLastBlock = () => {
    if (isRunning || blocks.length === 0) return;
    sound.playClick();
    setBlocks(prev => prev.slice(0, -1));
  };

  const resetState = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStepIndex(null);
    setPlayerPos({ ...levelData.grid.playerStart });
    setCollectedGems([]);
    setActivatedSwitches([]);
    setUnlockedGates([]);
    setErrorMessage(null);
  };

  const runProgram = async () => {
    if (isRunning || blocks.length === 0) return;
    resetState();
    setIsRunning(true);
    setErrorMessage(null);

    let curR = levelData.grid.playerStart.r;
    let curC = levelData.grid.playerStart.c;
    let curDir = levelData.grid.playerStart.dir;

    const gemsList: string[] = [];
    const switchesList: string[] = [];
    const gatesList: string[] = [];

    const isObstacle = (r: number, c: number) => {
      return levelData.grid.obstacles.some(o => o.r === r && o.c === c);
    };

    const getTargetAt = (r: number, c: number) => {
      return levelData.grid.targets.find(t => t.r === r && t.c === c);
    };

    for (let i = 0; i < blocks.length; i++) {
      setCurrentStepIndex(i);
      const blk = blocks[i];

      if (blk === 'MOVE_FORWARD') {
        const delta = DIR_DELTAS[curDir];
        const nextR = curR + delta.r;
        const nextC = curC + delta.c;

        if (nextR < 0 || nextR >= levelData.grid.rows || nextC < 0 || nextC >= levelData.grid.cols) {
          sound.playError();
          setErrorMessage('Robot keluar dari batas arena!');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        if (isObstacle(nextR, nextC)) {
          sound.playError();
          setErrorMessage('Robot menabrak balok rintangan!');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        // Gate check
        const target = getTargetAt(nextR, nextC);
        if (target && target.type === 'gate' && !gatesList.includes(`${nextR},${nextC}`)) {
          sound.playError();
          setErrorMessage('Gerbang terkunci! Buka gerbang terlebih dahulu.');
          setMistakes(m => m + 1);
          setIsRunning(false);
          return;
        }

        curR = nextR;
        curC = nextC;
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();
      } else if (blk === 'TURN_LEFT') {
        curDir = NEXT_DIR_LEFT[curDir];
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();
      } else if (blk === 'TURN_RIGHT') {
        curDir = NEXT_DIR_RIGHT[curDir];
        setPlayerPos({ r: curR, c: curC, dir: curDir });
        sound.playStep();
      } else if (blk === 'COLLECT_GEM') {
        const target = getTargetAt(curR, curC);
        if (target && target.type === 'gem' && !gemsList.includes(`${curR},${curC}`)) {
          gemsList.push(`${curR},${curC}`);
          setCollectedGems([...gemsList]);
          sound.playCollect();
        } else {
          sound.playError();
          setErrorMessage('Tidak ada permata di posisi robot saat ini.');
          setMistakes(m => m + 1);
        }
      } else if (blk === 'ACTIVATE_SWITCH') {
        const target = getTargetAt(curR, curC);
        if (target && target.type === 'switch' && !switchesList.includes(`${curR},${curC}`)) {
          switchesList.push(`${curR},${curC}`);
          setActivatedSwitches([...switchesList]);
          sound.playStar(1);
        } else {
          sound.playError();
          setErrorMessage('Tidak ada tombol saklar di posisi robot saat ini.');
          setMistakes(m => m + 1);
        }
      } else if (blk === 'UNLOCK_GATE') {
        // Unlock gate in adjacent forward cell or current cell
        const delta = DIR_DELTAS[curDir];
        const nextR = curR + delta.r;
        const nextC = curC + delta.c;
        const forwardTarget = getTargetAt(nextR, nextC);

        if (forwardTarget && forwardTarget.type === 'gate' && !gatesList.includes(`${nextR},${nextC}`)) {
          gatesList.push(`${nextR},${nextC}`);
          setUnlockedGates([...gatesList]);
          sound.playStar(0);
        } else {
          sound.playError();
          setErrorMessage('Tidak ada gerbang tepat di depan robot untuk dibuka.');
          setMistakes(m => m + 1);
        }
      }

      await new Promise(res => {
        timerRef.current = window.setTimeout(res, 350);
      });
    }

    setIsRunning(false);

    // Verify all objectives
    const allGemsNeeded = levelData.grid.targets.filter(t => t.type === 'gem').length;
    const allSwitchesNeeded = levelData.grid.targets.filter(t => t.type === 'switch').length;
    const exitTarget = levelData.grid.targets.find(t => t.type === 'exit');

    const reachedExit = exitTarget ? curR === exitTarget.r && curC === exitTarget.c : true;
    const gotAllGems = gemsList.length >= allGemsNeeded;
    const gotAllSwitches = switchesList.length >= allSwitchesNeeded;

    if (reachedExit && gotAllGems && gotAllSwitches) {
      const durationSeconds = Math.max(1, Math.floor((Date.now() - startTime) / 1000));
      let stars = 3;
      if (mistakes === 1) stars = 2;
      else if (mistakes >= 2) stars = 1;

      const score = Math.min(100, 100 - mistakes * 5 + (durationSeconds < 35 ? 10 : 0));

      onComplete({
        gameId: 'block',
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
      if (!gotAllGems) {
        setErrorMessage('Ada permata kristal yang belum kamu ambil!');
      } else if (!gotAllSwitches) {
        setErrorMessage('Saklar reaktor belum semuanya diaktifkan!');
      } else {
        setErrorMessage('Robot belum mencapai pintu keluar.');
      }
      setMistakes(m => m + 1);
    }
  };

  const getBlockStyle = (type: ActionBlockType) => {
    switch (type) {
      case 'MOVE_FORWARD':
        return 'bg-blue-600 text-white';
      case 'TURN_LEFT':
      case 'TURN_RIGHT':
        return 'bg-indigo-600 text-white';
      case 'COLLECT_GEM':
        return 'bg-emerald-600 text-white';
      case 'ACTIVATE_SWITCH':
        return 'bg-amber-600 text-white';
      case 'UNLOCK_GATE':
        return 'bg-rose-600 text-white';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Konsep: Flow & Algoritma
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

      {/* Main Game Stage */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Grid View */}
        <div className="md:col-span-7 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center">
          <div
            className="grid gap-1 sm:gap-1.5 p-2 bg-slate-100 rounded-2xl border-2 border-slate-300 shadow-inner mx-auto max-w-full overflow-hidden"
            style={{
              gridTemplateColumns: `repeat(${levelData.grid.cols}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: levelData.grid.rows }).map((_, r) =>
              Array.from({ length: levelData.grid.cols }).map((_, c) => {
                const isPlayer = playerPos.r === r && playerPos.c === c;
                const isObstacle = levelData.grid.obstacles.some(o => o.r === r && o.c === c);
                const target = levelData.grid.targets.find(t => t.r === r && t.c === c);

                const hasGem = target?.type === 'gem' && !collectedGems.includes(`${r},${c}`);
                const isSwitch = target?.type === 'switch';
                const switchActive = activatedSwitches.includes(`${r},${c}`);
                const isGate = target?.type === 'gate';
                const gateUnlocked = unlockedGates.includes(`${r},${c}`);
                const isExit = target?.type === 'exit';

                const cellSizeClass = levelData.grid.cols >= 6 
                  ? 'w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11' 
                  : 'w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13';

                return (
                  <div
                    key={`${r}-${c}`}
                    className={`${cellSizeClass} rounded-xl flex items-center justify-center text-center relative transition-all duration-200 border border-slate-200/60 overflow-hidden ${
                      isObstacle ? 'bg-slate-700' : 'bg-white'
                    }`}
                  >
                    {isObstacle && <WallAsset />}

                    {hasGem && !isPlayer && (
                      <div className="flex items-center justify-center w-full h-full">
                        <GemAsset size={22} />
                      </div>
                    )}

                    {isSwitch && !isPlayer && (
                      <div className="flex items-center justify-center w-full h-full">
                        <SwitchAsset isActive={switchActive} size={22} />
                      </div>
                    )}

                    {isGate && !isPlayer && (
                      <div className="flex items-center justify-center w-full h-full">
                        <GateAsset isUnlocked={gateUnlocked} size={22} />
                      </div>
                    )}

                    {isExit && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <GoalStarAsset size={26} />
                      </div>
                    )}

                    {isPlayer && (
                      <div className="z-10 flex items-center justify-center w-full h-full">
                        <RobotCharacter dir={playerPos.dir} size={levelData.grid.cols >= 6 ? 'sm' : 'md'} />
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-500 mt-4 text-center">
            <div className="flex items-center gap-1.5">
              <RobotCharacter size="sm" />
              <span className="font-semibold text-slate-700">Robot</span>
            </div>
            <div className="flex items-center gap-1">
              <GemAsset size={18} />
              <span>Permata</span>
            </div>
            <div className="flex items-center gap-1">
              <GateAsset isUnlocked={false} size={18} />
              <span>Gerbang</span>
            </div>
            <div className="flex items-center gap-1">
              <SwitchAsset isActive={true} size={18} />
              <span>Saklar</span>
            </div>
            <div className="flex items-center gap-1">
              <GoalStarAsset size={18} />
              <span>Keluar</span>
            </div>
          </div>
        </div>

        {/* Available Block Palette & Sequence */}
        <div className="md:col-span-5 space-y-4">
          {/* Palette */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center sm:text-left">
              Balok Perintah Tersedia
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {levelData.availableBlocks.map((blk, idx) => {
                let Icon = ArrowUp;
                if (blk.type === 'TURN_LEFT') Icon = RotateCcw;
                if (blk.type === 'TURN_RIGHT') Icon = RotateCw;
                if (blk.type === 'COLLECT_GEM') Icon = Sparkles;
                if (blk.type === 'ACTIVATE_SWITCH') Icon = ToggleLeft;
                if (blk.type === 'UNLOCK_GATE') Icon = Key;

                return (
                  <button
                    key={idx}
                    onClick={() => addBlock(blk.type)}
                    disabled={isRunning}
                    className={`p-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all active:scale-95 shadow-2xs cursor-pointer disabled:opacity-50 ${getBlockStyle(
                      blk.type
                    )}`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-left leading-tight whitespace-normal">{blk.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Arranged Blocks */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Alur Blok Terpasang ({blocks.length})
              </span>

              {blocks.length > 0 && !isRunning && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={removeLastBlock}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Hapus baris terakhir"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      sound.playClick();
                      setBlocks([]);
                    }}
                    className="text-[11px] text-slate-500 hover:text-rose-600 font-medium cursor-pointer"
                  >
                    Kosongkan
                  </button>
                </div>
              )}
            </div>

            <div className="min-h-28 max-h-48 overflow-y-auto bg-slate-50 rounded-xl p-2.5 border border-slate-200 flex flex-col gap-1.5">
              {blocks.length === 0 ? (
                <div className="h-28 flex flex-col items-center justify-center text-center text-slate-400 text-xs">
                  <p>Belum ada balok terpasang.</p>
                  <p className="text-[11px] mt-0.5 text-slate-400">
                    Klik balok di atas untuk merangkai alur kode!
                  </p>
                </div>
              ) : (
                blocks.map((blk, idx) => {
                  const isCurrent = currentStepIndex === idx;
                  const matched = levelData.availableBlocks.find(b => b.type === blk);
                  const label = matched?.label || blk;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        isCurrent
                          ? 'ring-2 ring-emerald-500 scale-102 shadow-sm'
                          : ''
                      } ${getBlockStyle(blk)}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="opacity-70 text-[10px]">{idx + 1}.</span>
                        <span>{label}</span>
                      </div>
                      {isCurrent && <span className="text-[10px] animate-pulse">Menjalankan...</span>}
                    </div>
                  );
                })
              )}
            </div>

            {/* Run & Reset */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={runProgram}
                disabled={isRunning || blocks.length === 0}
                className="py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all text-sm cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Jalankan Blok</span>
              </button>

              <button
                onClick={resetState}
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

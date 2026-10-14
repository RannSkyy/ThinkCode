import React, { useState } from 'react';
import { 
  History, 
  Trash2, 
  Star, 
  Clock, 
  Award, 
  AlertCircle, 
  Calendar, 
  Filter,
  Gamepad2,
  CheckCircle2
} from 'lucide-react';
import { LevelResult, GameId } from '../types';
import { GAMES_DATA } from '../data/gamesData';
import { loadHistory, saveHistory, resetAllData } from '../store/storage';
import { StarRating } from '../components/common/StarRating';
import { DifficultyBadge } from '../components/common/DifficultyBadge';
import { sound } from '../utils/sound';

interface HistoryPageProps {
  onGoToGames: () => void;
  onRefreshData: () => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onGoToGames, onRefreshData }) => {
  const [historyList, setHistoryList] = useState<LevelResult[]>(loadHistory());
  const [selectedGameFilter, setSelectedGameFilter] = useState<string>('all');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const getGameTitle = (id: GameId) => {
    return GAMES_DATA.find(g => g.id === id)?.title || id;
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const filteredHistory = historyList.filter(item => {
    if (selectedGameFilter === 'all') return true;
    return item.gameId === selectedGameFilter;
  });

  // Calculate summary stats
  const totalPlays = historyList.length;
  const avgScore = totalPlays > 0 ? Math.round(historyList.reduce((acc, h) => acc + h.score, 0) / totalPlays) : 0;
  const totalStarsAccumulated = historyList.reduce((acc, h) => acc + h.stars, 0);

  const handleClearHistory = () => {
    sound.playClick();
    resetAllData();
    setHistoryList([]);
    setShowClearConfirm(false);
    onRefreshData();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
            <History className="w-3.5 h-3.5" />
            <span>Penyimpanan Lokal (Local Storage)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Riwayat Permainan & Rekor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Setiap level yang kamu selesaikan tersimpan otomatis di perangkat ini.
          </p>
        </div>

        {historyList.length > 0 && (
          <button
            onClick={() => {
              sound.playClick();
              setShowClearConfirm(true);
            }}
            className="self-start sm:self-auto flex items-center gap-1.5 py-2 px-3 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Riwayat</span>
          </button>
        )}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{totalPlays}</p>
            <p className="text-xs text-slate-500 font-medium">Total Sesi Bermain</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{totalStarsAccumulated}</p>
            <p className="text-xs text-slate-500 font-medium">Bintang Didapatkan</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">{avgScore} <span className="text-xs text-slate-400 font-normal">/ 100</span></p>
            <p className="text-xs text-slate-500 font-medium">Rata-rata Skor</p>
          </div>
        </div>
      </div>

      {/* Filter by Game */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        <button
          onClick={() => {
            sound.playClick();
            setSelectedGameFilter('all');
          }}
          className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
            selectedGameFilter === 'all'
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          Semua Game ({historyList.length})
        </button>

        {GAMES_DATA.map(game => {
          const count = historyList.filter(h => h.gameId === game.id).length;
          return (
            <button
              key={game.id}
              onClick={() => {
                sound.playClick();
                setSelectedGameFilter(game.id);
              }}
              className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedGameFilter === game.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {game.title} ({count})
            </button>
          );
        })}
      </div>

      {/* History Items List */}
      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Belum Ada Riwayat Tersimpan</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Selesaikan tantangan game untuk melihat rekor kecepatan dan bintangmu di sini!
            </p>
            <button
              onClick={() => {
                sound.playClick();
                onGoToGames();
              }}
              className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer inline-flex items-center gap-2 mt-2"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mulai Main Sekarang</span>
            </button>
          </div>
        ) : (
          filteredHistory.map((rec, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm sm:text-base text-slate-900">
                    {getGameTitle(rec.gameId)}
                  </span>
                  <DifficultyBadge difficulty={rec.difficulty} levelNumber={rec.levelNumber} />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(rec.completedAt)}</span>
                </div>
              </div>

              {/* Stats badges */}
              <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{formatDuration(rec.durationSeconds)}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                  <AlertCircle className="w-4 h-4 text-rose-500" />
                  <span>{rec.mistakesCount} Salah</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Skor: {rec.score}</span>
                </div>

                <div className="shrink-0">
                  <StarRating stars={rec.stars} size="sm" />
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal for Clearing Data */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-slate-900 text-base">Hapus Riwayat Permainan?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Semua data bintang dan skor yang tersimpan di perangkat ini akan direset. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleClearHistory}
                className="py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

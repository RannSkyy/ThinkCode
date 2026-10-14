import React from 'react';
import { 
  Bot, 
  Sparkles, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Gamepad2, 
  Compass, 
  Blocks, 
  Bug, 
  Repeat, 
  GitBranch, 
  Layers,
  Star,
  Zap,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { GAMES_DATA } from '../data/gamesData';
import { LEARNING_MATERIALS } from '../data/materialsData';
import { OverallProgress, GameId } from '../types';
import { calculateGameProgressPercent } from '../store/storage';
import { sound } from '../utils/sound';

interface HomePageProps {
  progress: OverallProgress;
  onNavigate: (route: string) => void;
  onSelectGame: (gameId: GameId, levelNumber?: number) => void;
  onSelectMaterial: (materialId: string) => void;
}

const GAME_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Compass,
  Blocks,
  Sparkles,
  Bug,
  Repeat,
  GitBranch,
  Layers,
};

export const HomePage: React.FC<HomePageProps> = ({
  progress,
  onNavigate,
  onSelectGame,
  onSelectMaterial,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-10 md:p-12 text-white shadow-xl shadow-blue-500/15">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-indigo-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Media Belajar Logika Komputasi Siswa SMP</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Belajar Berpikir Seperti Programmer <span className="text-amber-300">Tanpa Kode!</span>
          </h1>

          <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-xl">
            Kembangkan logika, algoritma, dan computational thinking melalui 7 game edukasi interaktif dan 5 materi ringkas yang menyenangkan.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                onNavigate('games');
              }}
              className="py-3 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold rounded-2xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all active:scale-95 text-sm sm:text-base cursor-pointer"
            >
              <Gamepad2 className="w-5 h-5 text-slate-900" />
              <span>Mulai Bermain Game</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigate('materials');
              }}
              className="py-3 px-5 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-2xl backdrop-blur-md border border-white/20 flex items-center gap-2 transition-all active:scale-95 text-sm sm:text-base cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-blue-200" />
              <span>Baca Materi (2 Menit)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Summary Bar */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{progress.totalStars}</p>
            <p className="text-xs text-slate-500 font-medium">Bintang Terkumpul</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{progress.totalCompleted} <span className="text-xs text-slate-400 font-normal">/ 63</span></p>
            <p className="text-xs text-slate-500 font-medium">Level Selesai</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">7 Game</p>
            <p className="text-xs text-slate-500 font-medium">Tantangan Logika</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xl sm:text-2xl font-black text-slate-900">63 Level</p>
            <p className="text-xs text-slate-500 font-medium">Mudah s/d Sulit</p>
          </div>
        </div>
      </section>

      {/* 4 Pilar Computational Thinking */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            4 Pilar Cara Berpikir Komputasi (Computational Thinking)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Keterampilan berpikir yang dilatih melalui game di Coding For Kids:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">1. Decomposition</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Memecah masalah besar dan rumit menjadi bagian-bagian kecil yang lebih mudah dikerjakan.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">2. Pattern Recognition</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Melihat kemiripan atau keteraturan dalam masalah untuk menemukan solusi berulang.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">3. Abstraction</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Fokus pada hal yang penting saja dan mengabaikan detail informasi yang tidak perlu.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-800 text-sm">4. Algorithm Design</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Menyusun urutan langkah demi langkah secara runtut dan teratur untuk menyelesaikan misi.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Games Catalog */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              7 Permainan Logika Interaktif
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Setiap game memiliki 9 level berjenjang (Mudah, Sedang, Sulit)
            </p>
          </div>

          <button
            onClick={() => onNavigate('games')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Lihat Semua Game</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GAMES_DATA.map(game => {
            const Icon = GAME_ICONS[game.iconName] || Gamepad2;
            const percent = calculateGameProgressPercent(game.id, progress);
            const gProgress = progress.gamesProgress[game.id];
            const unlocked = gProgress?.unlockedLevel || 1;

            return (
              <div
                key={game.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-slate-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                        {percent}% Selesai
                      </span>
                      <p className="text-[11px] text-slate-400 mt-1">Level {unlocked} / {game.totalLevels}</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {game.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {game.tagline}
                  </p>

                  <p className="text-xs text-slate-600 mt-2.5 line-clamp-2 leading-relaxed">
                    {game.description}
                  </p>

                  {/* Concept Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {game.concepts.map((c, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress bar and play button */}
                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>

                  <button
                    onClick={() => {
                      sound.playClick();
                      onSelectGame(game.id, unlocked);
                    }}
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Mainkan Level {unlocked}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learning Materials Preview */}
      <section className="bg-slate-100/70 p-6 sm:p-8 rounded-3xl border border-slate-200/80 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              5 Materi Teori Singkat
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Hanya butuh 2–3 menit per materi, disertai contoh kehidupan sehari-hari dan kuis cepat.
            </p>
          </div>

          <button
            onClick={() => onNavigate('materials')}
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Semua Materi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {LEARNING_MATERIALS.map(mat => (
            <div
              key={mat.id}
              onClick={() => {
                sound.playClick();
                onSelectMaterial(mat.id);
              }}
              className="bg-white p-4.5 rounded-2xl border border-slate-200 hover:border-blue-400 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-blue-600">{mat.concept}</span>
                  <span>{mat.readingTimeMinutes} min baca</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">
                  {mat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {mat.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <span className="group-hover:text-blue-600 transition-colors">Buka Pelajaran</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

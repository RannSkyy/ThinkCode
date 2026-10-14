import React from 'react';
import { 
  BookOpen, 
  Clock, 
  Cpu, 
  ListOrdered, 
  Repeat, 
  GitBranch, 
  Bug, 
  ArrowRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { LEARNING_MATERIALS } from '../data/materialsData';
import { sound } from '../utils/sound';

interface MaterialsPageProps {
  onSelectMaterial: (materialId: string) => void;
}

const MATERIAL_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  ListOrdered,
  Repeat,
  GitBranch,
  Bug,
};

export const MaterialsPage: React.FC<MaterialsPageProps> = ({ onSelectMaterial }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Dasar Pemikiran Komputer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          5 Materi Pembelajaran Logika
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Baca teori singkat 2–3 menit per topik sebelum bermain. Dilengkapi analogi dunia nyata dan kuis pemahaman!
        </p>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {LEARNING_MATERIALS.map((mat, index) => {
          const Icon = MATERIAL_ICONS[mat.illustrationIcon] || Cpu;

          return (
            <div
              key={mat.id}
              onClick={() => {
                sound.playClick();
                onSelectMaterial(mat.id);
              }}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{mat.readingTimeMinutes} Menit Baca</span>
                  </div>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  Modul {index + 1}: {mat.concept}
                </span>

                <h2 className="text-lg font-bold text-slate-900 mt-1 group-hover:text-blue-600 transition-colors">
                  {mat.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {mat.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Ada Kuis Singkat</span>
                </span>

                <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  <span>Mulai Membaca</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Motivational Note */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200/80 flex items-center gap-3.5 text-xs text-blue-900">
        <Sparkles className="w-6 h-6 text-blue-600 shrink-0" />
        <p className="leading-relaxed">
          <strong>Tips Belajar:</strong> Kamu tidak perlu menghafal rumus atau sintaks bahasa pemrograman yang rumit! Cukup pahami bagaimana alur urutan logikanya bekerja, lalu uji langsung di menu <strong>Game</strong>.
        </p>
      </div>
    </div>
  );
};

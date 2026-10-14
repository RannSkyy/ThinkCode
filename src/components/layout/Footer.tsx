import React from 'react';
import { Bot, Heart, Sparkles, BookOpen, Gamepad2, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Coding For Kids</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Belajar Berpikir Seperti Programmer Tanpa Menulis Kode. Media pembelajaran interaktif untuk siswa SMP guna melatih logika, algoritma, dan computational thinking.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Aman & Edukatif (100% Offline Tanpa Iklan)</span>
            </div>
          </div>

          {/* Quick Menu */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Navigasi Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Halaman Utama</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('materials')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                  <span>5 Materi Singkat</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('games')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Gamepad2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>7 Permainan Logika</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Riwayat & Rekor</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-blue-400 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Tentang Media Ini</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Focus Targets */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Target Siswa</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                <p className="font-semibold text-slate-200">SMP Kelas 7 - 9</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Usia 12–15 Tahun (Logika, Algoritma & Pemecahan Masalah)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Coding For Kids. Dibuat dengan cinta untuk generasi masa depan.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 mx-0.5" />
            <span>untuk Pendidikan Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

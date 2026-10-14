import React from 'react';
import { 
  Bot, 
  Target, 
  Award, 
  Heart, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  BookOpen, 
  ShieldCheck,
  Smartphone,
  Cpu
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
          <Bot className="w-9 h-9" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Tentang Coding For Kids
        </h1>
        <p className="text-base text-blue-600 font-semibold">
          Belajar Berpikir Seperti Programmer Tanpa Menulis Kode
        </p>
      </div>

      {/* Latar Belakang & Filosofi */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Mengapa Coding For Kids Hadir?
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Banyak siswa di bangku sekolah dasar maupun menengah pertama merasa bahwa belajar pemrograman (coding) itu sulit, membosankan, dan menakutkan karena langsung dihadapkan pada sintaks bahasa pemrograman seperti titik koma, tanda kurung kurawal, dan pesan error berbahasa Inggris yang membingungkan.
        </p>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Padahal, <strong>inti utama dari coding bukanlah sintaks</strong>, melainkan <em>Computational Thinking</em>: kemampuan memecahkan masalah kompleks secara logis, runtut, dan terstruktur. Melalui media interaktif ini, siswa diajak memahami cara berpikir seorang insinyur perangkat lunak melalui 7 jenis permainan logika seru tanpa perlu mengetik kode satu baris pun.
        </p>
      </section>

      {/* 5 Tujuan Utama */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
          5 Tujuan Pembelajaran
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
              1
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Melatih Logika</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Membiasakan anak berpikir runtut dan konsisten dalam merumuskan pemecahan masalah.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
              2
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Mengenalkan Algoritma</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Menyusun langkah terencana dan sistematis dari awal hingga mencapai tujuan akhir.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
              3
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Problem Solving</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Melatih ketelitian dalam menganalisis tantangan dan menemukan rute atau solusi paling optimal.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm mb-3">
              4
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Konsep Coding Inti</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Memahami Sequence, Loop, Percabangan (If-Else), dan Debugging secara visual dan intuitif.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs sm:col-span-2 md:col-span-2">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-sm mb-3">
              5
            </div>
            <h3 className="font-bold text-slate-800 text-sm">Belajar yang Menyenangkan</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Menghilangkan stigma bahwa sains komputer itu menakutkan, mengubahnya menjadi petualangan teka-teki yang menghibur dan menumbuhkan rasa percaya diri.
            </p>
          </div>
        </div>
      </section>

      {/* Target Pengguna */}
      <section className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl space-y-4">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight">
          Target Pengguna
        </h2>

        <div className="pt-2">
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h3 className="font-bold text-base text-cyan-300">SMP Kelas 7 – 9</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fokus pada penguasaan logika komputasi, algoritma pemecahan masalah, efisiensi perulangan (Loop), percabangan kondisi (If-Else), pelacakan bug (Debugging), dan penalaran struktural.
            </p>
          </div>
        </div>
      </section>

      {/* Panduan Guru dan Orang Tua */}
      <section className="bg-blue-50/60 p-6 sm:p-8 rounded-3xl border border-blue-200/80 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-900">
          <Users className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg sm:text-xl font-bold">
            Panduan untuk Guru & Orang Tua
          </h2>
        </div>

        <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Bebas Hambatan Akses:</strong> Aplikasi ini berjalan 100% di browser tanpa perlu login, registrasi akun, instalasi aplikasi rumit, atau koneksi server berbayar.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Cocok untuk Kelas Informatika:</strong> Guru dapat menugaskan siswa membaca 1 materi singkat (2 menit), lalu meminta siswa menuntaskan 3 level awal (tingkat mudah) pada game yang relevan.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Ramah HP & Tablet:</strong> Antarmuka didesain mobile-first dengan tombol sentuh yang besar dan jelas sehingga nyaman digunakan di ponsel pintar siswa maupun tablet sekolah.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Riwayat Otomatis:</strong> Orang tua dapat memantau capaian skor dan bintang anak secara langsung di menu <strong>History</strong>.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

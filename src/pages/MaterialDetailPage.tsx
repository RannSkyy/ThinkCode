import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Gamepad2, 
  Lightbulb, 
  CheckCircle2, 
  AlertCircle, 
  Cpu, 
  ListOrdered, 
  Repeat, 
  GitBranch, 
  Bug,
  HelpCircle
} from 'lucide-react';
import { LEARNING_MATERIALS } from '../data/materialsData';
import { GameId } from '../types';
import { sound } from '../utils/sound';

interface MaterialDetailPageProps {
  materialId: string;
  onBack: () => void;
  onGoToGame: (gameId: GameId) => void;
}

const MATERIAL_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Cpu,
  ListOrdered,
  Repeat,
  GitBranch,
  Bug,
};

export const MaterialDetailPage: React.FC<MaterialDetailPageProps> = ({
  materialId,
  onBack,
  onGoToGame,
}) => {
  const material = LEARNING_MATERIALS.find(m => m.id === materialId) || LEARNING_MATERIALS[0];
  const Icon = MATERIAL_ICONS[material.illustrationIcon] || Cpu;

  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleSelectQuiz = (idx: number) => {
    sound.playClick();
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);

    if (idx === material.quickQuiz.correctAnswerIndex) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
  };

  const isQuizCorrect = selectedQuizAnswer === material.quickQuiz.correctAnswerIndex;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Back button */}
      <button
        onClick={() => {
          sound.playClick();
          onBack();
        }}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Daftar Materi</span>
      </button>

      {/* Main Material Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 sm:p-8 text-white relative">
          <div className="flex items-center justify-between text-xs text-blue-200 mb-2">
            <span className="font-bold uppercase tracking-wider">{material.concept}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{material.readingTimeMinutes} Menit Membaca</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {material.title}
            </h1>
          </div>

          <p className="text-blue-100 text-xs sm:text-sm mt-3 leading-relaxed max-w-xl">
            {material.summary}
          </p>
        </div>

        {/* Content Sections */}
        <div className="p-6 sm:p-8 space-y-8">
          {material.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">
                {sec.heading}
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {sec.content}
              </p>

              {sec.analogy && (
                <div className="bg-blue-50/70 border border-blue-200/80 p-3.5 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                  <span className="text-base shrink-0">💡</span>
                  <div>
                    <strong className="font-bold">Analogi Sehari-hari:</strong>
                    <p className="mt-0.5 text-blue-800">{sec.analogy}</p>
                  </div>
                </div>
              )}

              {sec.codeExample && (
                <div className="bg-slate-900 text-slate-200 p-4 rounded-xl font-mono text-xs whitespace-pre-line border border-slate-800 leading-relaxed">
                  {sec.codeExample}
                </div>
              )}

              {sec.kidTip && (
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Catatan Kecil Programmer:</strong>
                    <p className="mt-0.5 text-amber-800">{sec.kidTip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Quick Quiz Box */}
          <div className="bg-slate-50 border-2 border-slate-200 p-5 sm:p-6 rounded-2xl space-y-4">
            <div className="flex items-center gap-2 text-slate-800">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold uppercase tracking-wider">
                Kuis Cepat: Uji Pemahamanmu!
              </h3>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-900">
              {material.quickQuiz.question}
            </p>

            <div className="space-y-2">
              {material.quickQuiz.options.map((opt, oIdx) => {
                const isSelected = selectedQuizAnswer === oIdx;
                const isCorrectChoice = quizSubmitted && oIdx === material.quickQuiz.correctAnswerIndex;
                const isWrongChoice = quizSubmitted && isSelected && !isQuizCorrect;

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectQuiz(oIdx)}
                    className={`w-full p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all active:scale-[0.99] flex items-center justify-between cursor-pointer ${
                      isCorrectChoice
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-300 font-bold'
                        : isWrongChoice
                        ? 'border-rose-400 bg-rose-50 text-rose-900'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-slate-200 hover:border-blue-300 bg-white text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrectChoice && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                    {isWrongChoice && <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {quizSubmitted && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2 animate-in fade-in ${
                  isQuizCorrect
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 font-medium'
                    : 'bg-rose-50 text-rose-900 border border-rose-200'
                }`}
              >
                {isQuizCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-bold">{isQuizCorrect ? 'Jawaban Benar!' : 'Belum Tepat!'}</p>
                  <p className="mt-0.5">{material.quickQuiz.explanation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Action launcher to recommended game */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div>
              <p className="text-xs text-slate-500 font-medium">Siap Mempraktikkan Teori Ini?</p>
              <p className="text-sm font-bold text-slate-800">
                Uji langsung pemahamanmu di Game yang direkomendasikan!
              </p>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onGoToGame(material.recommendedGameId);
              }}
              className="py-3 px-5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold rounded-xl shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all text-xs sm:text-sm cursor-pointer shrink-0"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Mainkan Game Praktik</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

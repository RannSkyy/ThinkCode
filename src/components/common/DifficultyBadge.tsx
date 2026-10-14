import React from 'react';
import { Difficulty } from '../../types';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  levelNumber?: number;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, levelNumber }) => {
  const config = {
    easy: {
      label: 'Mudah (Easy)',
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
      dot: 'bg-emerald-500',
    },
    medium: {
      label: 'Sedang (Medium)',
      color: 'text-amber-700 bg-amber-50 border-amber-200',
      dot: 'bg-amber-500',
    },
    hard: {
      label: 'Sulit (Hard)',
      color: 'text-rose-700 bg-rose-50 border-rose-200',
      dot: 'bg-rose-500',
    },
  }[difficulty];

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
      {levelNumber !== undefined && (
        <>
          <span className="opacity-50">·</span>
          <span>Level {levelNumber}</span>
        </>
      )}
    </span>
  );
};

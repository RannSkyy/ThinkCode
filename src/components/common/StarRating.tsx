import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  stars: number; // 0, 1, 2, 3
  maxStars?: number;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  stars,
  maxStars = 3,
  size = 'md',
  animated = false,
}) => {
  const iconSize = size === 'sm' ? 16 : size === 'md' ? 22 : 32;

  return (
    <div className="inline-flex items-center gap-1.5" aria-label={`${stars} dari ${maxStars} bintang`}>
      {Array.from({ length: maxStars }).map((_, idx) => {
        const isFilled = idx < stars;
        return (
          <div
            key={idx}
            className={`transition-all duration-300 ${
              animated && isFilled ? 'animate-bounce delay-100' : ''
            }`}
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <Star
              size={iconSize}
              className={`${
                isFilled
                  ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                  : 'fill-slate-200 text-slate-300'
              } transition-colors`}
            />
          </div>
        );
      })}
    </div>
  );
};

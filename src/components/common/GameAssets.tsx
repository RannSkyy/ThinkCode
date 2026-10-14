import React from 'react';
import { MazeDirection } from '../../types';

interface RobotCharacterProps {
  dir?: MazeDirection;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const DIR_ROTATION: Record<MazeDirection, number> = {
  N: 0,
  E: 90,
  S: 180,
  W: 270,
};

export const RobotCharacter: React.FC<RobotCharacterProps> = ({
  dir = 'N',
  size = 'md',
  className = '',
}) => {
  const pixelSize = size === 'sm' ? 26 : size === 'md' ? 34 : 44;
  const rotation = DIR_ROTATION[dir];

  return (
    <div
      className={`relative inline-flex items-center justify-center mx-auto transition-transform duration-300 ${className}`}
      style={{
        width: pixelSize,
        height: pixelSize,
        transform: `rotate(${rotation}deg)`,
      }}
      title="Robot Kiko"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md mx-auto"
      >
        {/* Antenna */}
        <line x1="32" y1="12" x2="32" y2="4" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="4" r="3.5" fill="#EF4444" className="animate-pulse" />

        {/* Ears / Head bolts */}
        <rect x="8" y="20" width="4" height="8" rx="2" fill="#64748B" />
        <rect x="52" y="20" width="4" height="8" rx="2" fill="#64748B" />

        {/* Head */}
        <rect x="12" y="12" width="40" height="26" rx="8" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
        
        {/* Visor / Face Screen */}
        <rect x="16" y="16" width="32" height="18" rx="5" fill="#0F172A" />
        
        {/* Eyes (Friendly glowing cyan) */}
        <circle cx="24" cy="24" r="3.5" fill="#38BDF8" />
        <circle cx="40" cy="24" r="3.5" fill="#38BDF8" />
        <circle cx="25" cy="23" r="1.2" fill="#FFFFFF" />
        <circle cx="41" cy="23" r="1.2" fill="#FFFFFF" />

        {/* Mouth Line */}
        <line x1="28" y1="30" x2="36" y2="30" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />

        {/* Body */}
        <rect x="14" y="39" width="36" height="21" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        
        {/* Chest Panel / Screen */}
        <rect x="20" y="43" width="24" height="12" rx="3" fill="#1E293B" />
        <circle cx="26" cy="49" r="2" fill="#10B981" />
        <circle cx="32" cy="49" r="2" fill="#F59E0B" />
        <circle cx="38" cy="49" r="2" fill="#EF4444" />

        {/* Forward direction arrow tip at top of robot */}
        <path d="M32 9L35 13H29L32 9Z" fill="#FDE047" />
      </svg>
    </div>
  );
};

export const GemAsset: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`animate-bounce ${className}`}>
    <path
      d="M16 2L28 10L16 30L4 10L16 2Z"
      fill="#06B6D4"
      stroke="#0891B2"
      strokeWidth="1.5"
    />
    <path d="M16 2L21 10L16 30L11 10L16 2Z" fill="#22D3EE" opacity="0.8" />
    <path d="M4 10H28" stroke="#CFFAFE" strokeWidth="1.5" />
    <path d="M11 10L16 2L21 10" stroke="#CFFAFE" strokeWidth="1" />
  </svg>
);

export const GoldCoinAsset: React.FC<{ size?: number; className?: string }> = ({ size = 26, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`animate-pulse ${className}`}>
    <circle cx="16" cy="16" r="14" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
    <circle cx="16" cy="16" r="10" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1.5" />
    <text x="16" y="21" textAnchor="middle" fontSize="13" fontWeight="900" fill="#B45309" fontFamily="sans-serif">
      ★
    </text>
  </svg>
);

export const GoalStarAsset: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`animate-spin-slow ${className}`}>
    <defs>
      <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="100%" stopColor="#EAB308" />
      </radialGradient>
    </defs>
    <path
      d="M16 2L20.2 11.2L30.2 12.3L22.8 19.1L24.8 29L16 24L7.2 29L9.2 19.1L1.8 12.3L11.8 11.2L16 2Z"
      fill="url(#starGlow)"
      stroke="#CA8A04"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const WallAsset: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-full h-full bg-slate-700 rounded-lg flex flex-col justify-between p-0.5 border border-slate-600 shadow-inner ${className}`}>
    <div className="flex gap-0.5 h-[30%]">
      <div className="flex-1 bg-slate-600 rounded-xs" />
      <div className="flex-1 bg-slate-600 rounded-xs" />
    </div>
    <div className="flex gap-0.5 h-[30%]">
      <div className="w-1/3 bg-slate-600 rounded-xs" />
      <div className="w-2/3 bg-slate-600 rounded-xs" />
    </div>
    <div className="flex gap-0.5 h-[30%]">
      <div className="flex-1 bg-slate-600 rounded-xs" />
      <div className="flex-1 bg-slate-600 rounded-xs" />
    </div>
  </div>
);

export const HazardAsset: React.FC<{ size?: number; className?: string }> = ({ size = 26, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`animate-pulse ${className}`}>
    <path
      d="M16 2C16 2 20 8 20 13C20 15 19 16 18 17C19 15 19 13 18 11C16 14 13 15 13 19C13 24 17 28 22 28C26 28 29 25 29 20C29 13 23 8 16 2Z"
      fill="#EF4444"
    />
    <path
      d="M16 12C16 12 18 16 18 19C18 20 17.5 21 17 21.5C17.5 20 17.5 19 17 18C15.5 20 14 21 14 23.5C14 26.5 16 28 19 28C21.5 28 23.5 26.5 23.5 24C23.5 19.5 20 16 16 12Z"
      fill="#F59E0B"
    />
    <path
      d="M16 20C16 20 17 22 17 23.5C17 24 16.8 24.5 16.5 24.8C16.8 24 16.8 23.5 16.5 23C15.8 24 15 24.5 15 25.8C15 27 16 28 17.5 28C19 28 20 27 20 25.5C20 23 18 21.5 16 20Z"
      fill="#FEF08A"
    />
  </svg>
);

export const GateAsset: React.FC<{ isUnlocked: boolean; size?: number }> = ({ isUnlocked, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    {isUnlocked ? (
      <>
        <rect x="6" y="14" width="20" height="14" rx="3" fill="#10B981" stroke="#059669" strokeWidth="2" />
        <path d="M11 14V9C11 6.2 13.2 4 16 4C18.8 4 21 6.2 21 9" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="20" r="2" fill="#FFFFFF" />
      </>
    ) : (
      <>
        <rect x="6" y="14" width="20" height="14" rx="3" fill="#E11D48" stroke="#BE123C" strokeWidth="2" />
        <path d="M10 14V9C10 5.7 12.7 3 16 3C19.3 3 22 5.7 22 9V14" stroke="#BE123C" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="16" cy="20" r="2" fill="#FFFFFF" />
        <path d="M16 22V24" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      </>
    )}
  </svg>
);

export const SwitchAsset: React.FC<{ isActive: boolean; size?: number }> = ({ isActive, size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <rect x="4" y="8" width="24" height="16" rx="8" fill={isActive ? '#10B981' : '#64748B'} />
    <circle cx={isActive ? 20 : 12} cy="16" r="6" fill="#FFFFFF" className="transition-all" />
  </svg>
);

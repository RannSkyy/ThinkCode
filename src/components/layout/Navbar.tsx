import React, { useState } from 'react';
import { 
  Bot, 
  BookOpen, 
  Gamepad2, 
  History, 
  Info, 
  Volume2, 
  VolumeX, 
  Music,
  Star,
  Menu,
  X,
  Home
} from 'lucide-react';
import { sound } from '../../utils/sound';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  totalStars: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, totalStars }) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [isMusicOn, setIsMusicOn] = useState(sound.isBgmActive());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
    if (!next) sound.playClick();
    setIsMusicOn(sound.isBgmActive());
  };

  const toggleMusic = () => {
    const next = sound.toggleBgm();
    setIsMusicOn(next);
    if (!next) sound.playClick();
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'materials', label: 'Materi', icon: BookOpen },
    { id: 'games', label: 'Game', icon: Gamepad2 },
    { id: 'history', label: 'History', icon: History },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (route: string) => {
    sound.playClick();
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Coding For Kids
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
              Belajar Logika Tanpa Sintaks
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id === 'games' && currentRoute.startsWith('game/'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'text-blue-600 bg-blue-50/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Side Badges & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Total Stars Counter */}
          <div 
            onClick={() => handleNavClick('history')} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs sm:text-sm font-bold shadow-2xs cursor-pointer hover:bg-amber-100/60 transition-colors"
            title="Total Bintang Kamu"
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{totalStars}</span>
            <span className="text-[11px] font-normal text-amber-700 hidden sm:inline">Bintang</span>
          </div>

          {/* Music Toggle Button */}
          <button
            onClick={toggleMusic}
            aria-label={isMusicOn ? 'Matikan Musik Latar' : 'Nyalakan Musik Latar'}
            className={`w-9 h-9 flex items-center justify-center rounded-xl border transition-colors cursor-pointer ${
              isMusicOn
                ? 'border-indigo-300 bg-indigo-50 text-indigo-600 animate-pulse'
                : 'border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
            }`}
            title={isMusicOn ? 'Musik Latar Ceria Aktif' : 'Nyalakan Musik Latar Ceria'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Aktifkan Suara' : 'Matikan Suara'}
            className="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors cursor-pointer"
            title={isMuted ? 'Suara Dinonaktifkan' : 'Suara Aktif'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-blue-600" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            aria-label="Buka Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-4 space-y-1 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id === 'games' && currentRoute.startsWith('game/'));
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MaterialsPage } from './pages/MaterialsPage';
import { MaterialDetailPage } from './pages/MaterialDetailPage';
import { GamesListPage } from './pages/GamesListPage';
import { GamePlayPage } from './pages/GamePlayPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { GameId, OverallProgress } from './types';
import { loadOverallProgress } from './store/storage';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('algoritma');
  const [selectedGameId, setSelectedGameId] = useState<GameId>('maze');
  const [selectedLevelNumber, setSelectedLevelNumber] = useState<number>(1);
  const [progress, setProgress] = useState<OverallProgress>(loadOverallProgress());

  // Refresh progress state whenever games are completed or reset
  const refreshProgress = () => {
    setProgress(loadOverallProgress());
  };

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (gameId: GameId, levelNumber: number = 1) => {
    setSelectedGameId(gameId);
    setSelectedLevelNumber(levelNumber);
    setCurrentRoute('game-play');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMaterial = (matId: string) => {
    setSelectedMaterialId(matId);
    setCurrentRoute('material-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        totalStars={progress.totalStars}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {currentRoute === 'home' && (
          <HomePage
            progress={progress}
            onNavigate={handleNavigate}
            onSelectGame={handleSelectGame}
            onSelectMaterial={handleSelectMaterial}
          />
        )}

        {currentRoute === 'materials' && (
          <MaterialsPage onSelectMaterial={handleSelectMaterial} />
        )}

        {currentRoute === 'material-detail' && (
          <MaterialDetailPage
            materialId={selectedMaterialId}
            onBack={() => handleNavigate('materials')}
            onGoToGame={(gId) => handleSelectGame(gId, 1)}
          />
        )}

        {currentRoute === 'games' && (
          <GamesListPage
            progress={progress}
            onSelectGame={handleSelectGame}
          />
        )}

        {currentRoute === 'game-play' && (
          <GamePlayPage
            gameId={selectedGameId}
            initialLevelNumber={selectedLevelNumber}
            onExit={() => handleNavigate('games')}
            onGoToGames={() => handleNavigate('games')}
            onGoToHistory={() => handleNavigate('history')}
            onProgressUpdated={refreshProgress}
          />
        )}

        {currentRoute === 'history' && (
          <HistoryPage
            onGoToGames={() => handleNavigate('games')}
            onRefreshData={refreshProgress}
          />
        )}

        {currentRoute === 'about' && <AboutPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

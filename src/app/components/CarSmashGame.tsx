import { useState } from 'react';
import { MainMenu } from './MainMenu';
import { LevelSelect } from './LevelSelect';
import { GamePlay } from './GamePlay';

export type GameScreen = 'menu' | 'levelSelect' | 'game';
export type Environment = 'island' | 'city' | 'snow';

export function CarSmashGame() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const [selectedEnvironment, setSelectedEnvironment] = useState<Environment>('city');

  const handlePlayClick = () => {
    setCurrentScreen('levelSelect');
  };

  const handleLevelSelect = (env: Environment) => {
    setSelectedEnvironment(env);
    setCurrentScreen('game');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('menu');
  };

  const handleBackToLevelSelect = () => {
    setCurrentScreen('levelSelect');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {currentScreen === 'menu' && <MainMenu onPlayClick={handlePlayClick} />}
      {currentScreen === 'levelSelect' && (
        <LevelSelect onLevelSelect={handleLevelSelect} onBack={handleBackToMenu} />
      )}
      {currentScreen === 'game' && (
        <GamePlay
          environment={selectedEnvironment}
          onBack={handleBackToLevelSelect}
        />
      )}
    </div>
  );
}

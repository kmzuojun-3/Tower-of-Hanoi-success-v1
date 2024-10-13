import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react';
import Tower from './components/Tower';
import SettingsModal from './components/SettingsModal';
import { move, isGameWon } from './utils/gameLogic';

const App: React.FC = () => {
  const [disks, setDisks] = useState(3);
  const [towers, setTowers] = useState<number[][]>([]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    resetGame();
  }, [disks]);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const resetGame = () => {
    const initialTowers = [
      Array.from({ length: disks }, (_, i) => disks - i),
      [],
      [],
    ];
    setTowers(initialTowers);
    setSelectedTower(null);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
  };

  const handleTowerClick = (towerIndex: number) => {
    if (!isRunning) return;

    if (selectedTower === null) {
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      const newTowers = move(towers, selectedTower, towerIndex);
      if (newTowers) {
        setTowers(newTowers);
        setMoves((prevMoves) => prevMoves + 1);
        setSelectedTower(null);

        if (isGameWon(newTowers, disks)) {
          setIsRunning(false);
          alert(`恭喜你赢了！用时 ${time} 秒，移动了 ${moves + 1} 步。`);
        }
      } else {
        setSelectedTower(towerIndex);
      }
    }
  };

  const toggleRunning = () => {
    setIsRunning(!isRunning);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">汉诺塔小游戏</h1>
      <div className="mb-4 space-x-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={toggleRunning}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={resetGame}
        >
          <RotateCcw size={20} />
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => setShowSettings(true)}
        >
          <Settings size={20} />
        </button>
      </div>
      <div className="flex justify-center space-x-4 mb-4">
        {towers.map((tower, index) => (
          <Tower
            key={index}
            disks={tower}
            onClick={() => handleTowerClick(index)}
            isSelected={selectedTower === index}
            maxDisks={disks}
          />
        ))}
      </div>
      <div className="text-lg">
        <p>时间: {time} 秒</p>
        <p>步数: {moves}</p>
      </div>
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        disks={disks}
        setDisks={setDisks}
      />
    </div>
  );
};

export default App;
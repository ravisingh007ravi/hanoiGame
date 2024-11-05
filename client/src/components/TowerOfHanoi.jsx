import React, { useState, useEffect, useCallback } from 'react';

const themes = {
  classic: {
    name: 'Classic',
    bg: 'bg-gray-900',
    pole: 'bg-red-500',
    disks: [
      'bg-red-500',      
      'bg-green-400',    
      'bg-pink-300',     
      'bg-yellow-400',   
      'bg-green-400',    
      'bg-pink-200',     
      'bg-green-400',    
      'bg-yellow-300'    
    ],
    controls: 'bg-blue-700 hover:bg-blue-600',
    text: 'text-white'
  },
  neon: {
    name: 'Neon',
    bg: 'bg-black',
    pole: 'bg-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.5)]',
    disks: [
      'bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]',
      'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]',
      'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]',
      'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
      'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]',
      'bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.5)]',
      'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
    ],
    controls: 'bg-purple-600 hover:bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.5)]',
    text: 'text-white'
  }
};

const difficultyLevels = {
  easy: {
    name: 'Easy',
    disks: 3,
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-400',
    shadow: 'shadow-green-500/50',
    animation: 'animate-bounce'
  },
  medium: {
    name: 'Medium',
    disks: 5,
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-400',
    shadow: 'shadow-yellow-500/50',
    animation: 'animate-pulse'
  },
  hard: {
    name: 'Hard',
    disks: 7,
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-400',
    shadow: 'shadow-red-500/50',
    animation: 'animate-ping'
  }
};

const TowerOfHanoi = () => {
  const [difficulty, setDifficulty] = useState(null);
  const [towers, setTowers] = useState([[], [], []]);
  const [moves, setMoves] = useState(0);
  const [draggedDisk, setDraggedDisk] = useState(null);
  const [dragFromTower, setDragFromTower] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [currentTheme] = useState('neon');

  const theme = themes[currentTheme];

  const resetGame = useCallback(() => {
    const numDisks = difficultyLevels[difficulty].disks;
    const initialTowers = [Array.from({ length: numDisks }, (_, i) => numDisks - i), [], []];
    setTowers(initialTowers);
    setMoves(0);
    setStartTime(null);
    setElapsedTime(0);
    setIsComplete(false);
  }, [difficulty]);

  useEffect(() => {
    if (difficulty) {
      resetGame();
    }
  }, [difficulty, resetGame]);

  useEffect(() => {
    let timer;
    if (startTime && !isComplete) {
      timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, isComplete]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateMinimumMoves = (n) => Math.pow(2, n) - 1;

  const handleDragStart = (e, disk, towerIndex) => {
    const tower = towers[towerIndex];
    if (disk !== tower[tower.length - 1]) {
      e.preventDefault();
      return;
    }
    setDraggedDisk(disk);
    setDragFromTower(towerIndex);
    e.dataTransfer.setData('text/plain', disk);
  };

  const handleDragOver = (e, towerIndex) => {
    e.preventDefault();
    if (draggedDisk === null) return;

    const targetTower = towers[towerIndex];
    if (targetTower.length === 0 || targetTower[targetTower.length - 1] > draggedDisk) {
      e.dataTransfer.dropEffect = 'move';
    } else {
      e.dataTransfer.dropEffect = 'none';
    }
  };

  const handleDrop = (e, toTower) => {
    e.preventDefault();
    if (draggedDisk === null || dragFromTower === null) return;

    const newTowers = [...towers];
    const diskToMove = newTowers[dragFromTower][newTowers[dragFromTower].length - 1];
    const targetTower = newTowers[toTower];

    if (targetTower.length === 0 || targetTower[targetTower.length - 1] > diskToMove) {
      newTowers[dragFromTower] = newTowers[dragFromTower].slice(0, -1);
      newTowers[toTower] = [...newTowers[toTower], diskToMove];
      setTowers(newTowers);
      setMoves(moves + 1);

      if (!startTime) {
        setStartTime(Date.now());
      }

      if (toTower === 2 && newTowers[2].length === difficultyLevels[difficulty].disks) {
        setIsComplete(true);
      }
    }

    setDraggedDisk(null);
    setDragFromTower(null);
  };

  if (!difficulty) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen ${theme.bg} ${theme.text}`}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Tower of Hanoi</h1>
          <p className="text-xl opacity-80">Select Difficulty Level</p>
        </div>
        <div className="flex gap-6">
          {Object.entries(difficultyLevels).map(([level, config]) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`
                relative
                ${config.color}
                ${config.hoverColor}
                px-8 py-4
                rounded-lg
                font-bold
                text-white
                transform
                transition-all
                duration-300
                hover:scale-110
                shadow-lg
                ${config.shadow}
              `}
            >
              <div className={`absolute inset-0 ${config.color} opacity-25 ${config.animation}`}></div>
              <span className="relative z-10">{config.name}</span>
              <span className="block text-sm opacity-80">{config.disks} Disks</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center min-h-screen ${theme.bg} ${theme.text} p-8 transition-colors duration-500`}>
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-between mb-8 backdrop-blur-sm bg-white bg-opacity-5 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">Level: {difficultyLevels[difficulty].name}</span>
              <span className="text-opacity-80">Moves: {moves}</span>
              <span className="text-opacity-80">Time: {formatTime(elapsedTime)}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={resetGame}
              className={`px-4 py-1 rounded ${theme.controls} transition-colors duration-300`}
            >
              Restart
            </button>
            <button 
              onClick={() => setDifficulty(null)}
              className={`px-4 py-1 rounded ${theme.controls} transition-colors duration-300`}
            >
              Change Level
            </button>
          </div>
        </div>

        <div className="relative flex justify-around items-end h-96 mb-4">
          {towers.map((tower, towerIndex) => (
            <div 
              key={towerIndex}
              className={`relative flex flex-col-reverse items-center w-32 
                ${draggedDisk !== null && 
                  (towers[towerIndex].length === 0 || towers[towerIndex][towers[towerIndex].length - 1] > draggedDisk)
                  ? 'bg-white bg-opacity-5 rounded transition-all duration-300'
                  : ''
                }`}
              onDragOver={(e) => handleDragOver(e, towerIndex)}
              onDrop={(e) => handleDrop(e, towerIndex)}
            >
              <div className={`absolute w-2 h-80 rounded-t ${theme.pole} transition-colors duration-500`}></div>
              <div className={`w-full h-2 rounded ${theme.pole} transition-colors duration-500`}></div>
              <div className="relative flex flex-col-reverse items-center mb-2">
                {tower.map((disk) => (
                  <div
                    key={disk}
                    draggable={disk === tower[tower.length - 1]}
                    onDragStart={(e) => handleDragStart(e, disk, towerIndex)}
                    className={`h-8 rounded-full transition-all transform
                      ${disk === tower[tower.length - 1] ? 'cursor-move hover:scale-105' : 'cursor-not-allowed'}
                      ${theme.disks[disk]}
                      ${draggedDisk === disk ? 'opacity-50' : 'opacity-100'}`}
                    style={{
                      width: `${40 + disk * 20}px`,
                      marginBottom: '2px'
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-opacity-60">
          <div>
            {isComplete && (
              <span className="text-green-400 font-bold animate-pulse">
                Level Complete! {formatTime(elapsedTime)} and {moves} moves!
              </span>
            )}
          </div>
          <div>
            Minimum Moves: {calculateMinimumMoves(difficultyLevels[difficulty].disks)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TowerOfHanoi;
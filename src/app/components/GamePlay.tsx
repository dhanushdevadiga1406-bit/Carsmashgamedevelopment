import { useEffect, useRef, useState } from 'react';
import { Environment } from './CarSmashGame';

interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  lane: number;
  color: string;
  speed: number;
  health: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
}

interface Projectile {
  x: number;
  y: number;
  speed: number;
  lane: number;
}

interface PowerUp {
  x: number;
  y: number;
  type: 'weapon' | 'shield' | 'boost';
  lane: number;
}

interface GamePlayProps {
  environment: Environment;
  onBack: () => void;
}

export function GamePlay({ environment, onBack }: GamePlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameStateRef = useRef({
    playerLane: 1,
    cars: [] as Car[],
    particles: [] as Particle[],
    projectiles: [] as Projectile[],
    powerUps: [] as PowerUp[],
    score: 0,
    speed: 3,
    frameCount: 0,
    roadOffset: 0,
    playerHealth: 3,
    hasShield: false,
    hasWeapon: false,
    boostActive: false,
    boostTimer: 0,
  });

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 600;
  const LANES = 3;
  const LANE_WIDTH = CANVAS_WIDTH / LANES;
  const CAR_WIDTH = 50;
  const CAR_HEIGHT = 80;

  const carColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#FF8B94', '#A8E6CF'];

  const envConfig = {
    island: {
      name: '🏝️ ISLAND',
      roadColor: '#D2691E',
      lineColor: '#FFD700',
      sideColor: '#8B4513',
      bgGradient: ['#87CEEB', '#40E0D0'],
    },
    city: {
      name: '🏙️ CITY',
      roadColor: '#4a4a4a',
      lineColor: '#FFD700',
      sideColor: '#ffffff',
      bgGradient: ['#FF6B35', '#87CEEB'],
    },
    snow: {
      name: '❄️ SNOW CITY',
      roadColor: '#E0E0E0',
      lineColor: '#4A90E2',
      sideColor: '#B0E0E6',
      bgGradient: ['#D3D3D3', '#ADD8E6'],
    },
  };

  const currentEnv = envConfig[environment];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver) return;

      const state = gameStateRef.current;
      if (e.key === 'ArrowLeft' && state.playerLane > 0) {
        state.playerLane--;
      } else if (e.key === 'ArrowRight' && state.playerLane < LANES - 1) {
        state.playerLane++;
      } else if (e.key === ' ' && state.hasWeapon) {
        // Shoot projectile
        const playerX = state.playerLane * LANE_WIDTH + LANE_WIDTH / 2;
        state.projectiles.push({
          x: playerX,
          y: CANVAS_HEIGHT - CAR_HEIGHT - 70,
          speed: 10,
          lane: state.playerLane,
        });
        state.hasWeapon = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const spawnCar = () => {
      const state = gameStateRef.current;
      const lane = Math.floor(Math.random() * LANES);
      const color = carColors[Math.floor(Math.random() * carColors.length)];

      state.cars.push({
        x: lane * LANE_WIDTH + LANE_WIDTH / 2 - CAR_WIDTH / 2,
        y: -CAR_HEIGHT,
        width: CAR_WIDTH,
        height: CAR_HEIGHT,
        lane,
        color,
        speed: state.speed,
        health: 1,
      });
    };

    const spawnPowerUp = () => {
      const state = gameStateRef.current;
      const lane = Math.floor(Math.random() * LANES);
      const types: ('weapon' | 'shield' | 'boost')[] = ['weapon', 'shield', 'boost'];
      const type = types[Math.floor(Math.random() * types.length)];

      state.powerUps.push({
        x: lane * LANE_WIDTH + LANE_WIDTH / 2,
        y: -20,
        type,
        lane,
      });
    };

    const createSmashParticles = (x: number, y: number, color: string) => {
      const state = gameStateRef.current;
      for (let i = 0; i < 30; i++) {
        const angle = (Math.PI * 2 * i) / 30;
        const speed = 2 + Math.random() * 6;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          color,
          life: 1,
        });
      }
    };

    const drawPowerUp = (ctx: CanvasRenderingContext2D, x: number, y: number, type: string) => {
      ctx.save();
      
      // Rotating effect
      const rotation = (gameStateRef.current.frameCount * 0.05) % (Math.PI * 2);
      ctx.translate(x, y);
      ctx.rotate(rotation);
      
      if (type === 'weapon') {
        // Missile icon
        ctx.fillStyle = '#FF4444';
        ctx.beginPath();
        ctx.roundRect(-15, -15, 30, 30, 8);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.moveTo(-8, 0);
        ctx.lineTo(8, -8);
        ctx.lineTo(8, 8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (type === 'shield') {
        // Shield icon
        ctx.fillStyle = '#44AAFF';
        ctx.beginPath();
        ctx.roundRect(-15, -15, 30, 30, 8);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, -3, 8, 0, Math.PI, true);
        ctx.lineTo(-8, 6);
        ctx.lineTo(0, 10);
        ctx.lineTo(8, 6);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (type === 'boost') {
        // Lightning bolt
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.roundRect(-15, -15, 30, 30, 8);
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.moveTo(-4, -10);
        ctx.lineTo(4, -2);
        ctx.lineTo(0, -2);
        ctx.lineTo(4, 10);
        ctx.lineTo(-4, 2);
        ctx.lineTo(0, 2);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      ctx.restore();
    };

    const drawProjectile = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // Missile
      ctx.fillStyle = '#FF0000';
      ctx.beginPath();
      ctx.ellipse(x, y, 6, 12, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Flame trail
      ctx.fillStyle = '#FFA500';
      ctx.beginPath();
      ctx.arc(x, y + 12, 4, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = '#FFFF00';
      ctx.beginPath();
      ctx.arc(x, y + 15, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawCar = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, isPlayer: boolean = false) => {
      // Car body
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, CAR_WIDTH, CAR_HEIGHT, 8);
      ctx.fill();

      // Car outline
      ctx.strokeStyle = '#000';
      ctx.lineWidth = isPlayer ? 4 : 3;
      ctx.stroke();

      // Windshield
      ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.beginPath();
      ctx.roundRect(x + 8, y + 15, CAR_WIDTH - 16, 25, 5);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Windows
      ctx.fillStyle = 'rgba(100, 200, 255, 0.6)';
      ctx.beginPath();
      ctx.roundRect(x + 8, y + CAR_HEIGHT - 45, CAR_WIDTH - 16, 25, 5);
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Wheels
      ctx.fillStyle = '#1a1a1a';
      const wheelWidth = 12;
      const wheelHeight = 18;

      ctx.beginPath();
      ctx.roundRect(x - 4, y + 10, wheelWidth, wheelHeight, 3);
      ctx.roundRect(x + CAR_WIDTH - 8, y + 10, wheelWidth, wheelHeight, 3);
      ctx.fill();

      ctx.beginPath();
      ctx.roundRect(x - 4, y + CAR_HEIGHT - 28, wheelWidth, wheelHeight, 3);
      ctx.roundRect(x + CAR_WIDTH - 8, y + CAR_HEIGHT - 28, wheelWidth, wheelHeight, 3);
      ctx.fill();

      // Headlights/weapon indicator
      if (isPlayer) {
        ctx.fillStyle = gameStateRef.current.hasWeapon ? '#FF0000' : '#FFFF00';
        ctx.beginPath();
        ctx.arc(x + 12, y + 8, 4, 0, Math.PI * 2);
        ctx.arc(x + CAR_WIDTH - 12, y + 8, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Racing stripes
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.fillRect(x + CAR_WIDTH / 2 - 3, y, 6, CAR_HEIGHT);
      
      // Shield effect for player
      if (isPlayer && gameStateRef.current.hasShield) {
        ctx.strokeStyle = '#44AAFF';
        ctx.lineWidth = 4;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(x + CAR_WIDTH / 2, y + CAR_HEIGHT / 2, CAR_WIDTH / 2 + 10, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    };

    const drawEnvironmentDetails = (ctx: CanvasRenderingContext2D) => {
      const state = gameStateRef.current;
      
      if (environment === 'island') {
        // Draw palm trees on the sides
        for (let i = 0; i < 3; i++) {
          const yPos = (i * 200 - state.roadOffset * 5) % CANVAS_HEIGHT;
          // Left palm
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(-20, yPos, 8, 40);
          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.arc(-16, yPos - 5, 15, 0, Math.PI * 2);
          ctx.fill();
          
          // Right palm
          ctx.fillStyle = '#8B4513';
          ctx.fillRect(CANVAS_WIDTH + 12, yPos, 8, 40);
          ctx.fillStyle = '#228B22';
          ctx.beginPath();
          ctx.arc(CANVAS_WIDTH + 16, yPos - 5, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (environment === 'city') {
        // Draw buildings on the sides
        for (let i = 0; i < 4; i++) {
          const yPos = (i * 150 - state.roadOffset * 3) % CANVAS_HEIGHT;
          // Left building
          ctx.fillStyle = i % 2 === 0 ? '#5A5A5A' : '#3A3A3A';
          ctx.fillRect(-40, yPos, 35, 80);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(-40, yPos, 35, 80);
          
          // Windows
          ctx.fillStyle = '#FFD700';
          for (let w = 0; w < 2; w++) {
            for (let h = 0; h < 3; h++) {
              ctx.fillRect(-35 + w * 12, yPos + 10 + h * 20, 8, 12);
            }
          }
          
          // Right building
          ctx.fillStyle = i % 2 === 0 ? '#4A4A8A' : '#2A2A6A';
          ctx.fillRect(CANVAS_WIDTH + 5, yPos, 35, 80);
          ctx.strokeStyle = '#000';
          ctx.lineWidth = 2;
          ctx.strokeRect(CANVAS_WIDTH + 5, yPos, 35, 80);
          
          // Windows
          ctx.fillStyle = '#87CEEB';
          for (let w = 0; w < 2; w++) {
            for (let h = 0; h < 3; h++) {
              ctx.fillRect(CANVAS_WIDTH + 10 + w * 12, yPos + 10 + h * 20, 8, 12);
            }
          }
        }
      } else if (environment === 'snow') {
        // Draw snowflakes
        ctx.fillStyle = '#FFFFFF';
        for (let i = 0; i < 20; i++) {
          const x = (i * 40) % CANVAS_WIDTH;
          const y = (i * 60 + state.roadOffset * 8) % CANVAS_HEIGHT;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Snow piles on sides
        for (let i = 0; i < 5; i++) {
          const yPos = (i * 120 - state.roadOffset * 4) % CANVAS_HEIGHT;
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.ellipse(-15, yPos, 20, 15, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#B0E0E6';
          ctx.lineWidth = 2;
          ctx.stroke();
          
          ctx.beginPath();
          ctx.ellipse(CANVAS_WIDTH + 15, yPos, 20, 15, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#B0E0E6';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    };

    const drawRoad = (ctx: CanvasRenderingContext2D) => {
      const state = gameStateRef.current;

      // Road background
      ctx.fillStyle = currentEnv.roadColor;
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw environment details
      drawEnvironmentDetails(ctx);

      // Lane dividers
      ctx.strokeStyle = currentEnv.lineColor;
      ctx.lineWidth = 4;
      ctx.setLineDash([20, 20]);

      for (let i = 1; i < LANES; i++) {
        ctx.beginPath();
        ctx.moveTo(i * LANE_WIDTH, -state.roadOffset);
        ctx.lineTo(i * LANE_WIDTH, CANVAS_HEIGHT + 40);
        ctx.stroke();
      }

      ctx.setLineDash([]);

      // Side lines
      ctx.strokeStyle = currentEnv.sideColor;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, CANVAS_HEIGHT);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH, 0);
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.stroke();

      state.roadOffset = (state.roadOffset + state.speed * 2) % 40;
    };

    const checkCollision = (car1: Car, x2: number, y2: number, w2: number, h2: number) => {
      return (
        car1.x < x2 + w2 &&
        car1.x + car1.width > x2 &&
        car1.y < y2 + h2 &&
        car1.y + car1.height > y2
      );
    };

    const gameLoop = () => {
      if (!ctx || gameOver || !gameStarted) return;

      const state = gameStateRef.current;
      state.frameCount++;

      // Spawn cars
      if (state.frameCount % 80 === 0) {
        spawnCar();
      }

      // Spawn power-ups
      if (state.frameCount % 200 === 0) {
        spawnPowerUp();
      }

      // Increase difficulty
      if (state.frameCount % 500 === 0 && state.speed < 8) {
        state.speed += 0.5;
      }

      // Clear canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw road
      drawRoad(ctx);

      // Update and draw enemy cars
      const playerX = state.playerLane * LANE_WIDTH + LANE_WIDTH / 2 - CAR_WIDTH / 2;
      const playerY = CANVAS_HEIGHT - CAR_HEIGHT - 50;

      state.cars = state.cars.filter((car) => {
        car.y += car.speed;

        // Check collision with player
        if (checkCollision(car, playerX, playerY, CAR_WIDTH, CAR_HEIGHT)) {
          createSmashParticles(playerX + CAR_WIDTH / 2, playerY + CAR_HEIGHT / 2, car.color);
          setGameOver(true);
          return false;
        }

        // Remove off-screen cars and add score
        if (car.y > CANVAS_HEIGHT) {
          state.score += 10;
          setScore(state.score);
          return false;
        }

        drawCar(ctx, car.x, car.y, car.color);
        return true;
      });

      // Update and draw particles
      state.particles = state.particles.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.3;
        particle.life -= 0.02;

        if (particle.life > 0) {
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = particle.life;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
          return true;
        }
        return false;
      });

      // Update and draw power-ups
      state.powerUps = state.powerUps.filter((powerUp) => {
        powerUp.y += 5;

        // Check collision with player
        if (checkCollision({ x: playerX, y: playerY, width: CAR_WIDTH, height: CAR_HEIGHT, lane: state.playerLane, color: '#FF3366', speed: 0, health: 0 }, powerUp.x - 15, powerUp.y - 15, 30, 30)) {
          if (powerUp.type === 'weapon') {
            state.hasWeapon = true;
          } else if (powerUp.type === 'shield') {
            state.hasShield = true;
          } else if (powerUp.type === 'boost') {
            state.boostActive = true;
            state.boostTimer = 100;
          }
          return false;
        }

        // Remove off-screen power-ups
        if (powerUp.y > CANVAS_HEIGHT) {
          return false;
        }

        drawPowerUp(ctx, powerUp.x, powerUp.y, powerUp.type);
        return true;
      });

      // Update and draw projectiles
      state.projectiles = state.projectiles.filter((projectile) => {
        projectile.y -= projectile.speed;

        // Check collision with cars
        for (let i = 0; i < state.cars.length; i++) {
          const car = state.cars[i];
          if (checkCollision(car, projectile.x - 6, projectile.y - 12, 12, 24)) {
            createSmashParticles(car.x + CAR_WIDTH / 2, car.y + CAR_HEIGHT / 2, car.color);
            state.cars.splice(i, 1);
            state.score += 50;
            setScore(state.score);
            return false;
          }
        }

        // Remove off-screen projectiles
        if (projectile.y < 0) {
          return false;
        }

        drawProjectile(ctx, projectile.x, projectile.y);
        return true;
      });

      // Draw player car
      drawCar(ctx, playerX, playerY, '#FF3366', true);
    };

    let animationId: number;
    const animate = () => {
      gameLoop();
      animationId = requestAnimationFrame(animate);
    };

    if (gameStarted) {
      animate();
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, [gameOver, gameStarted, environment, currentEnv]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    gameStateRef.current = {
      playerLane: 1,
      cars: [],
      particles: [],
      projectiles: [],
      powerUps: [],
      score: 0,
      speed: 3,
      frameCount: 0,
      roadOffset: 0,
      playerHealth: 3,
      hasShield: false,
      hasWeapon: false,
      boostActive: false,
      boostTimer: 0,
    };
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Environment Title */}
      <div className="text-center">
        <h2 
          className="text-5xl font-black text-white mb-2"
          style={{ textShadow: '4px 4px 0 #000' }}
        >
          {currentEnv.name}
        </h2>
      </div>

      <div 
        className="rounded-3xl p-6 shadow-2xl border-6 border-black"
        style={{ 
          background: `linear-gradient(to bottom, ${currentEnv.bgGradient[0]}, ${currentEnv.bgGradient[1]})` 
        }}
      >
        {/* Score Display */}
        <div className="bg-white rounded-2xl p-4 mb-4 border-4 border-black">
          <div className="text-4xl font-black text-gray-800 text-center">
            SCORE: {score}
          </div>
        </div>

        {/* Game Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={600}
            className="border-8 border-black rounded-xl shadow-2xl"
          />

          {!gameStarted && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <button
                  onClick={startGame}
                  className="group relative mb-6"
                >
                  <div className="absolute inset-0 bg-black rounded-3xl transform translate-y-2"></div>
                  <div className="relative bg-gradient-to-b from-green-400 to-green-600 text-white text-4xl font-black px-16 py-8 rounded-3xl border-6 border-black shadow-2xl transform transition-all group-hover:-translate-y-1 group-hover:scale-105">
                    START RACE
                  </div>
                </button>
                <div className="mt-4 text-white text-xl font-black bg-black bg-opacity-60 px-6 py-4 rounded-2xl border-4 border-white space-y-2">
                  <p>⬅️ ➡️ MOVE CAR</p>
                  <p>SPACEBAR 🚀 SHOOT</p>
                  <p>💥 SMASH ENEMIES!</p>
                </div>
              </div>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center rounded-xl">
              <div className="text-center">
                <div 
                  className="text-7xl font-black text-red-500 mb-4"
                  style={{ textShadow: '4px 4px 0 #000' }}
                >
                  💥 SMASH! 💥
                </div>
                <div className="text-5xl font-black text-white mb-8 bg-black bg-opacity-60 px-8 py-4 rounded-2xl border-4 border-white">
                  SCORE: {score}
                </div>
                <button
                  onClick={restartGame}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-black rounded-3xl transform translate-y-2"></div>
                  <div className="relative bg-gradient-to-b from-yellow-400 to-orange-500 text-white text-3xl font-black px-12 py-6 rounded-3xl border-6 border-black shadow-2xl transform transition-all group-hover:-translate-y-1 group-hover:scale-105">
                    🔄 TRY AGAIN
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={onBack}
            className="group relative"
          >
            <div className="absolute inset-0 bg-black rounded-2xl transform translate-y-1"></div>
            <div className="relative bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white text-xl font-black px-8 py-3 rounded-2xl border-4 border-black shadow-xl transform transition-all group-hover:-translate-y-1">
              ← CHANGE TRACK
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
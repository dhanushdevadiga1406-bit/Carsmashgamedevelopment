interface MainMenuProps {
  onPlayClick: () => void;
}

export function MainMenu({ onPlayClick }: MainMenuProps) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {/* Game Title */}
      <div className="mb-12 animate-bounce">
        <div className="relative inline-block">
          {/* Shadow layers */}
          <h1 
            className="text-8xl md:text-9xl font-black absolute top-2 left-2 text-red-600"
            style={{ WebkitTextStroke: '3px #000' }}
          >
            CAR SMASH
          </h1>
          <h1 
            className="text-8xl md:text-9xl font-black absolute top-1 left-1 text-blue-600"
            style={{ WebkitTextStroke: '3px #000' }}
          >
            CAR SMASH
          </h1>
          {/* Main title */}
          <h1 
            className="relative text-8xl md:text-9xl font-black text-yellow-400"
            style={{ 
              WebkitTextStroke: '4px #000',
              textShadow: '6px 6px 0 #000'
            }}
          >
            CAR SMASH
          </h1>
        </div>
        <div className="text-3xl font-black text-white mt-4" style={{ textShadow: '3px 3px 0 #000' }}>
          🏎️ EXTREME RACING 🏎️
        </div>
      </div>

      {/* Decorative Cars */}
      <div className="flex justify-center gap-8 mb-12">
        <div className="transform -rotate-12 animate-pulse">
          <div className="w-24 h-32 bg-red-500 rounded-2xl border-4 border-black shadow-xl relative">
            <div className="absolute top-6 left-2 right-2 h-10 bg-cyan-300 rounded-lg border-2 border-black opacity-70"></div>
            <div className="absolute -left-2 top-8 w-4 h-8 bg-black rounded"></div>
            <div className="absolute -right-2 top-8 w-4 h-8 bg-black rounded"></div>
            <div className="absolute -left-2 bottom-12 w-4 h-8 bg-black rounded"></div>
            <div className="absolute -right-2 bottom-12 w-4 h-8 bg-black rounded"></div>
          </div>
        </div>
        <div className="transform rotate-12 animate-pulse delay-100">
          <div className="w-24 h-32 bg-blue-500 rounded-2xl border-4 border-black shadow-xl relative">
            <div className="absolute top-6 left-2 right-2 h-10 bg-cyan-300 rounded-lg border-2 border-black opacity-70"></div>
            <div className="absolute -left-2 top-8 w-4 h-8 bg-black rounded"></div>
            <div className="absolute -right-2 top-8 w-4 h-8 bg-black rounded"></div>
            <div className="absolute -left-2 bottom-12 w-4 h-8 bg-black rounded"></div>
            <div className="absolute -right-2 bottom-12 w-4 h-8 bg-black rounded"></div>
          </div>
        </div>
      </div>

      {/* Play Button */}
      <button
        onClick={onPlayClick}
        className="group relative mb-8"
      >
        <div className="absolute inset-0 bg-black rounded-3xl transform translate-y-2"></div>
        <div className="relative bg-gradient-to-b from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white text-5xl font-black px-20 py-8 rounded-3xl border-8 border-black shadow-2xl transform transition-all group-hover:-translate-y-1 group-hover:scale-105">
          <div className="flex items-center gap-4">
            <span>▶</span>
            <span>PLAY GAME</span>
          </div>
        </div>
      </button>

      {/* Info Box */}
      <div className="bg-white rounded-3xl border-6 border-black p-8 shadow-2xl">
        <h2 className="text-3xl font-black text-gray-800 mb-4">🎮 HOW TO PLAY</h2>
        <div className="space-y-3 text-xl font-bold text-gray-700">
          <p>⬅️ ➡️ Use Arrow Keys to Move</p>
          <p>🚗 Dodge All Traffic</p>
          <p>⭐ Score Points to Win</p>
          <p>🌍 Race in Different Worlds!</p>
        </div>
      </div>
    </div>
  );
}
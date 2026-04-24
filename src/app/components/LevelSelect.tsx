import { Environment } from './CarSmashGame';

interface LevelSelectProps {
  onLevelSelect: (env: Environment) => void;
  onBack: () => void;
}

export function LevelSelect({ onLevelSelect, onBack }: LevelSelectProps) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Title */}
      <h2 
        className="text-7xl font-black text-white text-center mb-12"
        style={{ textShadow: '5px 5px 0 #000' }}
      >
        🗺️ SELECT YOUR TRACK 🗺️
      </h2>

      {/* Level Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Island Track */}
        <button
          onClick={() => onLevelSelect('island')}
          className="group relative"
        >
          <div className="absolute inset-0 bg-black rounded-3xl transform translate-y-2"></div>
          <div className="relative bg-gradient-to-b from-yellow-300 to-yellow-500 rounded-3xl border-6 border-black overflow-hidden transform transition-all group-hover:-translate-y-2 group-hover:scale-105">
            {/* Island Scene */}
            <div className="h-64 bg-gradient-to-b from-sky-400 to-cyan-300 relative overflow-hidden">
              {/* Sun */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-yellow-400 rounded-full border-4 border-orange-400"></div>
              {/* Island */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-yellow-600 rounded-t-full border-4 border-black">
                {/* Palm Tree */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2">
                  <div className="w-3 h-16 bg-amber-800 border-2 border-black"></div>
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-green-600 rounded-full border-2 border-black"></div>
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-2 border-black"></div>
                </div>
              </div>
              {/* Waves */}
              <div className="absolute bottom-24 left-0 right-0 h-8 bg-blue-400 opacity-60"></div>
              <div className="absolute bottom-20 left-0 right-0 h-8 bg-blue-300 opacity-40"></div>
            </div>
            <div className="p-6 bg-yellow-200 border-t-4 border-black">
              <h3 className="text-3xl font-black text-gray-800">🏝️ ISLAND</h3>
              <p className="text-lg font-bold text-gray-600">Tropical Paradise</p>
            </div>
          </div>
        </button>

        {/* City Track */}
        <button
          onClick={() => onLevelSelect('city')}
          className="group relative"
        >
          <div className="absolute inset-0 bg-black rounded-3xl transform translate-y-2"></div>
          <div className="relative bg-gradient-to-b from-blue-300 to-blue-500 rounded-3xl border-6 border-black overflow-hidden transform transition-all group-hover:-translate-y-2 group-hover:scale-105">
            {/* City Scene */}
            <div className="h-64 bg-gradient-to-b from-orange-300 to-sky-400 relative overflow-hidden">
              {/* Buildings */}
              <div className="absolute bottom-0 left-4 w-16 h-40 bg-gray-600 border-4 border-black">
                <div className="grid grid-cols-2 gap-1 p-2">
                  <div className="w-4 h-4 bg-yellow-300 border border-black"></div>
                  <div className="w-4 h-4 bg-yellow-300 border border-black"></div>
                  <div className="w-4 h-4 bg-yellow-300 border border-black"></div>
                  <div className="w-4 h-4 bg-yellow-300 border border-black"></div>
                </div>
              </div>
              <div className="absolute bottom-0 left-24 w-20 h-56 bg-blue-900 border-4 border-black">
                <div className="grid grid-cols-3 gap-1 p-2">
                  <div className="w-4 h-4 bg-cyan-300 border border-black"></div>
                  <div className="w-4 h-4 bg-cyan-300 border border-black"></div>
                  <div className="w-4 h-4 bg-cyan-300 border border-black"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-4 w-24 h-48 bg-red-800 border-4 border-black">
                <div className="grid grid-cols-3 gap-1 p-2">
                  <div className="w-4 h-4 bg-orange-300 border border-black"></div>
                  <div className="w-4 h-4 bg-orange-300 border border-black"></div>
                  <div className="w-4 h-4 bg-orange-300 border border-black"></div>
                </div>
              </div>
              {/* Road */}
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-700 border-t-4 border-yellow-400"></div>
            </div>
            <div className="p-6 bg-blue-200 border-t-4 border-black">
              <h3 className="text-3xl font-black text-gray-800">🏙️ CITY</h3>
              <p className="text-lg font-bold text-gray-600">Downtown Rush</p>
            </div>
          </div>
        </button>

        {/* Snow City Track */}
        <button
          onClick={() => onLevelSelect('snow')}
          className="group relative"
        >
          <div className="absolute inset-0 bg-black rounded-3xl transform translate-y-2"></div>
          <div className="relative bg-gradient-to-b from-cyan-200 to-blue-300 rounded-3xl border-6 border-black overflow-hidden transform transition-all group-hover:-translate-y-2 group-hover:scale-105">
            {/* Snow City Scene */}
            <div className="h-64 bg-gradient-to-b from-gray-300 to-blue-200 relative overflow-hidden">
              {/* Snowflakes */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-white rounded-full border-2 border-blue-300"></div>
              <div className="absolute top-16 right-12 w-3 h-3 bg-white rounded-full border-2 border-blue-300"></div>
              <div className="absolute top-12 left-24 w-3 h-3 bg-white rounded-full border-2 border-blue-300"></div>
              {/* Snowy Buildings */}
              <div className="absolute bottom-0 left-4 w-16 h-36 bg-purple-900 border-4 border-black">
                <div className="absolute -top-4 left-0 right-0 h-6 bg-white rounded-t-lg border-4 border-black"></div>
                <div className="grid grid-cols-2 gap-1 p-2 mt-2">
                  <div className="w-4 h-4 bg-yellow-200 border border-black"></div>
                  <div className="w-4 h-4 bg-yellow-200 border border-black"></div>
                </div>
              </div>
              <div className="absolute bottom-0 right-8 w-20 h-48 bg-cyan-900 border-4 border-black">
                <div className="absolute -top-4 left-0 right-0 h-6 bg-white rounded-t-lg border-4 border-black"></div>
                <div className="grid grid-cols-2 gap-1 p-2 mt-2">
                  <div className="w-4 h-4 bg-blue-200 border border-black"></div>
                  <div className="w-4 h-4 bg-blue-200 border border-black"></div>
                </div>
              </div>
              {/* Snow on ground */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t-4 border-blue-400">
                <div className="flex gap-4 p-2">
                  <div className="w-8 h-8 bg-gray-400 rounded-full border-2 border-black"></div>
                  <div className="w-6 h-6 bg-gray-400 rounded-full border-2 border-black mt-1"></div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-cyan-100 border-t-4 border-black">
              <h3 className="text-3xl font-black text-gray-800">❄️ SNOW CITY</h3>
              <p className="text-lg font-bold text-gray-600">Frozen Streets</p>
            </div>
          </div>
        </button>
      </div>

      {/* Back Button */}
      <div className="text-center">
        <button
          onClick={onBack}
          className="group relative"
        >
          <div className="absolute inset-0 bg-black rounded-2xl transform translate-y-1"></div>
          <div className="relative bg-gradient-to-b from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white text-2xl font-black px-12 py-4 rounded-2xl border-4 border-black shadow-xl transform transition-all group-hover:-translate-y-1">
            ← BACK TO MENU
          </div>
        </button>
      </div>
    </div>
  );
}

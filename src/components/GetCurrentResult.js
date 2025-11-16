export const revalidate = 30; // ISR every 30s

import { getCurrentDay } from "@/lib/data/freeAd";

export default async function CurrentResult({ resultOrder }) {
  const data = await getCurrentDay();

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
        <h1 className="text-lg text-gray-400 animate-pulse">Wait...</h1>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good Morning!";
    if (hour < 18) return "☀️ Good Afternoon!";
    if (hour < 21) return "🌆 Good Evening!";
    return "🌙 Good Night!";
  };

  const sortedKeys = Object.keys(resultOrder)
    .filter((key) => resultOrder[key]?.isVerified)
    .sort((a, b) => resultOrder[a].order - resultOrder[b].order);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      {/* Greeting */}
      <h1 className="text-3xl font-semibold mb-6 tracking-wide text-cyan-400 drop-shadow-lg">
        {getGreeting()}
      </h1>

      {/* Result Cards */}
      <div className="w-full max-w-xl space-y-5">
        {sortedKeys.map((key) => (
          <div
            key={key}
            className="
              flex justify-between items-center
              p-5 rounded-2xl relative overflow-hidden
              bg-gradient-to-br from-neutral-900 to-black
              border border-cyan-800/30 shadow-[0_0_15px_rgba(0,255,255,0.15)]
              backdrop-blur-xl
              hover:shadow-[0_0_25px_rgba(0,255,255,0.35)]
              transition-all duration-300
            "
          >
            {/* Card Glow Line */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-400 opacity-40 blur-sm"></div>

            {/* Left Name */}
            <span className="text-xl font-bold tracking-wider uppercase text-cyan-300">
              {resultOrder[key].name}
            </span>

            {/* Right Value */}
            <span
              className="
                text-4xl font-extrabold tracking-widest 
                text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]
              "
            >
              {data[key] === null ? (
                <span className="text-red-400 text-2xl animate-pulse">
                  Wait...
                </span>
              ) : (
                data[key]
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

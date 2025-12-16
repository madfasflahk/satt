import IndianDigitalClock from "./Clock";

export async function getCurrentDay() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}currentDay`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
   
    if (response.status === 404) {
      const data = await response.json();
      return { success: false, message: data.message };
    }

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        `API Error: ${response.status} ${response.statusText} - ${errorBody}`
      );
      return { success: false, message: "Something went wrong" };
    }

    const data = await response.json();
    return { success: true, data: data };
  } catch (error) {
    console.error("Error in getCurrentDay:", error);
    return {
      success: false,
      message: "Network or Server error",
    };
  }
}

export default async function CurrentResult({ resultOrder }) {
  const data = await getCurrentDay();

  if (!data || !data.success) {
    return (
      <div className="min-h-screen bg-black text-white p-6 flex justify-center items-center">
        <h1 className="text-lg text-gray-400 animate-pulse">Wait...</h1>
      </div>
    );
  }

  const apiData = data.data || {};

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "🌅 Good Morning!";
    if (hour < 18) return "☀️ Good Afternoon!";
    if (hour < 21) return "🌆 Good Evening!";
    return "🌙 Good Night!";
  };

  // Format current date and time for digital clock
  const getCurrentDateTime = () => {
    const now = new Date();
    return {
      time: now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
      }),
      date: now.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric'
      }),
      year: now.getFullYear()
    };
  };

  // ⭐ FILTER + SORT
  const sortedKeys = Object.keys(resultOrder)
    .filter((key) => resultOrder[key]?.isVerified)
    .sort((a, b) => resultOrder[a].order - resultOrder[b].order);

  const currentDateTime = getCurrentDateTime();

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      {/* Header with Greeting and Digital Clock */}
      <div className="w-full max-w-xl mb-8 text-center">
        {/* <h1 className="text-3xl font-semibold mb-4 tracking-wide text-cyan-400 drop-shadow-lg">
          {getGreeting()}
        </h1> */}
        
       <IndianDigitalClock />
      </div>

      {/* Results Grid */}
      <div className="w-full max-w-xl space-y-5">
        {sortedKeys.map((key) => {
          const value = apiData[key];
          const displayValue = value !== undefined && value !== null 
            ? value 
            : "Wait...";

          return (
            <div
              key={key}
              className="flex justify-between items-center p-5 rounded-2xl relative overflow-hidden
                         bg-gradient-to-br from-neutral-900 to-black border border-cyan-800/30 
                         shadow-[0_0_15px_rgba(0,255,255,0.15)] backdrop-blur-xl 
                         hover:shadow-[0_0_25px_rgba(0,255,255,0.35)] transition-all duration-300"
            >
              <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-400 opacity-40 blur-sm"></div>

              <span className="text-xl font-bold tracking-wider uppercase text-cyan-300">
                {resultOrder[key].name}
              </span>

              <span className={`text-4xl font-extrabold tracking-widest 
                               ${displayValue === "Wait..." 
                                 ? "text-amber-400 animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" 
                                 : "text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)]"
                               }`}>
                {displayValue}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
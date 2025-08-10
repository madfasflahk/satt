import axios from 'axios';

const getCurrentResult = async (url) => {
  try {
    const response = await axios.get(url, {
      params: { cache: 'no-cache' },
      headers: { 'Content-Type': 'application/json' }
    });

    const responseData = response.data;
    if (!responseData || responseData.status !== "success" || !responseData.result) {
     return []
    }
    return responseData;
  } catch (error) {
    console.error('Error in getCurrentResult:', error);
    throw error;
  }
};

const getKolkataGreeting = () => {
  const now = new Date().getHours();
  
  if (now < 12) return 'GOOD MORNING';
  if (now < 16) return 'GOOD AFTERNOON';
  if (now < 21) return 'GOOD EVENING';


  return 'GOOD NIGHT';
};

const GetCurrentResult = async () => {
  const currentDayChart = await getCurrentResult(
    `${process.env.NEXT_PUBLIC_API_URL}/result/currentTDate`
  );

  // Filter and format the results
  const filteredResults = currentDayChart?.result 
    ? Object.entries(currentDayChart.result)
        .filter(([key, value]) => 
          !['_id', 'day', 'DateTime'].includes(key) && 
          value !== null
        )
        .map(([key, value]) => ({
          name: key.replace(/([A-Z])/g, ' $1').toUpperCase(),
          value: value
        }))
    : [];

  const greeting = getKolkataGreeting();
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600 mb-2">NEW DELHI BAZAR SATTA</h1>
        <h2 className="text-xl font-semibold text-blue-600">Satta King Live Result</h2>
      </div>

      {/* Results with animation */}
      <div className="space-y-4">
        <div className="text-center py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 animate-pulse">
          <p className="text-lg font-bold">{greeting}</p>
        </div>

        {filteredResults.map((item, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white shadow-lg rounded-lg p-4 border-l-4 border-red-500"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">{item.name}</span>
              <div className="relative">
                <span className="absolute right-12 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                  {item.name.at(0)}
                </span>
                <span className="text-xl font-bold text-red-600 z-10 relative">LIVE</span>
              </div>
            </div>
            
            <div className="mt-2 flex justify-between items-center">
              <span className="text-gray-600">RESULT</span>
              <div className="relative">
                <span className="text-3xl font-bold text-blue-700">{item.value}</span>
              </div>
            </div>
          </div>
        ))}

        
      </div>

      
    </div>
  );
};

export default GetCurrentResult;
import ResultDisplay from '../../components/ResultDisplay';

const GetResultOrder = async () => {
  const res = await fetch(`https://satt-mu.vercel.app/api/v1/resultOrder`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    next: { revalidate: 120 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch result order');
  }

  const data = await res.json();
  return data;
}

const getYearlyData = async (year) => {
  const response = await fetch(`https://satt-mu.vercel.app/api/v1/result?year=${year}`, { cache: 'no-store' });
  if (!response.ok) {
    // Return null or an empty array to indicate no data
    return null;
  }
  return response.json();
};

const processSingleResult = (result, orderConfig) => {
    const validOrderConfig = Array.isArray(orderConfig) ? orderConfig : [];

    if (!result || validOrderConfig.length === 0) {
        return {};
    }

    const processed = {};
    const verifiedGames = validOrderConfig.filter(game => game.isVerified);

    verifiedGames.sort((a, b) => a.order - b.order);

    verifiedGames.forEach(game => {
        if (result.hasOwnProperty(game.key)) {
            processed[game.key] = result[game.key];
        }
    });

    return processed;
};

const YearPage = async ({ params }) => {
  const year = params.year;
  const resultOrder = await GetResultOrder();
  const yearlyData = await getYearlyData(year);

  const monthsArray = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  if (!yearlyData || yearlyData.length === 0) {
    return (
      <div className="text-center min-h-[85vh] flex items-center justify-center">
        <h2 className="text-2xl font-bold">No data found for the year {year}</h2>
      </div>
    );
  }

  const processedData = yearlyData.map(monthData => {
      const processedResultList = monthData.resultList.map(result => processSingleResult(result, resultOrder));
      return { ...monthData, resultList: processedResultList };
  });

  return (
    <div className="container max-w-6xl mx-auto mt-8 mb-8 px-4">
      {processedData.sort((a, b) => a.month - b.month).map((item, index) => (
        <div key={index} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-bold text-center mb-4">
              SATTA KING {monthsArray[item.month - 1].toUpperCase()} RECORD CHART {item.year}
            </h3>
            <ResultDisplay data={item} resultOrder={resultOrder} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default YearPage;

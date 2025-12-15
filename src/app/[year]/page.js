import ResultDisplay from '../../components/ResultDisplay';

const GetResultOrder = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}resultOrder`, {
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
};

const getYearlyData = async (year) => {

    if(Number(year)===NaN) return null;
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}result?year=${year}`,
        { cache: 'no-store' }
    );
    if (!response.ok) return null;
    
    return response.json();
};

// FIX: Convert order object → array before processing
const normalizeOrder = (orderObj) => {
    if (!orderObj || typeof orderObj !== "object") return [];
    return Object.entries(orderObj).map(([key, value]) => ({
        key,
        ...value,
    }));
};

const processSingleResult = (result, orderArr) => {
    if (!result || !Array.isArray(orderArr)) return {};

    const verifiedGames = orderArr.filter(g => g.isVerified);
    verifiedGames.sort((a, b) => a.order - b.order);

    const processed = {};
    verifiedGames.forEach(game => {
        processed[game.key] = result[game.key] || null;
    });

    return processed;
};

const YearPage = async ({ params }) => {
    const { year } = await params;   // ✅ FIXED
    const resultOrder = await GetResultOrder();

    const normalizedOrder = normalizeOrder(resultOrder);

    const yearlyData = await getYearlyData(year);

    if (!yearlyData || yearlyData.length === 0) {
        return (
            <div className="text-center min-h-[85vh] flex items-center justify-center">
                <h2 className="text-2xl font-bold">
                    No data found for the year {year}
                </h2>
            </div>
        );
    }

    // FIX: Process each month
    const processedData = yearlyData.map((monthData) => {
        const processedList = monthData.resultList.map((r) =>
            processSingleResult(r, normalizedOrder)
        );
        return { ...monthData, resultList: processedList };
    });

    const monthsArray = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return (
        <div className="container max-w-6xl mx-auto mt-8 mb-8 px-4 ">
            {processedData
                .sort((a, b) => a.month - b.month)
                .map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="mb-8 bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-center mb-4">
                                    SATTA KING {monthsArray[item.month - 1].toUpperCase()} RECORD
                                    CHART {item.year}
                                </h3>

                                {/* Pass month-wise processed data to ResultDisplay */}
                                <ResultDisplay data={item} resultOrder={resultOrder} />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default YearPage;

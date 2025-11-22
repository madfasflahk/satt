// components/CurrentDay.js
import React from 'react';
import ResultDisplay from './ResultDisplay';
import YearMonthSelector from './YearMonthSelector';

const normalizeOrderConfig = (orderObj) => {
    if (!orderObj || typeof orderObj !== "object") return [];
    return Object.keys(orderObj).map(key => ({
        key,
        ...orderObj[key]
    }));
};

const processSingleResult = (result, orderConfig) => {
    if (!result || !Array.isArray(orderConfig) || orderConfig.length === 0) {
        return result;
    }

    const processed = { ...result };
    const verifiedGames = orderConfig
        .filter(g => g.isVerified)
        .sort((a, b) => a.order - b.order);

    Object.keys(result).forEach((key) => {
        const exists = verifiedGames.find(g => g.key === key);
        if (!exists && key !== "day" && key !== "DateTime" && key !== "_id") {
            delete processed[key];
        }
    });

    return processed;
};

// Remove "use client" and make it async
const CurrentDay = async ({ resultOrder }) => {
    // Fetch data on server
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    try {
        const res = await fetch(`https://satt-mu.vercel.app/api/v1/result?year=${year}&month=${month}`, {
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("Failed result fetch");

        const data = await res.json();

        const processedList = data.resultList.map(r =>
            processSingleResult(r, resultOrder)
        );

        const finalData = { ...data, resultList: processedList };
        const latest = processedList[processedList.length - 1];

        return (
            <div className="my-3 shadow-lg text-white rounded">
                <div className="flex mb-2 justify-center items-center gap-4">
                    <YearMonthSelector 
                        initialYear={year} 
                        initialMonth={month}
                    />
                </div>
                <ResultDisplay data={finalData} resultOrder={resultOrder} />
            </div>
        );
    } catch (err) {
        console.error("Error in CurrentDay:", err);
        return (
            <div className="my-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                Failed to load current day results
            </div>
        );
    }
};

export default CurrentDay;
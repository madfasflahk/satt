'use client'
import React, { useEffect } from 'react';
import ResultDisplay from './ResultDisplay';
import YearMonthSelector from './YearMonthSelector';
import useCurrentDayStore from '../store/useCurrentDayStore';
import HourglassLoader from './HourglassLoader';

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

const CurrentDay = ({ resultOrder }) => {
    const { data, loading, error, fetchResults } = useCurrentDayStore();

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    const renderContent = () => {
        if (loading) {
            return <HourglassLoader />;
        }

        if (error) {
            return (
                <div className="my-3 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            );
        }

        if (!data) {
            return (
                <div className="my-3 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded">
                    No data found for the selected month and year.
                </div>
            );
        }

        const processedList =data.resultList &&data.resultList.length>0 &&  data.resultList.map(r =>
            processSingleResult(r, resultOrder)
        );
        const finalData = { ...data, resultList: processedList };
        
        return <ResultDisplay data={finalData} resultOrder={resultOrder} />;
    };

    return (
        <div className="my-3 shadow-lg text-white rounded">
            <div className="flex mb-2 justify-center items-center gap-4">
                <YearMonthSelector />
            </div>
            {renderContent()}
        </div>
    );
};

export default CurrentDay;
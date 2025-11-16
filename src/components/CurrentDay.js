"use client"
import React, { useEffect, useState, useCallback } from 'react';
import ResultDisplay from './ResultDisplay';
import YearMonthSelector from './YearMonthSelector';
import useCurrentDayStore from '@/store/useCurrentDayStore';

// Convert order object → array
const normalizeOrderConfig = (orderObj) => {
    if (!orderObj || typeof orderObj !== "object") return [];
    return Object.keys(orderObj).map(key => ({
        key,
        ...orderObj[key]
    }));
};

// Process single result
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

const CurrentDay = () => {
    const [localResultOrder, setLocalResultOrder] = useState(null);
    const [currentDayData, setCurrentDayData] = useState([]);

    const { setCurrentDays } = useCurrentDayStore();

    const handleDateChange = useCallback(async (year, month) => {
        if (!localResultOrder) return;

        try {
            const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
                ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                : 'http://localhost:3000';

            const url = `${baseUrl}/api/v1/result?year=${year}&month=${month}`;
            const res = await fetch(url);

            if (!res.ok) throw new Error("Failed result fetch");

            const data = await res.json();
            console.log("Fetched current day result:", data);

            const processedList = data.resultList.map(r =>
                processSingleResult(r, localResultOrder)
            );

            const finalData = { ...data, resultList: processedList };
            setCurrentDayData(finalData);

            const latest = processedList[processedList.length - 1];
            latest?.day === new Date().getDate()
                ? setCurrentDays(latest)
                : setCurrentDays(null);

        } catch (err) {
            console.log(err);
        }
    }, [localResultOrder]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                    : 'http://localhost:3000';

                const res = await fetch(`${baseUrl}/api/v1/resultOrder`);
                if (!res.ok) throw new Error("Failed order fetch");

                const data = await res.json();
                console.log("Fetched result order:", data);

                const normalized = normalizeOrderConfig(data);
                setLocalResultOrder(normalized);
            } catch (err) {
                console.error("Error fetching order:", err);
            }
        };

        fetchOrder();
    }, []);

    useEffect(() => {
        if (localResultOrder) {
            handleDateChange(new Date().getFullYear(), new Date().getMonth() + 1);
        }
    }, [localResultOrder]);

    return (
        <div className="my-3 shadow-lg text-white rounded">
            <div className="flex mb-2 justify-center items-center gap-4">
                <YearMonthSelector onDateChange={handleDateChange} />
            </div>

            <ResultDisplay data={currentDayData} resultOrder={localResultOrder} />
        </div>
    );
};

export default CurrentDay;

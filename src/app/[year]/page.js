"use client"
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'next/navigation';
import ResultDisplay from '../../components/ResultDisplay';

const YearPage = () => {
    const params = useParams();
    const year = params.year;
    const [fullYearChart, setFullYearChart] = useState(null);
    const [resultLoad, setResultLoad] = useState(false);
    const [resultOrder, setResultOrder] = useState([]); // State for result order

    const monthsArray = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Helper function to filter and sort a single result object
    const processSingleResult = (result, orderConfig) => {
        if (!result || !orderConfig || orderConfig.length === 0) {
            return {};
        }

        const processed = {};
        const verifiedGames = orderConfig.filter(game => game.isVerified);

        verifiedGames.sort((a, b) => a.order - b.order);

        verifiedGames.forEach(game => {
            if (result.hasOwnProperty(game.key)) {
                processed[game.key] = result[game.key];
            }
        });

        return processed;
    };

    const getYearlyData = async (year, orderConfig) => { // Pass orderConfig
        setResultLoad(true);
        try {
            const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
                ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                : 'http://localhost:3000'; // Default for local development
            const url = new URL(`/api/v1/result?year=${year}`, baseUrl).toString();
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                
                // Process each month's resultList
                const processedData = data.map(monthData => {
                    const processedResultList = monthData.resultList.map(result => processSingleResult(result, orderConfig));
                    return { ...monthData, resultList: processedResultList };
                });

                setFullYearChart(processedData);
            } else {
                const errorBody = await response.text();
                throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorBody}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setResultLoad(false);
        }
    };

    useEffect(() => {
        // Fetch result order on component mount
        const fetchResultOrder = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
                    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
                    : 'http://localhost:3000';
                const orderUrl = new URL(`/api/v1/resultOrder`, baseUrl).toString();
                const orderRes = await fetch(orderUrl);
                if (orderRes.ok) {
                    const orderData = await orderRes.json();
                    setResultOrder(orderData);
                } else {
                    console.error("Failed to fetch result order");
                }
            } catch (error) {
                console.error("Error fetching result order:", error);
            }
        };
        fetchResultOrder();
    }, []); // Empty dependency array to run only once on mount

    useEffect(() => {
        if (year && resultOrder.length > 0) { // Only call getYearlyData once year and resultOrder are available
            getYearlyData(year, resultOrder);
        }
    }, [year, resultOrder]); // Re-run when year or resultOrder changes

    if (resultLoad) {
        return (
            <div className="flex justify-center items-center h-[85vh]">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            
            <div className="container max-w-6xl mx-auto mt-8 mb-8 px-4">
                {(!fullYearChart || fullYearChart.length === 0) ? (
                    <div className="text-center min-h-[85vh] flex items-center justify-center">
                        <h2 className="text-2xl font-bold">No data found for the year {year}</h2>
                    </div>
                ) : (
                    fullYearChart.sort((a, b) => a.month - b.month).map((item, index) => (
                        <div key={index} className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-center mb-4">
                                    SATTA KING {monthsArray[item.month - 1].toUpperCase()} RECORD CHART {item.year}
                                </h3>
                                <ResultDisplay data={item} resultOrder={resultOrder} /> {/* Pass resultOrder */}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default YearPage;
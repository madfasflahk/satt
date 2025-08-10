"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import ResultDisplay from '../../components/ResultDisplay';

const YearPage = () => {
    const params = useParams();
    const year = params.year;
    const [fullYearChart, setFullYearChart] = useState(null);
    const [resultLoad, setResultLoad] = useState(false);

    const monthsArray = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const getYearlyData = async (url) => {
        setResultLoad(true);
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                setFullYearChart(response.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setResultLoad(false);
        }
    };

    useEffect(() => {
        getYearlyData(`${process.env.NEXT_PUBLIC_API_URL}/result/fullYear?year=${year}`);
    }, [year]);

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
                                <ResultDisplay data={item} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default YearPage;
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const YearlyResult = () => {
    const router = useRouter();
    const [year, setYear] = useState('');

    const handleYearChange = (e) => {
        setYear(e.target.value);
    };

    const handleNavigate = () => {
        if (year) {
            router.push(`/${year}`);
        }
    };

    return (
        <div className="my-8 px-4">
            <div className="max-w-md mx-auto space-y-4">
                {/* Year Buttons */}
                <button
                    className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
                    onClick={() => router.push('/2024')}
                >
                    SATTA KING RECORD CHART 2024
                </button>

                <button
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
                    onClick={() => router.push('/2023')}
                >
                    SATTA KING RECORD CHART 2023
                </button>

                <button
                    className="w-full py-3 px-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
                    onClick={() => router.push('/2022')}
                >
                    SATTA KING RECORD CHART 2022
                </button>

                {/* Year Input with Go Button */}
                <div className="flex gap-3 items-center mt-4">
                    <input
                        type="number"
                        value={year}
                        onChange={handleYearChange}
                        className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter Year"
                        min="1900"
                        max="2099"
                    />

                    <button
                        className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md transition-colors duration-200"
                        onClick={handleNavigate}
                    >
                        Go
                    </button>
                </div>
            </div>
        </div>
    );
};

export default YearlyResult;
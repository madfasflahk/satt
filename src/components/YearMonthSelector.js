"use client"
import React, { useState } from 'react';

const YearMonthSelector = ({ onDateChange }) => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);

    const handleYearChange = (e) => {
        const newYear = parseInt(e.target.value, 10);
        setYear(newYear);
        onDateChange(newYear, month);
    };

    const handleMonthChange = (e) => {
        const newMonth = parseInt(e.target.value, 10);
        setMonth(newMonth);
        onDateChange(year, newMonth);
    };

    const renderYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear - 100; i <= currentYear + 10; i++) {
            years.push(i);
        }
        return years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
        ));
    };

    const renderMonthOptions = () => {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        return months.map((month, index) => (
            <option key={index + 1} value={index + 1}>
                {month}
            </option>
        ));
    };

    return (
        <div className="flex gap-4 rounded">
            <div className="flex items-center">
                <div className='text-white' >
                    Year:
                </div>
                <select
                    value={year}
                    onChange={handleYearChange}
                    className="w-full text-red-600 ml-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {renderYearOptions()}
                </select>
            </div>
            <div className="flex items-center">
                <div className="  text-white">
                    Month:
                </div>
                <select
                    value={month}
                    onChange={handleMonthChange}
                    className="w-full ml-1 text-red-600 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {renderMonthOptions()}
                </select>
            </div>
        </div>
    );
};

export default YearMonthSelector;
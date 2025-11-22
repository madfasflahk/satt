"use client";
import React from "react";
import useCurrentDayStore from "../store/useCurrentDayStore";

const YearMonthSelector = () => {
  const { year, month, setYear, setMonth, fetchResults } = useCurrentDayStore();

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setYear(newYear);
  };

  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setMonth(newMonth);
  };

  const handleGoClick = () => {
    fetchResults();
  };

  const renderYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 100; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years.map((y) => (
      <option key={y} value={y}>
        {y}
      </option>
    ));
  };

  const renderMonthOptions = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.map((m, index) => (
      <option key={index + 1} value={index + 1}>
        {m}
      </option>
    ));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-black font-bold text-lg mb-2 text-center">
        <span className="text-red-600">FARIDABAD | GAZIABAD | GALI | DESAWAR</span> 
      </h2>

      <div
        className="flex justify-center items-center gap-4 p-4 rounded"
        style={{
          background: "linear-gradient(90deg, #FF4500, #FFD700)",
        }}
      >
        <select
          value={month}
          onChange={handleMonthChange}
          className="px-8 py-3 font-semibold text-center rounded text-black border-none"
          style={{
            background: "linear-gradient(90deg, #E8D9FF, #F6F3D1)",
          }}
        >
          {renderMonthOptions()}
        </select>

        <select
          value={year}
          onChange={handleYearChange}
          className="px-8 py-3 font-semibold text-center rounded text-black border-none"
          style={{
            background: "linear-gradient(90deg, #E8D9FF, #F6F3D1)",
          }}
        >
          {renderYearOptions()}
        </select>

        <button
          onClick={handleGoClick}
          className="px-8 py-3 font-bold text-lg rounded text-black transition-transform transform hover:scale-105"
          style={{
            background: "linear-gradient(90deg, #2DD3C5, #3C38B1)",
          }}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default YearMonthSelector;

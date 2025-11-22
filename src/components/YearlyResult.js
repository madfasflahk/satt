"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const YearlyResult = ({resultOrder}) => {
  const router = useRouter();
  const [year, setYear] = useState("");

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleNavigate = () => {
    if (year) {
      router.push(`/${year}`);
    }
  };

  return (
    <div className="my-12 px-4 bg-gradient-to-r from-[#f44305] via-[#f47b1f] to-[#f8d12f] py-10">
      <div className="max-w-md mx-auto space-y-5 text-center">
        {/* Year Buttons */}
        {[
          { label: "SATTA KING RECORD CHART 2024", color: "from-[#0bb36d] to-[#1ea97c]", link: "/2024" },
          { label: "SATTA KING RECORD CHART 2023", color: "from-[#0088cc] to-[#00a2ff]", link: "/2023" },
          { label: "SATTA KING RECORD CHART 2022", color: "from-[#f97316] to-[#facc15]", link: "/2022" },
        ].map((item, index) => (
          <button
            key={index}
            className={`w-full border  py-3 px-4 bg-gradient-to-r ${item.color} text-white font-bold rounded-full shadow-lg transition-transform duration-300 hover:scale-105 animate-blink`}
            onClick={() => router.push(item.link)}
          >
            {item.label}
          </button>
        ))}

        {/* Year Input with Go Button */}
        <div className="flex gap-3 items-center mt-6">
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-4 focus:ring-green-400 text-center text-lg font-semibold"
            placeholder="Enter Year"
            min="1900"
            max="2099"
          />

          <button
            className="py-3 px-6 bg-gradient-to-r from-[#0bb36d] to-[#1ea97c] text-white font-bold rounded-full shadow-md hover:scale-105 transition-transform duration-300 animate-blink"
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

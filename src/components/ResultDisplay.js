"use client";
import React, { useRef } from "react";

const ResultDisplay = ({ data }) => {
  const tableContainerRef = useRef(null);

  const formatNumber = (number) => {
    if (number !== null && !isNaN(number)) {
      return parseInt(number).toString().padStart(2, "0");
    }
    return "";
  };

  const handleScroll = (direction) => {
    if (tableContainerRef.current) {
      if (direction === "right") {
        tableContainerRef.current.scrollLeft += tableContainerRef.current.offsetWidth;
      } else {
        tableContainerRef.current.scrollLeft -= tableContainerRef.current.offsetWidth;
      }
    }
  };

  const tableHeaders = [
    { id: "date", label: "Date", minWidth: "100px" },
    { id: "disawer", label: "DISAWER", minWidth: "100px" },
    { id: "faridabad", label: "FARIDABAD", minWidth: "100px" },
    { id: "gaziyabad", label: "GAZIYABAD", minWidth: "100px" },
    { id: "gali", label: "GALI", minWidth: "100px" },
    { id: "delhiBazar", label: "DELHI BAZAR", minWidth: "170px" },
    { id: "shreeGanesh", label: "SHREE GANESH", minWidth: "170px" },
  ];

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-md border border-white">
      {/* Caption bar */}
      <div className="bg-[#f9b404] text-black font-bold text-center py-3 text-lg">
        Monthly Satta King Result Chart of November 2025 for DISAWAR, FARIDABAD, GAZIYABAD, GALI
      </div>

      {/* Scrollable table */}
      <div ref={tableContainerRef} className="overflow-x-auto scroll-smooth">
        <table className="w-full border-collapse text-white">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className="bg-black border border-white text-sm font-bold px-4 py-2 text-center"
                  style={{ minWidth: header.minWidth }}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(!data || !data.resultList || data.resultList.length === 0) && (
              <tr>
                <td
                  colSpan={tableHeaders.length}
                  className="text-center py-4 text-red-500 bg-[#002D5E]"
                >
                  No results found.
                </td>
              </tr>
            )}

            {data?.resultList &&
              data.resultList
                .sort((a, b) => a.day - b.day)
                .map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-[#004C99] transition-all duration-300"
                    style={{
                      opacity: 0,
                      transform: "translateY(20px)",
                      animation: `fadeInUp 0.3s ease-out forwards ${index * 0.05}s`,
                      background: "linear-gradient(#002D5E, #004C99)",
                    }}
                  >
                    <td className="text-center px-4 py-2 border border-white font-semibold">
                      {`${String(row.day).padStart(2, "0")}-${new Date(
                        2025,
                        data.month - 1,
                        row.day
                      ).toLocaleDateString("en-US", { weekday: "short" })}`}
                    </td>

                    {tableHeaders.slice(1).map((header) => (
                      <td
                        key={header.id}
                        className="text-center px-4 py-2 border border-white font-semibold"
                      >
                        {formatNumber(row[header.id]) || "✱"}
                      </td>
                    ))}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ResultDisplay;

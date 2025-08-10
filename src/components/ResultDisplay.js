"use client"
import React, { useRef } from 'react';

const ResultDisplay = ({ data }) => {
  const tableContainerRef = useRef(null);

  const formatNumber = (number) => {
    if (number !== null && !isNaN(number)) {
      return parseInt(number).toString().padStart(2, '0');
    }
    return "";
  };

  const handleScroll = (direction) => {
    if (tableContainerRef.current) {
      if (direction === 'right') {
        tableContainerRef.current.scrollLeft += tableContainerRef.current.offsetWidth;
      } else {
        tableContainerRef.current.scrollLeft -= tableContainerRef.current.offsetWidth;
      }
    }
  };

  

  const tableHeaders = [
    { id: 'date', label: 'Date', minWidth: '100px' },
   
    { id: 'disawer', label: 'DISAWER', minWidth: '100px' },
    { id: 'faridabad', label: 'FARIDABAD', minWidth: '100px' },
    { id: 'gaziyabad', label: 'GAZIYABAD', minWidth: '100px' },
   
    { id: 'gali', label: 'GALI', minWidth: '100px' },
    { id: 'delhiBazar', label: 'DELHI BAZAR', minWidth: '170px' },
    { id: 'shreeGanesh', label: 'SHREE GANESH', minWidth: '170px' },
  ];
  
  return (
    <div className="w-full overflow-hidden bg-white rounded-lg shadow-md">
     
      <div 
        className="overflow-x-auto scroll-smooth"
      >
        <table className="w-full">
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header.id}
                  className={`sticky text-sm top-0 bg-red-800 text-white font-bold text-lg px-4 py-2 text-center min-w-[${header.minWidth}]`}
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-zinc-900'>
            {data=== null && (
              <tr>
                <td colSpan={tableHeaders.length} className="text-center py-4 text-red-600">
                  No results found.
                </td>
              </tr>
            )}
            {data && data.resultList && data.resultList.sort((a, b) => a.day - b.day).map((row, index) => (
              <tr 
                key={index}
                className="hover:bg-gray-50 transition-colors duration-100"
                style={{
                  opacity: 0,
                  transform: 'translateY(20px)',
                  animation: `fadeInUp 0.3s ease-out forwards ${index * 0.05}s`
                }}
              >
                <td className="text-center text-lg px-4 py-2 text-blue-600 text-nowrap">
                  {`${String(row.day).padStart(2, '0')}-${String(data.month).padStart(2, '0')}`}
                </td>
                {tableHeaders.slice(1).map((header) => (
                  <td 
                    key={header.id}
                    className="text-center text-lg px-4 py-2"
                  >
                    {formatNumber(row[header.id])}
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
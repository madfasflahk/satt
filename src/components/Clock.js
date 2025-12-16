"use client";

import { useState, useEffect } from 'react';

export default function IndianDigitalClock() {
  const [currentTime, setCurrentTime] = useState({
    time: "00:00:00",
    date: "",
    year: "",
    hour: 0,
    seconds: "00"
  });

  // Function to get Indian time
  const getIndianTime = () => {
    // Create date in Indian timezone (IST = UTC+5:30)
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const indianTime = new Date(utcTime + (5.5 * 3600000)); // IST offset
    
    const timeString = indianTime.toLocaleTimeString('en-IN', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Kolkata'
    });
    
    const dateString = indianTime.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
    
    // Extract seconds for separate animation
    const seconds = String(indianTime.getSeconds()).padStart(2, '0');
    
    return {
      time: timeString,
      date: dateString,
      year: indianTime.getFullYear(),
      hour: indianTime.getHours(),
      seconds: seconds
    };
  };

  // Get greeting based on Indian time
  const getGreeting = (hour) => {
    if (hour < 12) return "🌅 Good Morning!";
    if (hour < 18) return "☀️ Good Afternoon!";
    if (hour < 21) return "🌆 Good Evening!";
    return "🌙 Good Night!";
  };

  // Update clock every second
  useEffect(() => {
    // Set initial time
    setCurrentTime(getIndianTime());
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(getIndianTime());
    }, 1000);
    
    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-semibold mb-4 tracking-wide text-cyan-400 drop-shadow-lg">
          {getGreeting(currentTime.hour)}
        </h1>
        
        {/* Digital Clock Container */}
        <div className="inline-flex flex-col items-center p-6 rounded-2xl 
                       bg-gradient-to-br from-cyan-900/20 to-cyan-950/20 
                       border border-cyan-700/30 backdrop-blur-sm
                       shadow-[0_0_30px_rgba(0,255,255,0.15)]">
          
          {/* Time Display with animated seconds */}
          <div className="flex items-center justify-center mb-2">
            <div className="text-5xl md:text-6xl font-mono font-bold tracking-wider 
                          text-cyan-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]">
              {currentTime.time.split(':')[0]}:
              {currentTime.time.split(':')[1]}:
              <span className="text-cyan-400 animate-pulse">
                {currentTime.time.split(':')[2]}
              </span>
            </div>
          </div>
          
          {/* Date and Year */}
          <div className="flex items-center gap-4 text-cyan-200/80 mt-2">
            <div className="text-lg font-medium tracking-wide">
              {currentTime.date}
            </div>
            <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
            <div className="text-lg font-medium tracking-wide">
              {currentTime.year}
            </div>
            <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
            <div className="text-sm font-medium text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded">
              IST
            </div>
          </div>
        </div>

        {/* Live Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          {/* <span className="text-sm text-cyan-300 font-medium">Live Indian Time</span> */}
        </div>
      </div>
    </div>
  );
}
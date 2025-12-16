"use client";

import { useState, useEffect } from "react";

export default function IndianDigitalClock() {
  const [currentTime, setCurrentTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    ampm: "AM",
    date: "",
    year: "",
    hour24: 0, // Important for greeting
  });

  // Function to get Indian time
  const getIndianTime = () => {
    const now = new Date();

    // Convert to IST (UTC+5:30)
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const indianTime = new Date(utcTime + 5.5 * 3600000);

    let hours24 = indianTime.getHours();
    const minutes = String(indianTime.getMinutes()).padStart(2, "0");
    const seconds = String(indianTime.getSeconds()).padStart(2, "0");

    const ampm = hours24 >= 12 ? "PM" : "AM";
    let hours12 = hours24 % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
    const hours = String(hours12).padStart(2, "0");

    const dateString = indianTime.toLocaleDateString("en-IN", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    });

    return {
      hours,
      minutes,
      seconds,
      ampm,
      date: dateString,
      year: indianTime.getFullYear(),
      hour24: hours24,
    };
  };

  // Greeting based on hour
  const getGreeting = (hour) => {
    if (hour < 12) return "🌅 Good Morning!";
    if (hour < 18) return "☀️ Good Afternoon!";
    if (hour < 21) return "🌆 Good Evening!";
    return "🌙 Good Night!";
  };

  useEffect(() => {
    // Set initial time
    setCurrentTime(getIndianTime());

    // Update every second
    const timer = setInterval(() => {
      setCurrentTime(getIndianTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center">
        {/* Greeting */}
        <h1 className="text-3xl font-semibold mb-4 tracking-wide text-cyan-400 drop-shadow-lg">
          {getGreeting(currentTime.hour24)}
        </h1>

        {/* Digital Clock Container */}
        <div
          className="inline-flex flex-col items-center p-6 rounded-2xl 
          bg-gradient-to-br from-cyan-900/20 to-cyan-950/20 
          border border-cyan-700/30 backdrop-blur-sm
          shadow-[0_0_30px_rgba(0,255,255,0.15)]"
        >
          {/* Time */}
          <div className="flex items-center gap-2 mb-2">
            <div
              className="text-5xl md:text-6xl font-mono font-bold tracking-wider 
              text-cyan-300 drop-shadow-[0_0_15px_rgba(0,255,255,0.7)]"
            >
              {currentTime.hours}:{currentTime.minutes}:
              <span className="text-cyan-400 animate-pulse">
                {currentTime.seconds}
              </span>
            </div>
            <span className="text-xl font-semibold text-cyan-200 ml-2">
              {currentTime.ampm}
            </span>
          </div>

          {/* Date and Year */}
          <div className="flex items-center gap-4 text-cyan-200/80 mt-2">
            <div className="text-lg font-medium">{currentTime.date}</div>
            <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
            <div className="text-lg font-medium">{currentTime.year}</div>
            <div className="w-1 h-1 rounded-full bg-cyan-400/60"></div>
            <div className="text-sm font-medium text-cyan-300 bg-cyan-900/30 px-2 py-1 rounded">
              IST
            </div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

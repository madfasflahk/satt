"use client";
import React from "react";
import Image from "next/image";
import { Info } from "lucide-react"; // small info-like icon

const tags = [
  "Historical lottery data access",
  "Number prediction software",
  "GAZIABAD",
  "Super Fast Results",
  "Ghaziabad",
  "Online gaming platforms",
  "Risk management courses",
  "Delhi",
  "Disawar game charts",
  "Satta game history",
];

const Logo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-black text-center px-4">
      {/* Logo */}
      <Image
        src="/satta-king2.png"
        alt="Mysattakings Logo"
        width={180}
        height={180}
        className="mb-4"
      />

      {/* Website Name */}
      <h1
        className="text-3xl md:text-4xl font-bold italic mb-2"
        style={{
          color: "#f5b301", // gold tone
          fontFamily: "'Brush Script MT', cursive",
        }}
      >
        Mysattakings.com
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 mb-6 text-base md:text-lg">
        Discover live results, charts, and satta trends instantly.
      </p>

      {/* Tag Buttons */}
      <div className="flex flex-wrap justify-center gap-3 max-w-5xl">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="flex items-center gap-1 px-3 py-1.5 bg-white text-blue-700 font-medium rounded-full shadow-sm hover:bg-blue-50 transition"
          >
            <Info size={14} className="text-blue-700" />
            <span>{tag}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Logo;

"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const GetCurrentResult = () => {
  const [results, setResults] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Greeting generator
  useEffect(() => {
    const now = new Date().getHours();
    if (now < 12) setGreeting("GOOD MORNING");
    else if (now < 16) setGreeting("GOOD AFTERNOON");
    else if (now < 21) setGreeting("GOOD EVENING");
    else setGreeting("GOOD NIGHT");
  }, []);

  // Main data fetcher
  useEffect(() => {
    async function fetchFreshData() {
      try {
        await axios.get("/api/currentday");

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch latest results");
      } finally {
        setLoading(false);
      }
    }

    async function checkLocalDataAndFetch() {
      const storedData = localStorage.getItem("currentday");
      const todayDay = new Date().getDate();

      if (storedData) {
        try {
          let parsed = JSON.parse(storedData);

          setResults(Object.fromEntries(
            Object.entries(parsed).filter(([key]) => key !== "_id")
          ));

          if (parsed.resultList?.length) {
            parsed = parsed.resultList[0];
          }

          if (parsed.day === todayDay) {
            const hasNulls = Object.entries(parsed)
              .filter(([k]) => !["_id", "day", "DateTime"].includes(k))
              .some(([, v]) => v === null);

            if (hasNulls) {
              console.log("Found null values, fetching fresh...");
              await fetchFreshData();
            } else {

              setResults(formatResults(parsed));
              setLoading(false);
            }
          } else {
            console.log("Day mismatch, fetching fresh...");
            await fetchFreshData();
          }
        } catch (err) {
          console.error("Invalid JSON in localStorage:", err);
          await fetchFreshData();
        }
      } else {
        console.log("No stored data, fetching fresh...");
        await fetchFreshData();
      }
    }

    checkLocalDataAndFetch();
  }, []);


  if (loading) {
    return <div className="text-center text-gray-500 mt-8">Loading results...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 font-bold mt-8 text-xl">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          NEW DELHI BAZAR SATTA
        </h1>
        <h2 className="text-xl font-semibold text-blue-600">
          Satta King Live Result
        </h2>
      </div>

      <div className="text-center py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 animate-pulse">
        <p className="text-lg font-bold">
          {greeting} <span className="text-red-600"> (
          {new Date().getDate()} /
          {String(new Date().getMonth() + 1).padStart(2, '0')} /
          {new Date().getFullYear()}
          )</span>
        </p>
      </div>



      {Object.entries(results).map(([key, value], index) => (
        <div
          key={index}
          style={{ display: key === "DateTime" || key === "day" || key === "kolkataKing" || key === "delhiLuckyBazar" ? "none" : "block" }}
          className="relative overflow-hidden bg-white shadow-lg rounded-lg p-4 border-l-4 border-red-500 mt-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold uppercase">{key}</span>
            <div className="relative">
              <span className="absolute right-12 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                {String(key).charAt(0).toUpperCase()}
              </span>
              <span className="text-xl font-bold text-red-600 z-10 relative">LIVE</span>
            </div>
          </div>

          <div className="mt-2 flex justify-between items-center">
            <span className="text-gray-600">RESULT</span>
            <span className="text-3xl font-bold text-blue-700">{value?value:"Wait... "}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetCurrentResult;

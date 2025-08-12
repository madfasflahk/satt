'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import useCurrentDayStore from '../store/useCurrentDayStore';

export const GetCurrentResult = () => {
  const [greeting, setGreeting] = useState('');
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const { currentDay, currentDayData, setCurrentDayData } = useCurrentDayStore();

  // Greeting generator
  useEffect(() => {
    const now = new Date().getHours();
    if (now < 12) setGreeting('GOOD MORNING');
    else if (now < 16) setGreeting('GOOD AFTERNOON');
    else if (now < 21) setGreeting('GOOD EVENING');
    else setGreeting('GOOD NIGHT');
  }, []);

  // Data fetcher
useEffect(() => {
  function countNulls(obj) {
    return Object.entries(obj)
      .filter(([k]) => !['_id', 'day', 'DateTime', 'kolkataKing', 'delhiLuckyBazar'].includes(k))
      .reduce((count, [, v]) => count + (v === null ? 1 : 0), 0);
  }

  async function fetchFreshData() {
    if (count > 0) return;

    try {
      const res = await axios.get('/api/currentday');

      const formatted = {
        day: parseInt(res?.data.date.split('-')[0], 10),
        delhiBazar: res?.data.DELHI_BAZAR_DL ?? null,
        delhiLuckyBazar: null,
        disawer: res?.data.DISAWER ?? null,
        faridabad: res?.data.FARIDABAD ?? null,
        gali: res?.data.GALI ?? null,
        gaziyabad: res?.data.GHAZIYABAD ?? null,
        kolkataKing: null,
        shreeGanesh: res?.data.SHRI_GANESH ?? null
      };

      let bestData = null;

      // If no currentDay, use fetched
      if (!currentDay) {
        bestData = formatted;
      } else {
        const nullsInCurrentDay = countNulls(currentDay);
        const nullsInFetched = countNulls(formatted);

        // Pick the one with fewer nulls
        bestData = nullsInFetched < nullsInCurrentDay ? formatted : currentDay;
      }

      // Only set if it has any actual data
      const hasData = [
        bestData.delhiBazar,
        bestData.disawer,
        bestData.faridabad,
        bestData.gali,
        bestData.gaziyabad,
        bestData.shreeGanesh
      ].some(v => v !== null);

      if (hasData) {
        setCurrentDayData(bestData);
      }

      setCount(prevCount => prevCount + 1);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch latest results');
    }
  }

  function needsFetching(data) {
    if (!data) return true;
    const todayDay = new Date().getDate();
    if (data.day !== todayDay) return true;

    return Object.entries(data)
      .filter(([k]) => !['_id', 'day', 'DateTime'].includes(k))
      .some(([, v]) => v === null);
  }

  if (!currentDayData || needsFetching(currentDayData)) {
    fetchFreshData();
  }
}, [currentDayData, setCurrentDayData, currentDay]);



  if (error) {
    return (
      <div className="text-center text-red-500 font-bold mt-8 text-xl">{error}</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-red-600 mb-2">
          NEW DELHI BAZAR SATTA
        </h1>
        <h2 className="text-xl font-semibold text-blue-600">
          Satta King Live Result
        </h2>
      </div>

      {/* Greeting */}
      <div className="text-center py-2 bg-gradient-to-r from-yellow-400 to-yellow-200 animate-pulse">
        <p className="text-lg font-bold">
          {greeting}{' '}
          <span className="text-red-600">
            ({new Date().getDate()} /
            {String(new Date().getMonth() + 1).padStart(2, '0')} /
            {new Date().getFullYear()})
          </span>
        </p>
      </div>
      {/* Results */}
      {Object.entries(currentDay ? currentDay : currentDayData || {}).map(([key, value], index) => (
        <div
          key={index}
          style={{
            display:
              key === '_id' ||
                key === 'DateTime' ||
                key === 'day' ||
                key === 'kolkataKing' ||
                key === 'delhiLuckyBazar'
                ? 'none'
                : 'block',
          }}
          className="relative overflow-hidden bg-white shadow-lg rounded-lg p-4 border-l-4 border-red-500 mt-4"
        >
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold uppercase">{key}</span>
            <div className="relative">
              <span className="absolute right-12 top-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                {String(key).charAt(0).toUpperCase()}
              </span>
              <span className="text-xl font-bold text-red-600 z-10 relative">
                LIVE
              </span>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-gray-600">RESULT</span>
            <span className="text-3xl font-bold text-blue-700">
              {value || 'Wait...'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

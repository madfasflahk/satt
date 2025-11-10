'use client';
import { useState, useEffect } from 'react';
import useCurrentDayStore from '../store/useCurrentDayStore';

export const GetCurrentResult = () => {
  const [greeting, setGreeting] = useState('');
  const { currentDay } = useCurrentDayStore();

  useEffect(() => {
    const now = new Date().getHours();
    if (now < 12) setGreeting('GOOD MORNING');
    else if (now < 16) setGreeting('GOOD AFTERNOON');
    else if (now < 21) setGreeting('GOOD EVENING');
    else setGreeting('GOOD NIGHT');
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-black min-h-screen text-center">
      {/* Date & Time */}
      <p className="text-cyan-300 font-bold text-lg mb-8">
        {new Date().toLocaleString('en-US', {
          month: 'long',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })}
      </p>

      {/* Greeting */}
      <div className="text-3xl font-semibold text-cyan-400 mb-10">
        {greeting}{' '}
        <span className="text-cyan-400">
          ({new Date().getDate()} / {String(new Date().getMonth() + 1).padStart(2, '0')} / {new Date().getFullYear()})
        </span>
      </div>

      {/* Results */}
      {currentDay ? (
        Object.entries(currentDay).map(([key, value], index) => (
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
            className="my-8 p-6 rounded-2xl bg-black bg-opacity-70"
          >
            <h2 className="text-4xl font-extrabold uppercase mb-2 tracking-widest glow-on-text">
              {key}
            </h2>
            <h3 className="text-5xl font-extrabold glow-on-number">
              {value ? value : 'WAIT'}
            </h3>
          </div>
        ))
      ) : (
        <div className="text-cyan-400 text-2xl font-bold mt-8 animate-glow">
          Waiting for Today&apos;s Results...
        </div>
      )}
    </div>
  );
};

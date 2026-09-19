import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  label?: string;
  variant?: 'light' | 'dark' | 'gold';
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  initialHours = 18,
  label = 'Ends in:',
  variant = 'dark',
}) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const isDark = variant === 'dark';
  const isGold = variant === 'gold';

  const boxBg = isDark ? 'bg-[#0B452A] text-white' : isGold ? 'bg-[#C9A45C] text-[#0B452A]' : 'bg-white text-[#145C3A]';

  return (
    <div className="inline-flex items-center gap-2">
      {label && (
        <span className="text-xs font-semibold uppercase tracking-wider opacity-80">
          {label}
        </span>
      )}
      <div className="flex items-center gap-1.5 font-mono text-xs sm:text-sm font-bold">
        <div className={`px-2 py-1 rounded-lg ${boxBg} shadow-2xs min-w-7 text-center`}>
          {String(timeLeft.hours).padStart(2, '0')}
          <span className="block text-[8px] font-sans font-normal opacity-70">hrs</span>
        </div>
        <span className="font-bold">:</span>
        <div className={`px-2 py-1 rounded-lg ${boxBg} shadow-2xs min-w-7 text-center`}>
          {String(timeLeft.minutes).padStart(2, '0')}
          <span className="block text-[8px] font-sans font-normal opacity-70">min</span>
        </div>
        <span className="font-bold">:</span>
        <div className={`px-2 py-1 rounded-lg ${boxBg} shadow-2xs min-w-7 text-center`}>
          {String(timeLeft.seconds).padStart(2, '0')}
          <span className="block text-[8px] font-sans font-normal opacity-70">sec</span>
        </div>
      </div>
    </div>
  );
};

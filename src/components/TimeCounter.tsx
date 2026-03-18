import React, { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, intervalToDuration } from 'date-fns';

interface TimeCounterProps {
  startDate: Date;
  label: string;
}

export const TimeCounter: React.FC<TimeCounterProps> = ({ startDate, label }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const duration = intervalToDuration({
    start: startDate,
    end: now
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 rounded-3xl glass">
      <h3 className="text-xl font-tech uppercase tracking-widest text-white/60">{label}</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        <TimeUnit value={duration.years || 0} unit="Anos" />
        <TimeUnit value={duration.months || 0} unit="Meses" />
        <TimeUnit value={duration.days || 0} unit="Dias" />
        <TimeUnit value={duration.hours || 0} unit="Horas" />
        <TimeUnit value={duration.minutes || 0} unit="Minutos" />
        <TimeUnit value={duration.seconds || 0} unit="Segundos" />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-4xl md:text-6xl font-tech font-bold text-red-500 tabular-nums">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-xs uppercase tracking-tighter text-white/40">{unit}</span>
  </div>
);

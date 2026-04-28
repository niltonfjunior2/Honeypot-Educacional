"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    // Generate a random time up to 2 days (48 hours)
    // Random between 1 hour and 48 hours
    const totalMinutes = Math.floor(Math.random() * (48 * 60)) + 60;
    const randomSeconds = Math.floor(Math.random() * 60);
    
    const initialTime = {
      days: Math.floor(totalMinutes / (24 * 60)),
      hours: Math.floor((totalMinutes % (24 * 60)) / 60),
      minutes: totalMinutes % 60,
      seconds: randomSeconds,
    };
    
    setTimeLeft(initialTime);
    
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (!prev) return prev;
        
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000); // Update every second
    
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) {
    return (
      <div className="flex flex-col items-center p-md bg-white/10 backdrop-blur-md rounded-xl border-b-4 border-primary-fixed min-w-[120px]">
        <span className="text-headline-md font-headline-md text-white">--</span>
        <span className="text-label-bold font-label-bold text-primary-fixed">RESTANTES</span>
      </div>
    );
  }

  // Format the display string
  let timeString = "";
  if (timeLeft.days > 0) timeString += `${timeLeft.days}d `;
  timeString += `${timeLeft.hours.toString().padStart(2, "0")}h `;
  timeString += `${timeLeft.minutes.toString().padStart(2, "0")}m `;
  timeString += `${timeLeft.seconds.toString().padStart(2, "0")}s`;

  return (
    <div className="flex flex-col items-center p-md bg-white/10 backdrop-blur-md rounded-xl border-b-4 border-primary-fixed min-w-[120px]">
      <span className="text-headline-md font-headline-md text-white tracking-tight">{timeString}</span>
      <span className="text-label-bold font-label-bold text-primary-fixed">RESTANTES</span>
    </div>
  );
}

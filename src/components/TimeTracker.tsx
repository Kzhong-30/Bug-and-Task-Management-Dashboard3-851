import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { useAuthStore, useTicketStore } from '../lib/store';

interface TimeTrackerProps {
  ticketId: string;
}

export default function TimeTracker({ ticketId }: TimeTrackerProps) {
  const [isTracking, setIsTracking] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const user = useAuthStore((state) => state.user);
  const { startTimeTracking, stopTimeTracking, tickets } = useTicketStore();

  const ticket = tickets.find((t) => t.id === ticketId);
  const totalTime = ticket?.timeLogs.reduce((acc, log) => acc + log.duration, 0) || 0;

  useEffect(() => {
    let interval: number;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const handleToggleTracking = () => {
    if (!user) return;

    if (isTracking) {
      stopTimeTracking(ticketId, user.id);
      setIsTracking(false);
      setElapsedTime(0);
    } else {
      startTimeTracking(ticketId, user.id);
      setIsTracking(true);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={handleToggleTracking}
        className={`p-2 rounded-full ${
          isTracking ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
        }`}
      >
        {isTracking ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>
      <div className="text-sm">
        <p className="text-gray-500">Current Session: {formatTime(elapsedTime)}</p>
        <p className="text-gray-500">Total Time: {formatTime(totalTime)}</p>
      </div>
    </div>
  );
}
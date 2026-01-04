/**
 * Donation countdown timer component
 */

'use client';

import { useEffect, useState } from 'react';

interface DonationCountdownProps {
  deadline: string;
}

export function DonationCountdown({ deadline }: DonationCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const deadlineDate = new Date(deadline).getTime();
      const now = new Date().getTime();
      const difference = deadlineDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  if (timeLeft.isExpired) {
    return (
      <div className="text-center mt-6 p-4 bg-red-50 rounded-lg">
        <p className="text-red-600 font-semibold">Kampanye Donasi Telah Berakhir</p>
      </div>
    );
  }

  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-navy-900/70 mb-3">Donasi berakhir dalam:</p>
      <div className="grid grid-cols-4 gap-2 md:gap-4">
        <div className="bg-navy-900 bg-opacity-10 rounded-lg p-3 md:p-4">
          <div className="text-2xl md:text-3xl font-bold text-navy-900">
            {String(timeLeft.days).padStart(2, '0')}
          </div>
          <p className="text-xs md:text-sm text-navy-900/70">Hari</p>
        </div>
        <div className="bg-navy-900 bg-opacity-10 rounded-lg p-3 md:p-4">
          <div className="text-2xl md:text-3xl font-bold text-navy-900">
            {String(timeLeft.hours).padStart(2, '0')}
          </div>
          <p className="text-xs md:text-sm text-navy-900/70">Jam</p>
        </div>
        <div className="bg-navy-900 bg-opacity-10 rounded-lg p-3 md:p-4">
          <div className="text-2xl md:text-3xl font-bold text-navy-900">
            {String(timeLeft.minutes).padStart(2, '0')}
          </div>
          <p className="text-xs md:text-sm text-navy-900/70">Menit</p>
        </div>
        <div className="bg-navy-900 bg-opacity-10 rounded-lg p-3 md:p-4">
          <div className="text-2xl md:text-3xl font-bold text-navy-900">
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          <p className="text-xs md:text-sm text-navy-900/70">Detik</p>
        </div>
      </div>
    </div>
  );
}

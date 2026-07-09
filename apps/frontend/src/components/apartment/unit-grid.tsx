"use client";
import React from 'react';
import { cn } from '@/lib/utils';

interface Unit { id: string; number: string; status: 'VACANT' | 'OCCUPIED' | 'MAINTENANCE' }

export const UnitGrid = ({ units }: { units: Unit[] }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {units.map((unit) => (
        <div key={unit.id} className={cn(
          "p-4 rounded-lg border flex flex-col items-center justify-center transition-all hover:shadow-md cursor-pointer",
          unit.status === 'VACANT' ? "bg-green-50 border-green-200 text-green-700" :
          unit.status === 'OCCUPIED' ? "bg-blue-50 border-blue-200 text-blue-700" :
          "bg-amber-50 border-amber-200 text-amber-700"
        )}>
          <span className="font-bold text-lg">{unit.number}</span>
          <span className="text-xs capitalize font-medium">{unit.status}</span>
        </div>
      ))}
    </div>
  );
};

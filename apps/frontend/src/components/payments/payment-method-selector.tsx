"use client";
import React from 'react';
import { CreditCard, Smartphone } from 'lucide-react';

export const PaymentMethodSelector = ({ onSelect }: { onSelect: (method: 'MPESA' | 'STRIPE') => void }) => (
  <div className="grid grid-cols-2 gap-4">
    <button 
      onClick={() => onSelect('MPESA')}
      className="flex flex-col items-center justify-center p-6 border rounded-xl hover:bg-slate-50 transition-colors"
    >
      <Smartphone className="w-8 h-8 text-green-600 mb-2" />
      <span className="font-semibold">M-Pesa</span>
    </button>
    <button 
      onClick={() => onSelect('STRIPE')}
      className="flex flex-col items-center justify-center p-6 border rounded-xl hover:bg-slate-50 transition-colors"
    >
      <CreditCard className="w-8 h-8 text-indigo-600 mb-2" />
      <span className="font-semibold">Card</span>
    </button>
  </div>
);

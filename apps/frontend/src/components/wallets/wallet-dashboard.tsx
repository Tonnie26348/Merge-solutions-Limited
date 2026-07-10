"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, ArrowRight } from 'lucide-react';

interface WalletData { id: string; type: string; balance: number; currency: string; }

const mockWallets: WalletData[] = [
  { id: '1', type: 'Resident Wallet', balance: 5000, currency: 'KES' },
  { id: '2', type: 'Building Escrow', balance: 150000, currency: 'KES' },
];

export const WalletDashboard = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {mockWallets.map(wallet => (
      <motion.div 
        key={wallet.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-indigo-50 rounded-lg">
            <Wallet className="text-indigo-600" />
          </div>
          <span className="text-xs font-semibold text-slate-400 uppercase">{wallet.type}</span>
        </div>
        <div className="text-3xl font-bold text-slate-900">
          {wallet.balance.toLocaleString()} <span className="text-lg text-slate-500 font-normal">{wallet.currency}</span>
        </div>
        <button className="mt-6 flex items-center text-sm text-indigo-600 font-medium hover:underline">
          View Transactions <ArrowRight className="ml-1 w-4 h-4" />
        </button>
      </motion.div>
    ))}
  </div>
);

"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Loader2 } from 'lucide-react';

export const ChatAssistant = () => {
  const [messages, setMessages] = useState<{role: 'ai' | 'user', content: string}[]>([
    { role: 'ai', content: 'Hello! I am your MERGE AI Assistant. Describe your maintenance issue, and I will help you categorize it and find the best technician.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    // Call API: POST /ai/diagnose
    // For now, simulating response
    setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', content: 'Based on your description, this sounds like a "Plumbing" issue. Estimated cost: KES 3000-5000. Urgency: High.' }]);
        setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-2xl bg-white shadow-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'ai' ? 'flex items-start' : 'flex items-start justify-end'}>
            {m.role === 'ai' && <Bot className="w-8 h-8 text-indigo-600 mr-2 mt-1" />}
            <div className={cn("p-4 rounded-2xl max-w-[80%]", m.role === 'ai' ? "bg-slate-100" : "bg-indigo-600 text-white")}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <Loader2 className="animate-spin text-indigo-600" />}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 border rounded-full outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. My sink is leaking..."
        />
        <button onClick={sendMessage} className="p-3 bg-indigo-600 text-white rounded-full"><Send size={20} /></button>
      </div>
    </div>
  );
};
import { cn } from '@/lib/utils';

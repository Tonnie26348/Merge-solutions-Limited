"use client";
import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message { id: string; senderId: string; content: string; }

export const ChatWindow = ({ chatId, currentUserId }: { chatId: string; currentUserId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    // Integration: Call POST /chat/message
    console.log('Sending message:', input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-xl bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={cn("p-3 rounded-lg max-w-[80%]", m.senderId === currentUserId ? "bg-indigo-600 text-white ml-auto" : "bg-slate-100")}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="p-4 border-t flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="p-2 bg-indigo-600 text-white rounded"><Send size={20} /></button>
      </div>
    </div>
  );
};

"use client";
import React, { useState } from 'react';
import { Bell } from 'lucide-react';

export const NotificationBell = () => {
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <div className="relative cursor-pointer">
      <Bell className="text-slate-600" />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
          {unreadCount}
        </span>
      )}
    </div>
  );
};

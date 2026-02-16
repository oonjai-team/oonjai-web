"use client";

import React from "react";
import { Menu, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isOnline?: boolean;
}

export const Header = ({ isOnline = true }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-4">
        {/* Left Side: Logo/Brand */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-600" />
          <span className="font-bold text-lg tracking-tight">Oonjai</span>
        </div>

        {/* Right Side: Status & Menu */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-500" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500" />
            )}
            <span className={cn(
              "text-[10px] font-medium uppercase tracking-widest",
              isOnline ? "text-green-600" : "text-red-600"
            )}>
              {isOnline ? "Live" : "Offline"}
            </span>
          </div>
          
          <button className="p-2 hover:bg-gray-100 rounded-full active:scale-95 transition-transform">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
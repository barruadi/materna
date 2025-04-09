// src/app/_components/topbar.tsx
"use client";

import { useEffect, useState } from "react";

type TopbarProps = {
  username: string;
};

export default function Topbar({ username }: TopbarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-[#FFFBD7] flex items-center justify-between px-6 shadow z-50">
      <div className="flex items-center gap-2">
        <img src="/materna.svg" alt="Materna Logo" className="h-10" />
      </div>
      <div className="flex items-center gap-6">
        <button className="text-lg"><i className="lucide lucide-search" /></button>
        <button className="text-lg"><i className="lucide lucide-help-circle" /></button>
        <button className="text-lg"><i className="lucide lucide-bell" /></button>
        <div className="flex items-center gap-2">
          <img src="/profile.svg" alt="Profile" className="h-8 rounded-full" />
          <span className="text-sm">{username}</span>
        </div>
      </div>
    </div>
  );
}

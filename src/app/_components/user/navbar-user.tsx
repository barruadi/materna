"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";



export const NavbarUser = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const menuItems = [
    { id: "home", text: "Beranda", defaultSrc: "/Home.svg", activeSrc: "/Home-active.svg", href: "/pasien" },
    { id: "todo", text: "To Do", defaultSrc: "/ToDo.svg", activeSrc: "/ToDo.svg", href: "/pasien/daily-task" },
    { id: "riwayat", text: "Riwayat", defaultSrc: "/History.svg", activeSrc: "/History.svg", href: "/pasien/history" },
  ];

  return (
    <nav className="fixed bottom-0 w-full pt-3 pb-2 shadow-lg bg-amber-50 z-10 text-[10px]">
      <div className="grid grid-cols-3 w-full px-4">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="relative flex flex-col items-center gap-1 group"
            onClick={() => setActiveTab(item.id)}
          >
            <Image
              src={activeTab === item.id ? item.activeSrc : item.defaultSrc}
              alt={item.id}
              width={30}
              height={30}
              className="transition-all duration-300 ease-in-out transform group-hover:scale-110 "
            />

            <span className={`text-[12px] ${activeTab === item.id ? "text-black" : "text-gray-400"}`}>
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

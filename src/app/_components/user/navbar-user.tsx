"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const NavbarUser = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const menuItems = [
    { id: "home", text: "Beranda", defaultSrc: "/Home.svg", activeSrc: "/Home-active.svg", href: "/" },
    { id: "todo", text: "To Do", defaultSrc: "/ToDo.svg", activeSrc: "/Discover-active.svg", href: "/" },
    { id: "riwayat", text: "Riwayat", defaultSrc: "/History.svg", activeSrc: "/Profile-active.svg", href: "/" },
  ];

  return (
    <nav className="fixed bottom-0 w-full pt-3 pb-2 shadow-lg bg-amber-50 z-10 text-[10px]">
      <div className="flex justify-center space-x-10 md:space-x-24">
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
              width={20}
              height={20}
              className="transition-all duration-300 ease-in-out transform group-hover:scale-110"
            />

            <span className={`font-medium ${activeTab === item.id ? "text-black" : "text-gray-400"}`}>
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

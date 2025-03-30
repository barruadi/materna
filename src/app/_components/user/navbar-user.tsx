"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const NavbarUser = () => {
  const [activeTab, setActiveTab] = useState<string>("home");

  const menuItems = [
    { id: "home", text: "Beranda", defaultSrc: "/Home.svg", activeSrc: "/Home-active.svg", href: "/" },
    { id: "discover", text: "Riwayat", defaultSrc: "/Discover.svg", activeSrc: "/Discover-active.svg", href: "/" },
    { id: "profile", text: "Akun", defaultSrc: "/Profile.svg", activeSrc: "/Profile-active.svg", href: "/" },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white/10 py-2 shadow-lg">
      <div className="flex justify-center space-x-16 md:space-x-24">
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
              className="transition-all duration-300 ease-in-out transform group-hover:scale-110"
            />

            <span className={`text-sm font-medium ${activeTab === item.id ? "text-gray-600" : "text-gray-500"}`}>
              {item.text}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

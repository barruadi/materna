"use client"

import { Home, List } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarDesktop() {
  const pathname = usePathname();

  const menu = [
    { label: "Dashboard", icon: <Home size={20} />, href: "/nakes" },
    { label: "Daftar Pasien", icon: <List size={20} />, href: "/nakes/list-pasien" },
  ];

  return (
    <div className="fixed top-0 left-0 h-full bg-[#fffcdf] text-black py-5 px-3 w-52">
      {/* Tambahin margin-top untuk ngasih ruang ke Topbar */}
      <div className="mt-16 space-y-2">
        {menu.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                isActive
                  ? "bg-yellow-100 text-yellow-500 font-medium"
                  : "hover:bg-yellow-50"
              }`}
            >
              <div className={`${isActive ? "text-yellow-500" : "text-gray-700"}`}>
                {item.icon}
              </div>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

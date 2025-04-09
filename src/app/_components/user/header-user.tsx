"use client"
import React from "react";
import { usePathname } from "next/navigation";

import { HeaderUserProps } from "~/app/_types/types";

import { 
  UserOutlined,
} from "@ant-design/icons";

const HeaderUser = ({ title: propsTitle }: HeaderUserProps) => {
  const pathname = usePathname();
  
  const pathSegments = pathname.split('/').filter(Boolean);
  const lastSegment = pathSegments.length > 1 ? pathSegments[pathSegments.length - 1] : null;
  
  const formatTitle = (segment: string) => {
    if (segment === 'pasien') return null;
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  const title = propsTitle || (lastSegment ? formatTitle(lastSegment) : null);
  
  return (
    <div className="fixed top-0 w-full bg-amber-50 flex flex-row items-center p-2 px-4 rounded-xl border-none h-20 justify-between">
      {!title && (
        <>
          <div className="flex items-center space-x-4 flex-grow">
          <button className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full">
            <UserOutlined className="text-white text-xl" />
          </button>
          <div>
            <p className="text-gray-500 text-[12px] leading-tight">Welcome,</p>
            <p className="font-bold text-lg">Rafif Farras!</p>
          </div>
        </div>
        <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
        </>
      )}
      {title && (
        <div className="flex items-center space-x-4 w-full">
          <h1 className="text-xl font-bold text-center flex-grow">{title}</h1>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;

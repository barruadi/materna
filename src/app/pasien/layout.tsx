"use client"

import React, {useState} from "react";

import { Content } from "antd/es/layout/layout";

import HeaderUser from "../_components/user/header-user";
import NavbarUser from "../_components/user/navbar-user";
import TopbarNotification from "../_components/user/notification";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const [showNotif, setShowNotif] = useState(false);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[375px] h-full bg-white shadow-lg overflow-hidden flex flex-col mt-20 mb-16">
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[375px] z-40 flex flex-col">
        <HeaderUser />
      </div>
        
      <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-[375px] z-40 flex flex-col">
      <TopbarNotification
        show={showNotif}
        onClose={() => setShowNotif(false)}
      />
      </div>

        <button 
        className="absolute bottom-10 right-10 w-10 h-10 bg-black rounded-full text-center text-white items-center"
        onClick={() => setShowNotif(true)}
        >
        ?
      </button>

        <Content className="flex-grow p-4 bg-white flex overflow-y-auto scrollbar-none">
          {children}
        </Content>

        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-[375px] z-50 flex items-center h-20 justify-between">
          <NavbarUser/>
        </div>
      </div>
    </div>
  );
}
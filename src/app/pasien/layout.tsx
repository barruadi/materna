import React from "react";

import { Content } from "antd/es/layout/layout";

import HeaderUser from "../_components/user/header-user";
import NavbarUser from "../_components/user/navbar-user";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[375px] h-full bg-white shadow-lg overflow-hidden flex flex-col mt-20 mb-16">
        <div className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[375px] z-50 flex items-center h-20 justify-between">
          <HeaderUser/>
        </div>

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
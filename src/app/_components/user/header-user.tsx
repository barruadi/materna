import React from "react";
import { Header } from "antd/es/layout/layout";
import { UserOutlined } from "@ant-design/icons";

const HeaderUser = () => {
  return (
    <Header className="fixed top-0 w-full bg-amber-50 flex flex-row items-center p-2 rounded-xl border-none h-20 justify-between">
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
    </Header>
  );
};

export default HeaderUser;

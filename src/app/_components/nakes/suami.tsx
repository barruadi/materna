import React from "react";
import { Card, Space } from "antd";
import { EditOutlined, CopyOutlined } from "@ant-design/icons";

type KeteranganSuamiProps = {
  data: {
    nama: string;
    noTelepon: string;
  };
};

export function Suami({ data }: KeteranganSuamiProps) {
  return (
    <Card 
    title="Keterangan Suami" 
    style={{
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <Space direction="vertical" size="middle">
        <div>
          <p className="text-gray-500 text-sm">Nama Suami</p>
          <p className="text-base font-semibold">{data.nama}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">No. Telepon</p>
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold">{data.noTelepon}</p>
            <CopyOutlined />
          </div>
        </div>
      </Space>
    </Card>
  );
}

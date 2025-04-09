"use client";

import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Divider, Layout, Input, Spin, Breadcrumb } from "antd";
import type { TableProps } from "antd";
import DeleteButton from "~/app/_components/admin/delete-button";
import AddPatientButton from "~/app/_components/admin/add-patient-button";

const { Header } = Layout;
const { Search } = Input;

interface ListPasienProps {
  id: string; 
  name: string;
  gestational_age: number;
  last_visit: string;
  status: string;
}

const columns: TableProps<ListPasienProps>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nama",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Usia Kehamilan",
    dataIndex: "gestational_age",
    key: "gestational_age",
    render: (age) => <p>{age} bulan</p>,
  },
  {
    title: "Kunjungan Terakhir",
    dataIndex: "last_visit",
    key: "last_visit",
  },
  {
    title: "Status",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      let color = "default";
      switch (status) {
        case "Resiko Rendah":
          color = "green";
          break;
        case "Resiko Sedang":
          color = "yellow";
          break;
        case "Resiko Tinggi":
          color = "red";
          break;
        default:
          color = "default";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Aksi",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a className="text-blue-600">Detail</a>
        <Divider type="vertical" />
        <a className="text-blue-600">Edit</a>
        <Divider type="vertical" />
        <DeleteButton />
      </Space>
    ),
  },
];

const ListPasien: React.FC = () => {
  const [data, setData] = useState<ListPasienProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    fetch("/dummy-pasien.json")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((item: any) => ({
          ...item,
          key: item.id,
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Header className="px-7 bg-white flex flex-row justify-between items-center">
        <b>Daftar Pasien</b>
        <div className="flex flex-row align-middle">
          <Search placeholder="Cari pasien" style={{ width: 250 }} />
          <AddPatientButton />
        </div>
      </Header>

      {loading || data === null ? (
        <div className="flex justify-center items-center py-4">
          <Spin size="large" />
        </div>
      ) : (
        <Table<ListPasienProps>
          columns={columns}
          dataSource={data}
          className="p-4" 
          pagination={{position: ["bottomCenter"],}}
        />
      )}
    </div>
  );
};

export default ListPasien;

"use client";

import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Divider, Layout, Input, Spin, Breadcrumb } from "antd";
import type { TableProps } from "antd";
import DeleteButton from "~/app/_components/nakes/delete-button";
import AddPatientButton from "~/app/_components/nakes/add-patient-button";
import SidebarDesktop from "~/app/_components/nakes/sidebar";
import Topbar from "~/app/_components/nakes/topbar";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";


const { Search } = Input;

interface ListPasienProps {
  key: string;
  id: string;
  nama: string;
  umur: number;
  golonganDarah: string;
  statusResiko: string;
  jadwalKunjungan: Date;
  tanggalLahir: Date;
  kontak: bigint;
  lastVisit: Date;
} 


const columns: TableProps<ListPasienProps>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: "Nama",
    dataIndex: "nama",
    key: "nama",
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: "Umur",
    dataIndex: "umur",
    key: "umur",
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
    },
    render: (umur) => <p>{umur} tahun</p>,
  },
  {
    title: "Golongan Darah",
    dataIndex: "golonganDarah",
    key: "golonganDarah",
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: "Status",
    dataIndex: "statusResiko",
    key: "statusResiko",
    render: (status) => {
      let color = "default";
      if (status === "Resiko Rendah") color = "green";
      else if (status === "Resiko Sedang") color = "yellow";
      else if (status === "Resiko Tinggi") color = "red";
      return <Tag color={color}>{status}</Tag>;
    },
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
    },
  },
  {
    title: "Kunjungan Terakhir",
    dataIndex: "lastVisit",
    key: "lastVisit",
    render: (value) => new Date(value).toLocaleDateString(),
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
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
    onHeaderCell: () => {
      return {
        style: {
          backgroundColor: '#FFD96C',
          color: 'black',
          fontWeight: 'bold',
        },
      };
    },
  },
];

const ListPasien: React.FC = () => {
  const [data, setData] = useState<ListPasienProps[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  const { data: session } = useSession();

  const userId = session?.user?.id;

  const { data: pasienData, isLoading: isLoadingPasien } = api.nakes.getPasienDariRiwayat.useQuery();


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
    <div className="flex flex-col p-8 space-y-6 bg-slate-50">
      <Topbar username="Nakes" />
      <div className="">
          <SidebarDesktop />
      </div>
      <div className='ml-52 pt-4 min-h-screen bg-slate-50'>
        <div className="px-7 bg-slate-50 flex flex-row justify-between items-center">
          <b className="text-3xl">Daftar Pasien</b>
          <div className="flex flex-row align-middle">
            <Search placeholder="Cari pasien" style={{ width: 250 }} />
            <AddPatientButton />
          </div>
        </div>
        

        {isLoadingPasien || !pasienData ? (
          <div className="flex justify-center items-center py-4">
            <Spin size="large" />
          </div>
        ) : (
          <Table<ListPasienProps>
            columns={columns}
            dataSource={pasienData}
            className="p-4"
            pagination={{ position: ["bottomCenter"] }}
          />
        )}
      </div>
    </div>
  );
};

export default ListPasien;

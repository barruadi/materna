// src/app/nakes/dashboard/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Table, 
  Button, 
  Space, 
  Badge, 
  Avatar,
  Divider 
} from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  CalendarOutlined, 
  HeartOutlined,
  ExclamationCircleOutlined,
  MedicineBoxOutlined,
  SearchOutlined
} from '@ant-design/icons';
import SidebarDesktop from '../_components/admin/sidebar';
import Topbar from '../_components/admin/topbar';
import Link from 'next/link';

const { Title, Text } = Typography;

// Interface definitions based on the schema
interface Nakes {
  id: string;
  email: string;
  nama: string;
  nip: number;
  fotoProfil?: string;
  kontak: number;
  faskesId: string;
  faskes: Faskes;
}

interface Faskes {
  id: string;
  namaFaskes: string;
  alamat?: string;
}

interface Pasien {
  id: string;
  email: string;
  nama: string;
  nik: number;
  tanggalLahir: Date;
  fotoProfil?: string;
  golonganDarah: string;
  kontak: number;
  statusResiko: 'RENDAH' | 'SEDANG' | 'TINGGI';
  suamiNama?: string;
  suamiKontak?: number;
}

interface Riwayat {
  id: string;
  pasienId: string;
  nakesId: string;
  faskesId: string;
  createdAt: Date;
  pasien: Pasien;
  faskes: Faskes;
}

// Modified for display in the UI
interface PasienDisplayData {
  id: string;
  nama: string;
  tanggalLahir: Date;
  umur: number;
  golonganDarah: string;
  statusResiko: string;
  jadwalKunjungan: Date;
  kontak: number;
}

const NakesDashboard: React.FC = () => {
  const [nakesData, setNakesData] = useState<Nakes | null>(null);
  const [pasienData, setPasienData] = useState<PasienDisplayData[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper function to calculate age
  const calculateAge = (birthdate: Date): number => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Dummy data for Nakes
  const dummyNakesData: Nakes = {
    id: "nak_123456",
    email: "budi.kesehatan@mail.com",
    nama: "dr. Budi Santoso",
    nip: 198765432,
    fotoProfil: "https://via.placeholder.com/150",
    kontak: 6281234567890,
    faskesId: "fas_123",
    faskes: {
      id: "fas_123",
      namaFaskes: "Puskesmas Sejahtera",
      alamat: "Jl. Kesehatan No. 15, Jakarta"
    }
  };

  // Dummy data for Patients and Riwayat
  const dummyPasienList: Pasien[] = [
    {
      id: "pas_001",
      email: "siti@example.com",
      nama: "Siti Nuraini",
      nik: 1234567890123456,
      tanggalLahir: new Date(1997, 5, 15),
      golonganDarah: "A",
      kontak: 6281234567001,
      statusResiko: "RENDAH",
      suamiNama: "Ahmad",
      suamiKontak: 6281234567101
    },
    {
      id: "pas_002",
      email: "dewi@example.com",
      nama: "Dewi Lestari",
      nik: 2234567890123456,
      tanggalLahir: new Date(1994, 2, 22),
      golonganDarah: "B",
      kontak: 6281234567002,
      statusResiko: "SEDANG",
      suamiNama: "Budi",
      suamiKontak: 6281234567102
    },
    {
      id: "pas_003",
      email: "ratna@example.com",
      nama: "Ratna Sari",
      nik: 3234567890123456,
      tanggalLahir: new Date(2000, 8, 10),
      golonganDarah: "O",
      kontak: 6281234567003,
      statusResiko: "RENDAH"
    },
    {
      id: "pas_004",
      email: "indah@example.com",
      nama: "Indah Permata",
      nik: 4234567890123456,
      tanggalLahir: new Date(1996, 11, 5),
      golonganDarah: "AB",
      kontak: 6281234567004,
      statusResiko: "TINGGI",
      suamiNama: "Dedi",
      suamiKontak: 6281234567104
    },
    {
      id: "pas_005",
      email: "lina@example.com",
      nama: "Lina Putri",
      nik: 5234567890123456,
      tanggalLahir: new Date(1995, 4, 20),
      golonganDarah: "A",
      kontak: 6281234567005,
      statusResiko: "SEDANG",
      suamiNama: "Farhan",
      suamiKontak: 6281234567105
    }
  ];

  const dummyRiwayatList: Riwayat[] = [
    {
      id: "riw_001",
      pasienId: "pas_001",
      nakesId: "nak_123456",
      faskesId: "fas_123",
      createdAt: new Date(2025, 3, 2), // April 2, 2025
      pasien: dummyPasienList[0],
      faskes: dummyNakesData.faskes
    },
    {
      id: "riw_002",
      pasienId: "pas_002",
      nakesId: "nak_123456",
      faskesId: "fas_123",
      createdAt: new Date(2025, 3, 5), // April 5, 2025
      pasien: dummyPasienList[1],
      faskes: dummyNakesData.faskes
    },
    {
      id: "riw_003",
      pasienId: "pas_003",
      nakesId: "nak_123456",
      faskesId: "fas_123",
      createdAt: new Date(2025, 3, 1), // April 1, 2025
      pasien: dummyPasienList[2],
      faskes: dummyNakesData.faskes
    },
    {
      id: "riw_004",
      pasienId: "pas_004",
      nakesId: "nak_123456",
      faskesId: "fas_123",
      createdAt: new Date(2025, 2, 25), // March 25, 2025
      pasien: dummyPasienList[3],
      faskes: dummyNakesData.faskes
    },
    {
      id: "riw_005",
      pasienId: "pas_005",
      nakesId: "nak_123456",
      faskesId: "fas_123",
      createdAt: new Date(2025, 2, 28), // March 28, 2025
      pasien: dummyPasienList[4],
      faskes: dummyNakesData.faskes
    }
  ];

  // Calculate next appointment date (current date + 1 month)
  const getNextAppointmentDate = (lastVisit: Date): Date => {
    const nextDate = new Date(lastVisit);
    nextDate.setMonth(nextDate.getMonth() + 1);
    return nextDate;
  };

  // Prepare data for display
  useEffect(() => {
    // In a real application, you would fetch this data from your API
    setTimeout(() => {
      setNakesData(dummyNakesData);
      
      // Process pasien data with calculated jadwal kunjungan
      const processedPasienData: PasienDisplayData[] = dummyRiwayatList.map(riwayat => {
        const pasien = riwayat.pasien;
        return {
          id: pasien.id,
          nama: pasien.nama,
          tanggalLahir: pasien.tanggalLahir,
          umur: calculateAge(pasien.tanggalLahir),
          golonganDarah: pasien.golonganDarah,
          statusResiko: pasien.statusResiko,
          jadwalKunjungan: getNextAppointmentDate(riwayat.createdAt),
          kontak: pasien.kontak
        };
      });
      
      setPasienData(processedPasienData);
      setLoading(false);
    }, 1000);
  }, []);

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Columns for the patient table
  const columns = [
    {
      title: 'Nama',
      dataIndex: 'nama',
      key: 'nama',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Umur',
      dataIndex: 'umur',
      key: 'umur',
    },
    {
      title: 'Gol. Darah',
      dataIndex: 'golonganDarah',
      key: 'golonganDarah',
    },
    {
      title: 'Status Resiko',
      dataIndex: 'statusResiko',
      key: 'statusResiko',
      render: (status: string) => {
        let color = '';
        if (status === 'RENDAH') color = 'green';
        else if (status === 'SEDANG') color = 'orange';
        else if (status === 'TINGGI') color = 'red';
        
        return (
          <Badge color={color} text={status} />
        );
      }
    },
    {
      title: 'Jadwal Kunjungan',
      dataIndex: 'jadwalKunjungan',
      key: 'jadwalKunjungan',
      render: (jadwalKunjungan: Date) => formatDate(jadwalKunjungan)
    },
    {
      title: 'Kontak',
      dataIndex: 'kontak',
      key: 'kontak',
      render: (kontak: number) => {
        // Format as phone number
        const kontakStr = kontak.toString();
        return `+${kontakStr.substring(0, 2)} ${kontakStr.substring(2, 5)}-${kontakStr.substring(5, 8)}-${kontakStr.substring(8)}`;
      }
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_: any, record: PasienDisplayData) => (
        <Space size="middle">
          <Button type="link" size="small">Detail</Button>
        </Space>
      ),
    },
  ];

  // Count stats
  const countPasienByRisk = (risk: string): number => {
    return pasienData.filter(p => p.statusResiko === risk).length;
  };

  // Get upcoming appointments (next 7 days)
  const getUpcomingAppointments = (): number => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    return pasienData.filter(p => {
      const visitDate = new Date(p.jadwalKunjungan);
      return visitDate >= today && visitDate <= nextWeek;
    }).length;
  };

  return (
    <div className="flex flex-col p-8 space-y-6 bg-slate-50">
      <Topbar username="Nakes" />
      <div className="">
          <SidebarDesktop />
      </div>
      <div className='ml-52 pt-4 min-h-screen bg-slate-50'>
        {/* Nakes Info Card */}
        <Card style={{ marginBottom: '24px' }}>
          <Row align="middle" gutter={16}>
            <Col>
              <Avatar 
                size={64} 
                src={nakesData?.fotoProfil}
                icon={!nakesData?.fotoProfil && <UserOutlined />}
              />
            </Col>
            <Col>
              <Title level={4} style={{ margin: 0 }}>{nakesData?.nama}</Title>
              <Text type="secondary">
                {nakesData?.faskes.namaFaskes} | NIP: {nakesData?.nip}
              </Text>
            </Col>
          </Row>
        </Card>
        
        {/* Statistics Cards */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Total Pasien"
                value={pasienData.length}
                prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Kunjungan 7 Hari"
                value={getUpcomingAppointments()}
                prefix={<CalendarOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Resiko Rendah"
                value={countPasienByRisk('RENDAH')}
                prefix={<HeartOutlined style={{ color: '#52c41a' }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic
                title="Resiko Tinggi"
                value={countPasienByRisk('TINGGI')}
                prefix={<ExclamationCircleOutlined style={{ color: '#f5222d' }} />}
              />
            </Card>
          </Col>
        </Row>

        <Divider orientation="left">Data Pasien</Divider>
        
        {/* Patient Table */}
        <Card
          title="Jadwal Kunjungan Pasien"
          extra={
            <Space>
              <Button icon={<SearchOutlined />}>Cari</Button>
              <Link href="/admin/tambah-pasien">
                <Button type="primary">Tambah Pasien</Button>
              </Link>
            </Space>
          }
        >
          <Table 
            columns={columns} 
            dataSource={pasienData} 
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </div>
    </div>
  );
};

export default NakesDashboard;
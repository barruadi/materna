'use client';

import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";

import React, { useState, useEffect } from 'react';
import { Typography, Card, Row, Col, Statistic, Table, Button, Space, Badge, Avatar, Divider } from 'antd';
import { UserOutlined, TeamOutlined, CalendarOutlined, HeartOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { useRouter } from 'next/navigation';
import SidebarDesktop from '../_components/nakes/sidebar';
import Topbar from '../_components/nakes/topbar';
import Link from 'next/link';

import { addMonths, differenceInYears, isAfter, isBefore } from "date-fns";

const { Title, Text } = Typography;

type PasienDisplayData = {
  key: string;
  id: string;
  nama: string;
  umur: number;
  golonganDarah: string;
  statusResiko: "RENDAH" | "SEDANG" | "TINGGI";
  jadwalKunjungan: Date;
  tanggalLahir: Date;
  lastVisit: Date;
  kontak: number;
};

const NakesDashboard: React.FC = () => {
  const { data: session, status } = useSession();

  const userId = session?.user?.id || "prototipe";

  const { data: nakes, isLoading: nakesLoading } = api.nakes.getCurrentNakes.useQuery();

  const {
    data: pasienData,
    isLoading: riwayatLoading,
    error,
  } = api.nakes.getPasienDariRiwayat.useQuery(undefined, {
    enabled: status === 'authenticated',
  });

  const router = useRouter();

  useEffect(() => {
    if (error) console.error('Error getPasienDariRiwayat:', error);
  }, [error]);

  const formattedPasienData: PasienDisplayData[] = (pasienData ?? []).map((pasien) => {
    const umur = differenceInYears(new Date(), new Date(pasien.tanggalLahir));
    return {
      key: pasien.id,
      id: pasien.id,
      nama: pasien.nama,
      umur: umur,
      golonganDarah: pasien.golonganDarah,
      statusResiko: pasien.statusResiko,
      jadwalKunjungan: new Date(pasien.jadwalKunjungan),
      tanggalLahir: new Date(pasien.tanggalLahir),
      lastVisit: new Date(pasien.lastVisit),
      kontak: Number(pasien.kontak),
    };
  });

  const loading = riwayatLoading;

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

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
        return <Badge color={color} text={status} />;
      },
    },
    {
      title: 'Jadwal Kunjungan',
      dataIndex: 'jadwalKunjungan',
      key: 'jadwalKunjungan',
      render: (date: Date) => formatDate(date),
    },
    {
      title: 'Kontak',
      dataIndex: 'kontak',
      key: 'kontak',
      render: (kontak: number) => {
        const kontakStr = kontak.toString();
        return `+${kontakStr.substring(0, 2)} ${kontakStr.substring(2, 5)}-${kontakStr.substring(5, 8)}-${kontakStr.substring(8)}`;
      },
    },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_: any, record: PasienDisplayData) => (
        <Space size="middle">
          <Button type="link" size="small"
            onClick={() => router.push('/nakes/detail')}
          >
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  const countPasienByRisk = (risk: string): number => {
    return pasienData?.filter((p) => p.statusResiko === risk).length ?? 0;
  };

  const getUpcomingAppointments = (): number => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);

    return pasienData?.filter((p) => {
      const nextVisit = addMonths(new Date(p.lastVisit), 1);
      return isAfter(nextVisit, today) && isBefore(nextVisit, nextWeek);
    }).length ?? 0;
  };

  return (
    <div className="flex flex-col p-8 space-y-6 bg-slate-50">
      <Topbar username="Nakes" />
      <div>
        <SidebarDesktop />
      </div>
      <div className="ml-52 pt-4 min-h-screen bg-slate-50">
        <Card style={{ marginBottom: '24px' }}>
          <Row align="middle" gutter={16} justify="space-between">
            <Col>
              <Row align="middle" gutter={16}>
                <Col>
                  <Avatar size={64} src={nakes?.fotoProfil || undefined} icon={nakes?.fotoProfil && <UserOutlined />} />
                </Col>
                <Col>
                  <Title level={4} style={{ margin: 0 }}>
                    {nakes?.nama || 'Guest'}
                  </Title>
                  <Text type="secondary">
                    {nakes?.faskes.namaFaskes || 'Puskesmas Bandung'} | NIP: {nakes?.nip || '123456789'}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Link href="/nakes/riwayat-form" passHref>
                <Button type="primary" style={{ backgroundColor: '#ffd96c', borderColor: '#ffd96c', color: '#000' }}>
                  Tambah kunjungan
                </Button>
              </Link>
            </Col>
          </Row>
        </Card>

        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card>
              <Statistic title="Total Pasien" value={pasienData?.length} prefix={<TeamOutlined style={{ color: '#1890ff' }} />} />
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

        <Divider orientation="center">Data Pasien</Divider>

        <Card>
          <Table
            columns={columns}
            dataSource={formattedPasienData}
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

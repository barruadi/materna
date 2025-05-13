"use client";

import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Card,
  Divider,
} from 'antd';
import Topbar from '~/app/_components/nakes/topbar';
import SidebarDesktop from '~/app/_components/nakes/sidebar';
import { CalendarOutlined, IdcardOutlined, MedicineBoxOutlined, PhoneOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';

const OpsiGolDar = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
];

const TambahPasien: React.FC = () => {
  interface FormDataType {
    Nama?: string;
    NIK?: string;
    TanggalLahir?: any;
    GolonganDarah?: string;
    Kontak?: string;
    Alamat?: string;
    NamaWali?: string;
    KontakWali?: string;
    RiwayatPenyakit?: string;
  }

  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const session = searchParams.get('session');
  const [formData, setFormData] = useState<FormDataType | null>(null);

  console.log("Session:", session);

  useEffect(() => {
    if (!session || session === 'desktop') {
      console.log("No session or desktop mode, skipping fetch");
      return;
    }

    const fetchData = async () => {
      try {
        console.log("Fetching data for session:", session);
        const res = await fetch(`/api/nakes/show-qr?session=${session}`);
        
        if (!res.ok) {
          console.error("Error response:", res.status, res.statusText);
          return;
        }
        
        const json = await res.json();
        const data = json.data;

        console.log("Data received:", data);

        if (data) {
          setFormData({
            Nama: data.nama,
            NIK: data.nik?.toString(),
            TanggalLahir: dayjs(data.tanggalLahir),
            GolonganDarah: data.golonganDarah,
            Kontak: data.kontak?.toString(),
            Alamat: data.alamat,
            NamaWali: data.suamiNama,
            KontakWali: data.suamiKontak?.toString(),
            RiwayatPenyakit: data.riwayatPenyakit?.join(', '),
          });
        }
      } catch (err) {
        console.error('Gagal fetch data dari session:', err);
      }
    };

    fetchData();
  }, [session]);

  // Set form values when formData changes
  useEffect(() => {
    if (formData) {
      console.log("Setting form values:", formData);
      form.setFieldsValue(formData);
    }
  }, [formData, form]);

  return (
    <div className="p-8 space-y-6 slate-50">
        <Topbar username="Nakes"/>
        <div className="">
            <SidebarDesktop/>
        </div>
        <div className='ml-52 pt-8 min-h-screen bg-slate-50'>
      {/* Form Container */}     
          <div className="p-6 md:p-8">
            <Card 
              className="shadow-md rounded-lg"
              title={
                <div className="flex items-center">
                  <UserOutlined className="mr-2 text-blue-500" />
                  <h1 className="m-0">Tambah Data Pasien Baru</h1>
                </div>
              }
            > 
              <Form
                form={form}
                layout="vertical"
                initialValues={{ variant: 'filled' }}
                requiredMark="optional"
                className="max-w-[1100px] mx-auto"
              >
                <Divider orientation="center">
                  <h1 className="text-blue-500">Informasi Pribadi Pasien</h1>
                </Divider>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item 
                    label="Nama Lengkap" 
                    name="Nama" 
                    rules={[{ required: true, message: 'Harap masukkan nama lengkap pasien!' }]}
                    tooltip="Nama lengkap sesuai dengan KTP/KK"
                  >
                    <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Masukkan nama lengkap" />
                  </Form.Item>
                  
                  <Form.Item 
                    label="NIK" 
                    name="NIK" 
                    rules={[
                      { required: true, message: 'Harap masukkan NIK!' },
                      { pattern: /^\d{16}$/, message: 'NIK harus 16 digit!' }
                    ]}
                    tooltip="Nomor Induk Kependudukan 16 digit"
                  >
                    <Input prefix={<IdcardOutlined className="text-gray-400" />} placeholder="Masukkan 16 digit NIK" maxLength={16} />
                  </Form.Item>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item 
                    label="Tanggal Lahir" 
                    name="TanggalLahir" 
                    rules={[{ required: true, message: 'Pilih Tanggal Lahir!' }]}
                  >
                    <DatePicker 
                      className="w-full" 
                      placeholder="Pilih tanggal lahir"
                      format="DD/MM/YYYY"
                      suffixIcon={<CalendarOutlined className="text-gray-400" />}
                    />
                  </Form.Item>
                  
                  <Form.Item 
                    label="Golongan Darah" 
                    name="GolonganDarah" 
                    rules={[{ required: true, message: 'Pilih Golongan Darah!' }]}
                  >
                    <Select 
                      options={OpsiGolDar}
                      placeholder="Pilih golongan darah"
                    />
                  </Form.Item>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item 
                    label="Nomor Telepon" 
                    name="Kontak" 
                    rules={[
                      { required: true, message: 'Harap masukkan nomor telepon!' },
                      { pattern: /^[0-9]+$/, message: 'Hanya boleh berisi angka!' }
                    ]}
                    tooltip="Nomor telepon aktif yang dapat dihubungi"
                  >
                    <Input 
                      prefix={<PhoneOutlined className="text-gray-400" />} 
                      placeholder="Contoh: 081234567890" 
                    />
                  </Form.Item>
                  
                  <Form.Item 
                    label="Riwayat Penyakit" 
                    name="RiwayatPenyakit"
                    tooltip="Riwayat penyakit atau alergi yang perlu diketahui"
                  >
                    <Input 
                      prefix={<MedicineBoxOutlined className="text-gray-400" />} 
                      placeholder="Misal: Diabetes, Hipertensi, dll"
                    />
                  </Form.Item>
                </div>
                
                <Form.Item 
                  label="Alamat Lengkap" 
                  name="Alamat" 
                  rules={[{ required: true, message: 'Harap masukkan alamat lengkap!' }]}
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="Masukkan alamat lengkap termasuk RT/RW"
                  />
                </Form.Item>
                
                <Divider orientation="center">
                  <h1 className="text-blue-500">Informasi Wali/Keluarga</h1>
                </Divider>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item 
                    label="Nama Wali" 
                    name="NamaWali" 
                    rules={[{ required: true, message: 'Harap masukkan Nama Wali!' }]}
                    tooltip="Nama keluarga atau wali yang dapat dihubungi"
                  >
                    <Input 
                      prefix={<TeamOutlined className="text-gray-400" />} 
                      placeholder="Masukkan nama wali/keluarga" 
                    />
                  </Form.Item>
                  
                  <Form.Item 
                    label="Kontak Wali" 
                    name="KontakWali" 
                    rules={[
                      { required: true, message: 'Harap masukkan Kontak Wali!' },
                      { pattern: /^[0-9]+$/, message: 'Hanya boleh berisi angka!' }
                    ]}
                    tooltip="Nomor telepon wali yang dapat dihubungi"
                  >
                    <Input 
                      prefix={<PhoneOutlined className="text-gray-400" />} 
                      placeholder="Contoh: 081234567890" 
                    />
                  </Form.Item>
                </div>
                
                <Form.Item className="mt-8 text-center">
                  <Space>
                    <Button type="default" className="px-8">
                      Batal
                    </Button>
                    <Button type="primary" htmlType="submit" className="bg-blue-500 px-8">
                      Simpan Data
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </div>
      </div>
    </div>
  );
};

export default TambahPasien;

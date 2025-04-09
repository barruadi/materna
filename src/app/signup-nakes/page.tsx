"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Layout,
  Space,
  Card,
  Divider,
} from 'antd';
import { CalendarOutlined, IdcardOutlined, MedicineBoxOutlined, PhoneOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

export default function SignupPage() {

  const [form] = Form.useForm();

const handleSignup = async (values: any) => {
  console.log("Form values:", values);

  const response = await fetch("/api/pasien/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: values.Email,
      username: values.Nama,
      password: values.Password,
      nip: values.NIP,
      kontak:  values.Kontak,
      faskesID: values.FaskesID,
    }),
  });

  if (!response.ok) {
    console.log("Error");
  } else {
    const data = await response.json();
    console.log("Success:", data);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <h1 className="text-2xl font-bold mt-4">Sign Up</h1>
      <Form
            form={form}
            layout="vertical"
            initialValues={{ variant: 'filled' }}
            onFinish={handleSignup}
            requiredMark="optional"
            className="max-w-[1100px] mx-auto"
          >
            <Divider orientation="center">
              <h1 className="text-black font-bold">Informasi Tenaga Kesehatan</h1>
            </Divider>
            
            <div className="grid grid-cols-1 gap-4">
            <Form.Item 
              label="Email" 
              name="Email" 
              style={{ marginBottom: 3 }}
              rules={[
                { required: true, message: 'Harap masukkan email!' },
                { type: 'email', message: 'Format email tidak valid!' }
              ]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>

            <Form.Item 
              label="Password" 
              name="Password" 
              style={{ marginBottom: 3 }}
              rules={[
                { required: true, message: 'Harap masukkan password!' },
                { min: 6, message: 'Password minimal 6 karakter' }
              ]}
            >
              <Input.Password placeholder="Masukkan password" />
            </Form.Item>

              <Form.Item 
                label="Nama Lengkap" 
                name="Nama" 
                style={{ marginBottom: 3 }}
                rules={[{ required: true, message: 'Harap masukkan nama lengkap!' }]}
                tooltip="Nama lengkap sesuai dengan KTP/KK"
              >
                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Masukkan nama lengkap" />
              </Form.Item>
              
              <Form.Item 
                label="NIP" 
                name="NIP" 
                style={{ marginBottom: 3 }}
                rules={[
                  { required: true, message: 'Harap masukkan NIP!' },
                  { pattern: /^\d{16}$/, message: 'NIP harus 16 digit!' }
                ]}
                tooltip="Nomor Induk Penduduk 16 digit"
              >
                <Input prefix={<IdcardOutlined className="text-gray-400" />} placeholder="Masukkan 16 digit NIP" maxLength={16} />
              </Form.Item>
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
            </div>
            
            <Form.Item className="mt-8 text-center">
                <button type="submit" className="bg-[#FFF9C2] px-20 py-2 text-black rounded-xl font-bold">
                  Daftar
                </button>
            </Form.Item>
          </Form>
    </div>
  );
}
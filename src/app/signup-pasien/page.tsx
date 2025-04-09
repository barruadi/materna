"use client";

import {
  DatePicker,
  Form,
  Input,
  Select,
  Divider,
} from 'antd';
import { 
  CalendarOutlined, 
  IdcardOutlined, 
  MedicineBoxOutlined, 
  PhoneOutlined, 
  TeamOutlined, 
  UserOutlined 
} from '@ant-design/icons';

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
      nik: values.NIK,
      tanggalLahir: values.TanggalLahir,
      golonganDarah: values.GolonganDarah,
      kontak: values.Kontak,
    }),
  });

  if (!response.ok) {
    console.log("Error");
  } else {
    const data = await response.json();
    console.log("Success:", data);
  }
};


  const OpsiGolDar = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'AB', label: 'AB' },
    { value: 'O', label: 'O' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
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
              <h1 className="text-black font-bold">Informasi Pribadi Pasien</h1>
            </Divider>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item 
              label="Email" 
              name="Email" 
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
                rules={[{ required: true, message: 'Harap masukkan nama lengkap!' }]}
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
              <h1 className="text-black font-bold">Informasi Wali/Keluarga</h1>
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
                <button type="submit" className="bg-[#FFF9C2] px-20 py-2 text-black rounded-xl font-bold">
                  Daftar
                </button>
            </Form.Item>
          </Form>
    </div>
  );
}
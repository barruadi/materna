"use client";

import React from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Layout,
} from 'antd';

const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 14 } },
};

const OpsiGolDar = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'AB', label: 'AB' },
  { value: 'O', label: 'O' },
];

const {Header} = Layout;

const TambahPasien: React.FC = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      {/* Form Container */}
      <div className="bg-white rounded-lg shadow-lg w-full py-8">        
        <Form
          {...formItemLayout}
          form={form}
          variant={variant || 'filled'}
          initialValues={{ variant: 'filled' }}
        >
          <Form.Item label="Nama" name="Nama" rules={[{ required: true, message: 'Harap masukkan nama!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="NIK" name="NIK" rules={[{ required: true, message: 'Harap masukkan NIK!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Tanggal Lahir" name="TanggalLahir" rules={[{ required: true, message: 'Pilih Tanggal Lahir!' }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Kontak" name="Kontak" rules={[{ required: true, message: 'Harap masukkan Kontak!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Alamat" name="Alamat" rules={[{ required: true, message: 'Harap masukkan Alamat!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Golongan Darah" name="GolonganDarah" rules={[{ required: true, message: 'Harap masukkan Golongan Darah!' }]}>
            <Select options={OpsiGolDar} />
          </Form.Item>

          <Form.Item label="Riwayat Penyakit" name="RiwayatPenyakit" rules={[{ required: true, message: 'Harap masukkan Riwayat Penyakit!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Nama Wali" name="NamaWali" rules={[{ required: true, message: 'Harap masukkan Nama Wali!' }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Kontak Wali" name="KontakWali" rules={[{ required: true, message: 'Harap masukkan Kontak Wali!' }]}>
            <Input />
          </Form.Item>

          <Form.Item className='flex justify-center'>
            <Button type="primary" htmlType="submit" className="bg-[#FFD96C] text-black px-10">
              Simpan
            </Button>
          </Form.Item>

        </Form>
      </div>
    </div>
  );
};

export default TambahPasien;

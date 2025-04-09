// src/app/_components/riwayat-form/RiwayatBasicForm.tsx
import React from 'react';
import { Form, Input, Select, DatePicker } from 'antd';

interface RiwayatBasicFormProps {
  form: any;
  formData: any;
}

const RiwayatBasicForm: React.FC<RiwayatBasicFormProps> = ({ form, formData }) => {
  return (
    <>
      <h2>Data Riwayat Dasar</h2>
      
      <Form.Item 
        name="pasienId" 
        label="Pasien" 
        rules={[{ required: true, message: 'Mohon pilih pasien!' }]}
      >
        <Select
          placeholder="Pilih pasien"
          // Options would be populated from your database
          options={[
            { value: 'pasien1', label: 'Pasien 1' },
            { value: 'pasien2', label: 'Pasien 2' },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        name="nakesId" 
        label="Tenaga Kesehatan" 
        rules={[{ required: true, message: 'Mohon pilih tenaga kesehatan!' }]}
      >
        <Select
          placeholder="Pilih tenaga kesehatan"
          // Options would be populated from your database
          options={[
            { value: 'nakes1', label: 'Dr. Budi' },
            { value: 'nakes2', label: 'Dr. Ani' },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        name="faskesId" 
        label="Fasilitas Kesehatan" 
        rules={[{ required: true, message: 'Mohon pilih fasilitas kesehatan!' }]}
      >
        <Select
          placeholder="Pilih fasilitas kesehatan"
          // Options would be populated from your database
          options={[
            { value: 'faskes1', label: 'Puskesmas Sehat' },
            { value: 'faskes2', label: 'RS Sejahtera' },
          ]}
        />
      </Form.Item>
      
      <Form.Item
        name="createdAt"
        label="Tanggal Pemeriksaan"
        rules={[{ required: true, message: 'Mohon isi tanggal pemeriksaan!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
    </>
  );
};

export default RiwayatBasicForm;
// src/app/_components/riwayat-form/PelayananForm.tsx
import React from 'react';
import { Form, InputNumber, Select } from 'antd';

interface PelayananFormProps {
  form: any;
  formData: any;
}

const PelayananForm: React.FC<PelayananFormProps> = ({ form, formData }) => {
  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Bentuk Layanan</h1>
      
      <Form.Item 
        name={['pelayanan', 'injeksiTT']} 
        label="Injeksi TT"
      >
        <InputNumber style={{ width: '100%' }} min={0} max={5} placeholder="Jumlah injeksi TT" />
      </Form.Item>
      
      <Form.Item 
        name={['pelayanan', 'catatDiBukuKIA']} 
        label="Catat di Buku KIA"
      >
        <Select
          placeholder="Pilih status"
          options={[
            { value: 'ya', label: 'Ya' },
            { value: 'tidak', label: 'Tidak' },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        name={['pelayanan', 'fe']} 
        label="Fe (Tablet Besi)"
      >
        <InputNumber style={{ width: '100%' }} min={0} placeholder="Jumlah tablet Fe" />
      </Form.Item>
    </>
  );
};

export default PelayananForm;
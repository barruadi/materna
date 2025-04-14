import React from 'react';
import { Form, InputNumber, Select } from 'antd';
import SmartInput from './SmartInput';

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
        <SmartInput
          value={form.getFieldValue(['pelayanan', 'injeksiTT'])}
          onChange={(val) => form.setFieldValue(['pelayanan', 'injeksiTT'], val)}
          placeholder="Jumlah injeksi TT"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} max={5} placeholder="Jumlah injeksi TT" /> */}
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
        <SmartInput
          value={form.getFieldValue(['pelayanan', 'fe'])}
          onChange={(val) => form.setFieldValue(['pelayanan', 'fe'], val)}
          placeholder="Jumlah tablet Fe"
          isNumber={true} 
        />
        {/* <InputNumber style={{ width: '100%' }} min={0} placeholder="Jumlah tablet Fe" /> */}
      </Form.Item>
    </>
  );
};

export default PelayananForm;